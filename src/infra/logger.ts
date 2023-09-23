import winston, { format } from 'winston';

const customFormat = format.printf((params) => {
  const { level, message, label, timestamp } = params;

  if (label) return `${timestamp} [${label.toUpperCase()}] ${level}: ${message}`;

  return `${timestamp} ${level}: ${message}`;
});

export const winstonFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  customFormat,
);

const logger = winston.createLogger({
  format: winstonFormat,
  transports: [ new winston.transports.Console() ],
});

export default logger;
