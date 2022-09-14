import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IOrgAdmin {
  id: number;
}

export interface OrgAdminInfo {
  orgAdminData: Array<IOrgAdmin>;
  orgAdminSelectData: IOrgAdmin;
}

@Module
export default class OrgAdminModule extends VuexModule implements OrgAdminInfo {
  orgAdminData = [] as Array<IOrgAdmin>;
  orgAdminSelectData = {} as IOrgAdmin;

  /**
   * Get current user object
   * @returns AdminList
   */
  get orgAdminList(): Array<IOrgAdmin> {
    return this.orgAdminData;
  }

  /**
   * Get current user object
   * @returns SelectedorgAdminData
   */
  get orgAdminSelected(): IOrgAdmin {
    return this.orgAdminSelectData;
  }

  @Mutation
  [Mutations.SET_ORG_ADMIN.LIST](orgAdminData) {
    this.orgAdminData = orgAdminData;
  }

  @Mutation
  [Mutations.SET_ORG_ADMIN.SELECT](data) {
    this.orgAdminSelectData = data;
  }

  @Action
  [Actions.ORG_ADMIN.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("organization-admins")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_ORG_ADMIN.LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("organization-admins", payload)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("organization-admins", item.id, item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("organization-admins/" + id)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.ORGANIZATION.SETTINGS.UPDATE](data) {
    console.log(data.submitData);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("organizations/settings", data.submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.ORGANIZATION.PRE_ADMISSION_SECTION.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("pre-admission-sections")
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG_ADMIN.ORGANIZATION.PRE_ADMISSION_SECTION.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post("pre-admission-sections", item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
