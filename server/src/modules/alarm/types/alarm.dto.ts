import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class AlarmDto {
  @IsNumber()
  id?: number;

  @IsString()
  toUserId?: string;

  @IsString()
  notiCode?: string;

  @IsBoolean()
  channelWeb?: boolean;

  @IsBoolean()
  channelAndroid?: boolean;

  @IsBoolean()
  channelIos?: boolean;

  @IsBoolean()
  channelEmail?: boolean;

  @IsDate()
  doneWeb?: Date;

  @IsDate()
  doneAndroid?: Date;

  @IsDate()
  doneIos?: Date;

  @IsDate()
  doneEmail?: Date;

  @IsDate()
  editDate?: Date;

  @IsDate()
  liveDate?: Date;
}

export class UpdateAlarmDto extends OmitType(AlarmDto, ['id']) {}
