import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import axios from "axios";
import { Module, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class CodingModule extends VuexModule {
  @Action
  [CodingActions.SEARCH_DIAGNOSES](searchParam) {
    console.log("SEARCH:" + searchParam);

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
