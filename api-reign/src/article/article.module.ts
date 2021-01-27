import { Module, HttpModule } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './model/article.schema';

let nameDb = 'db-articles'

if (process.env.NODE_ENV === 'test') {
  nameDb = 'db-test'
}

@Module({
  imports: [MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}],nameDb), HttpModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
