import  pg  from 'pg'
//import dontev from 'dontev';
//dontev.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT
})

// pool.connect((err, client, release) => {
//   if (err) {
//       return console.error('Error acquiring client', err.stack);
//   }
//   client.query('SELECT NOW()', (err, result) => {
//       release();
//       if (err) {
//           return console.error('Error executing query', err.stack);
//       }
//       console.log(result.rows);
//   });
// });



export default pool;