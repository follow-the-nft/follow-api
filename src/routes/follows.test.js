const supertest = require('supertest')
const { db, users, follows } = require('../models/index')
const { server } = require('../server')
const request = supertest(server)

beforeAll(async () => {
  await db.sync();
  await users.bulkCreate([
    {
      id: 24,
      username: 'TEST',
      password: '$2a$10$fYHN0Tgp3SqUlOclOaL/TucaNVLyz6JKS29KTTYbbjcu4iQPyiQgC',
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    },
  ])
  await follows.bulkCreate([
    {
      id: 42,
      user_id: 24,
      contract_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    },
  ])
});

afterAll(async () => {
  await db.drop();
})

describe("Given /newFollows", () => {
  describe('When Authenticated', () => {
    it('Then user can retrieve follows', async () => {
      let user = await users.findOne({ where: { id: 24} })
      const response = await request.get('/newFollows').send(user).set('Authorization', `Bearer ${user.token}`)
      expect(response.body).toStrictEqual([
        {
          id: 42,
          user_id: 24,
          contract_address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
          createdAt: '2021-10-25T00:00:00.000Z',
          updatedAt: '2021-10-25T00:00:00.000Z'
        }
      ])
    })

    it('Then user can delete a like', async () => {
      let user = await users.findOne({ where: { id: 24} })
      const response = await request.delete('/newFollows/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB').send(user).set('Authorization', `Bearer ${user.token}`)
      expect(response.status).toStrictEqual(204)
      expect(response.body).toStrictEqual({})
    })

    it('Then user can create a like', async () => {
      let user = await users.findOne({ where: { id: 24} })
      const response = await request.post('/newFollows/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb').send(user).set('Authorization', `Bearer ${user.token}`)
      expect(response.status).toStrictEqual(200)
      expect(response.body.id).toStrictEqual(43)
      expect(response.body.user_id).toStrictEqual(24)
      expect(response.body.contract_address).toStrictEqual('0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb')
    })
  })
})