import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import {
  PatientActions,
  PatientMutations,
} from "@/store/enums/StorePatientEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IPatientsRecall {
  id: string;
}

export interface PatientsRecallInfo {
  patientsRecallData: Array<IPatientsRecall>;
  patientsRecallSelectData: IPatientsRecall;
}

@Module
export default class PatientsRecallModule
  extends VuexModule
  implements PatientsRecallInfo
{
  patientsRecallData = [] as Array<IPatientsRecall>;
  patientsRecallSelectData = {} as IPatientsRecall;

  /**
   * Get current PatientsRecall List
   * @returns PatientsRecall
   */
  get patientsRecallList(): Array<IPatientsRecall> {
    return this.patientsRecallData;
  }

  /**
   * Get current selected Patient
   * @returns SelectedpatientsRecallData
   */
  get selectedPatientRecall(): IPatientsRecall {
    return this.patientsRecallSelectData;
  }

  @Mutation
  [PatientMutations.SET_PATIENT_RECALL.LIST](patientsRecallData) {
    this.patientsRecallData = patientsRecallData;
  }

  @Mutation
  [PatientMutations.SET_PATIENT_RECALL.SELECT](data) {
    this.patientsRecallSelectData = data;
  }

  @Action
  [PatientActions.PATIENTS.RECALL.CREATE](data) {
    console.log(data);
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("patients/recalls/", data)
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
  [PatientActions.PATIENTS.RECALL.UPDATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients/recalls/", data.id, data)
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
