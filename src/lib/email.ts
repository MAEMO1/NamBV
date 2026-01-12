import { Resend } from 'resend'

// Lazy-initialize Resend to prevent build errors when API key is not set
let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'NAM Construction <noreply@namconstruction.be>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@namconstruction.be'

// Types
interface QuoteEmailData {
  referenceNumber: string
  fullName: string
  email: string
  phone: string
  postalCode: string
  city?: string
  propertyType?: string
  services: string[]
  description: string
  budgetRange?: string
}

interface AppointmentEmailData {
  referenceNumber: string
  fullName: string
  email: string
  phone: string
  gemeente: string
  appointmentDate: string
  appointmentTime: string
  projectType?: string
  propertyType?: string
  message?: string
}

interface CalendarEventData {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location?: string
  organizerEmail: string
  attendeeEmail: string
  attendeeName: string
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

function getQuoteConfirmationHtml(data: QuoteEmailData): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging Offerteaanvraag</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background-color: #3d5a4c; padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 4px;">NAM</h1>
        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; letter-spacing: 2px;">CONSTRUCTION</p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px;">Bedankt voor uw aanvraag!</h2>

        <p style="margin: 0 0 20px; color: #444; line-height: 1.6;">
          Beste ${data.fullName},
        </p>

        <p style="margin: 0 0 20px; color: #444; line-height: 1.6;">
          Wij hebben uw offerteaanvraag goed ontvangen. Ons team zal deze zo snel mogelijk bekijken en contact met u opnemen.
        </p>

        <!-- Reference Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; margin: 30px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Referentienummer</p>
              <p style="margin: 0; color: #3d5a4c; font-size: 20px; font-weight: bold;">${data.referenceNumber}</p>
            </td>
          </tr>
        </table>

        <!-- Details -->
        <h3 style="margin: 30px 0 15px; color: #1a1a1a; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Uw aanvraag</h3>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Type woning:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.propertyType || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Locatie:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.postalCode} ${data.city || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Diensten:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.services.join(', ')}</td>
          </tr>
          ${data.budgetRange ? `
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Budget:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.budgetRange}</td>
          </tr>
          ` : ''}
        </table>

        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f0;">
          <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase;">Omschrijving</p>
          <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">${data.description}</p>
        </div>

        <!-- What's Next -->
        <h3 style="margin: 30px 0 15px; color: #1a1a1a; font-size: 16px;">Wat gebeurt er nu?</h3>
        <ol style="margin: 0; padding: 0 0 0 20px; color: #444; line-height: 1.8;">
          <li>Ons team bekijkt uw aanvraag binnen 24-48 uur</li>
          <li>We nemen contact met u op om de details te bespreken</li>
          <li>Indien gewenst, plannen we een plaatsbezoek in</li>
          <li>U ontvangt een vrijblijvende offerte op maat</li>
        </ol>

        <p style="margin: 30px 0 0; color: #444; line-height: 1.6;">
          Heeft u vragen? Neem gerust contact met ons op via <a href="tel:+32493812789" style="color: #3d5a4c;">+32 493 81 27 89</a> of <a href="mailto:info@namconstruction.be" style="color: #3d5a4c;">info@namconstruction.be</a>
        </p>

        <p style="margin: 20px 0 0; color: #444; line-height: 1.6;">
          Met vriendelijke groeten,<br>
          <strong>Team NAM Construction</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #3d5a4c; padding: 30px; text-align: center;">
        <p style="margin: 0 0 10px; color: rgba(255,255,255,0.8); font-size: 14px;">NAM Construction</p>
        <p style="margin: 0 0 5px; color: rgba(255,255,255,0.6); font-size: 12px;">Gent, Belgie</p>
        <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 12px;">+32 493 81 27 89 | info@namconstruction.be</p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function getAppointmentConfirmationHtml(data: AppointmentEmailData): string {
  const formattedDate = new Date(data.appointmentDate).toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging Adviesgesprek</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background-color: #3d5a4c; padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 4px;">NAM</h1>
        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; letter-spacing: 2px;">CONSTRUCTION</p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px;">Uw adviesgesprek is ingepland!</h2>

        <p style="margin: 0 0 20px; color: #444; line-height: 1.6;">
          Beste ${data.fullName},
        </p>

        <p style="margin: 0 0 20px; color: #444; line-height: 1.6;">
          Bedankt voor het inplannen van een adviesgesprek met NAM Construction. Hieronder vindt u de details van uw afspraak.
        </p>

