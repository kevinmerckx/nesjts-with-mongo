import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as supertest from 'supertest';
import { IPost } from '../model/post';
import { PostModule } from '../post.module';

describe('PostController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://mongo:27017', { dbName: 'test' }),
        PostModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('creates a post', async () => {
    await apiClient()
      .post('/post')
      .send({
        content:
          'I am all setup with Nestjs and Mongo for more integration testing. TDD rocks!',
      })
      .expect(201);
    const posts: IPost[] = (await apiClient().get('/post')).body;
    expect(posts[0].content).toBe(
      'I am all setup with Nestjs and Mongo for more integration testing. TDD rocks!',
    );
    expect(posts[0].likes.length).toBe(0);
  });
});
