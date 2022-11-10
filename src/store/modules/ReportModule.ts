import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import { Module, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class ReportModule extends VuexModule {
  @Action
  [StoreReportActions.REPORT.PATIENT](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post(
        "patients/documents/report/" + data.patient_id,
        data
      )
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    }
  }
}
