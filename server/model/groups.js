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
export function getAllServices(callback) {
  db.any('SELECT * FROM services')
    .then(data => {
      callback(data);
    });
}

/**
 * Get all services for a specific accountId
 */
export function getServicesForGroup(groupName, callback) {

  db.any('SELECT p.service_name FROM permissions p INNER JOIN services s ON s.name = p.service_name WHERE p.group_name = $1', groupName)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}
