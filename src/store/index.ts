import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import AdminModule from "@/store/modules/AdminModule";
import OrganizationModule from "@/store/modules/OrganizationModule";
import OrgManagerModule from "@/store/modules/OrgManagerModule";
import OrgAdminModule from "@/store/modules/OrgAdminModule";
import ClinicsModule from "@/store/modules/ClinicsModule";
import SpecialistTypeModule from "@/store/modules/SpecialistTypeModule";
import SpecialistTitleModule from "@/store/modules/SpecialistTitleModule";
import HealthFundModule from "@/store/modules/HealthFundModule";
import BirthCodeModule from "@/store/modules/BirthCodeModule";
import PatientsModule from "@/store/modules/PatientsModule";
import EmployeeModule from "@/store/modules/EmployeeModule";
import BookingModule from "@/store/modules/BookingModule";
import AnesthetistModule from "@/store/modules/AnesthetistModule";
import AppointmentModule from "@/store/modules/AppointmentModule";
import ProcedureModule from "@/store/modules/ProcedureModule";
import AptTimeRequireModule from "@/store/modules/AptTimeRequireModule";
import SpecialistsModule from "@/store/modules/SpecialistsModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    AdminModule,
    SpecialistTypeModule,
    SpecialistTitleModule,
    OrganizationModule,
    OrgManagerModule,
    OrgAdminModule,
    ClinicsModule,
    HealthFundModule,
    BirthCodeModule,
    PatientsModule,
    EmployeeModule,
    BookingModule,
    AnesthetistModule,
    AppointmentModule,
    ProcedureModule,
    AptTimeRequireModule,
    SpecialistsModule,
  },
});

export default store;
