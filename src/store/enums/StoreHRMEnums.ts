/* eslint-disable prettier/prettier */
const HRMActions = {
    SCHEDULE_TEMPLATE: {
        LIST: 'ScheduleTemplateList', //  (get) 'hrm/schedule-templates'
        CREATE: 'ScheduleTemplateCreate',
        UPDATE: 'ScheduleTemplateUpdate',
    },

    WEEKLY_TEMPLATE: {
        LIST: 'WeeklyTemplateList', // (get) 'hrm/weekly-schedule
        CREATE: 'WeeklyTemplateCreate',
        UPDATE: 'WeeklyTemplateUpdate',
    },

    BULLETIN: {
        LIST: 'BulletinList',
        CREATE: 'BulletinCreate',
        UPDATE: 'BulletinUpdate',
        DELETE: 'BulletinDelete',
    },
    ANESTHETIST: {
        LIST: 'AnesthetistList'
    }
};

const HRMMutations = {
    SCHEDULE_TEMPLATE: {
        SET_LIST: "setScheduleTemplateList",
        SET_SELECT: "setScheduleTemplateSelect",
        SET_TIMESLOT: "setTimeslotTemplateSelect",
    },

    WEEKLY_TEMPLATE: {
        SET_LIST: 'setWeeklyTemplateList', // (get) 'hrm/weekly-schedule
        SET_TIMESLOT: 'setWeeklyTemplateSelect'
    },
    BULLETIN: {
        SET_LIST: "setBulletinList",
        SET_SELECT: "setBulletinSelect",
    },
    ANESTHETIST: {
        SET_LIST: 'setAnesthetistList'
    }
};

export {HRMActions, HRMMutations};
