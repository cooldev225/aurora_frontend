import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ILetterTemplate {
  id: string;
}

export interface ILetterInfo {
  letterTemplateData: Array<ILetterTemplate>;
  letterTemplateSelectData: ILetterTemplate;
}

@Module
export default class LetterModule extends VuexModule implements ILetterInfo {
  letterTemplateData = [] as Array<ILetterTemplate>;
  letterTemplateSelectData = {} as ILetterTemplate;

  /**
   * Get current letter templates List
   * @returns Patients
   */
  get getLetterTemplateList(): Array<ILetterTemplate> {
    return this.letterTemplateData;
  }

  /**
   * Get current selected letter template
   * @returns Patients
   */
  get getLetterTemplateSelect(): ILetterTemplate {
    return this.letterTemplateSelectData;
  }

  @Mutation
  [Mutations.SET_LETTER_TEMPLATE.LIST](letterTemplateData) {
    this.letterTemplateData = letterTemplateData;
  }

  @Mutation
  [Mutations.SET_LETTER_TEMPLATE.SELECT](letterTemplateData) {
    this.letterTemplateSelectData = letterTemplateData;
  }

  @Action
  [Actions.LETTER_TEMPLATE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("letter-templates")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_LETTER_TEMPLATE.LIST, data.data);
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
  [Actions.LETTER_TEMPLATE.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("letter-templates", item)
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
  [Actions.LETTER_TEMPLATE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("letter-templates", item.id, item)
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
  [Actions.LETTER_TEMPLATE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("letter-templates/" + id)
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
  [Actions.LETTER.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("/patient-documents", data)
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
