import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";
import AuthRoutes from "./AuthRoutes";
import AppointmentRoutes from "./AppointmentRoutes";
import BillingRoutes from "./BillingRoutes";
import MailboxRoutes from "./MailboxRoutes";
import PatientRoutes from "./PatientRoutes";
import SettingsRoutes from "./SettingsRoutes";
import HRMRoutes from "./HRMRoutes";
import DocumentRoutes from "./DocumentRoutes";
import ClinicRoutes from "./ClinicRoutes";
import OrganizationRoutes from "./OrganizationRoutes";
import PreAdmissionRoutes from "./PreAdmissionRoutes";
import MiscRoutes from "./MiscRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sign-in",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/admins",
        name: "administrator",
        component: () => import("@/views/Admins.vue"),
      },
      {
        path: "/coding",
        name: "coding-dashboard",
        component: () => import("@/views/coding/dashboard.vue"),
      },
      {
        path: "/coding-reports",
        name: "coding-reports",
        component: () => import("@/views/coding/report.vue"),
      },
      ...OrganizationRoutes,
      ...ClinicRoutes,
      ...DocumentRoutes,
      ...HRMRoutes,
      ...SettingsRoutes,
      ...PatientRoutes,
      ...MailboxRoutes,
      ...AppointmentRoutes,
      ...BillingRoutes,
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/components/auth/Profile.vue"),
      },
      {
        path: "/profile/password-change",
        name: "password-change",
        component: () => import("@/components/auth/Password.vue"),
      },
      {
        path: "/profile/signature",
        name: "signature",
        component: () => import("@/components/auth/Signature.vue"),
      },
      {
        path: "/employee-booking-dashboard",
        name: "employee-booking-dashboard",
        component: () => import("@/views/appointments/EmployeeBookings.vue"),
      },

      ////////////////////////////////////////////////////////////////////////
      // Anesthetist
      {
        path: "/anesthetist-dashboard",
        name: "anesthetist-dashboard",
        component: () => import("@/views/anesthetist/dashboard.vue"),
      },
    ],
  },
  ...AuthRoutes,
  ...PreAdmissionRoutes,
  ...MiscRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
