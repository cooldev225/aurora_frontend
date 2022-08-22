import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IReferralDoctor {
  id: number;
}

export interface ReferralDoctorInfo {
  referralDoctorData: Array<IReferralDoctor>;
}

@Module
export default class ReferralDoctorModule
  extends VuexModule
  implements ReferralDoctorInfo
{
  referralDoctorData = [] as Array<IReferralDoctor>;

  /**
   * Get current user object
   * @returns AdminList
   */
  get getReferralDoctorList(): Array<IReferralDoctor> {
    return this.referralDoctorData;
  }

  @Mutation
  [Mutations.SET_REFERRAL_DOCTOR.LIST](referralDoctorData) {
    this.referralDoctorData = referralDoctorData;
  }

  @Action
  [Actions.REFERRAL_DOCTOR.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("referring-doctors")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_REFERRAL_DOCTOR.LIST, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
