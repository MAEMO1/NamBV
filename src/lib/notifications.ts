import { Resend } from 'resend'

// Lazy-initialize Resend
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

// Configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'NAM Construction <noreply@namconstruction.be>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@namconstruction.be'
const ADMIN_PHONE = process.env.ADMIN_PHONE || '+32493812789'
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'

// Types
interface Appointment {
  id: string
  referenceNumber: string
  fullName: string
  email: string
  phone: string
  gemeente: string
  appointmentDate: Date
  appointmentTime: string
  projectType?: string | null
  propertyType?: string | null
  status: string
}

interface StatusEmailData {
  type: 'confirmed' | 'rejected' | 'rescheduled'
  appointment: Appointment
  proposedDate?: Date
  proposedTime?: string
  rejectionReason?: string
}

interface WhatsAppData {
  to: string
  type: 'confirmed' | 'rejected' | 'rescheduled' | 'new_appointment' | 'new_quote'
  appointment?: Appointment
  proposedDate?: Date
  proposedTime?: string
  message?: string
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export async function sendAppointmentStatusEmail(data: StatusEmailData): Promise<void> {
  const { type, appointment, proposedDate, proposedTime, rejectionReason } = data

  let subject = ''
  let content = ''

  switch (type) {
    case 'confirmed':
      subject = `Afspraak bevestigd - ${appointment.referenceNumber}`
      content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6B7F54; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Afspraak Bevestigd</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p>Beste ${appointment.fullName},</p>
            <p>Goed nieuws! Uw afspraak is bevestigd.</p>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6B7F54; margin-top: 0;">Afspraakdetails</h3>
              <p><strong>Referentie:</strong> ${appointment.referenceNumber}</p>
              <p><strong>Datum:</strong> ${formatDate(appointment.appointmentDate)}</p>
              <p><strong>Tijd:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Locatie:</strong> ${appointment.gemeente}</p>
            </div>

            <p>We kijken ernaar uit om u te ontmoeten en uw project te bespreken.</p>

            <p style="margin-top: 30px;">Met vriendelijke groeten,<br><strong>NAM Construction</strong></p>
          </div>
        </div>
      `
      break

    case 'rejected':
      subject = `Afspraak geannuleerd - ${appointment.referenceNumber}`
      content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Afspraak Geannuleerd</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p>Beste ${appointment.fullName},</p>
            <p>Helaas kunnen wij uw afspraak niet laten doorgaan.</p>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">Reden</h3>
              <p>${rejectionReason}</p>
            </div>

            <p>Neem gerust contact met ons op om een nieuwe afspraak te maken:</p>
            <p>📞 +32 493 81 27 89<br>📧 info@namconstruction.be</p>

            <p style="margin-top: 30px;">Met vriendelijke groeten,<br><strong>NAM Construction</strong></p>
          </div>
        </div>
      `
      break

    case 'rescheduled':
      subject = `Nieuw tijdstip voorgesteld - ${appointment.referenceNumber}`
      content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f59e0b; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nieuw Tijdstip Voorgesteld</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p>Beste ${appointment.fullName},</p>
            <p>Helaas is het door u gekozen tijdstip niet beschikbaar. We stellen graag een alternatief voor:</p>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #f59e0b; margin-top: 0;">Voorgesteld tijdstip</h3>
              <p><strong>Datum:</strong> ${proposedDate ? formatDate(proposedDate) : '-'}</p>
              <p><strong>Tijd:</strong> ${proposedTime || '-'}</p>
            </div>

            <p>Past dit tijdstip u? Neem contact met ons op om te bevestigen of een ander tijdstip te bespreken:</p>
            <p>📞 +32 493 81 27 89<br>📧 info@namconstruction.be</p>

            <p style="margin-top: 30px;">Met vriendelijke groeten,<br><strong>NAM Construction</strong></p>
          </div>
        </div>
      `
      break
  }

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: appointment.email,
      subject,
      html: content
    })
    console.log(`Status email sent to ${appointment.email}`)
  } catch (error) {
    console.error('Error sending status email:', error)
    throw error
  }
}

// ============================================================================
// WHATSAPP NOTIFICATIONS (via Twilio)
// ============================================================================

async function sendTwilioWhatsApp(to: string, message: string): Promise<void> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.log('Twilio not configured, skipping WhatsApp notification')
    return
  }

  // Format phone number for WhatsApp
  let formattedTo = to.replace(/\s/g, '')
  if (formattedTo.startsWith('0')) {
    formattedTo = '+32' + formattedTo.slice(1)
  }
  if (!formattedTo.startsWith('+')) {
    formattedTo = '+' + formattedTo
  }

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`

  try {
    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        From: TWILIO_WHATSAPP_NUMBER,
        To: `whatsapp:${formattedTo}`,
        Body: message
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Twilio API error:', errorData)
      throw new Error(`Twilio API error: ${response.status}`)
    }

    console.log(`WhatsApp sent to ${formattedTo}`)
  } catch (error) {
    console.error('Error sending WhatsApp:', error)
    throw error
  }
}

export async function sendWhatsAppNotification(data: WhatsAppData): Promise<void> {
  const { to, type, appointment, proposedDate, proposedTime, message: customMessage } = data

  let message = ''

  if (customMessage) {
    message = customMessage
  } else if (appointment) {
    switch (type) {
      case 'confirmed':
        message = `✅ *Afspraak Bevestigd*

Beste ${appointment.fullName},

Uw afspraak is bevestigd!

📅 ${formatDate(appointment.appointmentDate)}
🕐 ${appointment.appointmentTime}
📍 ${appointment.gemeente}

Referentie: ${appointment.referenceNumber}

Tot dan!
NAM Construction`
        break

      case 'rejected':
        message = `❌ *Afspraak Geannuleerd*

Beste ${appointment.fullName},

Helaas kunnen wij uw afspraak niet laten doorgaan.

Neem contact met ons op voor een nieuwe afspraak:
📞 +32 493 81 27 89

NAM Construction`
        break

      case 'rescheduled':
        message = `📅 *Nieuw Tijdstip Voorgesteld*

Beste ${appointment.fullName},

We stellen een nieuw tijdstip voor:

📅 ${proposedDate ? formatDate(proposedDate) : '-'}
🕐 ${proposedTime || '-'}

Past dit u? Laat het ons weten!
📞 +32 493 81 27 89

NAM Construction`
        break

      case 'new_appointment':
        message = `🆕 *Nieuwe Afspraak*

${appointment.fullName} heeft een afspraak aangevraagd.

📅 ${formatDate(appointment.appointmentDate)}
🕐 ${appointment.appointmentTime}
📍 ${appointment.gemeente}
📞 ${appointment.phone}

Ref: ${appointment.referenceNumber}`
        break
    }
  }

  if (message) {
    await sendTwilioWhatsApp(to, message)
  }
}

// ============================================================================
// ADMIN NOTIFICATIONS
// ============================================================================

export async function notifyAdminNewAppointment(appointment: Appointment): Promise<void> {
  // Send email to admin
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nieuwe afspraak: ${appointment.referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6B7F54; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nieuwe Afspraak</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Afspraakdetails</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Referentie:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.referenceNumber}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Naam:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.fullName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Telefoon:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Gemeente:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.gemeente}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Datum:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${formatDate(appointment.appointmentDate)}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Tijd:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${appointment.appointmentTime}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Project:</strong></td><td style="padding: 8px 0;">${appointment.projectType || '-'}</td></tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://nambv.vercel.app/admin" style="display: inline-block; padding: 12px 24px; background-color: #6B7F54; color: white; text-decoration: none; border-radius: 4px;">Bekijk in Admin</a>
            </div>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending admin email notification:', error)
  }

  // Send WhatsApp to admin
  try {
    await sendWhatsAppNotification({
      to: ADMIN_PHONE,
      type: 'new_appointment',
      appointment
    })
  } catch (error) {
    console.error('Error sending admin WhatsApp notification:', error)
  }
}

