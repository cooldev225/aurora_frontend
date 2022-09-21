import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IEmployee {
  role_id: number;
  id: number;
}

export interface EmployeeInfo {
  employeeData: Array<IEmployee>;
  employeeSelectData: IEmployee;
}

@Module
export default class EmployeeModule extends VuexModule implements EmployeeInfo {
  employeeData = [] as Array<IEmployee>;
  employeeSelectData = {} as IEmployee;

  /**
   * Get current user object
   * @returns EmployeeList
   */
  get employeeList(): Array<IEmployee> {
    return this.employeeData;
  }

  /**
   * Get current anesthetist user object
   * @returns AnesthetistList
   */
  get anesthetistList(): Array<IEmployee> {
    return this.employeeData.filter((e) => e.role_id === 9);
  }

  /**
   * Get current user object
   * @returns SelectedEmplyee
   */
  get employeeSelected(): IEmployee {
    return this.employeeSelectData;
  }

  @Mutation
  [Mutations.SET_EMPLOYEE.LIST](employeeData) {
    this.employeeData = employeeData;
  }

  @Mutation
  [Mutations.SET_EMPLOYEE.SELECT](data) {
    this.employeeSelectData = data;
  }

  @Action
  [Actions.EMPLOYEE.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("users")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_EMPLOYEE.LIST, data.data);
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
  [Actions.EMPLOYEE.CREATE](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post("users", payload)
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
  [Actions.EMPLOYEE.UPDATE](item) {
    console.log(["Actions.EMPLOYEE.UPDATE=start", item]);
    if (JwtService.getToken()) {
      console.log(["Actions.EMPLOYEE.UPDATE=authed"]);
      ApiService.setHeader();
      ApiService.update("users", item.id, item)
        .then(({ data }) => {
          console.log(["Actions.EMPLOYEE.UPDATE=", Actions.EMPLOYEE.UPDATE]);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(["Actions.EMPLOYEE.UPDATE error", response.data.error]);
          // this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.EMPLOYEE.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.delete("users/" + id)
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
