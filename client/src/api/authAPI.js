/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import axios from 'axios';

/**
  Sends auth request to backend using user's credentials provided
  Uses successCallback and failCallback to notify caller about the results
*/
export default function authenticate(userCredentials, successCallback) {
  axios.post('http://192.168.99.100:49160/api/v1/authenticate', {
    username: userCredentials.username,
    email: userCredentials.email,
    password: userCredentials.password,
  })
  .then((response) => {
    successCallback(response);
  })
  .catch((err) => {
    console.log(err);
  });
}

