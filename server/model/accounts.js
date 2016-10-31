/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
/* eslint-disable max-len*/
import {
  db,
} from '../util/databaseHelper.js';

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
export function getAccount(id, callback) {
  db.one('SELECT * FROM accounts WHERE id = $1', id)
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      error.status = 405;
      callback(error, null);
    });
}
