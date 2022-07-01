import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IApt {
  id: number;
}

export interface AptInfo {
  aptData: Array<IApt>;
  aptTypeData: Array<IApt>;
  aptSelectData: IApt;
}

@Module
export default class AppointmentModule extends VuexModule implements AptInfo {
  aptData = [] as Array<IApt>;
  aptTypeData = [] as Array<IApt>;
  aptSelectData = {} as IApt;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptList(): Array<IApt> {
    return this.aptData;
  }

  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptTypeList(): Array<IApt> {
    return this.aptTypeData;
  }

  /**
   * Get current user object
   * @returns SelectedaptData
   */
  get getAptSelected(): IApt {
    return this.aptSelectData;
  }

  @Mutation
  [Mutations.SET_APT.LIST](aptData) {
    this.aptData = aptData;
  }

  @Mutation
  [Mutations.SET_APT.TYPE_LIST](aptTypeData) {
    this.aptTypeData = aptTypeData;
  }

  @Mutation
  [Mutations.SET_APT.SELECT](data) {
    this.aptSelectData = data;
  }

  @Action
  [Actions.APT.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("appointments")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.LIST, data.data);
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
  [Actions.APT.TYPE_LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("appointment-types")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.TYPE_LIST, data.data);
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
  [Actions.APT.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("appointments", payload)
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
  [Actions.APT.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments", item.id, item)
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
  [Actions.APT.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("appointments/" + id)
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
