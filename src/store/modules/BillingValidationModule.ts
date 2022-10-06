import BillingApiService from "@/core/services/BillingApiService";
import { Mutations } from "@/store/enums/StoreEnums";
import {
  PatientActions,
  PatientMutations,
} from "@/store/enums/StorePatientEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface ValidationDataResponse {
  verified: boolean;
  update_details: Array<string>;
  message: string;
  errors: Array<string>;
}

export interface ValidationResponse {
  success: boolean;
  data: ValidationDataResponse;
}

export interface ValidationInfo {
  errors: unknown;
  medicareValidation: ValidationResponse;
  isVerified: boolean;
}

@Module
export default class BillingValidationModule
  extends VuexModule
  implements ValidationInfo
{
  errors = {};
  medicareValidation = {} as ValidationResponse;
  isVerified = false;

  /**
   * Get medicare validation response
   * @returns ValidationResponse
   */
  get medicareValidationResponse(): ValidationResponse {
    return this.medicareValidation;
  }

  @Mutation
  [PatientMutations.SET_VALIDATION.MEDICARE](data) {
    this.medicareValidation = data;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error, status: "failed" };
  }

  @Action
  [PatientActions.BILLING.VALIDATE_MEDICARE](details) {
    BillingApiService.setHeader();
    return BillingApiService.post("api/validate/medicare", details)
      .then(({ data }) => {
        if (data.success) {
          this.context.commit(PatientMutations.SET_VALIDATION.MEDICARE, data);
        } else {
          throw data;
        }
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.data);
      });
  }
}
