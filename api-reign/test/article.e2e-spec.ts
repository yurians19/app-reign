import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Article (e2e)', () => {
  let app: INestApplication;
  let articleId: String = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
    ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get all articles',async () => {
    return await request(app.getHttpServer())
        .get('/article')
        .expect(200)
        .expect(({ body }) => {
            articleId = body[0]._id
        });
  });

  it('delete a article successfully',async () => {
     return await request(app.getHttpServer())
        .delete(`/article/${articleId}`)
        .expect(200)
        .expect(({ body }) => {
            console.log(body);
            expect(body.articleDeleted._id).toEqual(articleId);
            expect(body.message).toEqual('Article Deleted Successfully');
        });
  });

  it('delete a article not exist',async () => {
    return await request(app.getHttpServer())
        .delete(`/article/600b75bee7739b09c1398661`)
        .expect(404)
        .expect(({ body }) => {
            expect(body.message).toEqual('Article does not exist!');
        });
  });

  afterAll(async () => {
    await app.close();
  });
});
