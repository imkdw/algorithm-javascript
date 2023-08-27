import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import AlarmRepository from './alarm.repository';
import AlarmService from './alarm.service';
import getAlarmTemplate from './templates/alarmTemplate';
import { AlarmDevice, AlarmType } from 'src/common/tpyes/alarm.enum';
import PrismaService from '../../prisma/prisma.service';

@Injectable()
export class AlarmScheduler {
  // 1분에 한번 DB에 저장된 알람을 실행함
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmService: AlarmService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * * *')
  async pushAlarm() {
    const alarms = await this.alarmRepository.getAlarms();
    if (!alarms.length) return;

    const processPromises = alarms.map(async (alarm) => {
      const { channelAndroid, channelEmail, channelIos, channelWeb } = alarm;
      const { doneEmail, doneIos, doneAndroid, doneWeb } = alarm;

      await this.prisma.$transaction(async (tx) => {
        if (channelAndroid && !doneAndroid) {
          const template = await this.alarmRepository.findTemplate(
            alarm.id,
            AlarmDevice.ANDROID,
          );
          await this.alarmService.processAndroid(alarm, template, tx);
        }

        if (channelIos && !doneIos) {
          const template = await this.alarmRepository.findTemplate(
            alarm.id,
            AlarmDevice.IOS,
          );
          await this.alarmService.processIos(alarm, template, tx);
        }

        if (channelEmail && !doneEmail) {
          const template = await this.alarmRepository.findTemplate(
            alarm.id,
            AlarmDevice.EMAIL,
          );
          await this.alarmService.processEmail(alarm, template, tx);
        }

        if (channelWeb && !doneWeb) {
          const template = await this.alarmRepository.findTemplate(
            alarm.id,
            AlarmDevice.WEB,
          );

          await this.alarmService.processWeb(alarm, template, tx);
        }

        const afterAlarm = await this.alarmRepository.getAlarm(alarm.id, tx);
        if (
          afterAlarm.doneAndroid &&
          afterAlarm.doneIos &&
          afterAlarm.doneEmail &&
          afterAlarm.doneWeb
        ) {
          await this.alarmRepository.updateAlarm(
            alarm.id,
            { liveDate: new Date() },
            tx,
          );
        }
      });
    });

    // promise 실행
    await Promise.all(processPromises);
  }
}
