/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import promise from 'bluebird';
import pgpromise from 'pg-promise';
import jwt from 'jsonwebtoken';

import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path'; 

import server from '../../server';
import httpStatusCode from '../../constants/httpStatusCodes';
import * as config from '../../config.js';
import * as accounts from '../../model/accounts.js';

const pgp = pgpromise({
  promiseLib: promise,
});
const db = pgp(process.env.DATABASE_URL);

const should = chai.should();
chai.use(chaiHttp);

// Helper for linking to external query files: 
function runSql(file, done) {
  const fullPath = path.join(__dirname, file); // generating full path;
  const sqlFinder = new pgp.QueryFile(fullPath, {minify: true});
  db.any(sqlFinder)
    .then(() => {
      done();
    })
    .error(error => {
      console.log(error);
    });
}

describe('GET /api/v1/accounts/', () => {
  before((done) => {
    runSql('../scripts/restRouterSetup.sql', done); 
  });

  after((done) => {
    runSql('../scripts/restRouterTeardown.sql', done); 
  });

  it('should return all accounts', done => {
    chai.request(server)
      .get('/api/v1/accounts/')
      .end((error, response) => {
        response.should.have.status(httpStatusCode.BAD_REQUEST);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('username');
        response.body[0].username.should.equal('John');
        response.body[0].should.have.property('email');
        response.body[0].email.should.equal('John@crfhealth.com');
        response.body[0].should.have.property('password');
        response.body[0].password.should.equal('John');
        response.body[0].should.have.property('group_name');
        response.body[0]['group_name'].should.equal('PSM');
        done();
      });
   });
});

describe('GET /api/v1/accounts/:uid', () => {
  before((done) => {
    runSql('../scripts/restRouterSetup.sql', done); 
  });

  after((done) => {
    runSql('../scripts/restRouterTeardown.sql', done); 
  });

  it('should return a single account', done => {
    accounts.getAllAccounts((data) => {
      const account = data.find((item) => {
        return item.email === 'Rob@crfhealth.com';
      });

      chai.request(server)
      .get('/api/v1/accounts/' + account.id)
      .end((error, response) => {
        response.should.have.status(httpStatusCode.OK);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('username');
        response.body.username.should.equal('Rob');
        response.body.should.have.property('password');
        response.body.password.should.equal('Rob');
        response.body.should.have.property('email');
        response.body.email.should.equal('Rob@crfhealth.com');
        response.body.should.have.property('group_name');
        response.body['group_name'].should.equal('CS');
        done();
      });
    });
  });

  it('should return error code 405 for an unknown account', done => {
    chai.request(server)
      .get('/api/v1/accounts/56262626')
      .end((error, response) => {
        response.should.have.status(405);
        done();
      });
  });
});

describe('GET /api/v1/groups/:groupname/services', () => {
  before((done) => {
    runSql('../scripts/restRouterSetup.sql', done); 
  });

  after((done) => {
    runSql('../scripts/restRouterTeardown.sql', done); 
  });

  it('should return a list of services for a given account', done => {
    accounts.getAllAccounts((data) => {
      const account = data.find((item) => {
        return item.email === 'Rob@crfhealth.com';
      });
      
      chai.request(server)
         .get('/api/v1/groups/'+ account['group_name'] +'/services')
         .end((error, response) => {
           response.should.have.status(httpStatusCode.OK);
           response.should.be.json;
           response.body.should.be.a('array');
           response.body.length.should.equal(2);
           response.body[0].should.have.property('service_name');
           response.body[0]['service_name'].should.equal('Reports');
           response.body[1].should.have.property('service_name');
           response.body[1]['service_name'].should.equal('Localization Tool');
           done();
         });
    });
  });

  it('should return error code 200 for an unexisting account with an invalid id account', done => {
    chai.request(server)
      .get('/api/v1/groups/5/services')
       .end((error, response) => {
         response.should.have.status(httpStatusCode.OK);
         done();
       });
  });
});

describe('GET /api/v1/unknown/', () => {
  it('should return an error code 404 if the api route does not exist', done => {
    chai.request(server)
      .get('/api/v1/unknown/')
       .end((error, response) => {
         response.should.have.status(httpStatusCode.NOT_FOUND);
         done();
       });
  });
});

describe('POST /api/v1/authenticate/', () => {
  it('should return a token after authentication', done => {
    chai.request(server)
      .post('/api/v1/authenticate/')
      .send({
        email: 'John@crfhealth.com',
        password: 'John',
      })
      .end((error, response) => {
        response.should.have.status(httpStatusCode.CREATED);
        response.should.be.json;
        response.header.should.be.a('object');
        response.header.should.have.property('token');

        const payload = jwt.verify(response.header.token, config.jwtSecretKey);
        payload.should.be.a('object');
        payload.should.have.property('email');
        payload.email.should.equal('John@crfhealth.com');
        payload.should.have.property('role');
        payload.role.should.equal('CS');
        payload.should.have.property('services');
        payload.services.should.be.a('array');
        payload.services.length.should.equal(3);
        done();
      });
  });

  it('should return error code 401 if the credentials are not recognized', done => {
    chai.request(server)
      .post('/api/v1/authenticate/')
      .send({
        email: 'John@crfhealth.com',
        password: 'Alex',
      })
      .end((error, response) => {
        response.should.have.status(httpStatusCode.SERVICE_UNAUTHORIZED);
        response.should.be.json;
        done();
      });
  });

  it('should return error code 401 if the email is missing', done => {
    chai.request(server)
      .post('/api/v1/authenticate/')
      .send({
        password: 'John',
      })
      .end((error, response) => {
        response.should.have.status(httpStatusCode.SERVICE_UNAUTHORIZED);
        response.should.be.json;
        done();
      });
  });

  it('should return error code 401 if the password is missing', done => {
    chai.request(server)
      .post('/api/v1/authenticate/')
      .send({
        email: 'John@crfhealth.com',
      })
      .end((error, response) => {
        response.should.have.status(httpStatusCode.SERVICE_UNAUTHORIZED);
        response.should.be.json;
        done();
      });
  });
 });

