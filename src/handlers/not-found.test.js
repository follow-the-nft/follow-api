'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const request = supertest(server);

describe('Given /notFound', () => {
  
  describe('When GET', () => {
    let response;
    beforeAll( async() => {
      response = await request.get('/notFound');
    });

    it('Then returns 404 status', () => {
      expect(response.status).toStrictEqual(404);
    });

    it('Then should return correct response body', () => {
      expect(response.body.message).toStrictEqual('Sorry, we could not find what you were looking for');
    });
  });

  describe('When POST', () => {
    let response;
    beforeAll( async() => {
      response = await request.get('/notFound');
    });
    it('Then returns 404 status', () => {
      expect(response.status).toStrictEqual(404);
    });

    it('Then should return correct response body', async () => {
      expect(response.body.message).toStrictEqual('Sorry, we could not find what you were looking for');
    });
  }); 
});
