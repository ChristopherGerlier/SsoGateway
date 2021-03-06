import promise from 'bluebird';
import pgpromise from 'pg-promise';
import path from 'path';
import config from 'config';

const pgp = pgpromise({
  promiseLib: promise,
});
const databaseUrl = process.env.DATABASE_URL || config.databaseURL;

const db = pgp(databaseUrl);

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
