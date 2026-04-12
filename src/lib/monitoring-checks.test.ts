import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeAuthAnomalies, analyzeLeadIntegrity } from './monitoring-checks';

test('analyzeLeadIntegrity flags missing lead events and noisy rate limiting', () => {
  const anomalies = analyzeLeadIntegrity({
    acceptedByKind: { quote: 3, appointment: 0 },
    submittedEventsByKind: { quote: 1, appointment: 0 },
    failedByReason: {
      quote: { rate_limited: 4, validation_failed: 2 },
      appointment: {},
    },
  });

  assert.equal(anomalies.length, 3);
  assert.match(anomalies.join('\n'), /missing lead events/);
  assert.match(anomalies.join('\n'), /failed submissions/);
  assert.match(anomalies.join('\n'), /rate limiting/);
});

test('analyzeAuthAnomalies flags spikes and per-principal lockout patterns', () => {
  const anomalies = analyzeAuthAnomalies({
    totalFailures: 11,
    failuresByEmail: {
      'admin@namconstruction.be': 5,
    },
    failuresByIp: {
      '127.0.0.1': 6,
    },
  });

  assert.equal(anomalies.length, 3);
  assert.match(anomalies.join('\n'), /failed logins/);
  assert.match(anomalies.join('\n'), /locked out/);
  assert.match(anomalies.join('\n'), /IP 127\.0\.0\.1/);
});
