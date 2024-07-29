import expressWinston from 'express-winston'
import { transports,format } from 'winston';
import PostgresTransport from 'winston-pg-native'
import pool from '../config/db'



const logger = expressWinston.logger({
  transports: [
    new transports.Console(),
    PostgresTransport({
      pool,
      tableName: 'logs',
      formatLog: (log) => ({
        level: log.level,
        message: log.message,
        meta: log.meta,
        timestamp: log.timestamp,
        user_id: log.meta.user_id
      })
    })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels: true
});

export default logger;