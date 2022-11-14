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
  scheduleItemSelectData = {} as IScheduleItem;

  /**
   * Get Schedule Item List
   * @returns Schedule Item List
   */
  get scheduleItemList(): Array<IScheduleItem> {
    return this.scheduleItemData;
  }

  /**
   * Get current Schedule Item
   * @returns Schedule Item
   */
  get getScheduleItemSelectedList(): IScheduleItem {
    return this.scheduleItemSelectData;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_ITEM.LIST](data) {
    this.scheduleItemData = data;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_ITEM.SELECT](scheduleItemData) {
    this.scheduleItemSelectData = scheduleItemData;
  }

  @Action
  [Actions.SCHEDULE_ITEM.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("schedule-items")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SCHEDULE_ITEM.LIST, data.data);
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
  [Actions.SCHEDULE_ITEM.CREATE](payload) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("schedule-items", payload, config)
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
  [Actions.SCHEDULE_ITEM.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("schedule-items", item.id, item)
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
  [Actions.SCHEDULE_ITEM.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("schedule-items/" + id)
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
