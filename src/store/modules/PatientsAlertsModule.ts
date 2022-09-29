import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import {
  PatientActions,
  PatientMutations,
} from "@/store/enums/StorePatientEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IPatientsAlert {
  id: string;
}

export interface PatientAlertsInfo {
  patientsRecallData: Array<IPatientsAlert>;
  patientsRecallSelectData: IPatientsAlert;
}

@Module
export default class PatientsAlertsModule
  extends VuexModule
  implements PatientAlertsInfo
{
  patientsRecallData = [] as Array<IPatientsAlert>;
  patientsRecallSelectData = {} as IPatientsAlert;

  @Action
  [PatientActions.ALERT.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("patients/alerts/", data)
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
