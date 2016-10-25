/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import * as model from '../model/accounts.js';

/**
 * Retreives all the accounts
 * NO next needed as it is the last middleware called.
 */
export function getAllAccounts(request, response) { // typical middleware signature
  model.getAllAccounts((data) => { // anonymous callback coming from the callee
    // Makes since of the json and turns it into a string
    // The body-parser.json() only handles incoming requests and does not help here.
    response.status(200).json(data);
  });
}

/**
 * Retreive a specific account
 */
export function getAccount(request, response, next) { // typical middleware signature
  const uid = parseInt(request.params.uid, 10);

  model.getAccount(uid, (error, data) => { // anonymous callback coming from the callee
    if (error) {
      return next(error);
    }
    response.status(200).json(data);
  });
}

/**
 * Retreives all the services for a given account
 */
export function getServicesForAccount(request, response, next) { // typical middleware signature
  const uid = parseInt(request.params.uid, 10);

  model.getServicesForAccount(uid, (error, data) => { // anonymous callback coming from the callee
    if (error) {
      // When you pass an Error() to next, Express.js will not jump to
      // the next route or middleware, but will instead jump to processng what is
      // know as error middleware
      return next(error);
    }
    // Makes since of the json and turns it into a string
    // The body-parser.json() only handles incoming requests and does not help here.
    response.status(200).json(data);
  });
}