export async function notifyAdminNewQuote(quote: {
  referenceNumber: string
  fullName: string
  email: string
  phone: string
  postalCode: string
  services: string[]
}): Promise<void> {
  // Send email to admin
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nieuwe offerte: ${quote.referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6B7F54; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nieuwe Offerteaanvraag</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Referentie:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${quote.referenceNumber}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Naam:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${quote.fullName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${quote.email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Telefoon:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${quote.phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Postcode:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${quote.postalCode}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Diensten:</strong></td><td style="padding: 8px 0;">${quote.services.join(', ')}</td></tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://nambv.vercel.app/admin" style="display: inline-block; padding: 12px 24px; background-color: #6B7F54; color: white; text-decoration: none; border-radius: 4px;">Bekijk in Admin</a>
            </div>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending admin email notification:', error)
  }

  // Send WhatsApp to admin
  try {
    const message = `🆕 *Nieuwe Offerteaanvraag*

${quote.fullName} vraagt een offerte aan.

📍 ${quote.postalCode}
📞 ${quote.phone}
🔧 ${quote.services.join(', ')}

Ref: ${quote.referenceNumber}`

    await sendTwilioWhatsApp(ADMIN_PHONE, message)
  } catch (error) {
    console.error('Error sending admin WhatsApp notification:', error)
  }
}

// Send confirmation to user when appointment is created
export async function sendUserAppointmentConfirmation(appointment: Appointment): Promise<void> {
  // Send email
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: appointment.email,
      subject: `Afspraak aangevraagd - ${appointment.referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6B7F54; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Afspraak Aangevraagd</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p>Beste ${appointment.fullName},</p>
            <p>Bedankt voor uw afspraakaanvraag. We hebben deze ontvangen en zullen deze zo snel mogelijk bevestigen.</p>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6B7F54; margin-top: 0;">Aangevraagde afspraak</h3>
              <p><strong>Referentie:</strong> ${appointment.referenceNumber}</p>
              <p><strong>Datum:</strong> ${formatDate(appointment.appointmentDate)}</p>
              <p><strong>Tijd:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Status:</strong> In afwachting van bevestiging</p>
            </div>

            <p>U ontvangt een bevestiging zodra we uw afspraak hebben goedgekeurd.</p>

            <p style="margin-top: 30px;">Met vriendelijke groeten,<br><strong>NAM Construction</strong></p>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Error sending user email:', error)
  }

  // Send WhatsApp
  try {
    const message = `📅 *Afspraak Aangevraagd*

Beste ${appointment.fullName},

We hebben uw afspraakaanvraag ontvangen:

📅 ${formatDate(appointment.appointmentDate)}
🕐 ${appointment.appointmentTime}

Referentie: ${appointment.referenceNumber}

U ontvangt bericht zodra we uw afspraak hebben bevestigd.

NAM Construction`

    await sendTwilioWhatsApp(appointment.phone, message)
  } catch (error) {
    console.error('Error sending user WhatsApp:', error)
  }
}
