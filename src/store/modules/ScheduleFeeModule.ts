import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IScheduleFee {
  id: string;
}

export interface IScheduleFeeInfo {
  scheduleFeeData: Array<IScheduleFee>;
  scheduleFeeSelectData: IScheduleFee;
}

@Module
export default class ScheduleFeeModule
  extends VuexModule
  implements IScheduleFeeInfo
{
  scheduleFeeData = [] as Array<IScheduleFee>;
  scheduleFeeSelectData = {} as IScheduleFee;

  /**
   * Get Schedule Fee List
   * @returns ScheduleFee
   */
  get getScheduleFeeList(): Array<IScheduleFee> {
    return this.scheduleFeeData;
  }

  /**
   * Get current Schedule Fee
   * @returns Schedule Fee
   */
  get getScheduleFeeSelectedList(): IScheduleFee {
    return this.scheduleFeeSelectData;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_FEE.LIST](scheduleFeeData) {
    this.scheduleFeeData = scheduleFeeData;
  }

  @Mutation
  [Mutations.SET_SCHEDULE_FEE.SELECT](scheduleFeeData) {
    this.scheduleFeeSelectData = scheduleFeeData;
  }

  @Action
  [Actions.SCHEDULE_FEE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("schedule-fee")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SCHEDULE_FEE.LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.error(["error", response]);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
