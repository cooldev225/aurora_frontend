const DocumentRoutes = [
  {
    path: "inbox",
    name: "admin-document-inbox",
    component: () => import("@/views/communication/AdminDocumentInbox.vue"),
  },
  {
    path: "outbox",
    name: "admin-document-outbox",
    component: () => import("@/views/communication/AdminDocumentOutbox.vue"),
  },
  {
    path: "/specialist/incoming-documents",
    name: "incoming-documents",
    component: () => import("@/views/specialist/IncomingDocuments.vue"),
  },
  {
    path: "/outgoing-log",
    name: "outgoing-logs",
    component: () => import("@/views/communication/OutgoingView.vue"),
  },
];

export default DocumentRoutes;
