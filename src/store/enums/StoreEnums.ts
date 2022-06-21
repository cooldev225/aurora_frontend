enum Actions {
  // action types
  ADD_BODY_CLASSNAME = "addBodyClassName",
  REMOVE_BODY_CLASSNAME = "removeBodyClassName",
  ADD_BODY_ATTRIBUTE = "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE = "removeBodyAttribute",
  ADD_CLASSNAME = "addClassName",
  VERIFY_AUTH = "verifyAuth",
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  UPDATE_USER = "updateUser",
  FORGOT_PASSWORD = "forgotPassword",
  SET_BREADCRUMB_ACTION = "setBreadcrumbAction",

  LIST_ADMIN = "listAdmin",
  CREATE_ADMIN = "createAdmin",
  DELETE_ADMIN = "deleteAdmin",
  UPDATE_ADMIN = "updateAdmin",

  LIST_ORG = "listOrg",
  CREATE_ORG = "createOrg",
  DELETE_ORG = "deleteOrg",
  UPDATE_ORG = "updateOrg",

  LIST_ORG_MANAGER = "listOrgManager",
  CREATE_ORG_MANAGER = "createOrgManager",
  DELETE_ORG_MANAGER = "deleteOrgManager",
  UPDATE_ORG_MANAGER = "updateOrgManager",

  LIST_SPECIALIST_TYPE = "listSpecialistType",
  CREATE_SPECIALIST_TYPE = "createSpecialistType",
  DELETE_SPECIALIST_TYPE = "deleteSpecialistType",
  UPDATE_SPECIALIST_TYPE = "updateSpecialistType",

  LIST_SPECIALIST_TITLE = "listSpecialistTitle",
  CREATE_SPECIALIST_TITLE = "createSpecialistTitle",
  DELETE_SPECIALIST_TITLE = "deleteSpecialistTitle",
  UPDATE_SPECIALIST_TITLE = "updateSpecialistTitle",
}

enum Mutations {
  // mutation types
  SET_CLASSNAME_BY_POSITION = "appendBreadcrumb",
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",
  SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",

  SET_SPECIALIST_TYPE_LIST = "setSpecialistTypeList",
  SET_SELECT_SPECALIST_TYPE = "setSelectSpecialistType",

  SET_SPECIALIST_TITLE_LIST = "setSpecialistTitleList",
  SET_SELECT_SPECALIST_TITLE = "setSelectSpecialistTitle",

  SET_ADMIN_LIST = "setAdminList",
  SET_SELECT_ADMIN = "setSelectAdmin",

  SET_ORG_LIST = "setOrgList",
  SET_SELECT_ORG = "setSelectOrg",

  SET_ORG_MANAGER_LIST = "setOrgManagerList",
  SET_SELECT_ORG_MANAGER = "setSelectOrgManager",
}

export { Actions, Mutations };
