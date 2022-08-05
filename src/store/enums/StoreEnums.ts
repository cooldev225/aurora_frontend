const Actions = {
  // action types
  ADD_BODY_CLASSNAME: "addBodyClassName",
  REMOVE_BODY_CLASSNAME: "removeBodyClassName",
  ADD_BODY_ATTRIBUTE: "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE: "removeBodyAttribute",
  ADD_CLASSNAME: "addClassName",
  VERIFY_AUTH: "verifyAuth",
  LOGIN: "login",
  LOGOUT: "logout",
  REGISTER: "register",
  UPDATE_USER: "updateUser",
  FORGOT_PASSWORD: "forgotPassword",
  SET_BREADCRUMB_ACTION: "setBreadcrumbAction",
  USER_LIST: "userList",

  PROFILE: {
    VIEW: "viewProfile",
    UPDATE: "updateProfile",
    UPDATE_PASSWORD: "updatePassword",
  },

  ADMIN: {
    LIST: "listAdmin",
    CREATE: "createAdmin",
    DELETE: "deleteAdmin",
    UPDATE: "updateAdmin",
  },

  ORG: {
    LIST: "listOrg",
    CREATE: "createOrg",
    DELETE: "deleteOrg",
    UPDATE: "updateOrg",
  },

  ORG_MANAGER: {
    LIST: "listOrgManager",
    CREATE: "createOrgManager",
    DELETE: "deleteOrgManager",
    UPDATE: "updateOrgManager",
  },

  ORG_ADMIN: {
    LIST: "listOrgAdmin",
    CREATE: "createOrgAdmin",
    DELETE: "deleteOrgAdmin",
    UPDATE: "updateOrgAdmin",
  },

  CLINICS: {
    LIST: "listClinics",
    CREATE: "createClinics",
    DELETE: "deleteClinics",
    UPDATE: "updateClinics",
  },

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

  BIRTH_CODE: {
    LIST: "listBirthCode",
    CREATE: "createBirthCode",
    DELETE: "deleteBirthCode",
    UPDATE: "updateBirthCode",
  },

  HEALTH_FUND: {
    LIST: "listHealthFunds",
  },

  SPECIALIST: {
    LIST: "listSpecialists",
    CREATE: "createSpecialists",
    DELETE: "deleteSpecialists",
    UPDATE: "updateSpecialists",

    TYPE: {
      LIST: "listSpecialistType",
      CREATE: "createSpecialistType",
      DELETE: "deleteSpecialistType",
      UPDATE: "updateSpecialistType",
    },

    TITLE: {
      LIST: "listSpecialistTitle",
      CREATE: "createSpecialistTitle",
      DELETE: "deleteSpecialistTitle",
      UPDATE: "updateSpecialistTitle",
    },
  },

  PATIENTS: {
    LIST: "listPatients",
    CREATE: "createPatients",
    DELETE: "deletePatients",
    UPDATE: "updatePatients",
    VIEW: "viewPatient",
  },

  PATIENTS_RECALL: {
    LIST: "listPatientsRecall",
    CREATE: "createPatientsRecall",
    UPDATE: "updatePatientsRecall",
    VIEW: "viewPatientsRecall",
  },

  EMPLOYEE: {
    LIST: "listEmployee",
    CREATE: "createEmployee",
    DELETE: "deleteEmployee",
    UPDATE: "updateEmployee",
  },

  ANESTHETIST_QUES: {
    LIST: "listAnesthetistQues",
    CREATE: "createAnesthetistQues",
    DELETE: "deleteAnesthetistQues",
    UPDATE: "updateAnesthetistQues",
    ACTIVE_LIST: "listActiveAnesthetistQues",
  },

  NTF_TEMPLATES: {
    LIST: "listNtfyTemplates",
    UPDATE: "updateNtfyTemplates",
  },

  PROCEDURE_QUES: {
    LIST: "listProcedureQues",
    CREATE: "createProcedureQues",
    DELETE: "deleteProcedureQues",
    UPDATE: "updateProcedureQues",
    ACTIVE_LIST: "listActiveProcedureQues",
  },

  REPORT_TEMPLATES: {
    LIST: "listReportTemplate",
    CREATE: "createReportTemplate",
    UPDATE: "updateReportTemplate",
    DELETE: "deleteReportTemplate",
  },

  MAILS: {
    LIST: "listMail",
    VIEW: "viewMail",
    COMPOSE: "composeMail",
    SEND: "sendMail",
    SEND_DRAFT: "mailSendDraft",
    STAR: "starMail",
    UN_STAR: "unStarMail",
    DELETE: "deleteMail",
    RESTORE: "restoreMail",
    DELETE_DRAFT: "deleteMailDraft",
    UPDATE_DRAFT: "updateMailDraft",
  },

  APT_TIME_REQUIREMENT: {
    LIST: "listAptTimeRequirement",
    CREATE: "createAptTimeRequirement",
    DELETE: "deleteAptTimeRequirement",
    UPDATE: "updateAptTimeRequirement",
  },

  APT: {
    LIST: "listApt",
    CREATE: "createApt",
    DELETE: "deleteApt",
    UPDATE: "updateApt",
    TYPES: {
      LIST: "listAptTypes",
      CREATE: "createAptTypes",
      UPDATE: "updateAptTypes",
      DELETE: "deleteAptTypes",
    },
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
    CANCELLATION: {
      CREATE: "createCancellationApt",
      LIST: "listCancellationApt",
      DELETE: "deleteCancellationApt",
      UPDATE: "updateCancellationApt",
    },
    CHECK_IN: "checkInApt",
    CHECK_OUT: "checkOutApt",
    PRE_ADMISSION: {
      ORG: "listAptPreAdmissionOrg",
      VALIDATE: "validateAptPreAdmission",
      CREATE: "createAptPreAdmission",
    },
  },

  REFERRAL_DOCTOR: {
    LIST: "searchReferralDoctor",
  },

  // EMPLOYEE_ROLE: {
  //   LIST: "listEmployeeRoles",
  //   CREATE: "createEmployeeRoles",
  //   DELETE: "deleteEmployeeRoles",
  //   UPDATE: "updateEmployeeRoles",
  // },

  MAKE_PAYMENT: {
    LIST: "listMakePayment",
    VIEW: "viewMakePayment",
    CREATE: "createMakePayment",
  },
};

