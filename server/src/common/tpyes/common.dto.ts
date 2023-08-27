import { IsString, IsDate } from 'class-validator';

/**
 * 데이터베이스 내부 공용 컬럼 정의 DTO
 */
export default class CommonDto {
  @IsString()
  regId: string;

  @IsDate()
  regDate: Date;

  @IsString()
  editId: string;

  @IsDate()
  editDate: Date;

  @IsDate()
  liveDate: Date;
}
