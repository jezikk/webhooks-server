import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.json(),
  exitOnError: false,
  transports: [
    new transports.File({
      filename: './logs/composed.logs',
      handleExceptions: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      handleExceptions: true,
    })
  );
}
