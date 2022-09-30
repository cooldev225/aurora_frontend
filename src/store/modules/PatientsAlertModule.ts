import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Module, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class PatientsAlertModule extends VuexModule {
  @Action
  [PatientActions.ALERT.CREATE](data) {
    console.log(data);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("patients/alerts", data)
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
