import { Module } from '@nestjs/common';
import AlarmModule from './modules/alarm/alarm.module';
import ArticlesModule from './modules/articles/articles.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AlarmModule, ArticlesModule, AlarmModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export default class AppModule {}
