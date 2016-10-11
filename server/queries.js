/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import promise from 'bluebird';
import pgpromise from 'pg-promise';

const pgp = pgpromise({ promiseLib: promise });
const db = pgp('postgres://postgres@db/sso_gateway');

// add query functions
export default function getAllServices(request, response, next) {
  console.log('Retrieving all services');
  db.any('select * from services')
    .then(data => {
      response.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ALL services',
        });
    })
    .catch(error => next(error));
}
