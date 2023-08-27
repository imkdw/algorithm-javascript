import { Module } from '@nestjs/common';
import AlarmService from './alarm.service';
import { AlarmScheduler } from './alarm.scheduler';
import { BullModule } from '@nestjs/bull';
import AlarmRepository from './alarm.repository';
import PrismaService from 'src/prisma/prisma.service';
import AlarmController from './alarm.controller';

@Module({
  imports: [],
  controllers: [AlarmController],
  providers: [AlarmService, AlarmScheduler, AlarmRepository, PrismaService],
  exports: [AlarmService],
})
export default class AlarmModule {}
