import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ISpecialistType {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface SpecalistTypeInfo {
  specTypeData: Array<ISpecialistType>;
  specTypeSelectData: ISpecialistType;
}

@Module
export default class SpecialistTypeModule
  extends VuexModule
  implements SpecalistTypeInfo
{
  specTypeData = [] as Array<ISpecialistType>;
  specTypeSelectData = {} as ISpecialistType;

  /**
   * Get current user object
   * @returns SpecalistTypeList
   */
  get specTypeList(): Array<ISpecialistType> {
    return this.specTypeData;
  }

  /**
   * Get current user object
   * @returns SpecalistTypeList
   */
  get getSpecTypeSelected(): ISpecialistType {
    return this.specTypeSelectData;
  }

  @Mutation
  [Mutations.SET_SPECIALIST_TYPE_LIST](specTypeData) {
    this.specTypeData = specTypeData;
  }

  @Mutation
  [Mutations.SET_SELECT_SPECALIST_TYPE](data) {
    this.specTypeSelectData = data;
  }

  @Action
  [Actions.SPECIALIST.TYPE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("specialist-types")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SPECIALIST_TYPE_LIST, data.data);
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
  [Actions.SPECIALIST.TYPE.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("specialist-types", payload)
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
  [Actions.SPECIALIST.TYPE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("specialist-types", item.id, item)
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
  [Actions.SPECIALIST.TYPE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("specialist-types/" + id)
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
