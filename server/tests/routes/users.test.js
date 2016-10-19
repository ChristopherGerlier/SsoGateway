
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../server';

const should = chai.should();

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('GET /api/users/', () => {
  it('should return all users', done => {
    chai.request(server)
      .get('/api/users/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('username');
        response.body[0].username.should.equal('Mike');
        response.body[0].should.have.property('password');
        response.body[0].password.should.equal('Mike');
        response.body[0].should.have.property('stream');
        response.body[0].stream.should.equal('CS');
        done();
      });
  });
});

describe('GET /api/users/:uid', () => {
   it('should return a single user', done => {
     chai.request(server)
       .get('/api/users/2')
       .end((error, response) =>  {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(2);
          response.body.should.have.property('username');
          response.body.username.should.equal('Rob');
          response.body.should.have.property('password');
          response.body.password.should.equal('Rob');
          response.body.should.have.property('stream');
          response.body.stream.should.equal('PM');
          done();
        });
   });

  it('should return error code 405 for an unknown user', done => {
    chai.request(server)
      .get('/api/users/5')
       .end((error, response) =>  {
          response.should.have.status(405);
          done();
       });
  });
});

describe('GET /api/users/:uid/services', () => {
  it('should return a list of services for a given user', done => {
    chai.request(server)
      .get('/api/users/1/services')
      .end((error, response) =>  {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('service');
        response.body[0].service.should.equal('Localization Tool');
        response.body[1].should.have.property('service');
        response.body[1].service.should.equal('Reports');
        done();
      });
  });

  it('should return error code 200 for an unexisting user with an invalid id user', done => {
    chai.request(server)
      .get('/api/users/5/services')
       .end((error, response) =>  {
          response.should.have.status(200);
          done();
       });
  });

  it('should return error code 405 for an invalid id for a user', done => {
    chai.request(server)
      .get('/api/users/u/services')
       .end((error, response) =>  {
          response.should.have.status(405);
          done();
       });
  });
});

describe('GET /api/unknown/', () => {
  it('should return an error code 404 if the api route does not exist', done => {
    chai.request(server)
      .get('/api/unknown/')
       .end((error, response) =>  {
          response.should.have.status(404);
          done();
       });
  });
});
