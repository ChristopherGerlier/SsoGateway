/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';
import httpStatusCode from '../../constants/httpStatusCodes';
import * as accounts from '../../model/accounts.js';
import * as config from '../../config.js';

import {
  runSql,
} from '../../util/databaseHelper.js';

const should = chai.should();
chai.use(chaiHttp);

const payload = {
  email: 'John@crfhealth.com',
  role: 'CS',
  services: [
    { name: 'Report' },
    { name: 'Localization Tool' },
  ],
};
const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: config.sessionTimeout });

describe('GET /api/v1/accounts/', () => {
  before((done) => {
    runSql('../tests/scripts/restRouterSetup.sql', done);
  });

  after((done) => {
    runSql('../tests/scripts/restRouterTeardown.sql', done);
  });

  it('should return all accounts', done => {
    chai.request(server)
      .get('/api/v1/accounts/')
      .set('token', token)
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.OK);
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
          response.body[0].group_name.should.equal('PSM');
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('GET /api/v1/accounts/:uid', () => {
  before((done) => {
    runSql('../tests/scripts/restRouterSetup.sql', done);
  });

  after((done) => {
    runSql('../tests/scripts/restRouterTeardown.sql', done);
  });

  it('should return a single account', done => {
    accounts.getAllAccounts((data) => {
      const account = data.find((item) => item.email === 'Rob@crfhealth.com');

      chai.request(server)
        .get(`/api/v1/accounts/${account.id}`)
        .set('token', token)
        .end((error, response) => {
          try {
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
            response.body.group_name.should.equal('CS');
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });

  it('should return error code 405 for an unknown account', done => {
    chai.request(server)
      .get('/api/v1/accounts/56262626')
      .set('token', token)
      .end((error, response) => {
        try {
          response.should.have.status(405);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('GET /api/v1/groups/:groupname/services', () => {
  before((done) => {
    runSql('../tests/scripts/restRouterSetup.sql', done);
  });

  after((done) => {
    runSql('../tests/scripts/restRouterTeardown.sql', done);
  });

  it('should return a list of services for a given account', done => {
    accounts.getAllAccounts((data) => {
      const account = data.find((item) => item.email === 'Rob@crfhealth.com');

      chai.request(server)
        .get(`/api/v1/groups/${account.group_name}/services`)
        .set('token', token)
        .end((error, response) => {
          try {
            response.should.have.status(httpStatusCode.OK);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.length.should.equal(2);
            response.body[0].should.have.property('service_name');
            response.body[0].service_name.should.equal('Reports');
            response.body[1].should.have.property('service_name');
            response.body[1].service_name.should.equal('Localization Tool');
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });

  it('should return error code 200 for an unexisting account with an invalid id account', done => {
    chai.request(server)
      .get('/api/v1/groups/5/services')
      .set('token', token)
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.OK);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('GET /api/v1/unknown/', () => {
  it('should return an error code 404 if the api route does not exist', done => {
    chai.request(server)
      .get('/api/v1/unknown/')
      .set('token', token)
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.NOT_FOUND);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
