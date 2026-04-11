import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import {
  defaultAvailabilityRules,
  defaultPageSections,
  defaultProjects,
  defaultSettings,
} from '../src/lib/v2/defaults'
import { toInputJsonValue } from '../src/lib/v2/json'

const prisma = new PrismaClient()

async function main() {
  const v2AdminEmail = process.env.V2_ADMIN_EMAIL || 'admin@namconstruction.be'
  const v2AdminPassword = process.env.V2_ADMIN_PASSWORD || 'ChangeMe123!'

  const v2Admin = await prisma.v2AdminUser.upsert({
    where: { email: v2AdminEmail },
    update: {
      passwordHash: await hash(v2AdminPassword, 12),
      fullName: 'V2 Admin',
      isActive: true,
    },
    create: {
      email: v2AdminEmail,
      passwordHash: await hash(v2AdminPassword, 12),
      fullName: 'V2 Admin',
      isActive: true,
    },
  })

  await prisma.v2AdminSession.deleteMany({})
  await prisma.v2AuditEvent.deleteMany({})
  await prisma.v2AvailabilityException.deleteMany({})
  await prisma.v2AvailabilityRule.deleteMany({})
  await prisma.v2PageSection.deleteMany({})
  await prisma.v2ProjectImage.deleteMany({})
  await prisma.v2ProjectTranslation.deleteMany({})
  await prisma.v2Project.deleteMany({})
  await prisma.v2SiteSetting.deleteMany({})

  if (defaultSettings.length > 0) {
    await prisma.v2SiteSetting.createMany({
      data: defaultSettings.map((setting) => ({
        key: setting.key,
        category: setting.category,
        description: setting.description || null,
        valueJson: toInputJsonValue(setting.valueJson),
      })),
    })
  }

  if (defaultPageSections.length > 0) {
    await prisma.v2PageSection.createMany({
      data: defaultPageSections.map((section) => ({
        pageKey: section.pageKey,
        sectionKey: section.sectionKey,
        locale: section.locale,
        schemaKey: section.schemaKey,
        dataJson: toInputJsonValue(section.dataJson),
        displayOrder: section.displayOrder,
        published: section.published,
      })),
    })
  }

  if (defaultAvailabilityRules.length > 0) {
    await prisma.v2AvailabilityRule.createMany({
      data: defaultAvailabilityRules.map((rule) => ({
        dayOfWeek: rule.dayOfWeek,
        timeSlots: rule.timeSlots,
        isActive: rule.isActive,
      })),
    })
  }

  for (const project of defaultProjects) {
    const createdProject = await prisma.v2Project.create({
      data: {
        slug: project.slug,
        category: project.category,
        location: project.location,
        year: project.year,
        featured: project.featured,
        isPublished: project.isPublished,
        sortOrder: project.sortOrder,
        coverImageUrl: project.coverImageUrl || null,
      },
    })

    await prisma.v2ProjectTranslation.createMany({
      data: project.translations.map((translation) => ({
        projectId: createdProject.id,
        locale: translation.locale,
        title: translation.title,
        shortDescription: translation.shortDescription || null,
        description: translation.description || null,
        challengeText: translation.challengeText || null,
        approachText: translation.approachText || null,
        resultText: translation.resultText || null,
        projectType: translation.projectType || null,
        duration: translation.duration || null,
        surface: translation.surface || null,
        completionDate: translation.completionDate || null,
      })),
    })

    await prisma.v2ProjectImage.createMany({
      data: project.images.map((image) => ({
        projectId: createdProject.id,
        imageUrl: image.imageUrl,
        alt: image.alt || null,
        caption: image.caption || null,
        sortOrder: image.sortOrder,
        kind: image.kind || 'gallery',
      })),
    })
  }

  const counts = {
    admin: await prisma.v2AdminUser.count(),
    settings: await prisma.v2SiteSetting.count(),
    sections: await prisma.v2PageSection.count(),
    rules: await prisma.v2AvailabilityRule.count(),
    projects: await prisma.v2Project.count(),
  }

  console.log(JSON.stringify({ ok: true, adminEmail: v2Admin.email, counts }, null, 2))
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
