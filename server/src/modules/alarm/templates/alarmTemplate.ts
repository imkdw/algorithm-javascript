import { AlarmDevice, AlarmType } from 'src/common/tpyes/alarm.enum';
import { IAlarmTemplate, IAlarmTemplateData } from '../types/alarm';

export default function getAlarmTemplate(
  deviceType: AlarmDevice,
  alarmType: AlarmType,
  data: IAlarmTemplateData,
) {
  switch (alarmType) {
    case AlarmType.NEW_COMMENT_ON_OWN_ARTICLE:
      return NEW_COMMENT_ON_OWN_ARTICLE(deviceType, data);
  }
}

export const NEW_COMMENT_ON_OWN_ARTICLE = (
  deviceType: AlarmDevice,
  data: IAlarmTemplateData,
): IAlarmTemplate => {
  let title = '';
  let body = '';

  switch (deviceType) {
    case AlarmDevice.ANDROID:
    case AlarmDevice.IOS:
    case AlarmDevice.WEB:
      title = '새로운 댓글이 달렸습니다.';
      body = `${data.commentUser}님이 댓글을 작성했습니다.`;
    case AlarmDevice.EMAIL:
      title = '새로운 댓글이 달렸습니다.';
      body = `<div>${data.commentUser}님이 댓글을 작성했습니다.</div>`;
  }

  return { title, body };
};
