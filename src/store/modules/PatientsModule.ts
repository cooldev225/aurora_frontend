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
  appointments: Array<IApt>;
}

export interface IMinorId {
  minorId?: string | null;
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

  /**
   * Get current selected Patient
   * @returns SelectedpatientsData
   */
  get latestMinorId(): IMinorId {
    if (
      this.selectedPatient?.appointments &&
      this.selectedPatient.appointments.length > 0
    ) {
      const latestApt = this.selectedPatient.appointments[0];
      return {
        minorId: latestApt?.clinic?.minor_id ?? null,
      };
    }

    return {
      minorId: null,
    };
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
  [PatientActions.UPDATE](patient) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients", patient.id, patient)
        .then(({ data }) => {
          console.log(patient.patient_id);
          this.context.dispatch(PatientActions.VIEW, patient.id);
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
  [PatientActions.CLAIM_SOURCE.ADD](source) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.put("patients/billing", source)
        .then(({ data }) => {
          this.context.dispatch(PatientActions.VIEW, source.patient_id);
          return data;
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
  [PatientActions.CLAIM_SOURCE.UPDATE](source) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients/billing", source.id, source)
        .then(({ data }) => {
          this.context.dispatch(PatientActions.VIEW, source.patient_id);
          return data;
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
  [PatientActions.CLAIM_SOURCE.DELETE](source) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.delete(`patients/billing/${source.id}`)
        .then(() => {
          this.context.dispatch(PatientActions.VIEW, source.patient_id);
          Swal.fire({
            text: "Successfully Deleted!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-secondary",
            },
          });
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
  [PatientActions.ALSO_KNOWN_AS.CREATE](details) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.put("patients/also-known-as", details)
        .then(({ data }) => {
          this.context.dispatch(PatientActions.VIEW, details.patient_id);
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
  [PatientActions.ALSO_KNOWN_AS.UPDATE](details) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients/also-known-as", details.id, details)
        .then(({ data }) => {
          this.context.dispatch(PatientActions.VIEW, details.patient_id);
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
  [PatientActions.ALSO_KNOWN_AS.BULK](details) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("patients/also-known-as/bulk", details.id, details.data)
        .then(({ data }) => {
          this.context.dispatch(PatientActions.VIEW, details.patient_id);
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
  [PatientActions.ALSO_KNOWN_AS.DELETE](details) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete(`patients/also-known-as/${details.id}`)
        .then(() => {
          this.context.dispatch(PatientActions.VIEW, details.patient_id);
          Swal.fire({
            text: "Successfully Deleted!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-secondary",
            },
          });
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
  [PatientActions.ALLERGIES_LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("patients/allergies")
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
  [PatientActions.PRINT_LABEL](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post(
        "patients/print-label/" + id,
        {},
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
}
