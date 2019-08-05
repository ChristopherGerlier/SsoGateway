/* eslint-disable max-len*/
import {
  db,
} from '../util/databaseHelper.js';

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
