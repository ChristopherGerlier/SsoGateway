/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';
import { GET_HTTP_STATUS } from '../../httpCodes';

const should = chai.should();

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('GET /api/accounts/', () => {
  it('should return all accounts', done => {
    chai.request(server)
      .get('/api/accounts/')
      .end((error, response) => {
        response.should.have.status(GET_HTTP_STATUS.OK);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('username');
        response.body[0].username.should.equal('Mike');
        response.body[0].should.have.property('password');
        response.body[0].password.should.equal('Mike');
        response.body[0].should.have.property('email');
        response.body[0].email.should.equal('mike@crfhealth.com');
        done();
      });
  });
});

describe('GET /api/accounts/:id', () => {
  it('should return a single account', done => {
    chai.request(server)
      .get('/api/accounts/2')
      .end((error, response) => {
        response.should.have.status(GET_HTTP_STATUS.OK);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(2);
        response.body.should.have.property('username');
        response.body.username.should.equal('Rob');
        response.body.should.have.property('password');
        response.body.password.should.equal('Rob');
        response.body.should.have.property('email');
        response.body.email.should.equal('rob@crfhealth.com');
        done();
      });
  });

  it('should return error code 405 for an unknown account', done => {
    chai.request(server)
      .get('/api/accounts/5')
      .end((error, response) => {
        response.should.have.status(405);
        done();
      });
  });
});

describe('GET /api/accounts/:id/services', () => {
  it('should return a list of services for a given account', done => {
    chai.request(server)
      .get('/api/accounts/1/services')
      .end((error, response) => {
        response.should.have.status(GET_HTTP_STATUS.OK);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Localization Tool');
        response.body[1].should.have.property('name');
        response.body[1].name.should.equal('Reports');
        done();
      });
  });

  it('should return error code 200 for an unexisting account with an invalid id account', done => {
    chai.request(server)
      .get('/api/accounts/5/services')
       .end((error, response) => {
         response.should.have.status(GET_HTTP_STATUS.OK);
         done();
       });
  });

  it('should return error code 405 for an invalid id for a account', done => {
    chai.request(server)
      .get('/api/accounts/u/services')
       .end((error, response) => {
         response.should.have.status(405);
         done();
       });
  });
});

describe('GET /api/unknown/', () => {
  it('should return an error code 404 if the api route does not exist', done => {
    chai.request(server)
      .get('/api/unknown/')
       .end((error, response) => {
         response.should.have.status(GET_HTTP_STATUS.NOT_FOUND);
         done();
       });
  });
});
