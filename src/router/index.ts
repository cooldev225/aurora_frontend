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
        path: "/organisations",
        name: "organisations",
        component: () => import("@/views/Organisations.vue"),
      },
      {
        path: "/organisations/create",
        name: "createOrganisation",
        component: () =>
          import("@/components/organisations/AddOrganisation.vue"),
      },
      {
        path: "/organisations/edit/:id",
        name: "editOrganisation",
        component: () =>
          import("@/components/organisations/EditOrganisation.vue"),
      },
      {
        path: "/organisationManagers",
        name: "organisationMangers",
        component: () => import("@/views/organisation-admin/Managers.vue"),
      },
      {
        path: "/organisationAdmins",
        name: "organisationAdmins",
        component: () => import("@/views/organisation-admin/Admins.vue"),
      },
      {
        path: "/employees",
        name: "employees",
        component: () => import("@/views/Employee.vue"),
      },
      {
        path: "/employees/create",
        name: "employees-create",
        component: () => import("@/views/employees/EditEmployee.vue"),
      },
      {
        path: "/employees/edit/:id",
        name: "employees-edit",
        component: () => import("@/views/employees/EditEmployee.vue"),
      },
      {
        path: "/clinics",
        name: "clinics",
        component: () => import("@/views/organisation-admin/Clinics.vue"),
      },
      {
        path: "/clinics/create",
        name: "clinic-create",
        component: () => import("@/components/clinics/CreateClinics.vue"),
      },
      {
        path: "/clinics/edit/:id",
        name: "clinic-edit",
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
        path: "/settings",
        name: "org-admin-settings",
        component: () => import("@/views/settings/OrgAdminSettings.vue"),
      },
      {
        path: "/settings/apt-types",
        name: "aptTypes",
        component: () => import("@/views/settings/apt-types/AptTypeList.vue"),
      },
      {
        path: "/settings/apt-types/create",
        name: "createAptType",
        component: () => import("@/views/settings/apt-types/EditAptType.vue"),
      },
      {
        path: "/settings/apt-types/edit/:id",
        name: "editAptType",
        component: () => import("@/views/settings/apt-types/EditAptType.vue"),
      },
      {
        path: "/settings/time-requirements",
        name: "timeRequirements",
        component: () => import("@/views/settings/AptTimeRequirement.vue"),
      },
      {
        path: "/settings/anesthetic-questions",
        name: "anesthetic-questions",
        component: () => import("@/views/settings/AnestheticQuestions.vue"),
      },
      {
        path: "/settings/pre-admission-questions",
        name: "pre-admission-questions",
        component: () => import("@/views/settings/PreAdmissionQuestions.vue"),
      },
      {
        path: "/settings/pre-admission-consent",
        name: "pre-admission-consent",
        component: () => import("@/views/settings/PreAdmissionConsent.vue"),
      },
      {
        path: "/settings/notification-templates",
        name: "notificationTemplates",
        component: () => import("@/views/settings/NotificationTemplates.vue"),
      },
      {
        path: "/settings/report-templates",
        name: "reportTemplates",
        component: () => import("@/views/settings/ReportTemplates.vue"),
      },
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
            component: () => import("@/components/patients/Appointments.vue"),
          },
          {
            path: "billing",
            name: "patients-view-billing",
            component: () => import("@/components/patients/Billing.vue"),
          },
          {
            path: "administration",
            name: "patients-view-administration",
            component: () => import("@/components/patients/Administration.vue"),
          },
          {
            path: "documents",
            name: "patients-view-documents",
            component: () => import("@/components/patients/Documents.vue"),
          },
          {
            path: "clinical",
            name: "patients-view-clinical",
            component: () => import("@/components/patients/Clinical.vue"),
          },
        ],
      },
      {
        path: "/patients/report",
        name: "patients-report",
        component: () => import("@/views/patients/ReportTemplate.vue"),
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
            path: "view/:id",
            name: "mailbox-view",
            component: () => import("@/views/apps/email/View.vue"),
          },
          {
            path: "edit/:id",
            name: "mailbox-edit",
            component: () => import("@/views/apps/email/Edit.vue"),
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
        path: "/billing/make-payment",
        name: "make-payment",
        component: () => import("@/views/MakePayment.vue"),
      },
      {
        path: "/billing/make-payment/pay",
        name: "make-payment-pay",
        component: () => import("@/components/make-payment/Pay.vue"),
      },
      {
        path: "/billing/make-payment/view",
        name: "make-payment-view",
        component: () => import("@/components/make-payment/View.vue"),
      },
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
        path: "/employee-booking-dashboard",
        name: "employee-booking-dashboard",
        component: () => import("@/views/booking/EmployeeBookings.vue"),
      },

      ////////////////////////////////////////////////////////////////////////
      // Anesthetist
      {
        path: "/anesthetist-dashboard",
        name: "anesthetist-dashboard",
        component: () => import("@/views/anesthetist/dashboard.vue"),
      },

      ////////////////////////////////////////////////////////////////////////
      // Human Resource Management
      {
        path: "/human-resource-management",
        name: "human-resource-management",
        component: () => import("@/views/HRM/dashboard.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/auth/Auth.vue"),
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
    path: "/appointment_pre_admissions/show",
    name: "pre-admission",
    component: () => import("@/views/pre-admission/index.vue"),
    children: [
      {
        path: "/appointment_pre_admissions/show/:id/form_1",
        name: "pre-admission-form1",
        component: () => import("@/components/pre-admission/Form1.vue"),
      },
      {
        path: "/appointment_pre_admissions/show/:id/form_2",
        name: "pre-admission-form2",
        component: () => import("@/components/pre-admission/Form2.vue"),
      },
      {
        path: "/appointment_pre_admissions/show/:id/form_3",
        name: "pre-admission-form3",
        component: () => import("@/components/pre-admission/Form3.vue"),
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
