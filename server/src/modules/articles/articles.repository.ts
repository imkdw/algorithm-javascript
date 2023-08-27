import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateArticleCommentDto from './types/dto/createArticleComment.dto';
import { userMasterData } from 'prisma/seed';

@Injectable()
export default class ArticlesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles() {
    return await this.prisma.articleMaster.findMany({
      include: {
        articleComment: true,
      },
    });
  }

  async createComment(articleId: number, dto: CreateArticleCommentDto) {
    await this.prisma.articleComment.create({
      data: {
        ...dto,
        articleId: parseInt(articleId.toString(), 10),
        regId: userMasterData[1].userId,
        editId: userMasterData[1].userId,
      },
    });
  }
}
