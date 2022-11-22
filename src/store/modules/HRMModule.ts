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
  hrmAnesthetists: Array<IHRMWeeklyScheduleTemplate>;
  hrmWeeklyTemplateData: Array<IHRMWeeklyScheduleTemplate>;
  hrmData: Array<IHRMWeeklyScheduleTemplate>;
  hrmSelectedData: IHRMWeeklyScheduleTemplate;
}

@Module
export default class HRMModule
  extends VuexModule
  implements IHRMWeeklyScheduleTemplates
{
  hrmScheduleData = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmScheduleSelectData = {} as IHRMWeeklyScheduleTemplate;
  hrmTimeslotSelectData = [] as Array<IHRMWeeklyScheduleTimeslot>;
  hrmAnesthetists = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmWeeklyTemplateData = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmWeeklyTemplateSelectData = [] as Array<IHRMWeeklyScheduleTimeslot>;
  hrmData = [] as Array<IHRMWeeklyScheduleTemplate>;
  hrmSelectedData = {} as IHRMWeeklyScheduleTemplate;

  get hrmScheduleList(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmScheduleData;
  }

  get hrmScheduleSelected(): IHRMWeeklyScheduleTemplate {
    return this.hrmScheduleSelectData;
  }

  get hrmTimeslotSelected(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmTimeslotSelectData;
  }

  get hrmAnesthetist(): Array<IHRMWeeklyScheduleTimeslot> {
    return this.hrmAnesthetists;
  }

  get hrmWeeklyTemplatesData(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmWeeklyTemplateData;
  }

  get hrmWeeklyTemplateSelected(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmWeeklyTemplateSelectData;
  }

  get hrmDataList(): Array<IHRMWeeklyScheduleTemplate> {
    return this.hrmData;
  }

  get hrmDataSelected(): IHRMWeeklyScheduleTemplate {
    return this.hrmSelectedData;
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

  @Mutation
  [HRMMutations.ANESTHETIST.SET_LIST](data) {
    this.hrmAnesthetists = data;
  }

  @Mutation
  [HRMMutations.WEEKLY_TEMPLATE.SET_LIST](data) {
    this.hrmWeeklyTemplateData = data;
  }

  @Mutation
  [HRMMutations.WEEKLY_TEMPLATE.SET_TIMESLOT](data) {
    this.hrmWeeklyTemplateSelectData = data;
  }

  @Mutation
  [HRMMutations.DATA.SET_SELECT](data) {
    this.hrmSelectedData = data;
  }

  @Mutation
  [HRMMutations.DATA.SET_LIST](data) {
    this.hrmData = data;
  }

  @Action
  [HRMActions.SCHEDULE_TEMPLATE.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/schedule-template", {
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
      ApiService.post("hrm/schedule-template", item)
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
      ApiService.update("hrm/schedule-template", item.id, item)
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

  @Action
  [HRMActions.ANESTHETIST.LIST](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/anesthetists", { params: payload })
        .then(({ data }) => {
          this.context.commit(HRMMutations.ANESTHETIST.SET_LIST, data.data);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.WEEKLY_TEMPLATE.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/weekly-schedule", {
        params: {
          date: data.date,
        },
      })
        .then(({ data }) => {
          this.context.commit(HRMMutations.WEEKLY_TEMPLATE.SET_LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      // this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.WEEKLY_TEMPLATE.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("hrm/weekly-schedule", item)
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
  [HRMActions.WEEKLY_TEMPLATE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("hrm/weekly-schedule", item.id, item)
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

  @Action
  [HRMActions.EMPLOYEE_LEAVE.LIST](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/employee-leaves", { params: payload })
        .then(({ data }) => {
          this.context.commit(HRMMutations.DATA.SET_LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      // this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [HRMActions.EMPLOYEE_LEAVE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("hrm/employee-leaves", item.id, item)
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

  @Action
  [HRMActions.EMPLOYEE_LEAVE.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("hrm/employee-leaves", item)
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

  @Action
  [HRMActions.EMPLOYEE_LEAVE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("hrm/employee-leaves/" + id)
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

  @Action
  [HRMActions.DEALLOCATE_APPOINTMENTS.LIST](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("hrm/deallocate-appointments", { params: payload })
        .then(({ data }) => {
          this.context.commit(HRMMutations.DATA.SET_LIST, {
            specialistAppointments: data.specialistAppointments,
            anesthetistAppointments: data.anesthetistAppointments,
          });
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    } else {
      // this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