        <!-- Appointment Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #3d5a4c; margin: 30px 0;">
          <tr>
            <td style="padding: 30px; text-align: center;">
              <p style="margin: 0 0 5px; color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Uw afspraak</p>
              <p style="margin: 0 0 10px; color: #ffffff; font-size: 22px; font-weight: bold;">${formattedDate}</p>
              <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">${data.appointmentTime}</p>
            </td>
          </tr>
        </table>

        <!-- Reference -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; margin-bottom: 30px;">
          <tr>
            <td style="padding: 15px 20px;">
              <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Referentienummer</p>
              <p style="margin: 0; color: #3d5a4c; font-size: 18px; font-weight: bold;">${data.referenceNumber}</p>
            </td>
          </tr>
        </table>

        <!-- Details -->
        <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Uw gegevens</h3>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Gemeente:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.gemeente}</td>
          </tr>
          ${data.projectType ? `
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Type project:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.projectType}</td>
          </tr>
          ` : ''}
          ${data.propertyType ? `
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Type woning:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right;">${data.propertyType}</td>
          </tr>
          ` : ''}
        </table>

        ${data.message ? `
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f0;">
          <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase;">Uw bericht</p>
          <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">${data.message}</p>
        </div>
        ` : ''}

        <!-- Add to Calendar Button -->
        <div style="margin: 30px 0; text-align: center;">
          <p style="margin: 0 0 15px; color: #666; font-size: 14px;">Voeg toe aan uw agenda:</p>
          <a href="cid:calendar.ics" style="display: inline-block; padding: 12px 24px; background-color: #3d5a4c; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: bold;">
            Toevoegen aan agenda
          </a>
        </div>

        <!-- What to Expect -->
        <h3 style="margin: 30px 0 15px; color: #1a1a1a; font-size: 16px;">Wat kunt u verwachten?</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #444; line-height: 1.8;">
          <li>Een vrijblijvend telefonisch gesprek van ca. 20-30 minuten</li>
          <li>We bespreken uw wensen en mogelijkheden</li>
          <li>U ontvangt direct een eerste inschatting</li>
          <li>Indien gewenst, plannen we een plaatsbezoek in</li>
        </ul>

        <!-- Important Note -->
        <div style="margin: 30px 0; padding: 20px; background-color: #fff8e6; border-left: 4px solid #f5a623;">
          <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.6;">
            <strong>Belangrijk:</strong> Wij bellen u op het afgesproken tijdstip op <strong>${data.phone}</strong>. Zorg dat u bereikbaar bent.
          </p>
        </div>

        <p style="margin: 30px 0 0; color: #444; line-height: 1.6;">
          Moet u de afspraak wijzigen of annuleren? Neem contact met ons op via <a href="tel:+32493812789" style="color: #3d5a4c;">+32 493 81 27 89</a> of <a href="mailto:info@namconstruction.be" style="color: #3d5a4c;">info@namconstruction.be</a>
        </p>

        <p style="margin: 20px 0 0; color: #444; line-height: 1.6;">
          Tot binnenkort!<br>
          <strong>Team NAM Construction</strong>
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #3d5a4c; padding: 30px; text-align: center;">
        <p style="margin: 0 0 10px; color: rgba(255,255,255,0.8); font-size: 14px;">NAM Construction</p>
        <p style="margin: 0 0 5px; color: rgba(255,255,255,0.6); font-size: 12px;">Gent, Belgie</p>
        <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 12px;">+32 493 81 27 89 | info@namconstruction.be</p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function getAdminNotificationHtml(type: 'quote' | 'appointment', data: QuoteEmailData | AppointmentEmailData): string {
  if (type === 'quote') {
    const quoteData = data as QuoteEmailData
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Nieuwe Offerteaanvraag</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #3d5a4c; padding: 20px 30px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 18px;">Nieuwe Offerteaanvraag</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; margin-bottom: 20px;">
          <tr>
            <td style="padding: 15px;">
              <p style="margin: 0; color: #2e7d32; font-weight: bold; font-size: 16px;">
                ${quoteData.referenceNumber}
              </p>
            </td>
          </tr>
        </table>

        <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 14px; text-transform: uppercase;">Contactgegevens</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Naam:</td><td style="padding: 5px 0; font-size: 14px;"><strong>${quoteData.fullName}</strong></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Email:</td><td style="padding: 5px 0; font-size: 14px;"><a href="mailto:${quoteData.email}" style="color: #3d5a4c;">${quoteData.email}</a></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Telefoon:</td><td style="padding: 5px 0; font-size: 14px;"><a href="tel:${quoteData.phone}" style="color: #3d5a4c;">${quoteData.phone}</a></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Locatie:</td><td style="padding: 5px 0; font-size: 14px;">${quoteData.postalCode} ${quoteData.city || ''}</td></tr>
        </table>

        <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 14px; text-transform: uppercase;">Projectdetails</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Type woning:</td><td style="padding: 5px 0; font-size: 14px;">${quoteData.propertyType || '-'}</td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Diensten:</td><td style="padding: 5px 0; font-size: 14px;">${quoteData.services.join(', ')}</td></tr>
          ${quoteData.budgetRange ? `<tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Budget:</td><td style="padding: 5px 0; font-size: 14px;">${quoteData.budgetRange}</td></tr>` : ''}
        </table>

        <div style="padding: 15px; background-color: #f5f5f0; margin-bottom: 20px;">
          <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase;">Omschrijving</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6;">${quoteData.description}</p>
        </div>

        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://namconstruction.be'}/admin" style="display: inline-block; padding: 12px 24px; background-color: #3d5a4c; color: #ffffff; text-decoration: none; font-size: 14px;">
          Bekijk in Admin
        </a>
      </td>
    </tr>
  </table>
</body>
</html>
`
  } else {
    const appointmentData = data as AppointmentEmailData
    const formattedDate = new Date(appointmentData.appointmentDate).toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Nieuw Adviesgesprek</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #3d5a4c; padding: 20px 30px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 18px;">Nieuw Adviesgesprek Ingepland</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e3f2fd; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase;">${appointmentData.referenceNumber}</p>
              <p style="margin: 0 0 5px; color: #1565c0; font-size: 18px; font-weight: bold;">${formattedDate}</p>
              <p style="margin: 0; color: #1565c0; font-size: 24px; font-weight: bold;">${appointmentData.appointmentTime}</p>
            </td>
          </tr>
        </table>

        <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 14px; text-transform: uppercase;">Contactgegevens</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Naam:</td><td style="padding: 5px 0; font-size: 14px;"><strong>${appointmentData.fullName}</strong></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Email:</td><td style="padding: 5px 0; font-size: 14px;"><a href="mailto:${appointmentData.email}" style="color: #3d5a4c;">${appointmentData.email}</a></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Telefoon:</td><td style="padding: 5px 0; font-size: 14px;"><a href="tel:${appointmentData.phone}" style="color: #3d5a4c;">${appointmentData.phone}</a></td></tr>
          <tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Gemeente:</td><td style="padding: 5px 0; font-size: 14px;">${appointmentData.gemeente}</td></tr>
        </table>

        ${appointmentData.projectType || appointmentData.propertyType ? `
        <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 14px; text-transform: uppercase;">Project</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
          ${appointmentData.projectType ? `<tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Type:</td><td style="padding: 5px 0; font-size: 14px;">${appointmentData.projectType}</td></tr>` : ''}
          ${appointmentData.propertyType ? `<tr><td style="padding: 5px 0; color: #666; font-size: 14px;">Woning:</td><td style="padding: 5px 0; font-size: 14px;">${appointmentData.propertyType}</td></tr>` : ''}
        </table>
        ` : ''}

        ${appointmentData.message ? `
        <div style="padding: 15px; background-color: #f5f5f0; margin-bottom: 20px;">
          <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase;">Bericht</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6;">${appointmentData.message}</p>
        </div>
        ` : ''}

        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://namconstruction.be'}/admin" style="display: inline-block; padding: 12px 24px; background-color: #3d5a4c; color: #ffffff; text-decoration: none; font-size: 14px;">
          Bekijk in Admin
        </a>
      </td>
    </tr>
  </table>
</body>
</html>
`
  }
}

