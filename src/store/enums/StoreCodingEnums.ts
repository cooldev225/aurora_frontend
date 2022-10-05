/* eslint-disable prettier/prettier */
const CodingActions = {
    LIST: "listAppointmentsForCoding",
    SEARCH_DIAGNOSES: "searchDiagnosisCodes",
    DOCUMENT_VIEW: "viewDocument",
    COMPLETE: "completeCode",
};

const CodingMutations = {
  SET_LIST: "setListAppointmentsForCoding",
  SET_SELECT: "setSelectedAppointmentsForCoding",
};

export { CodingActions, CodingMutations };
