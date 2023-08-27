import { Module } from '@nestjs/common';
import ArticlesService from './articles.service';
import ArticlesController from './articles.controller';
import PrismaService from 'src/prisma/prisma.service';
import ArticlesRepository from './articles.repository';
import AlarmModule from '../alarm/alarm.module';

@Module({
  imports: [AlarmModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, PrismaService, ArticlesRepository],
})
export default class ArticlesModule {}
