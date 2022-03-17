import { app } from './app.mjs';
import supertest from 'supertest';
import mongoose from 'mongoose';

describe('app', () => {

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect('mongodb://localhost:27017/test-l006-supertest');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /test', () => {

    it('should return Hello World!', async () => {
      const response = await supertest(app).get('/test');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello World!');
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

  });

  describe('GET /user/:id?', () => {

    describe('GET: when the request is valid', () => {

      it('get all users', async () => {
        const response = await supertest(app).get('/user');

        expect(response.status).toBe(200);
        // expect(response.body[0]).toEqual({ id: 1, username: 'admin', password: 'admin' });
        expect(response.body[0]).toMatchObject({
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
        });
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      });

      it('get single user', async () => {
        const response = await supertest(app).get('/user/1');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
        });
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      });

    });

    describe('GET: when the request is not valid', () => {});

  });

  describe('POST /user', () => {

    describe('POST: when the request body is valid', () => {

      it('given username and password', async () => {

        const response = await supertest(app)
          .post('/user')
          .send({ username: 'guest', password: 'guest' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 2, username: 'guest', password: 'guest' });
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');

      })

    });

    describe('POST: when the request body is not valid', () => {

      it('given no username', async () => {

        const response = await supertest(app)
          .post('/user')
          .send({ password: 'guest' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username and password are required!');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');

      });

    });

  })

  describe('POST /todo', () => {

    describe('POST: when request is valid', () => {

      it('given title and completed', async () => {

        const response = await supertest(app)
          .post('/todo')
          .send({ title: 'test', completed: false });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ title: 'test', completed: false });
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');

      });


    });

    describe('POST: when request is not valid', () => {});


  });

});