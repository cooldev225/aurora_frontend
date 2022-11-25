import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import {
  AppointmentActions,
  AppointmentMutations,
} from "../enums/StoreAppointmentEnums";
import IAppointmentType from "../interfaces/IAppointmentType";

export interface AptTypesInfo {
  aptTypesData: Array<IAppointmentType>;
  aptTypesSelectData: IAppointmentType;
}

@Module
export default class AptTypesModule extends VuexModule implements AptTypesInfo {
  aptTypesData = [] as Array<IAppointmentType>;
  aptTypesSelectData = {} as IAppointmentType;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptTypesList(): Array<IAppointmentType> {
    return this.aptTypesData;
  }

  /**
   * Get current user object
   * @returns SelectedaptTypesData
   */
  get getAptTypesSelected(): IAppointmentType {
    return this.aptTypesSelectData;
  }

  @Mutation
  [AppointmentMutations.SET_APT.TYPES.LIST](aptTypesData) {
    this.aptTypesData = aptTypesData;
  }

  @Mutation
  [AppointmentMutations.SET_APT.TYPES.SELECT](data) {
    this.aptTypesSelectData = data;
  }

  @Action
  [AppointmentActions.APPOINTMENT_TYPES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("appointment-types")
        .then(({ data }) => {
          this.context.commit(
            AppointmentMutations.SET_APT.TYPES.LIST,
            data.data
          );
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
  [AppointmentActions.APPOINTMENT_TYPES.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("appointment-types", item)
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
  [AppointmentActions.APPOINTMENT_TYPES.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("appointment-types", item.id, item)
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
  [AppointmentActions.APPOINTMENT_TYPES.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("appointment-types/" + id)
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