// ============================================================================
// ICAL GENERATION
// ============================================================================

export function generateICalEvent(data: CalendarEventData): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }

  const uid = `${Date.now()}-${Math.random().toString(36).substring(2)}@namconstruction.be`
  const now = formatDate(new Date())
  const start = formatDate(data.startDate)
  const end = formatDate(data.endDate)

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NAM Construction//Adviesgesprek//NL
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${data.title}
DESCRIPTION:${data.description.replace(/\n/g, '\\n')}
${data.location ? `LOCATION:${data.location}` : ''}
ORGANIZER;CN=NAM Construction:mailto:${data.organizerEmail}
ATTENDEE;CN=${data.attendeeName};RSVP=TRUE:mailto:${data.attendeeEmail}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Herinnering: ${data.title}
END:VALARM
END:VEVENT
END:VCALENDAR`
}

// ============================================================================
// EMAIL SENDING FUNCTIONS
// ============================================================================

export async function sendQuoteConfirmation(data: QuoteEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Bevestiging offerteaanvraag ${data.referenceNumber} - NAM Construction`,
      html: getQuoteConfirmationHtml(data),
    })

    if (error) {
      console.error('Error sending quote confirmation:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error sending quote confirmation:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendAppointmentConfirmation(data: AppointmentEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    // Create calendar event
    const appointmentDate = new Date(data.appointmentDate)
    const [hours, minutes] = data.appointmentTime.split(':').map(Number)
    appointmentDate.setHours(hours, minutes, 0, 0)

    const endDate = new Date(appointmentDate)
    endDate.setMinutes(endDate.getMinutes() + 30) // 30 minute appointment

    const icalContent = generateICalEvent({
      title: `Adviesgesprek NAM Construction`,
      description: `Telefonisch adviesgesprek met NAM Construction\\n\\nReferentie: ${data.referenceNumber}\\n\\nWij bellen u op ${data.phone}`,
      startDate: appointmentDate,
      endDate: endDate,
      organizerEmail: ADMIN_EMAIL,
      attendeeEmail: data.email,
      attendeeName: data.fullName,
    })

    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Bevestiging adviesgesprek ${data.appointmentTime} - NAM Construction`,
      html: getAppointmentConfirmationHtml(data),
      attachments: [
        {
          filename: 'adviesgesprek.ics',
          content: Buffer.from(icalContent).toString('base64'),
        },
      ],
    })

    if (error) {
      console.error('Error sending appointment confirmation:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error sending appointment confirmation:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendAdminNotification(
  type: 'quote' | 'appointment',
  data: QuoteEmailData | AppointmentEmailData,
  recipientEmail?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const to = recipientEmail || ADMIN_EMAIL
    const subject = type === 'quote'
      ? `Nieuwe offerteaanvraag: ${(data as QuoteEmailData).referenceNumber}`
      : `Nieuw adviesgesprek: ${(data as AppointmentEmailData).referenceNumber}`

    // For appointments, also attach calendar event for admin
    let attachments: Array<{ filename: string; content: string }> | undefined

    if (type === 'appointment') {
      const appointmentData = data as AppointmentEmailData
      const appointmentDate = new Date(appointmentData.appointmentDate)
      const [hours, minutes] = appointmentData.appointmentTime.split(':').map(Number)
      appointmentDate.setHours(hours, minutes, 0, 0)

      const endDate = new Date(appointmentDate)
      endDate.setMinutes(endDate.getMinutes() + 30)

      const icalContent = generateICalEvent({
        title: `Adviesgesprek: ${appointmentData.fullName}`,
        description: `Bel klant: ${appointmentData.phone}\\n\\nGemeente: ${appointmentData.gemeente}\\n${appointmentData.projectType ? `Project: ${appointmentData.projectType}\\n` : ''}${appointmentData.message ? `Bericht: ${appointmentData.message}` : ''}`,
        startDate: appointmentDate,
        endDate: endDate,
        location: appointmentData.gemeente,
        organizerEmail: ADMIN_EMAIL,
        attendeeEmail: appointmentData.email,
        attendeeName: appointmentData.fullName,
      })

      attachments = [
        {
          filename: 'adviesgesprek.ics',
          content: Buffer.from(icalContent).toString('base64'),
        },
      ]
    }

    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: getAdminNotificationHtml(type, data),
      attachments,
    })

    if (error) {
      console.error('Error sending admin notification:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Error sending admin notification:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

// Helper to get notification settings from database
export async function getNotificationSettings(): Promise<{
  emailOnQuote: boolean
  emailOnAppointment: boolean
  recipientEmail: string
}> {
  // This will be called from API routes where we have access to the database
  // For now, return defaults - the API routes will override with actual settings
  return {
    emailOnQuote: true,
    emailOnAppointment: true,
    recipientEmail: ADMIN_EMAIL,
  }
}
