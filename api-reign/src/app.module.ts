import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleModule } from './article/article.module';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost'

@Module({
  imports: [
    MongooseModule.forRoot(`${MONGO_URI}/article-test`, {
      connectionName: 'db-test',
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forRoot(`${MONGO_URI}/article-api`, {
      connectionName: 'db-articles',
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ArticleModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
