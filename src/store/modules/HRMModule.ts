import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IHRMWeeklyScheduleTimeslot {
  id: number;
}

export interface IHRMWeeklyScheduleTemplate {
  id: number;
}

export interface IHRMWeeklyScheduleTemplates {
  hrmScheduleData: Array<IHRMWeeklyScheduleTemplate>;
  hrmScheduleSelectData: IHRMWeeklyScheduleTemplate;
  hrmTimeslotSelectData: Array<IHRMWeeklyScheduleTimeslot>;
}

@Module
export default class HRMModule
  extends VuexModule
  implements IHRMWeeklyScheduleTemplates
{
  hrmScheduleData = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmScheduleSelectData = {} as IHRMWeeklyScheduleTemplate;
  hrmTimeslotSelectData = [] as Array<IHRMWeeklyScheduleTimeslot>;

  get hrmScheduleList(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmScheduleData;
  }

  get hrmScheduleSelected(): IHRMWeeklyScheduleTemplate {
    return this.hrmScheduleSelectData;
  }

  get hrmTimeslotSelected(): Array<IHRMWeeklyScheduleTimeslot> {
    return this.hrmTimeslotSelectData;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_LIST](data) {
    this.hrmScheduleData = data;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_SELECT](data) {
    this.hrmScheduleSelectData = data;
  }

  @Mutation
  [HRMMutations.SCHEDULE_TEMPLATE.SET_TIMESLOT](data) {
    this.hrmTimeslotSelectData = data;
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/hrm-schedule-timeslot", {
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

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("hrm/hrm-schedule-timeslot", item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("hrm/hrm-schedule-timeslot", item.id, item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
