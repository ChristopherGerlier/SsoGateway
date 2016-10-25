/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import jwt from 'jwt-simple';

import { POST_HTTP_STATUS } from '../httpCodes.js';
import * as config from '../config.js';

function validate(username, password) {
  let dbUserObj = null;

  if (username === 'John' && password === 'John') {
    dbUserObj = { // spoofing a userobject from the DB§
      name: 'John',
      email: 'John@crfhealth.com',
    };
  }

  return dbUserObj;
}

export function validateUser(username) {
  let dbUserObj = null;

  if (username === 'John') {
    dbUserObj = { // spoofing a userobject from the DB§
      name: 'John',
      email: 'John@crfhealth.com',
    };
  }

  return dbUserObj;
}
function expiresIn(numDays) {
  const dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

function generateToken(user) {
  const expires = expiresIn(7); // 7 days
  const token = jwt.encode({
    exp: expires,
  }, config.jwtSecret);

  return {
    token,
    expires,
    user,
  };
}

/**
 * authenticate the user
 */
export function authenticate(request, response) { // typical middleware signature
  const email = request.body.email;
  const password = request.body.password;

  if (!email || !password) {
    response.status(POST_HTTP_STATUS.SERVICE_UNAUTHORIZED);
    response.json({
      success: false,
      status: POST_HTTP_STATUS.SERVICE_UNAUTHORIZED,
      message: 'Invalid credentials',
    });
    return;
  }

  // Fire a query to the DB and check if the credentials are valid
  const dbUserObj = validate(email, password);

  if (!dbUserObj) { // If authentication fails, we send a 401 back
    response.status(POST_HTTP_STATUS.SERVICE_UNAUTHORIZED);
    response.json({
      success: false,
      status: POST_HTTP_STATUS.SERVICE_UNAUTHORIZED,
      message: 'Invalid credentials',
    });
    return;
  }

  if (dbUserObj) {
    // If authentication is success, we will generate a token
    // and dispatch it to the client
    response.json(generateToken(dbUserObj));
  }
}
