process.env.TEST = 'true';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as response from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { userStub } from './stubs/user.stub';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(userStub())
      .expect(201)
      .expect({ nickname: userStub().nickname, fullName: userStub().fullName });
  });

  it('/users/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signin')
      .send({ nickname: userStub().nickname, password: userStub().password })
      .expect(201);
    expect(response.body);
  });

  it('/users/update/:nickname (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signin')
      .send({ nickname: userStub().nickname, password: userStub().password })
      .expect(201);
    const token = response.body.token;

    return request(app.getHttpServer())
      .put(`/users/update/${userStub().nickname}`)
      .send({ fullName: 'testi22' })
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ message: `${userStub().nickname}'s profile has been updated` });
  });

  it('/users/delete/:nickname (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signin')
      .send({ nickname: userStub().nickname, password: userStub().password })
      .expect(201);
    const token = response.body.token;

    return request(app.getHttpServer())
      .delete(`/users/delete/${userStub().nickname}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ deleted: 1 });
  });

  it('/users/list (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/users/list`)
      .expect(200)
      .expect([]);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
  });
});
