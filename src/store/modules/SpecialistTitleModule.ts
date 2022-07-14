import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ISpecialistTitle {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface SpecalistTitleInfo {
  specTitleData: Array<ISpecialistTitle>;
  specTitleSelectData: ISpecialistTitle;
}

@Module
export default class SpecialistTitleModule
  extends VuexModule
  implements SpecalistTitleInfo
{
  specTitleData = [] as Array<ISpecialistTitle>;
  specTitleSelectData = {} as ISpecialistTitle;

  /**
   * Get current user object
   * @returns SpecalistTitleList
   */
  get specTitleList(): Array<ISpecialistTitle> {
    return this.specTitleData;
  }

  /**
   * Get current user object
   * @returns SpecalistTitleList
   */
  get getSpecTitleSelected(): ISpecialistTitle {
    return this.specTitleSelectData;
  }

  @Mutation
  [Mutations.SET_SPECIALIST.TITLE.LIST](specTitleData) {
    this.specTitleData = specTitleData;
  }

  @Mutation
  [Mutations.SET_SPECIALIST.TITLE.SELECT](data) {
    this.specTitleSelectData = data;
  }

  @Action
  [Actions.SPECIALIST.TITLE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("specialist-titles")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SPECIALIST.TITLE.LIST, data.data);
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
  [Actions.SPECIALIST.TITLE.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("specialist-titles", payload)
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
  [Actions.SPECIALIST.TITLE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("specialist-titles", item.id, item)
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
  [Actions.SPECIALIST.TITLE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("specialist-titles/" + id)
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
