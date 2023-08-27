import { IsString, IsNumber } from 'class-validator';

export default class ArticleDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
