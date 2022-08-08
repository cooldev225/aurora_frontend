import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IProcedureApproval {
  id: string;
}

export interface ProcedureApprovalsInfo {
  procedureApprovalsData: Array<IProcedureApproval>;
}

@Module
export default class ProcedureApprovalsModule
  extends VuexModule
  implements ProcedureApprovalsInfo
{
  procedureApprovalsData = [] as Array<IProcedureApproval>;

  /**
   * Get current ProcedureApprovals List
   * @returns ProcedureApprovals
   */
  get procedureApprovalsList(): Array<IProcedureApproval> {
    return this.procedureApprovalsData;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_APPROVALS.LIST](procedureApprovalsData) {
    this.procedureApprovalsData = procedureApprovalsData;
  }

  @Action
  [Actions.PROCEDURE_APPROVALS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("procedure-approvals")
        .then(({ data }) => {
          this.context.commit(
            Mutations.SET_PROCEDURE_APPROVALS.LIST,
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
}
