import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import AdminModule from "@/store/modules/AdminModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    AdminModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
  },
});

export default store;
