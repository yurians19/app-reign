import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) { }
    
    // Get Articles /article
    @Get('/')
    async getArticles(@Res() res) {
        const articles = await this.articleService.getArticles();
        return res.status(HttpStatus.OK).json(articles);
    }

    // Delete Articles /article
    @Delete('/:articleID')
    async deleteArticle(@Res() res, @Param('articleID') articleID) {
        const articleDeleted = await this.articleService.deleteArticle(articleID);
        if (!articleDeleted) throw new NotFoundException('Article does not exist!');
        return res.status(HttpStatus.OK).json({message: 'Article Deleted Successfully',articleDeleted});
    }

}
