import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import AdminModule from "@/store/modules/AdminModule";
import OrganizationModule from "@/store/modules/OrganizationModule";
import SpecialistTypeModule from "@/store/modules/SpecialistTypeModule";
import SpecialistTitleModule from "@/store/modules/SpecialistTitleModule";

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
  },
});

export default store;
