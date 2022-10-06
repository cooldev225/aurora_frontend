/* eslint-disable prettier/prettier */
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
    UPDATE_SIGNATURE: "updateSignature",
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
    SELECT: "selectOrg",
    FILE: "file",
  },

  ORG_ADMIN: {
    LIST: "listOrgAdmin",
    CREATE: "createOrgAdmin",
    DELETE: "deleteOrgAdmin",
    UPDATE: "updateOrgAdmin",
    UPLOAD_IMAGE: "uploadImage",
    LOAD_ORGANIZATION_DATA: "loadOrganizationData",
    ORGANIZATION: {
      SETTINGS: {
        UPDATE: "updateOrganizationSettings"
      },
      PRE_ADMISSION_SECTION: {
        LIST: "listPreAdmissionSections",
        UPDATE: "updatePreAdmissionSections",
      }
    }
  },

  CLINICS: {
    LIST: "listClinics",
    CREATE: "createClinics",
    DELETE: "deleteClinics",
    UPDATE: "updateClinics",
    ROOMS: {
      LIST: "listClinicsRooms",
      CREATE: "createClinicsRooms",
      DELETE: "deleteClinicsRooms",
      UPDATE: "updateClinicsRooms",
    }
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
    SEARCH: {
      LIST: "listSearchSpecialist",
    },
  },


  EMPLOYEE: {
    LIST: "listEmployee",
    CREATE: "createEmployee",
    DELETE: "deleteEmployee",
    UPDATE: "updateEmployee",
    UPDATE_PASSWORD: "updateEmployeePassword",
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


  REFERRAL_DOCTOR: {
    LIST: "searchReferralDoctor", // (get) 'referring-doctors'
    CREATE: "createReferralDoctor",
    DELETE: "deleteReferralDoctor",
    UPDATE: "updateReferralDoctor",
  },

  LETTER_TEMPLATE: {
    LIST: "listLetterTemplate",
    CREATE: "createLetterTemplate",
    UPDATE: "updateLetterTemplate",
    DELETE: "deleteLetterTemplate",
  },

  LETTER: {
    CREATE: "createLetter",
  },


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
    SEARCH: {
      SEARCH_LIST: "setSearchSpecialists",
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
    ORGNIZATION: "settingOrganization"
  },

  SET_ORG_ADMIN: {
    LIST: "setOrgAdminList",
    SELECT: "setSelectOrgAdmin",
  },

  SET_CLINICS: {
    LIST: "setClinicsList",
    SELECT: "setSelectClinics",
    LISTROOMS: "setClinicsRoomsList",
    SELECTROOMS: "setSelectClinicsRooms",
  },

  SET_BIRTH_CODE: {
    LIST: "setClinicsList",
    SELECT: "setSelectClinics",
  },

  SET_HEALTH_FUND: {
    LIST: "setHealthFundsList",
  },

  

  SET_EMPLOYEE: {
    LIST: "setEmployeeList",
    SELECT: "setSelectEmployee",
  },


  SET_ANESTHETIST_QUES: {
    LIST: "setAnesQuesList",
    SELECT: "setSelectAnesQuesSelect",
    ACTIVE_LIST: "setAnesQuesActiveList",
  },



  SET_REFERRAL_DOCTOR: {
    LIST: "setReferralDoctor",
  },

  SET_LETTER_TEMPLATE: {
    LIST: "setLetterTemplate",
    SELECT: "setLetterTemplateSelect",
  },


  SET_REPORT_TEMPLATES: {
    LIST: "setReportTemplates",
    SELECT: "setSelectReportTemplate",
  },

  SET_REPORT_APPOINTMENTS: {
    LIST: "setReportAppointments",
    SELECT: "setSelectReportAppointment",
  },

  SET_MAILS: {
    INBOX: "setInboxMails",
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

  
  SET_MAKE_PAYMENT: {
    LIST: "setMakePayment",
    SELECT: "setSelectMakePayment",
  },

};

export { Actions, Mutations };
