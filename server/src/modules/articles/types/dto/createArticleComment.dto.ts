import { OmitType } from '@nestjs/mapped-types';
import ArticleCommentDto from './articleComment.dto';

export default class CreateArticleCommentDto extends OmitType(
  ArticleCommentDto,
  ['id', 'boardId'],
) {}
