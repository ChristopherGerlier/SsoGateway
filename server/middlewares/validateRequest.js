import jwt from 'jwt-simple';
import { validateUser } from '../controllers/auth.js';
import * as config from '../config.js';

function validateRequest(request, response, next) {
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.
  // We skip the token outh for [OPTIONS] requests.
  // if(req.method == 'OPTIONS') next();
  const token =
    (request.body && request.body.access_token) ||
    (request.query && request.query.access_token) ||
    request.headers['x-access-token'];

  const key =
    (request.body && request.body.x_key) ||
    (request.query && request.query.x_key) ||
    request.headers['x-key'];

  if (token || key) {
    try {
      const decoded = jwt.decode(token, config.jwtSecret);
      if (decoded.exp <= Date.now()) {
        response.status(400);
        response.json({
          status: 400,
          message: 'Token Expired',
        });
        return;
      }

      // Authorize the user to see if s/he can access our resources
      const dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) {
        if ((request.url.indexOf('admin') >= 0 && dbUser.role === 'admin') ||
            (request.url.indexOf('admin') < 0 && request.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          response.status(403);
          response.json({
            status: 403,
            message: 'Not Authorized',
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        response.status(401);
        response.json({
          status: 401,
          message: 'Invalid User',
        });
        return;
      }
    } catch (error) {
      response.status(500);
      response.json({
        status: 500,
        message: 'Oops something went wrong',
        error,
      });
    }
  } else {
    response.status(401);
    response.json({
      status: 401,
      message: 'Invalid Token or Key',
    });
    return;
  }
}

export default validateRequest;
