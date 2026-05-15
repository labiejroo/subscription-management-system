type LogLevel = 'info' | 'warn' | 'error';

interface LogEvent {
  event: string;
  level: LogLevel;
  timestamp: string;
  data?: Record<string, unknown>;
}

const log = (level: LogLevel, event: string, data?: Record<string, unknown>): void => {
  const entry: LogEvent = { event, level, timestamp: new Date().toISOString(), data };
  if (level === 'error') {
    console.error(entry);
  } else {
    console.info(entry);
  }
  // swap for: mixpanel.track(event, data) or CloudWatch PutLogEvents
};

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => log('info', event, data),
  warn: (event: string, data?: Record<string, unknown>) => log('warn', event, data),
  error: (event: string, data?: Record<string, unknown>) => log('error', event, data),
};
