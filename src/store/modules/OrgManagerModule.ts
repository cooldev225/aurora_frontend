import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IOrgManager {
  id: number;
}

export interface OrgInfo {
  orgManagerData: Array<IOrgManager>;
  orgManagerSelectData: IOrgManager;
}

@Module
export default class OrganizationModule extends VuexModule implements OrgInfo {
  orgManagerData = [] as Array<IOrgManager>;
  orgManagerSelectData = {} as IOrgManager;

  /**
   * Get current user object
   * @returns AdminList
   */
  get orgManagerList(): Array<IOrgManager> {
    return this.orgManagerData;
  }

  /**
   * Get current user object
   * @returns SelectedorgManagerData
   */
  get orgManagerSelected(): IOrgManager {
    return this.orgManagerSelectData;
  }

  @Mutation
  [Mutations.SET_ORG_MANAGER_LIST](orgManagerData) {
    this.orgManagerData = orgManagerData;
  }

  @Mutation
  [Mutations.SET_SELECT_ORG_MANAGER](data) {
    this.orgManagerSelectData = data;
  }

  @Action
  [Actions.LIST_ORG_MANAGER]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("organization-managers")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_ORG_MANAGER_LIST, data.data);
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
  [Actions.CREATE_ORG_MANAGER](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("organization-managers", payload)
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
  [Actions.UPDATE_ORG_MANAGER](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("organization-managers", item.id, item)
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
  [Actions.DELETE_ORG_MANAGER](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("organization-managers/" + id)
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
}
