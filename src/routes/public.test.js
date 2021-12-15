'use strict';

require('dotenv').config();
const supertest = require('supertest');
const { server } = require('../server');
const nock = require('nock');
const mockRequest = supertest(server);
const nockResponse = require('./public.testData.json');


let nftId = '97341190603561703640736312895230350583576422457915048181886020245224333246514';
let address00 = '0x2953399124f0cbb46d2cbacd8a89cf0599974963';
let address01 = '0xc352b534e8b987e036a93539fd6897f53488e56a';
let slug = 'kumo-resident-y9rbt6bibp';

// Use Nock to mock these requests - https://www.npmjs.com/package/nock
describe('Given GET', () => {
  describe("When '/nft/:id", () => {
    describe('Valid request', () => {
      it('Then should return 200 response', async () => {
        nock('https://api.opensea.io')
          .persist()
          .get(`/api/v1/asset/${address00}/${nftId}`)
          .reply(200, nockResponse.asset);

        let response = await mockRequest.get(`/nft/${address00}/${nftId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nockResponse.asset);
      });
    });

    describe('Invalid request', () => {
      beforeAll(() => {
        const errorResponse = { message: 'server error'};
        nock('https://api.opensea.io')
          .persist()
          .get(`/api/v1/assets?order_direction=desc&offset=0&token_ids=iDoNotExist`)
          .reply(404, errorResponse); 
      });

      it('Then should return 500 response', async () => {
        let response = await mockRequest.get('/address/iDoNotExist');
        expect(response.status).toStrictEqual(500);
      });
    });
  });

  describe("When '/address/:address'", () => {
    describe('Valid request', () => {
      beforeAll(() => {
        nock('https://api.opensea.io')
          .persist()
          .get(`/api/v1/assets?owner=${address00}&order_direction=desc&offset=0`)
          .reply(200, nockResponse.assets); 
      });

      it('Then should return 200 response', async () => {
        let response = await mockRequest.get(`/address/${address00}`);
        expect(response.status).toStrictEqual(200);
        expect(response.body).toStrictEqual(nockResponse.assets);
      });
    });

    describe('Invalid request', () => {
      beforeAll(() => {
        const errorResponse = { message: 'server error'};
        nock('https://api.opensea.io')
          .persist()
          .get('/api/v1/assets?owner=iDoNotExist&order_direction=desc&offset=0')
          .reply(404, errorResponse); 
      });

      it('Then should return 500 response', async () => {
        let response = await mockRequest.get('/address/iDoNotExist');
        expect(response.status).toStrictEqual(500);
      });
    });
  });

  describe("When '/addresses/:addresses", () => {
    describe('Valid request', () => {
      beforeAll(() => {
        nock('https://api.opensea.io')
          .persist()
          .get(`/api/v1/assets?order_direction=desc&offset=0&asset_contract_addresses=${address00}&asset_contract_addresses=${address01}`)
          .reply(200, nockResponse.addresses);
      });
      
      it('Then should return 200 response', async () => {
        let response = await mockRequest.get(`/addresses/${address00},${address01}`);
        expect(response.status).toStrictEqual(200);
        expect(response.body).toStrictEqual(nockResponse.addresses);
      });
    });
  });

  describe("When '/collection/:slug'", () => {
    describe('Valid request', () => {
      beforeAll(() => {
        nock('https://api.opensea.io')
          .persist()
          .get(`/api/v1/collection/${slug}`)
          .reply(200, nockResponse.collection);
      });

      it('Then should return 200 response', async () => {
        let response = await mockRequest.get(`/collection/${slug}`);
        expect(response.status).toStrictEqual(200);
        expect(response.body).toStrictEqual(nockResponse.collection);
      });
    });
  });
});
