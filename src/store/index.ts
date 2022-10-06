import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import AdminModule from "@/store/modules/AdminModule";
import UserModule from "@/store/modules/UserModule";
import OrganisationModule from "@/store/modules/OrganisationModule";
import OrgAdminModule from "@/store/modules/OrgAdminModule";
import ClinicsModule from "@/store/modules/ClinicsModule";
import HealthFundModule from "@/store/modules/HealthFundModule";
import BirthCodeModule from "@/store/modules/BirthCodeModule";
import PatientsModule from "@/store/modules/PatientsModule";
import PatientsRecallModule from "@/store/modules/PatientsRecallModule";
import EmployeeModule from "@/store/modules/EmployeeModule";
import BookingModule from "@/store/modules/BookingModule";
import AnesthetistModule from "@/store/modules/AnesthetistModule";
import AppointmentModule from "@/store/modules/AppointmentModule";
import AptTypesModule from "@/store/modules/AptTypesModule";
import AptTimeRequireModule from "@/store/modules/AptTimeRequireModule";
import ReportTemplatesModule from "@/store/modules/ReportTemplatesModule";
import MailsModule from "@/store/modules/MailsModule";
import SpecialistsModule from "@/store/modules/SpecialistsModule";
import NtfTemplatesModule from "@/store/modules/NtfTemplatesModule";
import MakePaymentModule from "@/store/modules/MakePaymentModule";
import ProfileModule from "@/store/modules/ProfileModule";
import ReferralDoctorModule from "@/store/modules/ReferralDoctorModule";
import ProcedureApprovalsModule from "@/store/modules/ProcedureApprovalsModule";
import LetterModule from "@/store/modules/LetterModule";
import DocumentModule from "@/store/modules/DocumentModule";
import ReportModule from "@/store/modules/ReportModule";
import HRMModule from "@/store/modules/HRMModule";
import PatientsAlertModule from "@/store/modules/PatientsAlertModule";
import CodingModule from "@/store/modules/CodingModule";
import BillingTokenModule from "@/store/modules/BillingTokenModule";
import BillingValidationModule from "@/store/modules/BillingValidationModule";
config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    AdminModule,
    UserModule,
    OrganisationModule,
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
    AptTypesModule,
    AptTimeRequireModule,
    ReportTemplatesModule,
    MailsModule,
    SpecialistsModule,
    MakePaymentModule,
    ProfileModule,
    ReferralDoctorModule,
    ProcedureApprovalsModule,
    LetterModule,
    DocumentModule,
    ReportModule,
    HRMModule,
    PatientsAlertModule,
    CodingModule,
    BillingTokenModule,
    BillingValidationModule,
  },
});

export default store;
