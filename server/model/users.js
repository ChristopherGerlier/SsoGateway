/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
/* eslint-disable max-len*/

import promise from 'bluebird';
import pgpromise from 'pg-promise';

const pgp = pgpromise({
  promiseLib: promise,
});
const db = pgp(process.env.DATABASE_URL);

/**
 * Retrieve all users from the system 
 */
export function getAllUsers(callback) {
  db.any('SELECT * FROM users')
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      callback(error, null);
    });
}

/**
 * Get a user with a specific userId 
 */
export function getUser(userId, callback) {
  db.one('SELECT * FROM users WHERE id = $1', userId)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}

/**
 * Get all services for a specific userId 
 */
export function getServicesForUser(userId, callback) {
  db.any('SELECT s.service FROM access_rights a INNER JOIN services s ON s.id = a.service_id WHERE a.user_id = $1', userId)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}
