import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IAptTypes {
  id: number;
  name: string;
}

export interface AptTypesInfo {
  aptTypesData: Array<IAptTypes>;
  aptTypesSelectData: IAptTypes;
}

@Module
export default class AptTypesModule extends VuexModule implements AptTypesInfo {
  aptTypesData = [] as Array<IAptTypes>;
  aptTypesSelectData = {} as IAptTypes;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptTypesList(): Array<IAptTypes> {
    return this.aptTypesData;
  }

  /**
   * Get current user object
   * @returns SelectedaptTypesData
   */
  get getAptTypesSelected(): IAptTypes {
    return this.aptTypesSelectData;
  }

  @Mutation
  [Mutations.SET_APT.TYPES.LIST](aptTypesData) {
    this.aptTypesData = aptTypesData;
  }

  @Mutation
  [Mutations.SET_APT.TYPES.SELECT](data) {
    this.aptTypesSelectData = data;
  }

  @Action
  [Actions.APT.TYPES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("appointment-types")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_APT.TYPES.LIST, data.data);
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
  [Actions.APT.TYPES.CREATE](item) {
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
  [Actions.APT.TYPES.UPDATE](item) {
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
  [Actions.APT.TYPES.DELETE](id) {
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
