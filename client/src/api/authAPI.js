/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import axios from 'axios';

/**
  Sends auth request to backend using user's credentials provided
  Uses successCallback and failCallback to notify caller about the results
*/
export default function authenticate(userCredentials, successCallback) {
  console.log(`authenticating ${userCredentials.username}`);
  axios.get('localhost:7000/api/users/1')
   .then((response) => {
     successCallback(response);
   });
  //  .catch((err) => {
  //    failCallback(err);
  //  });
}

