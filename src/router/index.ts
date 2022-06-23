import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
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
        path: "/clinics",
        name: "clinics",
        component: () => import("@/views/organizationAdmin/Clinics.vue"),
      },
      {
        path: "/clinics/create",
        name: "createClinics",
        component: () => import("@/components/clinics/AddClinics.vue"),
      },
      {
        path: "/clinics/edit",
        name: "editClinics",
        component: () => import("@/components/clinics/EditClinics.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/settings/health-fund",
        name: "healthFund",
        component: () => import("@/views/HealthFund.vue"),
      },
      {
        path: "/settings/birthCode",
        name: "birthCode",
        component: () => import("@/views/BirthCode.vue"),
      },
      {
        path: "/settings/specialist-type",
        name: "speicalistType",
        component: () => import("@/views/SpecialistType.vue"),
      },
      {
        path: "/settings/specialist-title",
        name: "specialistTitle",
        component: () => import("@/views/SpecialistTitle.vue"),
      },
      {
        path: "/patients",
        name: "patients",
        component: () => import("@/views/Patients.vue"),
      },
      {
        path: "/patients/details",
        name: "Details",
        component: () => import("@/components/patients/ViewPatient.vue"),
        children: [
          {
            path: "/overview",
            name: "patient-overview",
            component: () =>
              import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
          },
        ],
      },
      {
        path: "/mailbox",
        name: "mailbox",
        component: () => import("@/views/MailBox.vue"),
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
