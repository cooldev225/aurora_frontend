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
  },
});

export default store;
