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

  LIST_ADMIN: "listAdmin",
  CREATE_ADMIN: "createAdmin",
  DELETE_ADMIN: "deleteAdmin",
  UPDATE_ADMIN: "updateAdmin",

  LIST_ORG: "listOrg",
  CREATE_ORG: "createOrg",
  DELETE_ORG: "deleteOrg",
  UPDATE_ORG: "updateOrg",

  LIST_ORG_MANAGER: "listOrgManager",
  CREATE_ORG_MANAGER: "createOrgManager",
  DELETE_ORG_MANAGER: "deleteOrgManager",
  UPDATE_ORG_MANAGER: "updateOrgManager",

  LIST_ORG_ADMIN: "listOrgAdmin",
  CREATE_ORG_ADMIN: "createOrgAdmin",
  DELETE_ORG_ADMIN: "deleteOrgAdmin",
  UPDATE_ORG_ADMIN: "updateOrgAdmin",

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
  },

  LIST_BIRTH_CODE: "listBirthCode",
  CREATE_BIRTH_CODE: "createBirthCode",
  DELETE_BIRTH_CODE: "deleteBirthCode",
  UPDATE_BIRTH_CODE: "updateBirthCode",

  HEALTH_FUND: {
    LIST: "listHealthFunds",
  },

  LIST_SPECIALIST_TYPE: "listSpecialistType",
  CREATE_SPECIALIST_TYPE: "createSpecialistType",
  DELETE_SPECIALIST_TYPE: "deleteSpecialistType",
  UPDATE_SPECIALIST_TYPE: "updateSpecialistType",

  LIST_SPECIALIST_TITLE: "listSpecialistTitle",
  CREATE_SPECIALIST_TITLE: "createSpecialistTitle",
  DELETE_SPECIALIST_TITLE: "deleteSpecialistTitle",
  UPDATE_SPECIALIST_TITLE: "updateSpecialistTitle",

  PATIENTS: {
    LIST: "listPatients",
    CREATE: "createPatients",
    DELETE: "deletePatients",
    UPDATE: "updatePatients",
  },

  EMPLOYEE: {
    LIST: "listEmployee",
    CREATE: "createEmployee",
    DELETE: "deleteEmployee",
    UPDATE: "updateEmployee",
  },

  // EMPLOYEE_ROLE: {
  //   LIST: "listEmployeeRoles",
  //   CREATE: "createEmployeeRoles",
  //   DELETE: "deleteEmployeeRoles",
  //   UPDATE: "updateEmployeeRoles",
  // },

  LIST_MAKE_PAYMENT: "listPatients",
  CREATE_MAKE_PAYMENT: "createPatients",
  DELETE_MAKE_PAYMENT: "deletePatients",
  UPDATE_MAKE_PAYMENT: "updatePatients",
};

const Mutations = {
  // mutation types
  SET_CLASSNAME_BY_POSITION: "appendBreadcrumb",
  PURGE_AUTH: "logOut",
  SET_AUTH: "setAuth",
  SET_USER: "setUser",
  SET_PASSWORD: "setPassword",
  SET_ERROR: "setError",
  SET_BREADCRUMB_MUTATION: "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG: "setLayoutConfig",
  RESET_LAYOUT_CONFIG: "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG: "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG: "overridePageLayoutConfig",

  SET_SPECIALIST_TYPE_LIST: "setSpecialistTypeList",
  SET_SELECT_SPECALIST_TYPE: "setSelectSpecialistType",

  SET_SPECIALIST_TITLE_LIST: "setSpecialistTitleList",
  SET_SELECT_SPECALIST_TITLE: "setSelectSpecialistTitle",

  SET_ADMIN_LIST: "setAdminList",
  SET_SELECT_ADMIN: "setSelectAdmin",

  SET_ORG_LIST: "setOrgList",
  SET_SELECT_ORG: "setSelectOrg",

  SET_ORG_MANAGER_LIST: "setOrgManagerList",
  SET_SELECT_ORG_MANAGER: "setSelectOrgManager",

  SET_ORG_ADMIN_LIST: "setOrgAdminList",
  SET_SELECT_ORG_ADMIN: "setSelectOrgAdmin",

  SET_CLINICS: {
    LIST: "setClinicsList",
    SELECT: "setSelectClinics",
  },

  SET_BIRTH_CODE_LIST: "setClinicsList",
  SET_SELECT_BIRTH_CODE: "setSelectClinics",

  SET_HEALTH_FUND: {
    LIST: "setHealthFundsList",
  },

  SET_PATIENT: {
    LIST: "setPatientList",
    SELECT: "setSelectPatients",
  },

  SET_EMPLOYEE: {
    LIST: "setEmployeeList",
    SELECT: "setSelectEmployee",
  },

  SET_BOOKING: {
    LIST: "setBookingList",
    SELECT: "setSelectBooking",
  },

  // SET_EMPLOYEE_ROLES: {
  //   LIST: "setEmployeeRolesList",
  //   SELECT: "setSelectBooking",
  // },
};

export { Actions, Mutations };
