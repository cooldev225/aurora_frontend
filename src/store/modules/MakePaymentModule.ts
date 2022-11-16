import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IMPayment {
  id: number;
  amount: number;
  is_deposit: boolean;
  payment_type: string;
  confirmed_user_name: string;
  created_at: string;
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
  get paymentList(): Array<IMPayment> {
    return this.paymentData;
  }

  /**
   * Get current user object
   * @returns SelectedpaymentData
   */
  get paymentSelected(): IMPayment {
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
      return ApiService.get("payments")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAKE_PAYMENT.LIST, data.data);
          return Promise.resolve();
        })
        .catch(({ response }) => {
          let message = "Could not get all payments";
          if (response?.data?.error) {
            message = response.data.error;
          }

          return Promise.reject(message);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.MAKE_PAYMENT.VIEW](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("payments/" + id)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAKE_PAYMENT.SELECT, data.data);
          return Promise.resolve();
        })
        .catch(({ response }) => {
          let message = "Could not payment";
          if (response?.data?.error) {
            message = response.data.error;
          }

          return Promise.reject(message);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.MAKE_PAYMENT.CREATE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post("payments", data)
        .then(({ data }) => {
          return Promise.resolve();
        })
        .catch(({ response }) => {
          let message = "Could not create payment";
          if (response?.data?.error) {
            message = response.data.error;
          }

          return Promise.reject(message);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
