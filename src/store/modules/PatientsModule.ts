import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import {
  PatientActions,
  PatientMutations,
} from "@/store/enums/StorePatientEnums";
import { Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { IApt } from "./AppointmentModule";
import Swal from "sweetalert2/dist/sweetalert2.js";

export interface IPatient {
  id: string;
}

export interface PatientsInfo {
  patientsData: Array<IPatient>;
  patientsSelectData: IPatient;
  patientDocumentList: IPatient;
}

export interface PatientAppointmentsData {
  pastAppointments: Array<IApt>;
  futureAppointments: Array<IApt>;
}

@Module
export default class PatientsModule extends VuexModule implements PatientsInfo {
  patientsData = [] as Array<IPatient>;
  patientsSelectData = {} as IPatient;
  patientDocumentList = {} as IPatient;
  patientAppointmentsData = {
    pastAppointments: [],
    futureAppointments: [],
  } as PatientAppointmentsData;
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

  get getPatientAppointments(): PatientAppointmentsData {
    return this.patientAppointmentsData;
  }

  @Mutation
  [PatientMutations.SET_PATIENT.LIST](patientsData) {
    this.patientsData = patientsData;
  }

  @Mutation
  [PatientMutations.SET_PATIENT.DOCUMENTS.LIST](documentList) {
    this.patientDocumentList = documentList;
  }

  @Mutation
  [PatientMutations.SET_PATIENT.SELECT](data) {
    this.patientsSelectData = data;
  }

  @Mutation
  [PatientMutations.SET_PATIENT.APPOINTMENTS](data) {
    this.patientAppointmentsData = data;
  }

  @Action
  [PatientActions.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients", "", data)
        .then(({ data }) => {
          this.context.commit(PatientMutations.SET_PATIENT.LIST, data.data);
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
  [PatientActions.UPDATE](data) {
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
  [PatientActions.VIEW](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/" + id)
        .then(({ data }) => {
          this.context.commit(PatientMutations.SET_PATIENT.SELECT, data.data);
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
  [PatientActions.APPOINTMENTS](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/appointments/" + id)
        .then(({ data }) => {
          this.context.commit(
            PatientMutations.SET_PATIENT.APPOINTMENTS,
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
  [PatientActions.DOCUMENTS.LIST](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("patients/documents/" + id)
        .then(({ data }) => {
          this.context.commit(
            PatientMutations.SET_PATIENT.DOCUMENTS.LIST,
            data.data
          );
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(PatientMutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [PatientActions.DOCUMENTS.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("patients/documents/" + data.get("patient_id"), data)
        .then(({ data }) => {
          this.context.dispatch(
            PatientActions.DOCUMENTS.LIST,
            data.get("patient_id")
          );
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [PatientActions.DOCUMENTS.SEND_VIA_EMAIL](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("patient-documents/send-via-email", data)
        .then(({ data }) => {
          this.context.dispatch(
            PatientActions.DOCUMENTS.LIST,
            data.get("patient_id")
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
  [PatientActions.DOCUMENTS.VIEW](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post(
        "file",
        {
          path: data.path,
          type: "PATIENT_DOCUMENT",
        },
        {
          responseType: "blob",
        }
      )
        .then(({ data }) => {
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [PatientActions.BILLING.UPDATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients/billing", data.id, data)
        .then(({ data }) => {
          if (data.status) {
            Swal.fire({
              text: "Successful Updated!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          } else {
            Swal.fire({
              text: data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              customClass: {
                confirmButton: "btn btn-secondary",
              },
            });
          }
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
