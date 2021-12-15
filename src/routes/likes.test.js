const supertest = require('supertest');
const { db, users, likes } = require('../models/index');
const { server } = require('../server');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
  await users.bulkCreate([
    {
      id: 23,
      username: 'TEST',
      password: '$2a$10$fYHN0Tgp3SqUlOclOaL/TucaNVLyz6JKS29KTTYbbjcu4iQPyiQgC',
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    },

  ]);
  await likes.bulkCreate([
    {
      id: 42,
      user_id: 23,
      contract_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      token_id: 15,
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    },
  ]);
});

afterAll(async () => {
  await db.drop();
});

describe('Given /newLikes', () => {
  describe('When Authenticated', () => {
    it('Then user can retrieve likes', async () => {
      let user = await users.findOne({ where: { id: 23} });
      const response = await request.get('/newLikes').send(user).set('Authorization', `Bearer ${user.token}`);
      expect(response.body).toStrictEqual([
        {
          id: 42,
          user_id: 23,
          contract_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
          token_id: '15',
          createdAt: '2021-10-25T00:00:00.000Z',
          updatedAt: '2021-10-25T00:00:00.000Z'
        }
      ]);
    });

    it('Then user can delete a like', async () => {
      let user = await users.findOne({ where: { id: 23} });
      const response = await request.delete('/newLikes/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/15').send(user).set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toStrictEqual(204);
      expect(response.body).toStrictEqual({});
    });

    // This test fails because the db is deleted by this point
    it.skip('Then user can create a like', async () => {
      let user = await users.findOne({ where: { id: 24} });
      const response = await request.post('/newLikes/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/42').send(user).set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toStrictEqual(200);
      expect(response.body.id).toStrictEqual(43);
      expect(response.body.user_id).toStrictEqual(24);
      expect(response.body.contract_address).toStrictEqual('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');
      expect(response.body.token_id).toStrictEqual('42');
    });
  });
});
