/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
/* eslint-disable max-len*/

import promise from 'bluebird';
import pgpromise from 'pg-promise';

const pgp = pgpromise({
  promiseLib: promise,
});

const db = pgp(process.env.DATABASE_URL);

/**
 * Retrieve all accounts from the system
 */
export function getAllAccounts(callback) {
  db.any('SELECT * FROM accounts')
    .then(data => {
      callback(data);
    });
}

/**
 * Get a user with a specific accountId
 */
export function getAccount(userId, callback) {
  db.one('SELECT * FROM accounts WHERE id = $1', userId)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}

/**
 * Get all services for a specific accountId
 */
export function getServicesForAccount(accountId, callback) {
  db.any('SELECT s.name FROM access_rights a INNER JOIN services s ON s.id = a.service_id WHERE a.account_id = $1', accountId)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}
