import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  resendClient ||= new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function sendOperationalAlert(input: {
  subject: string;
  lines: string[];
}) {
  const to = process.env.ADMIN_EMAIL;

  if (!to) {
    throw new Error('ADMIN_EMAIL is not configured');
  }

  const from = process.env.FROM_EMAIL || 'Nam Construction <noreply@namconstruction.be>';
  const html = input.lines.map((line) => `<p>${line}</p>`).join('');

  await getResendClient().emails.send({
    from,
    to,
    subject: `[Ops] ${input.subject}`,
    text: input.lines.join('\n'),
    html,
  });
}
