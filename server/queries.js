/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
// import promise from 'bluebird';
// import pgpromise from 'pg-promise';

// const pgp = pgpromise({ promiseLib: promise });
// const db = pgp(process.env.DATABASE_URL);

// // add query functions
// export default function getAllServices(request, response, next) {
//   console.log('Retrieving all services');
//   db.any('select * from services')
//     .then(data => {
//       response.status(200)
//         .json({
//           status: 'success',
//           data,
//           message: 'Retrieved ALL services',
//         });
//     })
//     .catch(error => {
//       console.log('could not retreive asll services');
//       next(error);
//     });
// }
import pg from 'pg';

const results = [];

export default function getAllServices(request, response) {
  console.log(`Connecting to ${process.env.DATABASE_URL}`);

  const connectionString = process.env.DATABASE_URL || 'postgres://postgres@db/postgres';

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return response.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM services;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return response.json(results);
    });
  });
}
