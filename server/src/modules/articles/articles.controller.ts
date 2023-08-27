import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import ArticlesService from './articles.service';
import CreateArticleDto from './types/dto/createArticle.dto';
import CreateArticleCommentDto from './types/dto/createArticleComment.dto';

@Controller('articles')
export default class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    const articles = await this.articlesService.getArticles();

    return articles;
  }

  @Post(':articleId/comments')
  async createComment(
    @Body() dto: CreateArticleCommentDto,
    @Param('articleId') articleId: number,
  ) {
    return await this.articlesService.createComment(articleId, dto);
  }
}
