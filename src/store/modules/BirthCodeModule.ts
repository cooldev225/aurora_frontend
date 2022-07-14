import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IBirthCode {
  id: number;
}

export interface BirthCodeInfo {
  birthCodeData: Array<IBirthCode>;
  birthCodeSelectData: IBirthCode;
}

@Module
export default class BirthCodeModule
  extends VuexModule
  implements BirthCodeInfo
{
  birthCodeData = [] as Array<IBirthCode>;
  birthCodeSelectData = {} as IBirthCode;

  /**
   * Get current user object
   * @returns birthCodeData
   */
  get birthCodeList(): Array<IBirthCode> {
    return this.birthCodeData;
  }

  /**
   * Get current user object
   * @returns birthCodeSelectData
   */
  get birthCodeSelected(): IBirthCode {
    return this.birthCodeSelectData;
  }

  @Mutation
  [Mutations.SET_BIRTH_CODE_LIST](birthCodeData) {
    this.birthCodeData = birthCodeData;
  }

  @Mutation
  [Mutations.SET_SELECT_BIRTH_CODE](data) {
    this.birthCodeSelectData = data;
  }

  @Action
  [Actions.BIRTH_CODE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("birth-codes")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_BIRTH_CODE_LIST, data.data);
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
  [Actions.BIRTH_CODE.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("birth-codes", payload)
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
  [Actions.BIRTH_CODE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("birth-codes", item.id, item)
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
  [Actions.BIRTH_CODE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("birth-codes/" + id)
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
