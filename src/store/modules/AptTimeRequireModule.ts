import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IAptTimeRequirement {
  id: number;
  title: string;
  type: string;
  time: string;
}

export interface AptTimeRequireInfo {
  aptTimeRequireData: Array<IAptTimeRequirement>;
  aptTimeRequireSelectData: IAptTimeRequirement;
}

@Module
export default class AptTimeRequireModule
  extends VuexModule
  implements AptTimeRequireInfo
{
  aptTimeRequireData = [] as Array<IAptTimeRequirement>;
  aptTimeRequireSelectData = {} as IAptTimeRequirement;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getAptTimeRequireList(): Array<IAptTimeRequirement> {
    return this.aptTimeRequireData;
  }

  /**
   * Get current user object
   * @returns SelectedaptTimeRequireData
   */
  get getAptTimeRequireSelected(): IAptTimeRequirement {
    return this.aptTimeRequireSelectData;
  }

  @Mutation
  [Mutations.SET_APT_TIME_REQUIREMENT.LIST](aptTimeRequireData) {
    this.aptTimeRequireData = aptTimeRequireData;
  }

  @Mutation
  [Mutations.SET_APT_TIME_REQUIREMENT.SELECT](data) {
    this.aptTimeRequireSelectData = data;
  }

  @Action
  [Actions.APT_TIME_REQUIREMENT.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("time_requirements")
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_APT_TIME_REQUIREMENT.LIST,
            data.data
          );
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
  [Actions.APT_TIME_REQUIREMENT.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("time_requirements", payload)
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
  [Actions.APT_TIME_REQUIREMENT.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("time_requirements", item.id, item)
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
  [Actions.APT_TIME_REQUIREMENT.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("time_requirements/" + id)
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
