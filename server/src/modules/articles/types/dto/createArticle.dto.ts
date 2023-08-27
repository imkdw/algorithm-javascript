import ArticleDto from './article.dto';
import { OmitType } from '@nestjs/mapped-types';

/**
 * 게시글 생성 DTO
 */
export default class CreateArticleDto extends OmitType(ArticleDto, ['id']) {}
