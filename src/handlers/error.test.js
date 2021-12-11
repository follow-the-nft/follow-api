'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const request = supertest(server);

describe('Given /bad', () => {
  
  describe('When GET', () => {
    let response;
    beforeAll( async() => {
      response = await request.get('/bad');
    });

    it('Then returns 500 status', () => {
      expect(response.status).toStrictEqual(500);
    });

    it('Then should return correct response body', () => {
      expect(response.body).toStrictEqual({error:"you've messed up"});
    });
  });

  describe('When POST', () => {
    let response;
    beforeAll( async() => {
      response = await request.get('/bad');
    });
    it('Then returns 500 status', () => {
      expect(response.status).toStrictEqual(500);
    });

  }); 

});
