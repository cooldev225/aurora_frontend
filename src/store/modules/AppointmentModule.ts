import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "@/router";
import { IClinics } from "./ClinicsModule";
export interface IApt {
  id: number;
  clinic: IClinics;
}

export interface AptInfo {
  aptData: Array<IApt>;
  aptSelectData: IApt;
  aptPreAdmissionOrgData: IApt;
  aptPreAdmissionValidateData: IApt;
  aptPreAdmissionValidateMsg: string;
  selectedSpecialistData;
  userAptList: Array<IApt>;
  aptUserSelectedData: IApt;
}

@Module
export default class AppointmentModule extends VuexModule implements AptInfo {
  aptData = [] as Array<IApt>;
  aptSelectData = {} as IApt;
  aptPreAdmissionOrgData = {} as IApt;
  aptPreAdmissionValidateData = {} as IApt;
  aptPreAdmissionValidateMsg = "" as string;
  selectedSpecialistData = null;
  userAptList = [] as Array<IApt>;
  aptUserSelectedData = {} as IApt;
  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptList(): Array<IApt> {
    return this.aptData;
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

  /**
   * Get current user apt list
   * @returns SelectedaptData
   */
  get getUserAptList(): Array<IApt> {
    return this.userAptList;
  }

  /**
   * Get current selected appointment
   * @returns SelectedaptData
   */
  get getAptUserSelected(): IApt {
    return this.aptUserSelectedData;
  }

  @Mutation
  [AppointmentMutations.SET_APT.LIST](aptData) {
    this.aptData = aptData;
  }

  @Mutation
  [AppointmentMutations.SET_APT.SELECT](data) {
    this.aptSelectData = data;
  }

  @Mutation
  [AppointmentMutations.SET_APT.SELECT_SPECIALIST](data) {
    this.selectedSpecialistData = data;
  }

  @Mutation
  [AppointmentMutations.SET_APT.PRE_ADMISSION.ORG](data) {
    this.aptPreAdmissionOrgData = data;
  }

  @Mutation
  [AppointmentMutations.SET_APT.PRE_ADMISSION.VALIDATE.DATA](data) {
    this.aptPreAdmissionValidateData = data;
  }

  @Mutation
  [AppointmentMutations.SET_APT.PRE_ADMISSION.VALIDATE.MSG](data) {
    this.aptPreAdmissionValidateMsg = data;
  }

  @Mutation
  [AppointmentMutations.SET_APT.USER_APT.SELECT](data) {
    this.aptUserSelectedData = data;
  }

  @Action
  [AppointmentActions.LIST](params) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.query("appointments", { params: params })
        .then(({ data }) => {
          this.context.commit(AppointmentMutations.SET_APT.LIST, data.data);
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
  [AppointmentActions.CONFIRMATION_STATUS.UPDATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments/confirmation-status", data.id, {
        confirmation_status: data.confirmed
          ? "CONFIRMED"
          : data.missed
          ? "MISSED"
          : "CANCELED",
        confirmation_status_reason: data.reason,
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
  [AppointmentActions.APT.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("appointments", payload)
        .then(({ data }) => {
          ApiService.get("payments/" + data.data.id)
            .then(({ data }) => {
              this.context.commit(Mutations.SET_MAKE_PAYMENT.SELECT, data.data);
              return data.data;
            })
            .catch(({ response }) => {
              console.log(response.data.error);
            });
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
  [AppointmentActions.APT.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.update("appointments", item.id, item)
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
  [AppointmentActions.COLLECTING_PERSON.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointments/collecting-person", item.id, item)
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
  [AppointmentActions.APT.CHECK_IN](data) {
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
  [AppointmentActions.APT.CHECK_OUT](data) {
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
  [AppointmentActions.PRE_ADMISSION.ORGANIZATION](id) {
    ApiService.get("appointments/pre-admissions/show/" + id)
      .then(({ data }) => {
        this.context.commit(
          AppointmentMutations.SET_APT.PRE_ADMISSION.ORG,
          data.data
        );
        return data.data;
      })
      .catch(({ response }) => {
        console.log(response.data.error);
        // this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [AppointmentActions.PRE_ADMISSION.STORE](data) {
    ApiService.post(
      "appointments/pre-admissions/store/" + data.get("apt_id").toString(),
      data
    )
      .then(({ data }) => {
        return data.message;
      })
      .catch(({ response }) => {
        console.log(response.data.error);
        // this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [AppointmentActions.REFERRAL.UPDATE](data) {
    return ApiService.post(
      "appointments/referral/" + data.appointment_id,
      data.submitData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        console.log(response.data.error);
        return response.data;
      });
  }

  @Action
  [AppointmentActions.PRE_ADMISSION.VALIDATE](params) {
    ApiService.setHeader();
    ApiService.post("appointments/pre-admissions/validate/" + params.id, {
      last_name: params.last_name,
      date_of_birth: moment(params.date_of_birth)
        .format("YYYY-MM-DD")
        .toString(),
    })
      .then(({ data }) => {
        this.context.commit(
          AppointmentMutations.SET_APT.PRE_ADMISSION.VALIDATE.MSG,
          data.message
        );
        this.context.commit(
          AppointmentMutations.SET_APT.PRE_ADMISSION.VALIDATE.DATA,
          data.data
        );
        router.push({
          path: "/appointment_pre_admissions/show/" + params.id + "/form_2",
        });
        return data.message;
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            this.context.commit(
              AppointmentMutations.SET_APT.PRE_ADMISSION.VALIDATE.MSG,
              response.data.message
            );
          });
          //this.context.commit(Mutations.SET_ERROR, response.data.errors);
        } else {
          console.error(response);
        }
      });
  }
}
