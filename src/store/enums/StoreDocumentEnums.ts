/* eslint-disable prettier/prettier */
const DocumentActions = {
    LIST: "documentList",
    SHOW: "documentShow",
    UPDATE: "update",
    ACTION_LOGS: {
        LIST: "documentActionLogList",
        CREATE: "createDocumentActionLog",
    }
};

const DocumentMutations = {
    SET_LIST : "setDocumentList",
    SET_SELECTED_DOCUMENT: "setSelectedDocument",
};

export { DocumentActions, DocumentMutations };
