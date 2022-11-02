import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IOrg {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  name: string;
  password: string;
  email: string;
  logo: string;
  max_clinics: number;
  max_employees: number;
  device_name: string;
  otac: string;
  device_expiry: string;
  key_expiry: string;
  mobile_number: string;
}

export interface OrgInfo {
  orgData: Array<IOrg>;
  orgSelectData: IOrg;
}

@Module
export default class OrganisationModule extends VuexModule implements OrgInfo {
  orgData = [] as Array<IOrg>;
  orgSelectData = {} as IOrg;

  /**
   * Get current user object
   * @returns AdminList
   */
  get orgList(): Array<IOrg> {
    return this.orgData;
  }

  /**
   * Get current user object
   * @returns SelectedOrgData
   */
  get getOrgSelected(): IOrg {
    return this.orgSelectData;
  }

  @Mutation
  [Mutations.SET_ORG.LIST](orgData) {
    this.orgData = orgData;
  }

  @Mutation
  [Mutations.SET_ORG.SELECT](data) {
    this.orgSelectData = data;
  }

  @Action
  [Actions.ORG.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("organizations")
        .then(({ data }) => {
          console.log(data.data);
          this.context.commit(Mutations.SET_ORG.LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          // console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.ORG.CREATE](payload) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("organizations", payload, config)
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
  [Actions.ORG.UPDATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("organizations", payload.id, payload.data)
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
  [Actions.ORG.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("organizations/" + id)
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
  [Actions.ORG.SELECT](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("organizations/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_ORG.SELECT, data.data);
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
