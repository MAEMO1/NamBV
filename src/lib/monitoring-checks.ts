export const LEAD_WINDOW_MINUTES = 15;
export const AUTH_WINDOW_MINUTES = 15;
export const MAX_FAILED_SUBMISSIONS_PER_WINDOW = 5;
export const MAX_RATE_LIMITED_SUBMISSIONS_PER_WINDOW = 3;
export const MAX_LOGIN_FAILURES_PER_WINDOW = 10;
export const MAX_LOGIN_FAILURES_PER_PRINCIPAL = 5;

type LeadKind = 'quote' | 'appointment';

export function analyzeLeadIntegrity(input: {
  acceptedByKind: Record<LeadKind, number>;
  submittedEventsByKind: Record<LeadKind, number>;
  failedByReason: Record<LeadKind, Record<string, number>>;
}) {
  const anomalies: string[] = [];

  for (const kind of ['quote', 'appointment'] as const) {
    const accepted = input.acceptedByKind[kind] ?? 0;
    const submittedEvents = input.submittedEventsByKind[kind] ?? 0;
    const failedReasons = input.failedByReason[kind] ?? {};
    const failedCount = Object.entries(failedReasons)
      .filter(([reason]) => reason !== 'accepted')
      .reduce((total, [, count]) => total + count, 0);
    const rateLimited = failedReasons.rate_limited ?? 0;

    if (accepted > submittedEvents) {
      anomalies.push(`${kind}: ${accepted - submittedEvents} accepted submissions are missing lead events.`);
    }

    if (failedCount >= MAX_FAILED_SUBMISSIONS_PER_WINDOW) {
      anomalies.push(`${kind}: ${failedCount} failed submissions in the last ${LEAD_WINDOW_MINUTES} minutes.`);
    }

    if (rateLimited >= MAX_RATE_LIMITED_SUBMISSIONS_PER_WINDOW) {
      anomalies.push(`${kind}: rate limiting triggered ${rateLimited} times in the last ${LEAD_WINDOW_MINUTES} minutes.`);
    }
  }

  return anomalies;
}

export function analyzeAuthAnomalies(input: {
  totalFailures: number;
  failuresByEmail: Record<string, number>;
  failuresByIp: Record<string, number>;
}) {
  const anomalies: string[] = [];

  if (input.totalFailures >= MAX_LOGIN_FAILURES_PER_WINDOW) {
    anomalies.push(`login: ${input.totalFailures} failed logins in the last ${AUTH_WINDOW_MINUTES} minutes.`);
  }

  for (const [email, count] of Object.entries(input.failuresByEmail)) {
    if (count >= MAX_LOGIN_FAILURES_PER_PRINCIPAL) {
      anomalies.push(`login: ${email} failed ${count} times and is likely locked out.`);
    }
  }

  for (const [ipAddress, count] of Object.entries(input.failuresByIp)) {
    if (count >= MAX_LOGIN_FAILURES_PER_PRINCIPAL) {
      anomalies.push(`login: IP ${ipAddress} failed ${count} times in the last ${AUTH_WINDOW_MINUTES} minutes.`);
    }
  }

  return anomalies;
}
