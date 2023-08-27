import { IsNumber, IsString } from 'class-validator';

/**
 * T_ArticleComment 테이블 컬럼 정의 DTO
 */
export default class ArticleCommentDto {
  @IsNumber()
  id: number;

  @IsNumber()
  boardId: number;

  @IsString()
  content: string;
}
