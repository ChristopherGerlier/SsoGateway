import * as model from '../model/groups.js';
import httpStatusCodes from '../constants/httpStatusCodes.js';

/**
 * Retreives all the services for a given account
 */
export function getServicesForGroup(request, response, next) { // typical middleware signature
  model.getServicesForGroup(request.params.groupname, (error, data) => { // anonymous callback coming from the callee
    if (error) {
      // When you pass an Error() to next, Express.js will not jump to
      // the next route or middleware, but will instead jump to processng what is
      // know as error middleware
      return next(error);
    }
    // Makes since of the json and turns it into a string
    // The body-parser.json() only handles incoming requests and does not help here.
    response.status(httpStatusCodes.OK).json(data);
  });
}
