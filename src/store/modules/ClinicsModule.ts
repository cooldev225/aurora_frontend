import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IClinics {
  id: number;
}

export interface ClinicsInfo {
  clinicsData: Array<IClinics>;
  clinicsSelectData: IClinics;
}

@Module
export default class ClinicsModule extends VuexModule implements ClinicsInfo {
  clinicsData = [] as Array<IClinics>;
  clinicsSelectData = {} as IClinics;

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

  @Mutation
  [Mutations.SET_CLINICS.LIST](clinicsData) {
    this.clinicsData = clinicsData;
  }

  @Mutation
  [Mutations.SET_CLINICS.SELECT](data) {
    this.clinicsSelectData = data;
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
}
