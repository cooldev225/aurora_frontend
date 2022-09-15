import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ISpecialistMessage {
  id: number;
}

export interface SpecialistMessageInfo {
  specialistMessageData: Array<ISpecialistMessage>;
}

@Module
export default class SpecialistMessageModule
  extends VuexModule
  implements SpecialistMessageInfo
{
  specialistMessageData = [] as Array<ISpecialistMessage>;

  get specialistMessageList(): Array<ISpecialistMessage> {
    return this.specialistMessageData;
  }

  @Mutation
  [Mutations.SET_SPECIALIST_MESSAGES.LIST](data) {
    this.specialistMessageData = data;
  }

  @Action
  [Actions.SPECIALIST_MESSAGES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("specialist/messages")
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_SPECIALIST_MESSAGES.LIST,
            data.data
          );
          console.log(data.data);
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
