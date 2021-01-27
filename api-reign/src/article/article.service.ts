import { Injectable, HttpService, Logger, OnModuleInit, BeforeApplicationShutdown } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Article } from "./interfaces/article.interface";
import { map } from 'rxjs/operators';

import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class ArticleService implements  OnModuleInit, BeforeApplicationShutdown {
    private readonly logger = new Logger(ArticleService.name);

    constructor(@InjectModel('Article') private readonly ArticleModel: Model<Article>,
                private readonly httpService: HttpService,
                @InjectConnection('db-test') private connection: Connection,
                ) {}

    async onModuleInit(): Promise<void> {
        await this.createAllArticles()
    }

    async beforeApplicationShutdown(): Promise<void> {
        await this.connection.dropDatabase();
    }

    async findArticlesApi(): Promise<Article[]> {
        const {hits} = await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
                .pipe(map(response => response.data)).toPromise();
        return hits
    }

    // Get all Articles
    async getArticles(): Promise<Article[]> {
        const config = { title: 1, story_title: 1, created_at: 1, comment_text: 1, story_url: 1, url: 1, author: 1 }
        const Articles = await this.ArticleModel.find({ status:true, $or: [ {title: { $ne: null }}, {story_title: { $ne: null }  }]}, config)
                        .sort({created_at: -1});
        return Articles;
    }

    @Cron('0 0 */1 * * *')
    async createAllArticles(): Promise<void> {
        try {
            const articles = await this.findArticlesApi()
            await this.ArticleModel.insertMany(articles,{ ordered: false });
            this.logger.debug('Insert document successfully');
        } catch (error) {
            if (error.code)
                this.logger.debug('Existing articles have been ignored')
        }
    }
    async deleteArticle(ArticleID: string): Promise<Article> {
        const updatedStatusArticle = await this.ArticleModel
                            .findOneAndUpdate({_id:ArticleID, status:true}, {status:false}, {new: true});
        return updatedStatusArticle;
    }

}