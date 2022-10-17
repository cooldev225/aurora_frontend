import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { menuItemEmits } from "element-plus";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IClinics {
  id: number;
  minor_id: string;
}

export interface IRooms {
  id: number;
}

export interface ClinicsInfo {
  clinicsData: Array<IClinics>;
  clinicsSelectData: IClinics;
  roomsData: Array<IRooms>;
  roomsSelectData: IRooms;
}

@Module
export default class ClinicsModule extends VuexModule implements ClinicsInfo {
  clinicsData = [] as Array<IClinics>;
  clinicsSelectData = {} as IClinics;
  roomsData = [] as Array<IRooms>;
  roomsSelectData = {} as IRooms;

  /**
   * Get current user object
   * @returns AdminList
   */
  get clinicsList(): Array<IClinics> {
    return this.clinicsData;
  }

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get clinicsSelected(): IClinics {
    return this.clinicsSelectData;
  }

  /**
   * Get current rooms object
   * @returns RoomsList
   */
  get roomsList(): Array<IRooms> {
    return this.roomsData;
  }

  /**
   * Get current user object
   * @returns SelectedclinicsData
   */
  get roomsSelected(): IRooms {
    return this.roomsSelectData;
  }

  @Mutation
  [Mutations.SET_CLINICS.LIST](clinicsData) {
    this.clinicsData = clinicsData;
  }

  @Mutation
  [Mutations.SET_CLINICS.SELECT](data) {
    this.clinicsSelectData = data;
  }

  @Mutation
  [Mutations.SET_CLINICS.LISTROOMS](roomsData) {
    this.roomsData = roomsData;
  }

  @Mutation
  [Mutations.SET_CLINICS.SELECTROOMS](data) {
    this.roomsSelectData = data;
  }

  @Action
  [Actions.CLINICS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("clinics")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_CLINICS.LIST, data.data);
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
  [Actions.CLINICS.CREATE](payload) {
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
  [Actions.CLINICS.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("clinics", item.id, item)
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
  [Actions.CLINICS.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("clinics/" + id)
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
  [Actions.CLINICS.ROOMS.LIST](clinic_id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("clinics/" + clinic_id + "/rooms", "", { id: clinic_id })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_CLINICS.LISTROOMS, data.data);
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
  [Actions.CLINICS.ROOMS.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("clinics/" + payload.clinic_id + "/rooms", payload)
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
  [Actions.CLINICS.ROOMS.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("clinics/" + item.clinic_id + "/rooms", item.id, item)
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
  [Actions.CLINICS.ROOMS.DELETE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("clinics/" + item.clinic_id + "/rooms/" + item.id)
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
