'use strict';

require('dotenv').config();
const supertest = require('supertest');
const { server } = require('../server');
const mockRequest = supertest(server);

let nftId = '20512672236384795134598454803080694359308106914252699625353424791001018400769';

// Use Nock to mock these requests - https://www.npmjs.com/package/nock
describe.skip('Given GET', () => {
  describe("When'/nft/:id", () => {
    describe('valid request', () => {
      let response;
      beforeAll(async () => {
        response = await mockRequest.get(`/nft/${nftId}`);
      });
      it('Then should return 200 response', () => {
        expect(response.status).toStrictEqual(200);
      });

      it('Then should return one NFT', () => {
        expect(response.body.length).toEqual(1);
      });
    });

    describe('invalid request', () => {
      let response;
      beforeAll(async () => {
        response = await mockRequest.get('/nft/iDoNotExist');
      });
      it('Then should return 500 response', () => {
        expect(response.status).toStrictEqual(500);
      });
    });
  });
});
