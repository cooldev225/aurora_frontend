import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IHRMWeeklyScheduleTemplate {
  id: number;
}

export interface IHRMWeeklyScheduleTemplates {
  hrmScheduleData: Array<IHRMWeeklyScheduleTemplate>;
}

@Module
export default class HRMModule
  extends VuexModule
  implements IHRMWeeklyScheduleTemplates
{
  hrmScheduleData = [] as Array<IHRMWeeklyScheduleTemplate>;

  get hrmScheduleList(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmScheduleData;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_LIST](data) {
    this.hrmScheduleData = data;
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/schedule-templates", {
        params: {
          clinic_id: data.clinic_id,
        },
      })
        .then(({ data }) => {
          this.context.commit(
            HRMMutations.SCHEDULE_TEMPLATE.SET_LIST,
            data.data
          );
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
