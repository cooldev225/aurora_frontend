import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ILetterTemplate {
  id: string;
}

export interface ILetterInfo {
  letterTemplateData: Array<ILetterTemplate>;
}

@Module
export default class LetterModule extends VuexModule implements ILetterInfo {
  letterTemplateData = [] as Array<ILetterTemplate>;

  /**
   * Get current Patients List
   * @returns Patients
   */
  get getLetterTemplateList(): Array<ILetterTemplate> {
    return this.letterTemplateData;
  }

  @Mutation
  [Mutations.SET_PATIENT.LIST](letterTemplateData) {
    this.letterTemplateData = letterTemplateData;
  }

  @Action
  [Actions.LETTER_TEMPLATE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("letter-templates")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PATIENT.LIST, data.data);
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
