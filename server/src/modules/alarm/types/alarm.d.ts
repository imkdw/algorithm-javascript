import AlarmType from 'src/common/tpyes/alarm.enum';

interface IAlarmChannel {
  web: boolean;
  email: boolean;
  android: boolean;
  ios: boolean;
}

export interface IAlarmTemplate {
  title: string;
  body: string;
}

export interface IAlarmTemplateData {
  commentUser?: string;
}

export interface ICreateAlarm {
  toUserId: string;
  alarmType: AlarmType;
  channel: IAlarmChannel;
  templateData?: IAlarmTemplateData;
}
