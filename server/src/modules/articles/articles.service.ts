import { Injectable } from '@nestjs/common';
import CreateArticleCommentDto from './types/dto/createArticleComment.dto';
import ArticlesRepository from './articles.repository';
import AlarmService from '../alarm/alarm.service';
import { userMasterData } from 'prisma/seed';
import { AlarmDevice, AlarmType } from 'src/common/tpyes/alarm.enum';
import getAlarmTemplate from '../alarm/templates/alarmTemplate';

@Injectable()
export default class ArticlesService {
  constructor(
    private articleRepository: ArticlesRepository,
    private alarmService: AlarmService,
  ) {}

  async getArticles() {
    const articles = await this.articleRepository.getArticles();
    return articles;
  }

  async createComment(articleId: number, dto: CreateArticleCommentDto) {
    const commentUser = {
      commentUser: userMasterData[1].userId,
    };

    await this.articleRepository.createComment(articleId, dto);
  }
}
