const request = require('supertest');
const server = require('../../server');

describe('middlewares.notFound', () => {
  let json;

  afterEach(async () => {
    await server.close();
  });

  beforeEach(() => {
    json = {
      startDate: '2017-01-01',
      endDate: '2017-01-02',
    };
  });

  const exec = () => {
    return request(server)
      .post('/api/blabla')
      .send(json);
  };

  it('status 404 url not found', async () => {
    const res = await exec();

    expect(res.status).toBe(404);
  });
});
