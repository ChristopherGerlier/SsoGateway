import axios from 'axios';

/**
  Sends auth request to backend using user's credentials provided
  Uses successCallback and failCallback to notify caller about the results
*/
export default function authenticate(userCredentials, successCallback, failCallBack) {
//  console.log('posting to http://localhost:7000/api/v1/authenticate');
  axios.post('/api/v1/authenticate', {
    username: userCredentials.username,
    email: userCredentials.email,
    password: userCredentials.password,
  })
  .then((response) => {
    successCallback(response);
  })
  .catch((err) => {
    failCallBack(err);
  });
}

