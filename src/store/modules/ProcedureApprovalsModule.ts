import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IProcedureApproval {
  id: string;
}

export interface ProcedureApprovalsInfo {
  procedureApprovalList: Array<IProcedureApproval>;
  procedureApproval: IProcedureApproval;
}

@Module
export default class ProcedureApprovalsModule
  extends VuexModule
  implements ProcedureApprovalsInfo
{
  procedureApprovalList = [] as Array<IProcedureApproval>;
  procedureApproval = {} as IProcedureApproval;

  /**
   * Get current ProcedureApprovals List
   * @returns ProcedureApprovals
   */
  get getProcedureApprovalList(): Array<IProcedureApproval> {
    return this.procedureApprovalList;
  }

  /**
   * Get current ProcedureApprovals List
   * @returns ProcedureApprovals
   */
  get getProcedureApproval(): IProcedureApproval {
    return this.procedureApproval;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_APPROVAL.LIST](procedureApprovalList) {
    this.procedureApprovalList = procedureApprovalList;
  }

  @Mutation
  [Mutations.SET_PROCEDURE_APPROVAL.DATA](procedureApproval) {
    this.procedureApproval = procedureApproval;
  }

  @Action
  [Actions.PROCEDURE_APPROVAL.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      console.log(data.data);
      ApiService.get("1/procedure-approvals")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PROCEDURE_APPROVAL.LIST, data.data);
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
  [Actions.PROCEDURE_APPROVAL.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      console.log(item);
      ApiService.put(item.appointment_id + "/procedure-approvals", item)
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
  [Actions.PROCEDURE_APPROVAL.UPLOAD](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post(item.appointment_id + "/pre-admission/upload", item)
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
}
