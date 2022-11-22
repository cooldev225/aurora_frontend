import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import {
  PatientActions,
  PatientMutations,
} from "@/store/enums/StorePatientEnums";
import { Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import IAppointment from "./AppointmentModule";
import {
  displayServerError,
  displaySuccessModal,
  displaySuccessToast,
} from "@/helpers/helpers.js";
import IPatient from "../interfaces/IPatient";

export interface IMinorId {
  minorId?: string | null;
}

export interface PatientsInfo {
  patientsData: Array<IPatient>;
  patientsSelectData: IPatient;
  patientDocumentList: IPatient;
}

export interface PatientAppointmentsData {
  pastAppointments: Array<IAppointment>;
  futureAppointments: Array<IAppointment>;
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
      return ApiService.get("patients", "", data)
        .then(({ data }) => {
          this.context.commit(PatientMutations.SET_PATIENT.LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          return displayServerError(response, "Listing patients");
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
          this.context.dispatch(PatientActions.VIEW, patient.id);
          return data.data;
        })
        .catch(({ response }) => {
          return displayServerError(response, "Updating a patient");
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
          return displayServerError(response, "Viewing a patient");
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
          return displayServerError(response, "Listing patient appointments");
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
          return displayServerError(response, "Listing patient document's");
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
          return displayServerError(response, "Creating a patient document");
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
          return displayServerError(
            response,
            "Sending a patient document via emails"
          );
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
          return displayServerError(response, "Add a patient claim source");
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
          return displayServerError(
            response,
            "Updating a patient claim source"
          );
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

          return displaySuccessToast("Successfully Deleted claim source");
        })
        .catch(({ response }) => {
          return displayServerError(
            response,
            "Deleting a patient claim source"
          );
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
          return displayServerError(
            response,
            "Creating a patient 'also know as'"
          );
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
          return displayServerError(
            response,
            "Updating a patient 'also know as'"
          );
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
          return displayServerError(response, "Listing patient 'also know as'");
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
          return displaySuccessToast("Successfully updated 'also know as'");
        })
        .catch(({ response }) => {
          return displayServerError(
            response,
            "Deleting a patient 'also know as'"
          );
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
          return displayServerError(response, "Listing patient allergies");
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
