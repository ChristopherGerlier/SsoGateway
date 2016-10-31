import jwt from 'jsonwebtoken';

import * as config from '../config.js';
import * as texts from '../constants/applicationTexts.js';
import httpStatusCodes from '../constants/httpStatusCodes.js';

function validate(email, password) {
  let accountInfo = null;

  if (email === 'John@crfhealth.com' && password === 'John') {
    accountInfo = { // spoofing a userobject from the DB§
      email: 'John@crfhealth.com',
      role: 'CS',
      services: [
        { name: 'Localization Tool' },
        { name: 'PRS' },
        { name: 'Reports' },
      ],
    };
  }

  return accountInfo;
}

function validateEmail(email) {
  let accountInfo = null;

  if (email === 'John@crfhealth.com') {
    accountInfo = { // spoofing a userobject from the DB§
      email: 'John@crfhealth.com',
      role: 'CS',
      services: [
        { name: 'Localization Tool' },
        { name: 'PRS' },
        { name: 'Reports' },
      ],
    };
  }
  return accountInfo;
}

/**
 * authenticate the user
 */
export function authenticate(request, response) { // typical middleware signature
  const email = request.body.email;
  const password = request.body.password;

  if (!email || !password) {
    response
      .status(httpStatusCodes.SERVICE_UNAUTHORIZED)
      .json(texts.CREDENTIALS_REQUIRED);
    return;
  }

  // Fire a query to the DB and check if the credentials are valid
  const payload = validate(email, password);

  if (!payload) { // If authentication fails, we send a 401 back
    response
      .status(httpStatusCodes.SERVICE_UNAUTHORIZED)
      .json(texts.CREDENTIALS_INVALID);
    return;
  }
  else {
    // If authentication is success, we will generate a token
    // and dispatch it to the client
    response.status(httpStatusCodes.CREATED);
    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: config.sessionTimeout });
    response.setHeader('token', token);
    response.json({ success: true, msg: 'Successful created token.' });
  }
}

export function authorize(request, response, next) {
  if (request.url === '/authenticate') {
    return next(); // skip for auth request
  }

  const token = request.header.token;
  console.log("header");
  console.log(request);
  if (!token) {
    console.log('invalid header');
    response
      .status(httpStatusCodes.SERVICE_FORBIDDEN)
      .json(texts.JWT_NOT_VALID);
    return;
  }

  // token's verification: decrypt the token and check it's expire date
  jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
    if (err) {
       console.log('Error...');
       console.log(err);

      // verify throws 2 types of error only
      if (err.name === 'TokenExpiredError') {
        response
          .status(httpStatusCodes.HTTP_STATUS_SERVICE_FORBIDDEN)
          .json(texts.JWT_EXPIRED);
        return;
      } else {
        response
          .status(httpStatusCodes.HTTP_STATUS_SERVICE_FORBIDDEN)
          .json(texts.JWT_MALFORMED);
        return;
      }
    }

    console.log(decoded);

    // Authorized. Proceed
    next();
  });
}