const Mutations = {
  // mutation types
  SET_CLASSNAME_BY_POSITION: "appendBreadcrumb",
  PURGE_AUTH: "logOut",
  SET_AUTH: "setAuth",
  SET_USER: "setUser",
  SET_PASSWORD: "setPassword",
  SET_PROFILE: "setProfile",
  SET_ERROR: "setError",
  SET_BREADCRUMB_MUTATION: "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG: "setLayoutConfig",
  RESET_LAYOUT_CONFIG: "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG: "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG: "overridePageLayoutConfig",
  SET_USER_LIST: "setUserList",

  SET_SPECIALIST: {
    LIST: "setSpecialists",
    SELECT: "setSelectSpecialists",

    TYPE: {
      LIST: "setSpecialistTypeList",
      SELECT: "setSelectSpecialistType",
    },

    TITLE: {
      LIST: "setSpecialistTitleList",
      SELECT: "setSelectSpecialistTitle",
    },
  },

  SET_ADMIN: {
    LIST: "setAdminList",
    SELECT: "setSelectAdmin",
  },

  SET_ORG: {
    LIST: "setOrgList",
    SELECT: "setSelectOrg",
  },

  SET_ORG_MANAGER: {
    LIST: "setOrgManagerList",
    SELECT: "setSelectOrgManager",
  },

  SET_ORG_ADMIN: {
    LIST: "setOrgAdminList",
    SELECT: "setSelectOrgAdmin",
  },

  SET_CLINICS: {
    LIST: "setClinicsList",
    SELECT: "setSelectClinics",
  },

  SET_BIRTH_CODE: {
    LIST: "setClinicsList",
    SELECT: "setSelectClinics",
  },

  SET_HEALTH_FUND: {
    LIST: "setHealthFundsList",
  },

  SET_PATIENT: {
    LIST: "setPatientsList",
    SELECT: "setSelectPatient",
  },

  SET_PATIENT_RECALL: {
    LIST: "setPatientsRecallList",
    SELECT: "setSelectPatientRecall",
  },

  SET_EMPLOYEE: {
    LIST: "setEmployeeList",
    SELECT: "setSelectEmployee",
  },

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

  SET_ANESTHETIST_QUES: {
    LIST: "setAnesQuesList",
    SELECT: "setSelectAnesQuesSelect",
    ACTIVE_LIST: "setAnesQuesActiveList",
  },

  SET_PROCEDURE_QUES: {
    LIST: "setProQuesList",
    SELECT: "setSelectProQuesSelect",
    ACTIVE_LIST: "setProQuesActiveList",
  },

  SET_APT: {
    LIST: "setApt",
    SELECT: "setSelectApt",
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
    CANCELLATION: {
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
  },

  SET_REFERRAL_DOCTOR: {
    LIST: "setReferralDoctor",
  },

  SET_MAKE_PAYMENT: {
    LIST: "setMakePayment",
    SELECT: "setSelectMakePayment",
  },

  SET_REPORT_TEMPLATES: {
    LIST: "setReportTemplates",
    SELECT: "setSelectReportTemplate",
  },

  SET_MAILS: {
    INBOX: "setInboxMails",
    STARRED: "setStarredMails",
    DRAFT: "setDraftMails",
    SENT: "setSentMails",
    TRASH: "setTrashMails",
    SELECT: "setSelectedMail",
  },

  SET_APT_TIME_REQUIREMENT: {
    LIST: "setAptTimeRequirement",
    SELECT: "setSelectAptTimeRequirement",
  },

  SET_NTF_TEMPLATES: {
    LIST: "setNtfTemplates",
    SELECT: "setSelectNtfTemplates",
  },

  // SET_EMPLOYEE_ROLES: {
  //   LIST: "setEmployeeRolesList",
  //   SELECT: "setSelectBooking",
  // },
};

export { Actions, Mutations };
