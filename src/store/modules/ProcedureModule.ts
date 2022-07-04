import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IProcedure {
  id: number;
}

export interface ProcedureInfo {
  proQuestionData: Array<IProcedure>;
  proQuestionSelected: IProcedure;
  proQuestionActiveData: Array<IProcedure>;
}

@Module
export default class ProcedureModule
  extends VuexModule
  implements ProcedureInfo
{
  proQuestionData = [] as Array<IProcedure>;
  proQuestionSelected = {} as IProcedure;
  proQuestionActiveData = {} as Array<IProcedure>;

  /**
   * Get Active Anesthetist List
   * @returns proQuestionData
   */
  get getProQuestionList(): Array<IProcedure> {
    return this.proQuestionData;
  }

  /**
   * Get Active Anesthetist Question List
   * @returns proQuestionActiveData
   */
  get getProQuestionActiveList(): Array<IProcedure> {
    return this.proQuestionActiveData;
  }

  /**
   * Get current user object
   * @returns proQuestionSelected
   */
  get getProQuestionSelected(): IProcedure {
    return this.proQuestionSelected;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_QUES.LIST](proQuestionData) {
    this.proQuestionData = proQuestionData;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_QUES.ACTIVE_LIST](proQuestionActiveData) {
    this.proQuestionActiveData = proQuestionActiveData;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_QUES.SELECT](data) {
    this.proQuestionSelected = data;
  }

  @Action
  [Actions.PROCEDURE_QUES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("procedure-questions")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PROCEDURE_QUES.LIST, data.data);
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
  [Actions.PROCEDURE_QUES.ACTIVE_LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("procedure-questions", {
        params: { status: "enabled" },
      })
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_PROCEDURE_QUES.ACTIVE_LIST,
            data.data
          );
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
  [Actions.PROCEDURE_QUES.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("procedure-questions", payload)
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
  [Actions.PROCEDURE_QUES.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("procedure-questions", item.id, item)
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
  [Actions.PROCEDURE_QUES.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("procedure-questions/" + id)
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
