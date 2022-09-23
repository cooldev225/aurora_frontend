/* eslint-disable prettier/prettier */
const HRMActions = {
  SCHEDULE_TEMPLATE : {
    LIST: 'ScheduleTemplateList' //  (get) 'hrm/schedule-templates'
  },
 
};

const HRMMutations = {
  SCHEDULE_TEMPLATE : {
    SET_LIST : "setScheduleTemplateList",
    SET_SELECT : "setScheduleTemplateSelect",
  }

};

export { HRMActions,HRMMutations };
