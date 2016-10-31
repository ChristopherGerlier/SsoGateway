/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import promise from 'bluebird';
import pgpromise from 'pg-promise';
import path from 'path';

const pgp = pgpromise({
  promiseLib: promise,
});
const db = pgp(process.env.DATABASE_URL);

// Helper for linking to external query files:
function runSql(file, done) {
  const fullPath = path.join(__dirname, file);
  const sqlFinder = new pgp.QueryFile(fullPath, { minify: true });
  db.any(sqlFinder)
    .then(() => {
      done();
    })
    .error(error => {
      console.log(error);
    });
}

export { db, runSql };
