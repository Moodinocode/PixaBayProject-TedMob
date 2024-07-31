import expressWinston from 'express-winston'
import { transports,format, createLogger } from 'winston';
//import PostgresTransport from 'winston-pg-native';
import pool from '../config/db.js'



const logger = createLogger({
  transports: [
    new transports.Console(),
    // PostgresTransport({
    //   pool,
    //   tableName: 'logs',
    //   formatLog: (log) => ({
    //     level: log.level,
    //     message: log.message,
    //     meta: log.meta,
    //     timestamp: log.timestamp,
    //     user_id: log.meta.user_id
    //   })
    // })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels: true
});

export default logger;