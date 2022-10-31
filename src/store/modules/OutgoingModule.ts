import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IOutgoing {
  id: string;
}

export interface IOutgoingInfo {
  outgoingData: Array<IOutgoing>;
}

@Module
export default class OutgoingModule
  extends VuexModule
  implements IOutgoingInfo
{
  outgoingData = [] as Array<IOutgoing>;

  /**
   * Get current outgoing log List
   * @returns Patients
   */
  get getOutgoingList(): Array<IOutgoing> {
    return this.outgoingData;
  }

  @Mutation
  [Mutations.SET_OUTGOING.LIST](data) {
    this.outgoingData = data;
  }

  @Action
  [Actions.OUTGOING.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("communication/outgoing-log")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_OUTGOING.LIST, data.data);
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
