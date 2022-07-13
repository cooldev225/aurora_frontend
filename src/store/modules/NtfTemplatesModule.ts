import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface INtfTemplates {
  id: number;
}

export interface NtfTemplatesInfo {
  ntfTemplatesData: Array<INtfTemplates>;
  ntfTemplatesSelected: INtfTemplates;
}

@Module
export default class NtfTemplatesModule
  extends VuexModule
  implements NtfTemplatesInfo
{
  ntfTemplatesData = [] as Array<INtfTemplates>;
  ntfTemplatesSelected = {} as INtfTemplates;

  /**
   * Get Active NtfTemplates List
   * @returns ntfTemplatesData
   */
  get getNtfTemplatesList(): Array<INtfTemplates> {
    return this.ntfTemplatesData;
  }

  /**
   * Get current user object
   * @returns ntfTemplatesSelected
   */
  get getNtfTemplatesSelected(): INtfTemplates {
    return this.ntfTemplatesSelected;
  }

  @Mutation
  [Mutations.SET_NTF_TEMPLATES.LIST](ntfTemplatesData) {
    this.ntfTemplatesData = ntfTemplatesData;
  }

  @Mutation
  [Mutations.SET_NTF_TEMPLATES.SELECT](data) {
    this.ntfTemplatesSelected = data;
  }

  @Action
  [Actions.NTF_TEMPLATES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("notification-templates")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_NTF_TEMPLATES.LIST, data.data);
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
  [Actions.NTF_TEMPLATES.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("notification-templates", item.id, item)
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
}
