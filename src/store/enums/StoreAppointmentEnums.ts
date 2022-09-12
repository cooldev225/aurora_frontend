/* eslint-disable prettier/prettier */
const AppointmentActions = {
  BOOKING: {
    LIST: "listBooking",
    CREATE: "createBooking",
    DELETE: "deleteBooking",
    UPDATE: "updateBooking",
    SEARCH: {
      DATE: "searchBookingByDate",
      SPECIALISTS: "searchBookingBySPT",
      NEXT_APT: "searchNextApt",
    },
  },

  APPOINTMENT: {
    REFERRAL: {
      UPDATE:   "updateAppointmentReferral", // (put)    'appointments/referral/{appointment}'
      VIEW:     "viewAppointmentReferral",   // (post)   'appointments/referral/file'
    },
    PRE_ADMISSION: {
      VIEW:     "viewPreAdmissionForm",      // (post)   'appointment/procedure-approvals/pdf/{appointment}'
    },
    APPOINTMENT_TYPES:{
      LIST:   "listAptTypes",               //  (get)    '/appointment-types'
      CREATE: "createAptTypes",             //  (post)   '/appointment-types'
      UPDATE: "updateAptTypes",             //  (put)    '/appointment-types/{appointmentType}'
      DELETE: "deleteAptTypes",             //  (delete) '/appointment-types/{appointmentType}'
    },
    PROCEDURE_APPROVAL: {
      LIST: "listProcedureApproval",        //  (get)    '/procedure-approvals'
      UPDATE: "updateProcedureApproval",    //  (put)    '/appointment/procedure-approvals/{appointment}'
      UPLOAD: "uploadProcedureApproval",    //  (put)    '/appointment/procedure-approvals/upload/{appointment}'
    },
    CONFIRMATION_STATUS: {   
      LIST: "listCancellationApt",          //  (get) '/appointments/confirmation-status'
      UPDATE: "updateCancellationApt",      //  (put) '/appointments/confirmation-status/{appointment}'
    },
  },

  APT: {
    LIST: "listApt",
    LISTBYID: "listAptById",
    CREATE: "createApt",
    DELETE: "deleteApt",
    UPDATE: "updateApt",
 
    UNCONFIRMED: {
      LIST: "listUnconfirmedApt",
      DELETE: "deleteUnconfirmedApt",
      UPDATE: "updateUnconfirmedApt",
    },
    WAITLISTED: {
      LIST: "listWaitlistedApt",
      DELETE: "deleteWaitlistedApt",
      UPDATE: "updateWaitlistedApt",
    },
    UNAPPROVED: {
      LIST: "listUnapprovedApt",
      DELETE: "deleteUnapprovedApt",
      UPDATE: "updateUnapprovedApt",
    },
    
    CHECK_IN: "checkInApt",
    CHECK_OUT: "checkOutApt",
    PRE_ADMISSION: {
      ORG: "listAptPreAdmissionOrg",
      VALIDATE: "validateAptPreAdmission",
      STORE: "createAptPreAdmission",
    },
    USER_APT: {
      LIST: "userAptList",
    },
  },

 
};

const AppointmentMutations = {

  SET_BOOKING: {
    LIST: "setBookingList",
    SELECT: "setSelectBooking",
    SEARCH: {
      VARIABLE: "setSearchVariable",
      DATE: "setFilteredBookingByDate",
      SPECIALISTS: "setFilteredBookingBySPT",
      NEXT_APTS: "setNextAptList",
    },
  },

  SET_APT: {
    LIST: "setApt",
    LISTBYID: "setAptById",
    SELECT: "setSelectApt",
    SELECT_SPECIALIST: "setSelectedSpecialist",
    TYPES: {
      LIST: "setAptType",
      SELECT: "setSelectAptType",
    },
    UNCONFIRMED: {
      LIST: "setUnConfirmedApt",
      SELECT: "setSelectUnconfirmedApt",
    },
    WAITLISTED: {
      LIST: "setWaitlistedApt",
      SELECT: "setSelectWaitlistedApt",
    },
    UNAPPROVED: {
      LIST: "setUnapprovedApt",
      SELECT: "setSelectUnapprovedApt",
    },
    CONFIRMATION_STATUS: {
      LIST: "setCancellationApt",
      SELECT: "setSelectCancellationApt",
    },
    PRE_ADMISSION: {
      ORG: "setAptPreAdmissionOrg",
      VALIDATE: {
        DATA: "setValidateAptPreAdmission",
        MSG: "setValidateAptPreAdmissionMsg",
      },
    },
    USER_APT: {
      LIST: "setUserAptList",
      SELECT: "setSelectUserApt",
    },
  },
  
  SET_PROCEDURE_APPROVAL: {
    LIST: "setProcedureApprovalsList",
    DATA: "setProcedureApproval",
  },

};

export { AppointmentActions, AppointmentMutations };
