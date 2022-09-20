const AppointmentRoutes = [
  {
    path: "/appointments/dashboard",
    name: "booking-dashboard",
    component: () => import("@/views/appointments/Appointments.vue"),
  },
  {
    path: "/appointments/unconfirmed-apts",
    name: "unconfirmed-apts",
    component: () => import("@/views/appointments/UnconfirmedApts.vue"),
  },
  {
    path: "/appointments/unapproved-procedures",
    name: "unapproved-procedures",
    component: () => import("@/views/appointments/UnapprovedProcedure.vue"),
  },
  {
    path: "/appointments/waitlisted-apts",
    name: "waitlisted-apts",
    component: () => import("@/views/appointments/WaitlistedApts.vue"),
  },
  {
    path: "/appointments/cancellation-list",
    name: "cancellation-list",
    component: () => import("@/views/appointments/CancellationList.vue"),
  },
];

export default AppointmentRoutes;
