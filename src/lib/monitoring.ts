import * as Sentry from '@sentry/nextjs';

type MonitoringContext = {
  action: string;
  route?: string;
  tags?: Record<string, string | number | boolean | null | undefined>;
  extra?: Record<string, unknown>;
};

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
}

export function captureRouteException(error: unknown, context: MonitoringContext) {
  const normalized = normalizeError(error);

  Sentry.withScope((scope) => {
    scope.setTag('surface', 'route-handler');
    scope.setTag('action', context.action);

    if (context.route) {
      scope.setTag('route', context.route);
    }

    for (const [key, value] of Object.entries(context.tags ?? {})) {
      if (value !== null && value !== undefined) {
        scope.setTag(key, String(value));
      }
    }

    for (const [key, value] of Object.entries(context.extra ?? {})) {
      scope.setExtra(key, value);
    }

    Sentry.captureException(normalized);
  });
}

export function captureOperationalMessage(message: string, context: Omit<MonitoringContext, 'action'> = {}) {
  Sentry.withScope((scope) => {
    scope.setLevel('warning');
    scope.setTag('surface', 'operations');

    if (context.route) {
      scope.setTag('route', context.route);
    }

    for (const [key, value] of Object.entries(context.tags ?? {})) {
      if (value !== null && value !== undefined) {
        scope.setTag(key, String(value));
      }
    }

    for (const [key, value] of Object.entries(context.extra ?? {})) {
      scope.setExtra(key, value);
    }

    Sentry.captureMessage(message, 'warning');
  });
}
