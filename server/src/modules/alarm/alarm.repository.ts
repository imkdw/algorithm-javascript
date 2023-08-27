import { Injectable } from '@nestjs/common';
import { userMasterData } from 'prisma/seed';
import { AlarmDevice, AlarmType } from 'src/common/tpyes/alarm.enum';
import PrismaService from 'src/prisma/prisma.service';
import { IAlarmTemplate, ICreateAlarm } from './types/alarm';
import { UpdateAlarmDto } from './types/alarm.dto';
import { TX } from '../../common/tpyes/prisma-tx';

@Injectable()
export default class AlarmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAlarm(dto: ICreateAlarm) {
    const { alarmType, channel, toUserId } = dto;
    const { android, email, ios, web } = channel;

    await this.prisma.alarmMaster.create({
      data: {
        toUserId,
        notiCode: alarmType,
        channelWeb: web,
        channelIos: ios,
        channelAndroid: android,
        channelEmail: email,
        doneAndroid: android ? null : new Date(),
        doneIos: ios ? null : new Date(),
        doneWeb: web ? null : new Date(),
        doneEmail: email ? null : new Date(),
        regId: userMasterData[2].userId,
        editId: userMasterData[2].userId,
      },
    });
  }

  async findTemplate(alarmId: number, deviceType: AlarmDevice) {
    // 임시
    let device: string;
    if (deviceType === AlarmDevice.ANDROID) device = 'A';
    if (deviceType === AlarmDevice.IOS) device = 'I';
    if (deviceType === AlarmDevice.WEB) device = 'W';
    if (deviceType === AlarmDevice.EMAIL) device = 'E';

    const row = await this.prisma.alarmTemplate.findFirst({
      where: {
        alarmId,
        deviceType: device,
      },
    });

    return row;
  }

  async getAlarms() {
    const alarms = await this.prisma.alarmMaster.findMany({
      where: {
        liveDate: null,
      },
    });

    return alarms;
  }

  async getAlarm(alarmId: number, tx?: TX) {
    const prisma = tx || this.prisma;

    const alarm = await prisma.alarmMaster.findUnique({
      where: {
        id: alarmId,
      },
    });

    return alarm;
  }

  async updateAlarm(alarmId: number, dto: UpdateAlarmDto, tx: TX) {
    const prisma = tx || this.prisma;

    await prisma.alarmMaster.update({
      where: {
        id: alarmId,
      },
      data: {
        ...dto,
        editDate: dto.liveDate,
      },
    });
  }
}
