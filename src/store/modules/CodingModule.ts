import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import { Mutations } from "@/store/enums/StoreEnums";
import axios from "axios";
import { Module, Action, VuexModule, Mutation } from "vuex-module-decorators";

interface IApt {
  id: number;
}

interface AptInfo {
  aptData: Array<IApt>;
  aptSelectData: IApt;
}

@Module
export default class CodingModule extends VuexModule implements AptInfo {
  aptData = [] as Array<IApt>;
  aptSelectData = {} as IApt;

  /**
   * Get list of appointment to be coded
   * @returns AdminList
   */
  get getCodingAptList(): Array<IApt> {
    return this.aptData;
  }

  /**
   * Get selected appointment to be coded
   * @returns AdminData
   */
  get getCodingAptSelect(): IApt {
    return this.aptSelectData;
  }

  @Mutation
  [CodingMutations.SET_LIST](aptData) {
    this.aptData = aptData;
  }

  @Mutation
  [CodingMutations.SET_SELECT](aptData) {
    this.aptSelectData = aptData;
  }

  @Action
  [CodingActions.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("coding")
        .then(({ data }) => {
          this.context.commit(CodingMutations.SET_LIST, data.data);
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
  [CodingActions.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.put("coding/" + item.id, item)
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
  [CodingActions.SEARCH_DIAGNOSES](searchParam) {
    try {
      const data = axios.get(
        "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=" +
          searchParam
      );
      return data;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
}
