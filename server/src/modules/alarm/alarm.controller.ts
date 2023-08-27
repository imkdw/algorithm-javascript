import { Controller, MessageEvent, Param, Query, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import AlarmService from './alarm.service';
import { IAlarmTemplate } from './types/alarm';

@Controller('alarm')
export default class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Sse()
  sse(@Query('userId') userId: string): Observable<object> {
    return this.alarmService
      .establishConnection(userId)
      .pipe(map((event) => ({ data: event })));
  }
}
