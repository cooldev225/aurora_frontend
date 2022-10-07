/* eslint-disable prettier/prettier */
const HRMActions = {
  SCHEDULE_TEMPLATE : {
    LIST: 'ScheduleTemplateList', //  (get) 'hrm/schedule-templates'
    CREATE: 'ScheduleTemplateCreate',
    UPDATE: 'ScheduleTemplateUpdate',
  },
  BULLETIN: {
    LIST: 'BulletinList',
  }
};

const HRMMutations = {
  SCHEDULE_TEMPLATE : {
    SET_LIST : "setScheduleTemplateList",
    SET_SELECT : "setScheduleTemplateSelect",
    SET_TIMESLOT: "setTimeslotTemplateSelect",
  },
  BULLETIN: {
    SET_LIST : "setBulletinList",
    SET_SELECT : "setBulletinSelect",
  }
};

export { HRMActions,HRMMutations };
