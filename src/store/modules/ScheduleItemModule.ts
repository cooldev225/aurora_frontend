import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { IScheduleFee } from "./ScheduleFeeModule";

export interface IScheduleItem {
  id: number;
  name: string;
  description: string;
  amount: number;
  mbs_item_code: string;
  icd_code: string;
  organization_id: number;
  schedule_fees: Array<IScheduleFee>;
}

export interface ScheduleItemInfo {
  scheduleItemData: Array<IScheduleItem>;
}

@Module
export default class ScheduleItemModule
  extends VuexModule
  implements ScheduleItemInfo
{
  scheduleItemData = [] as Array<IScheduleItem>;

  /**
   * Get current user object
   * @returns AdminList
   */
  get scheduleFeeList(): Array<IScheduleItem> {
    return this.scheduleItemData;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_FEE.LIST](data) {
    this.scheduleItemData = data;
  }

  @Action
  [Actions.SCHEDULE_FEE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("schedule-fees")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SCHEDULE_FEE.LIST, data.data);
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
  [Actions.SCHEDULE_FEE.CREATE](payload) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("schedule-fees", payload, config)
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
  [Actions.SCHEDULE_FEE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("schedule-fees", item.id, item)
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
  [Actions.SCHEDULE_FEE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("schedule-fees/" + id)
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
}
