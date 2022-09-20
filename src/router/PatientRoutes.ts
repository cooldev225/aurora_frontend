const PatientRoutes = [
  {
    path: "/patients",
    name: "patients",
    component: () => import("@/views/patients/PatientList.vue"),
  },
  {
    path: "/patients/:id",
    name: "patients-view",
    component: () => import("@/views/patients/PatientView.vue"),
    children: [
      {
        path: "appointments",
        name: "patients-view-appointments",
        component: () => import("@/views/patients/Appointments.vue"),
      },
      {
        path: "billing",
        name: "patients-view-billing",
        component: () => import("@/views/patients/Billing.vue"),
      },
      {
        path: "recalls",
        name: "patients-recalls",
        component: () => import("@/views/patients/Recalls.vue"),
      },
      {
        path: "administration",
        name: "patients-view-administration",
        component: () => import("@/views/patients/Administration.vue"),
      },
      {
        path: "documents",
        name: "patients-view-documents",
        component: () => import("@/views/patients/Documents.vue"),
      },
      {
        path: "clinical",
        name: "patients-view-clinical",
        component: () => import("@/views/patients/Clinical.vue"),
      },
      {
        path: "/hrm/weekly-schedule",
        name: "hrm-weekly-schedule",
        component: () => import("@/views/HRM/WeeklySchedule.vue"),
      },
      {
        path: "/hrm/weekly-schedule-template",
        name: "hrm-weekly-schedule-template",
        component: () => import("@/views/HRM/WeeklyScheduleTemplate.vue"),
      },
    ],
  },
  {
    path: "/patients/report",
    name: "patients-report",
    component: () => import("@/views/patients/CreateReport.vue"),
  },
];

export default PatientRoutes;
