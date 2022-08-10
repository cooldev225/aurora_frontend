import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import AdminModule from "@/store/modules/AdminModule";
import UserModule from "@/store/modules/UserModule";
import OrganisationModule from "@/store/modules/OrganisationModule";
import OrgManagerModule from "@/store/modules/OrgManagerModule";
import OrgAdminModule from "@/store/modules/OrgAdminModule";
import ClinicsModule from "@/store/modules/ClinicsModule";
import SpecialistTypeModule from "@/store/modules/SpecialistTypeModule";
import SpecialistTitleModule from "@/store/modules/SpecialistTitleModule";
import HealthFundModule from "@/store/modules/HealthFundModule";
import BirthCodeModule from "@/store/modules/BirthCodeModule";
import PatientsModule from "@/store/modules/PatientsModule";
import PatientsRecallModule from "@/store/modules/PatientsRecallModule";
import EmployeeModule from "@/store/modules/EmployeeModule";
import BookingModule from "@/store/modules/BookingModule";
import AnesthetistModule from "@/store/modules/AnesthetistModule";
import AppointmentModule from "@/store/modules/AppointmentModule";
import ProcedureModule from "@/store/modules/ProcedureModule";
import AptTypesModule from "@/store/modules/AptTypesModule";
import AptTimeRequireModule from "@/store/modules/AptTimeRequireModule";
import ReportTemplatesModule from "@/store/modules/ReportTemplatesModule";
import MailsModule from "@/store/modules/MailsModule";
import SpecialistsModule from "@/store/modules/SpecialistsModule";
import NtfTemplatesModule from "@/store/modules/NtfTemplatesModule";
import MPaymentModule from "@/store/modules/MPaymentModule";
import ProfileModule from "@/store/modules/ProfileModule";
import ReferralDoctorModule from "@/store/modules/ReferralDoctorModule";
import ProcedureApprovalsModule from "@/store/modules/ProcedureApprovalsModule";
import LetterModule from "@/store/modules/LetterModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    AdminModule,
    UserModule,
    SpecialistTypeModule,
    SpecialistTitleModule,
    OrganisationModule,
    OrgManagerModule,
    OrgAdminModule,
    ClinicsModule,
    HealthFundModule,
    BirthCodeModule,
    PatientsModule,
    PatientsRecallModule,
    EmployeeModule,
    BookingModule,
    AnesthetistModule,
    NtfTemplatesModule,
    AppointmentModule,
    ProcedureModule,
    AptTypesModule,
    AptTimeRequireModule,
    ReportTemplatesModule,
    MailsModule,
    SpecialistsModule,
    MPaymentModule,
    ProfileModule,
    ReferralDoctorModule,
    ProcedureApprovalsModule,
    LetterModule,
  },
});

export default store;
