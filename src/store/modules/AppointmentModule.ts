import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IApt {
  id: number;
}

export interface AptInfo {
  aptData: Array<IApt>;
  unconfirmedAptData: Array<IApt>;
  waitlistedAptData: Array<IApt>;
  unapprovedAptData: Array<IApt>;
  cancellationAptData: Array<IApt>;
  aptSelectData: IApt;
}

@Module
export default class AppointmentModule extends VuexModule implements AptInfo {
  aptData = [] as Array<IApt>;
  unconfirmedAptData = [] as Array<IApt>;
  waitlistedAptData = [] as Array<IApt>;
  unapprovedAptData = [] as Array<IApt>;
  cancellationAptData = [] as Array<IApt>;
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
  get getUnconfirmedAptList(): Array<IApt> {
    return this.unconfirmedAptData;
  }

  /**
   * Get current user object
   * @returns AdminList
   */
  get getWaitlistedAptList(): Array<IApt> {
    return this.waitlistedAptData;
  }
  /**
   * Get current user object
   * @returns AdminList
   */
  get getUnapprovedAptList(): Array<IApt> {
    return this.unapprovedAptData;
  }
  /**
   * Get current user object
   * @returns AdminList
   */
  get getCancellationAptList(): Array<IApt> {
    return this.cancellationAptData;
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
  [Mutations.SET_APT.UNCONFIRMED.LIST](aptData) {
    this.unconfirmedAptData = aptData;
  }

  @Mutation
  [Mutations.SET_APT.WAITLISTED.LIST](aptData) {
    this.waitlistedAptData = aptData;
  }

  @Mutation
  [Mutations.SET_APT.UNAPPROVED.LIST](aptData) {
    this.unapprovedAptData = aptData;
  }

  @Mutation
  [Mutations.SET_APT.CANCELLATION.LIST](aptData) {
    this.cancellationAptData = aptData;
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
  [Actions.APT.UNCONFIRMED.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("appointments", { params: { status: "unconfirmed" } })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.UNCONFIRMED.LIST, data.data);
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
  [Actions.APT.CANCELLATION.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("appointments", { params: { status: "cancellation" } })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.CANCELLATION.LIST, data.data);
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
  [Actions.APT.WAITLISTED.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("appointments", { params: { status: "wait-listed" } })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.WAITLISTED.LIST, data.data);
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
  [Actions.APT.UNAPPROVED.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("appointments", { params: { status: "unapproved" } })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.UNAPPROVED.LIST, data.data);
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
