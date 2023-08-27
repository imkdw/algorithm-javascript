import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import AlarmRepository from './alarm.repository';
import { IAlarmTemplate, ICreateAlarm } from './types/alarm';
import { AlarmDto } from './types/alarm.dto';
import { Subject } from 'rxjs';
import getAlarmTemplate from './templates/alarmTemplate';
import { AlarmDevice, AlarmType } from 'src/common/tpyes/alarm.enum';
import { TX } from '../../common/tpyes/prisma-tx';

@Injectable()
export default class AlarmService {
  private userConnections = new Map<string, Subject<IAlarmTemplate>>();

  constructor(private readonly alarmRepository: AlarmRepository) {}

  async getWebAlarm(userId: string) {
    const alarms = await this.getAlarms();

    const webAlarms = alarms.map((alarm) => {
      if (alarm.channelWeb && alarm.toUserId === userId) {
        return alarm;
      }
    });

    return webAlarms;
  }

  async getAlarms() {
    const alarms = await this.alarmRepository.getAlarms();
    return alarms;
  }

  async processAndroid(alarm: AlarmDto, template: IAlarmTemplate, tx: TX) {
    const updateDate = new Date();
    await this.alarmRepository.updateAlarm(
      alarm.id,
      { doneAndroid: updateDate },
      tx,
    );
    console.log('안드로이드 알람 전송완료');
  }
  async processIos(alarm: AlarmDto, template: IAlarmTemplate, tx: TX) {
    const updateDate = new Date();
    await this.alarmRepository.updateAlarm(
      alarm.id,
      { doneIos: updateDate },
      tx,
    );
    console.log('IOS  알람 전송완료');
  }
  async processEmail(alarm: AlarmDto, template: IAlarmTemplate, tx: TX) {
    const updateDate = new Date();
    await this.alarmRepository.updateAlarm(
      alarm.id,
      { doneEmail: updateDate },
      tx,
    );
    console.log('이메일 전송완료');
  }

  async processWeb(alarm: AlarmDto, event: IAlarmTemplate, tx: TX) {
    const updateDate = new Date();
    await this.alarmRepository.updateAlarm(
      alarm.id,
      { doneWeb: updateDate },
      tx,
    );

    const userConnection = this.userConnections.get(alarm.toUserId);
    if (userConnection) {
      console.log('웹 알람 전송완료');

      userConnection.next(event);
    }
  }

  /**
   * SSE 엔드포인트에서 전달받은 userId를 키로 하여 Subject를 생성하고, 커넥션 매핑을 유지
   * @param userId
   * @returns
   */
  establishConnection(userId: string) {
    const eventSubject = new Subject<IAlarmTemplate>();
    this.userConnections.set(userId, eventSubject);

    // Clean up the connection when it's no longer needed
    eventSubject.subscribe({
      complete: () => {
        this.userConnections.delete(userId);
      },
    });

    return eventSubject.asObservable();
  }
}
