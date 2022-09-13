const PatientActions = {
  PATIENTS: {
    LIST: "listPatients",
    CREATE: "createPatients",
    DELETE: "deletePatients",
    UPDATE: "updatePatients",
    VIEW: "viewPatient",
    APPOINTMENTS: "patientsAppointments",
    DOCUMENTS: {
      LIST: "listPatientsDocuments",
      CREATE: "createPatientsDocument",
      SEND_VIA_EMAIL: "sendPatientsDocumentViaEmail",
      VIEW: "viewPatientDocument",
      AUDIO: {
        CREATE: "createPatientsDocumentAudio",
      },
    },
    RECALL: {
      LIST: "listPatientsRecall",
      CREATE: "createPatientsRecall",
      UPDATE: "updatePatientsRecall",
      VIEW: "viewPatientsRecall",
    },
    BILLING: {
      VALIDATE_MEDICARE: "validatePatientsBillingMedicare",
      UPDATE: "updatePatientsBilling",
    },
  },
};

const PatientMutations = {
  SET_PATIENT: {
    LIST: "setPatientsList",
    SELECT: "setSelectPatient",
    APPOINTMENTS: "setPatientAppointments",
    DOCUMENT: {
      LIST: "setPatientDocumentList",
    },
  },

  SET_PATIENT_RECALL: {
    LIST: "setPatientsRecallList",
    SELECT: "setSelectPatientRecall",
  },
};

export { PatientActions, PatientMutations };
