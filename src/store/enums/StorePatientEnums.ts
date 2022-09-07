const PatientActions = {
  PATIENTS: {
    LIST: "listPatients",
    CREATE: "createPatients",
    DELETE: "deletePatients",
    UPDATE: "updatePatients",
    VIEW: "viewPatient",
    APPOINTMENTS: "patientsAppointments",
    DOCUMENT: {
      LIST: "listPatientsDocuments",
      CREATE: "createPatientsDocument",
      SEND_VIA_EMAIL: "sendPatientsDocumentViaEmail",
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