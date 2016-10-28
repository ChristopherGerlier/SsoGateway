/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import * as model from '../model/accounts.js';
import httpStatusCodes from '../constants/httpStatusCodes.js';

/**
 * Retreives all the accounts
 * NO next needed as it is the last middleware called.
 */
export function getAllAccounts(request, response) { // typical middleware signature
  model.getAllAccounts((data) => { // anonymous callback coming from the callee
    // Makes since of the json and turns it into a string
    // The body-parser.json() only handles incoming requests and does not help here.
    response.status(httpStatusCodes.OK).json(data);
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
    response.status(httpStatusCodes.OK).json(data);
  });
}
