import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sign-in",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/admins",
        name: "administrator",
        component: () => import("@/views/Admins.vue"),
      },
      {
        path: "/organizations",
        name: "organizations",
        component: () => import("@/views/Organizations.vue"),
      },
      {
        path: "/organizations/create",
        name: "createOrganization",
        component: () =>
          import("@/components/organizations/AddOrganization.vue"),
      },
      {
        path: "/organizations/edit",
        name: "editOrganization",
        component: () =>
          import("@/components/organizations/EditOrganization.vue"),
      },
      {
        path: "/organizationManagers",
        name: "organizationMangers",
        component: () => import("@/views/organizationAdmin/Managers.vue"),
      },
      {
        path: "/organizationAdmins",
        name: "organizationAdmins",
        component: () => import("@/views/organizationAdmin/Admins.vue"),
      },
      {
        path: "/employees",
        name: "employees",
        component: () => import("@/views/Employee.vue"),
      },
      {
        path: "/employees/create",
        name: "employees-create",
        component: () => import("@/components/employees/CreateEmployee.vue"),
      },
      {
        path: "/employees/edit",
        name: "employees-edit",
        component: () => import("@/components/employees/EditEmployee.vue"),
      },
      {
        path: "/clinics",
        name: "clinics",
        component: () => import("@/views/organizationAdmin/Clinics.vue"),
      },
      {
        path: "/clinics/create",
        name: "createClinics",
        component: () => import("@/components/clinics/CreateClinics.vue"),
      },
      {
        path: "/clinics/edit",
        name: "editClinics",
        component: () => import("@/components/clinics/EditClinics.vue"),
      },
      {
        path: "/settings/health-fund",
        name: "healthFund",
        component: () => import("@/views/settings/HealthFund.vue"),
      },
      {
        path: "/settings/birthCode",
        name: "birthCode",
        component: () => import("@/views/settings/BirthCode.vue"),
      },
      {
        path: "/settings/specialist-type",
        name: "speicalistType",
        component: () => import("@/views/settings/SpecialistType.vue"),
      },
      {
        path: "/settings/specialist-title",
        name: "specialistTitle",
        component: () => import("@/views/settings/SpecialistTitle.vue"),
      },
      {
        path: "/settings/time-requirements",
        name: "timeRequirements",
        component: () => import("@/views/settings/AptTimeRequirement.vue"),
      },
      {
        path: "/patients",
        name: "patients",
        component: () => import("@/views/patient/PatientList.vue"),
      },
      {
        path: "/patients/details",
        name: "patient-details",
        component: () => import("@/views/patient/PatientView.vue"),
        children: [
          {
            path: "appointments",
            name: "patient-details-appointments",
            component: () => import("@/components/patients/Appointments.vue"),
          },
          {
            path: "billing",
            name: "patient-details-billing",
            component: () => import("@/components/patients/Billing.vue"),
          },
          {
            path: "administration",
            name: "patient-details-administration",
            component: () => import("@/components/patients/Administration.vue"),
          },
        ],
      },
      {
        path: "/mailbox",
        name: "mailbox",
        component: () => import("@/views/apps/email/index.vue"),
        children: [
          {
            path: "list",
            name: "mailbox-list",
            component: () => import("@/views/apps/email/List.vue"),
          },
          {
            path: "compose",
            name: "mailbox-compose",
            component: () => import("@/views/apps/email/Compose.vue"),
          },
          {
            path: "reply",
            name: "mailbox-reply",
            component: () => import("@/views/apps/email/Reply.vue"),
          },
        ],
      },
      {
        path: "/booking/dashboard",
        name: "booking-dashboard",
        component: () => import("@/views/booking/Bookings.vue"),
      },
      {
        path: "/booking/unconfirmed-apts",
        name: "unconfirmed-apts",
        component: () => import("@/views/booking/UnconfirmedApts.vue"),
      },
      {
        path: "/booking/unapproved-procedures",
        name: "unapproved-procedures",
        component: () => import("@/views/booking/UnapprovedProcedure.vue"),
      },
      {
        path: "/booking/waitlisted-apts",
        name: "waitlisted-apts",
        component: () => import("@/views/booking/WaitlistedApts.vue"),
      },
      {
        path: "/booking/cancellation-list",
        name: "cancellation-list",
        component: () => import("@/views/booking/CancellationList.vue"),
      },
      {
        path: "/make-payment",
        name: "make-payment",
        component: () => import("@/views/MakePayment.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
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
