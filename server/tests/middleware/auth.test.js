import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from 'config';

import server from '../../server';
import httpStatusCode from '../../constants/httpStatusCodes';
import * as texts from '../../constants/applicationTexts.js';

import {
  runSql,
} from '../../util/databaseHelper.js';

const should = chai.should();
chai.use(chaiHttp);

describe('Authorized REST apis', () => {
  before((done) => {
    runSql('../tests/scripts/restRouterSetup.sql', done);
  });

  after((done) => {
    runSql('../tests/scripts/restRouterTeardown.sql', done);
  });

  it('should prevent authorization if no token provided', done => {
    chai.request(server)
      .get('/api/v1/accounts')
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.SERVICE_FORBIDDEN);
          response.should.be.json;
          response.body.should.equal(texts.JWT_NOT_VALID);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should prevent authorization if invalid token is provided', done => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('token', 'invalid token')
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.SERVICE_FORBIDDEN);
          response.should.be.json;
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should allow authorization if valid token is provided', done => {
    const payload = {
      email: 'John@hotmail.com',
      role: 'CS',
      services: [
        { name: 'Report' },
        { name: 'Localization Tool' },
      ],
    };

    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: config.jwtSessionTimeout });

    chai.request(server)
      .get('/api/v1/accounts')
      .set('token', token)
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.OK);
          response.should.be.json;
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('POST /api/v1/authenticate', () => {
  it('should return a token after authentication', done => {
    chai.request(server)
      .post('/api/v1/authenticate')
      .send({
        email: 'John@hotmail.com',
        password: 'John',
      })
      .end((error, response) => {
        try {
          response.should.have.status(httpStatusCode.CREATED);
          response.should.be.json;
          response.header.should.be.a('object');
          response.header.should.have.property('token');
          const payload = jwt.verify(response.header.token, config.jwtSecretKey);
          payload.should.be.a('object');
          payload.should.have.property('email');
          payload.email.should.equal('John@hotmail.com');
          payload.should.have.property('role');
          payload.role.should.equal('CS');
          payload.should.have.property('services');
          payload.services.should.be.a('array');
          payload.services.length.should.equal(3);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should return error code 401 if the credentials are not recognized', done => {
    chai.request(server)
      .post('/api/v1/authenticate')
      .send({
        email: 'John@hotmail.com',
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
      .post('/api/v1/authenticate')
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
      .post('/api/v1/authenticate')
      .send({
        email: 'John@hotmail.com',
      })
      .end((error, response) => {
        response.should.have.status(httpStatusCode.SERVICE_UNAUTHORIZED);
        response.should.be.json;
        done();
      });
  });
});
