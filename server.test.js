const request = require('supertest');
const app = require('./server');

describe('Task API', () => {
  test('GET / returns welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to Task API');
  });

  test('GET /api/tasks returns tasks array', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /health returns healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('POST /api/tasks creates new task', async () => {
    const newTask = { title: 'Test Task' };
    const response = await request(app)
      .post('/api/tasks')
      .send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });
});
