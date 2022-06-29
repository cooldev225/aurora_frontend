import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IWorkhour {
  available: boolean;
  locations: Array<number>;
  time_slot: Array<string>;
}

export interface ISpecialist {
  id: string;
  name: string;
  work_hours: Array<IWorkhour>;
}

export interface IBookingData {
  time_slots: Array<string>;
  ava_specialist: Array<ISpecialist>;
  selected_specialist: ISpecialist;
}

export interface BookingInfo {
  bookingData: IBookingData;
  // clinicsSelectData: IApt;
}

@Module
export default class BooingModule extends VuexModule implements BookingInfo {
  bookingData = {} as IBookingData;

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get bookingDatas(): IBookingData {
    return this.bookingData;
  }

  // @Mutation
  // [Mutations.SET_CLINICS.LIST](clinicsData) {
  //   this.clinicsData = clinicsData;
  // }

  @Mutation
  [Mutations.SET_BOOKING.SELECT](data: IBookingData) {
    this.bookingData = data;
  }

  // @Action
  // [Actions.CLINICS.LIST]() {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     ApiService.get("clinics")
  //       .then(({ data }) => {
  //         this.context.commit(Mutations.SET_CLINICS.LIST, data.data);
  //         return data.data;
  //       })
  //       .catch(({ response }) => {
  //         console.log(response.data.error);
  //         // this.context.commit(Mutations.SET_ERROR, response.data.errors);
  //       });
  //   } else {
  //     this.context.commit(Mutations.PURGE_AUTH);
  //   }
  // }

  @Action
  [Actions.BOOKING.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("clinics", payload)
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
