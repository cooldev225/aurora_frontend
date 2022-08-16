import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { IApt } from "./AppointmentModule";

export interface IPatient {
  id: string;
}

export interface PatientsInfo {
  patientsData: Array<IPatient>;
  patientsSelectData: IPatient;
  patientDocumentList: IPatient;
}

@Module
export default class PatientsModule extends VuexModule implements PatientsInfo {
  patientsData = [] as Array<IPatient>;
  patientsSelectData = {} as IPatient;
  patientDocumentList = {} as IPatient;
  patientAppointmentsData = [] as Array<IApt>;
  /**
   * Get current Patients List
   * @returns Patients
   */
  get patientsList(): Array<IPatient> {
    return this.patientsData;
  }

  /**
   * Get current Patients List
   * @returns Patients
   */
  get getPatientDocumentList(): IPatient {
    return this.patientDocumentList;
  }

  /**
   * Get current selected Patient
   * @returns SelectedpatientsData
   */
  get selectedPatient(): IPatient {
    return this.patientsSelectData;
  }

  get getPatientAppointments(): Array<IApt> {
    return this.patientAppointmentsData;
  }

  @Mutation
  [Mutations.SET_PATIENT.LIST](patientsData) {
    this.patientsData = patientsData;
  }

  @Mutation
  [Mutations.SET_PATIENT.DOCUMENT.LIST](documentList) {
    this.patientDocumentList = documentList;
  }

  @Mutation
  [Mutations.SET_PATIENT.SELECT](data) {
    this.patientsSelectData = data;
  }

  @Mutation
  [Mutations.SET_PATIENT.APPOINTMENTS](data) {
    this.patientAppointmentsData = data;
  }

  @Action
  [Actions.PATIENTS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients")
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

  @Action
  [Actions.PATIENTS.UPDATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients", data.id, data)
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
  [Actions.PATIENTS.VIEW](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PATIENT.SELECT, data.data);
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
  [Actions.PATIENTS.APPOINTMENTS](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/appointments/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PATIENT.APPOINTMENTS, data.data);
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
  [Actions.PATIENTS.DOCUMENT.LIST](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("patient-documents", { params: { patient_id: id } })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PATIENT.DOCUMENT.LIST, data.data);
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
  [Actions.PATIENTS.DOCUMENT.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post(
        data.patient_id + "/patient-documents/upload",
        data.formData
      )
        .then(({ data }) => {
          this.context.dispatch(Actions.PATIENTS.DOCUMENT.LIST);
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
