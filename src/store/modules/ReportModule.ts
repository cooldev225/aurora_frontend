import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ReportModule extends VuexModule {
  @Action
  [StoreReportActions.REPORT.PATIENT](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post("patients/report", data)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      // this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
