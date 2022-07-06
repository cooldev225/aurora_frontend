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

export interface ISearchVariable {
  date: string;
  specialists: Array<string>;
}

export interface BookingInfo {
  bookingData: IBookingData;
  filteredData: IBookingData;
  availableSPT: IBookingData;
  searchVal: ISearchVariable;
  // clinicsSelectData: IApt;
}

@Module
export default class BooingModule extends VuexModule implements BookingInfo {
  bookingData = {} as IBookingData;
  filteredData = {} as IBookingData;
  availableSPT = {} as IBookingData;
  searchVal = {} as ISearchVariable;
  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get bookingDatas(): IBookingData {
    return this.bookingData;
  }

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get getFilteredData(): IBookingData {
    return this.filteredData;
  }

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get getAvailableSPTData(): IBookingData {
    return this.availableSPT;
  }

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get getSearchVariable(): ISearchVariable {
    return this.searchVal;
  }

  // @Mutation
  // [Mutations.SET_CLINICS.LIST](clinicsData) {
  //   this.clinicsData = clinicsData;
  // }

  @Mutation
  [Mutations.SET_BOOKING.SELECT](data: IBookingData) {
    this.bookingData = data;
  }

  @Mutation
  [Mutations.SET_BOOKING.SEARCH.DATE](data: IBookingData) {
    this.availableSPT = data;
  }

  @Mutation
  [Mutations.SET_BOOKING.SEARCH.SPECIALISTS](data: IBookingData) {
    this.filteredData = data;
  }

  @Mutation
  [Mutations.SET_BOOKING.SEARCH.VARIABLE](data: ISearchVariable) {
    this.searchVal = data;
  }

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

  @Action
  [Actions.BOOKING.SEARCH.DATE](payload) {
    this.context.commit(Mutations.SET_BOOKING.SEARCH.VARIABLE, payload);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("work-hours", { params: payload })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_BOOKING.SEARCH.DATE, data.data);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.BOOKING.SEARCH.SPECIALISTS](payload) {
    this.context.commit(Mutations.SET_BOOKING.SEARCH.VARIABLE, payload);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("work-hours", { params: payload })
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_BOOKING.SEARCH.SPECIALISTS,
            data.data
          );
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
