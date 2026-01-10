import { PrismaClient, UserRole, QuoteStatus, BudgetRange } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================================================
  // 1. Create Users
  // ============================================================================
  console.log('Creating users...')

  const superadmin = await prisma.user.upsert({
    where: { email: 'ahmed@namconstruction.be' },
    update: {},
    create: {
      email: 'ahmed@namconstruction.be',
      passwordHash: await hash('Admin123!', 12),
      fullName: 'Ahmed',
      role: UserRole.SUPERADMIN,
      isActive: true,
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'sara@namconstruction.be' },
    update: {},
    create: {
      email: 'sara@namconstruction.be',
      passwordHash: await hash('Admin123!', 12),
      fullName: 'Sara',
      role: UserRole.ADMIN,
      isActive: true,
    },
  })

  console.log(`  ✓ Created ${superadmin.fullName} (superadmin)`)
  console.log(`  ✓ Created ${admin.fullName} (admin)`)

  // ============================================================================
  // 2. Create Property Types
  // ============================================================================
  console.log('Creating property types...')

  const propertyTypes = [
    { name: 'Appartement', slug: 'appartement' },
    { name: 'Tussenwoning', slug: 'tussenwoning' },
    { name: 'Hoekwoning', slug: 'hoekwoning' },
    { name: 'Vrijstaande woning', slug: 'vrijstaand' },
    { name: 'Herenhuis', slug: 'herenhuis' },
    { name: 'Bedrijfspand', slug: 'bedrijfspand' },
  ]

  for (let i = 0; i < propertyTypes.length; i++) {
    await prisma.propertyType.upsert({
      where: { slug: propertyTypes[i].slug },
      update: {},
      create: {
        ...propertyTypes[i],
        sortOrder: i,
      },
    })
  }
  console.log(`  ✓ Created ${propertyTypes.length} property types`)

  // ============================================================================
  // 3. Create Service Types
  // ============================================================================
  console.log('Creating service types...')

  const serviceTypes = [
    { name: 'Totaalrenovatie', slug: 'totaalrenovatie', icon: 'home', description: 'Volledige renovatie van uw woning' },
    { name: 'Badkamer', slug: 'badkamer', icon: 'bath', description: 'Badkamerrenovatie en -installatie' },
    { name: 'Keuken', slug: 'keuken', icon: 'utensils', description: 'Keukenrenovatie en -plaatsing' },
    { name: 'Toilet', slug: 'toilet', icon: 'toilet', description: 'Toilet renovatie' },
    { name: 'Woonkamer', slug: 'woonkamer', icon: 'sofa', description: 'Woonkamer verbouwing' },
    { name: 'Slaapkamer', slug: 'slaapkamer', icon: 'bed', description: 'Slaapkamer renovatie' },
    { name: 'Uitbouw/Zolder', slug: 'uitbouw-zolder', icon: 'expand', description: 'Uitbreiding of zolderrenovatie' },
    { name: 'Elektriciteit', slug: 'elektriciteit', icon: 'zap', description: 'Elektrische installaties' },
    { name: 'Sanitair', slug: 'sanitair', icon: 'droplet', description: 'Sanitaire installaties' },
    { name: 'Vloeren', slug: 'vloeren', icon: 'layers', description: 'Vloeren leggen en renoveren' },
    { name: 'Schilderwerk', slug: 'schilderwerk', icon: 'paintbrush', description: 'Binnen- en buitenschilderwerk' },
    { name: 'Anders', slug: 'anders', icon: 'more-horizontal', description: 'Andere renovatiewerken' },
  ]

  const createdServices = []
  for (let i = 0; i < serviceTypes.length; i++) {
    const service = await prisma.serviceType.upsert({
      where: { slug: serviceTypes[i].slug },
      update: {},
      create: {
        ...serviceTypes[i],
        sortOrder: i,
        createdById: superadmin.id,
      },
    })
    createdServices.push(service)
  }
  console.log(`  ✓ Created ${serviceTypes.length} service types`)

  // ============================================================================
  // 4. Create Sample Quote Requests (for development)
  // ============================================================================
  console.log('Creating sample quote requests...')

  const appartement = await prisma.propertyType.findUnique({ where: { slug: 'appartement' } })
  const herenhuis = await prisma.propertyType.findUnique({ where: { slug: 'herenhuis' } })
  const tussenwoning = await prisma.propertyType.findUnique({ where: { slug: 'tussenwoning' } })

  const badkamer = createdServices.find(s => s.slug === 'badkamer')!
  const keuken = createdServices.find(s => s.slug === 'keuken')!
  const totaalrenovatie = createdServices.find(s => s.slug === 'totaalrenovatie')!
  const elektriciteit = createdServices.find(s => s.slug === 'elektriciteit')!

  const sampleQuotes = [
    {
      referenceNumber: 'NAM-2026-0001',
      status: QuoteStatus.NEW,
      fullName: 'Jan Peeters',
      email: 'jan.peeters@gmail.com',
      phone: '0493123456',
      postalCode: '9000',
      city: 'Gent',
      propertyTypeId: herenhuis?.id,
      description: 'Volledige renovatie van een herenhuis uit 1920. Drie verdiepingen, inclusief nieuwe elektriciteit en sanitair.',
      budgetRange: BudgetRange.RANGE_50K_100K,
      gdprConsent: true,
      services: [totaalrenovatie.id, elektriciteit.id],
    },
    {
      referenceNumber: 'NAM-2026-0002',
      status: QuoteStatus.CONTACTED,
      fullName: 'Marie Vandenberghe',
      email: 'marie.vdb@hotmail.com',
      phone: '0476987654',
      postalCode: '9030',
      city: 'Mariakerke',
      propertyTypeId: tussenwoning?.id,
      description: 'Badkamer en toilet renoveren. Huidige staat is verouderd (jaren 90).',
      budgetRange: BudgetRange.RANGE_10K_25K,
      gdprConsent: true,
      assignedToId: admin.id,
      services: [badkamer.id],
    },
    {
      referenceNumber: 'NAM-2026-0003',
      status: QuoteStatus.SITE_VISIT,
      fullName: 'Peter De Smedt',
      email: 'peter.desmedt@werk.be',
      phone: '0489112233',
      postalCode: '9000',
      city: 'Gent',
      propertyTypeId: appartement?.id,
      description: 'Nieuwe keuken plaatsen in appartement. Ruimte is 12m².',
      budgetRange: BudgetRange.RANGE_25K_50K,
      gdprConsent: true,
      assignedToId: admin.id,
      services: [keuken.id],
    },
  ]

  for (const quoteData of sampleQuotes) {
    const { services, ...quote } = quoteData

    const existingQuote = await prisma.quoteRequest.findUnique({
      where: { referenceNumber: quote.referenceNumber }
    })

    if (!existingQuote) {
      const createdQuote = await prisma.quoteRequest.create({
        data: quote,
      })

      // Add service selections
      for (const serviceId of services) {
        await prisma.quoteServiceSelection.create({
          data: {
            quoteId: createdQuote.id,
            serviceTypeId: serviceId,
          },
        })
      }

      // Add initial status history
      await prisma.quoteStatusHistory.create({
        data: {
          quoteId: createdQuote.id,
          toStatus: quote.status,
          changedById: superadmin.id,
        },
      })

      console.log(`  ✓ Created quote ${quote.referenceNumber}`)
    }
  }

  console.log('\n✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
