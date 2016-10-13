/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import * as model from '../model/users.js';

/**
 * Retreives all the users
 * NO next needed as it is the last middleware called.
 */
export function getAllUsers(request, response, next) { // typical middleware signature
  model.getAllUsers((error, data) => { // anonymous callback coming from the callee
    if (error) {
      return next(error);
    }

    // Makes since of the json and turns it into a string
    // The body-parser.json() only handles incoming requests and does not help here.
    response.status(200).json(data);
  });
}

/**
 * Retreives all the users
 * NO next needed as it is the last middleware called.
 */
export function getUser(request, response, next) { // typical middleware signature
  const uid = parseInt(request.params.uid, 10);

  model.getUser(uid, (error, data) => { // anonymous callback coming from the callee
    if (error) {
      return next(error);
    }
    response.status(200).json(data);
  });
}

/**
 * Retreives all the services for a given user
 */
export function getServicesForUser(request, response, next) { // typical middleware signature
  const uid = parseInt(request.params.uid, 10);

  model.getServicesForUser(uid, (error, data) => { // anonymous callback coming from the callee
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
