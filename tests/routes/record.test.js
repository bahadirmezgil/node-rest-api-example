const request = require('supertest');
const server = require('../../server');

describe('record route getRoutes', () => {
  let json;

  afterEach(async () => {
    await server.close();
  });

  beforeEach(() => {
    json = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: '2700',
      maxCount: '3000',
    };
  });

  const getRequests = () => request(server).post('/api/record/getRecords').send(json);

  it('startDate required with 400', async () => {
    delete json.startDate;

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('endDate required with 400', async () => {
    delete json.endDate;

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('minCount required with 400', async () => {
    delete json.minCount;

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('maxCount required with 400', async () => {
    delete json.maxCount;

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('bad startDate parameter with 400', async () => {
    json.startDate = '2016-01-66';

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('bad startDate parameter with 400', async () => {
    json.startDate = 'asd';

    const res = await getRequests();
    
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('bad endDate parameter with 400', async () => {
    json.endDate = '2016-01-66';

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('bad endDate parameter with 400', async () => {
    json.endDate = 'asd';

    const res = await getRequests();

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('2');
  });

  it('successful record list retrieval', async () => {
    const res = await getRequests();
    
    expect(res.status).toBe(200);
    expect(res.body.code).toBe('0');
    expect(Array.isArray(res.body.records)).toBe(true);
    expect(Object.keys(res.body.records[0]).sort()).toEqual(['key', 'createdAt', 'totalCount'].sort());
  });

});
