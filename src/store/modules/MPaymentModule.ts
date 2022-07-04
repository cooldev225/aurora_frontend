import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IMPayment {
  id: number;
}

export interface MPaymentInfo {
  paymentData: Array<IMPayment>;
  paymentSelectData: IMPayment;
}

@Module
export default class MPaymentModule extends VuexModule implements MPaymentInfo {
  paymentData = [] as Array<IMPayment>;
  paymentSelectData = {} as IMPayment;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getPaymentList(): Array<IMPayment> {
    return this.paymentData;
  }

  /**
   * Get current user object
   * @returns SelectedpaymentData
   */
  get getPaymentSelected(): IMPayment {
    return this.paymentSelectData;
  }

  @Mutation
  [Mutations.SET_MAKE_PAYMENT.LIST](paymentData) {
    this.paymentData = paymentData;
  }

  @Mutation
  [Mutations.SET_MAKE_PAYMENT.SELECT](data) {
    this.paymentSelectData = data;
  }

  @Action
  [Actions.MAKE_PAYMENT.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("make-payment")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAKE_PAYMENT.LIST, data.data);
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
  [Actions.MAKE_PAYMENT.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("make-payment", payload)
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
  [Actions.MAKE_PAYMENT.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("make-payment", item.id, item)
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
  [Actions.MAKE_PAYMENT.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("make-payment/" + id)
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
