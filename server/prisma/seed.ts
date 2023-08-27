import { Logger } from '@nestjs/common';
import { prisma } from './prisma';
import { AlarmType } from '../src/common/tpyes/alarm.enum';

export const userMasterData = [
  {
    userId: 'dongwoo',
    regId: 'dongwoo',
    editId: 'dongwoo',
  },
  {
    userId: 'whoareyou',
    regId: 'whoareyou',
    editId: 'whoareyou',
  },
  {
    userId: '_admin',
    regId: '_admin',
    editId: '_admin',
  },
];
export const userDeviceData = [
  {
    userId: 'dongwoo',
    deviceToken: 'device_dongwoo_android',
    regId: 'dongwoo',
    editId: 'dongwoo',
  },
  {
    userId: 'dongwoo',
    deviceToken: 'device_dongwoo_ios',
    regId: 'dongwoo',
    editId: 'dongwoo',
  },
];
export const articleMasterData = [
  {
    title: '제목 1',
    content: '내용 1',
    regId: 'dongwoo',
    editId: 'dongwoo',
  },
];
export const alarmMasterData = [
  {
    id: 1,
    toUserId: userMasterData[0].userId,
    notiCode: AlarmType.NEW_COMMENT_ON_OWN_ARTICLE,
    channelWeb: true,
    channelAndroid: true,
    channelIos: true,
    channelEmail: true,
    doneWeb: null,
    doneAndroid: null,
    doneIos: null,
    doneEmail: null,
    regId: userMasterData[0].userId,
    editId: userMasterData[0].userId,
  },
];

export const alarmTemplateData = [
  {
    alarmId: alarmMasterData[0].id,
    notiCode: AlarmType.NEW_COMMENT_ON_OWN_ARTICLE,
    deviceType: 'A',
    image:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: '[안드] 신규 댓글 알림',
    body: `${userMasterData[1].userId}님의 새로운 댓글을 작성했습니다.`,
    regId: userMasterData[0].userId,
    editId: userMasterData[0].userId,
  },
  {
    alarmId: alarmMasterData[0].id,
    notiCode: AlarmType.NEW_COMMENT_ON_OWN_ARTICLE,
    deviceType: 'I',
    image:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: '[아이폰] 신규 댓글 알림',
    body: `${userMasterData[1].userId}님의 새로운 댓글을 작성했습니다.`,
    regId: userMasterData[0].userId,
    editId: userMasterData[0].userId,
  },
  {
    alarmId: alarmMasterData[0].id,
    notiCode: AlarmType.NEW_COMMENT_ON_OWN_ARTICLE,
    deviceType: 'W',
    image:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: '[웹] 신규 댓글 알림',
    body: `${userMasterData[1].userId}님의 새로운 댓글을 작성했습니다.`,
    regId: userMasterData[0].userId,
    editId: userMasterData[0].userId,
  },
  {
    alarmId: alarmMasterData[0].id,
    notiCode: AlarmType.NEW_COMMENT_ON_OWN_ARTICLE,
    deviceType: 'E',
    image:
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    title: '[이메일] 신규 댓글 알림',
    body: `<div style="color: red;">${userMasterData[1].userId}님의 새로운 댓글을 작성했습니다.</div>`,
    regId: userMasterData[0].userId,
    editId: userMasterData[0].userId,
  },
];

async function main() {
  await prisma.alarmTemplate.deleteMany();
  await prisma.alarmMaster.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.articleMaster.deleteMany();
  await prisma.userDevice.deleteMany();
  await prisma.userMaster.deleteMany();

  if (!(await prisma.userMaster.findFirst())) {
    await prisma.userMaster.createMany({ data: userMasterData });
  }

  if (!(await prisma.userDevice.findFirst())) {
    await prisma.userDevice.createMany({ data: userDeviceData });
  }

  if (!(await prisma.articleMaster.findFirst())) {
    await prisma.articleMaster.createMany({ data: articleMasterData });
  }

  if (!(await prisma.alarmMaster.findFirst())) {
    await prisma.alarmMaster.createMany({ data: alarmMasterData });
  }

  if (!(await prisma.alarmTemplate.findFirst())) {
    await prisma.alarmTemplate.createMany({ data: alarmTemplateData });
  }
}

main()
  .catch((err) => {
    Logger.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
