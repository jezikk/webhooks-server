import { maxHeaderSize } from 'http';
import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: './logs/composed.log',
      format: format.combine(format.timestamp(), customFormat),
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
