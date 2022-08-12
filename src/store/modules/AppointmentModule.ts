import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import moment from "moment";
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
  aptPreAdmissionOrgData: IApt;
  aptPreAdmissionValidateData: IApt;
  aptPreAdmissionValidateMsg: string;
  selectedSpecialistData;
  aptDataById: Array<IApt>;
}

@Module
export default class AppointmentModule extends VuexModule implements AptInfo {
  aptData = [] as Array<IApt>;
  unconfirmedAptData = [] as Array<IApt>;
  waitlistedAptData = [] as Array<IApt>;
  unapprovedAptData = [] as Array<IApt>;
  cancellationAptData = [] as Array<IApt>;
  aptSelectData = {} as IApt;
  aptPreAdmissionOrgData = {} as IApt;
  aptPreAdmissionValidateData = {} as IApt;
  aptPreAdmissionValidateMsg = "" as string;
  selectedSpecialistData = null;
  aptDataById = [] as Array<IApt>;
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
  get getAptListById(): Array<IApt> {
    return this.aptDataById;
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

  /**
   * Get current user object
   * @returns Selected specialist data
   */
  get getSelectedSpecialist() {
    return this.selectedSpecialistData;
  }

  /**
   * Get current user object
   * @returns SelectedaptData
   */
  get getAptPreAdmissionOrg(): IApt {
    return this.aptPreAdmissionOrgData;
  }

  /**
   * Get current user object
   * @returns SelectedaptData
   */
  get getAptPreAdmissionValidateData(): IApt {
    return this.aptPreAdmissionValidateData;
  }

  /**
   * Get current user object
   * @returns SelectedaptData
   */
  get getAptPreAdmissionValidateMsg(): string {
    return this.aptPreAdmissionValidateMsg;
  }

  @Mutation
  [Mutations.SET_APT.LIST](aptData) {
    this.aptData = aptData;
  }

  @Mutation
  [Mutations.SET_APT.LISTBYID](aptDataById) {
    this.aptDataById = aptDataById;
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

  @Mutation
  [Mutations.SET_APT.SELECT_SPECIALIST](data) {
    this.selectedSpecialistData = data;
  }

  @Mutation
  [Mutations.SET_APT.PRE_ADMISSION.ORG](data) {
    this.aptPreAdmissionOrgData = data;
  }

  @Mutation
  [Mutations.SET_APT.PRE_ADMISSION.VALIDATE.DATA](data) {
    this.aptPreAdmissionValidateData = data;
  }

  @Mutation
  [Mutations.SET_APT.PRE_ADMISSION.VALIDATE.MSG](data) {
    this.aptPreAdmissionValidateMsg = data;
  }

  @Action
  [Actions.APT.LISTBYID](id) {
    console.log(id);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/appointments/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.LISTBYID, data.data);
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
  [Actions.APT.CANCELLATION.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments/cancel", data.id, {
        missed: data.missed,
        reason: data.reason,
      })
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

  @Action
  [Actions.APT.CHECK_IN](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments/check-in", data.id, data)
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
  [Actions.APT.CHECK_OUT](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments/check-out", data.id, {})
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
  [Actions.APT.PRE_ADMISSION.ORG](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("appointment_pre_admissions/show/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.PRE_ADMISSION.ORG, data.data);
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
  [Actions.APT.PRE_ADMISSION.STORE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post(
        "appointment_pre_admissions/store/" + data.get("apt_id").toString(),
        data
      )
        .then(({ data }) => {
          return data.message;
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
  [Actions.APT.PRE_ADMISSION.VALIDATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("appointment_pre_admissions/validate/" + data.apt_id, {
        last_name: data.last_name,
        date_of_birth: moment(data.date_of_birth)
          .format("YYYY-MM-DD")
          .toString(),
      })
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_APT.PRE_ADMISSION.VALIDATE.MSG,
            data.message
          );
          this.context.commit(
            Mutations.SET_APT.PRE_ADMISSION.VALIDATE.DATA,
            data.data
          );
          return data.message;
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
