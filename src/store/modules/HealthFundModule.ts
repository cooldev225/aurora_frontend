import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IHealthFunds {
  id: number;
}

export interface HealthFundsInfo {
  healthFundsData: Array<IHealthFunds>;
}

@Module
export default class HealthFundsModule
  extends VuexModule
  implements HealthFundsInfo
{
  healthFundsData = [] as Array<IHealthFunds>;

  /**
   * Get current user object
   * @returns AdminList
   */
  get healthFundsList(): Array<IHealthFunds> {
    return this.healthFundsData;
  }

  @Mutation
  [Mutations.SET_HEALTH_FUNDS_LIST](healthFundsData) {
    this.healthFundsData = healthFundsData;
  }

  @Action
  [Actions.LIST_HEALTH_FUNDS]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("health-funds")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_HEALTH_FUNDS_LIST, data.data);
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
