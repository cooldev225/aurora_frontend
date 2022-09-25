/* eslint-disable prettier/prettier */
const HRMActions = {
  SCHEDULE_TEMPLATE : {
    LIST: 'ScheduleTemplateList', //  (get) 'hrm/schedule-templates'
    CREATE: 'ScheduleTemplateCreate',
    UPDATE: 'ScheduleTemplateUpdate',
  },
 
};

const HRMMutations = {
  SCHEDULE_TEMPLATE : {
    SET_LIST : "setScheduleTemplateList",
    SET_SELECT : "setScheduleTemplateSelect",
  }

};

export { HRMActions,HRMMutations };
