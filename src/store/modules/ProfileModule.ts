import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
}

export interface ProfileInfo {
  profileSelectedData: IProfile;
}

@Module
export default class ProfileModule extends VuexModule implements ProfileInfo {
  profileSelectedData = {} as IProfile;

  /**
   * Get current user object
   * @returns profileSelectedData
   */
  get getProfileSelected(): IProfile {
    return this.profileSelectedData;
  }

  @Mutation
  [Mutations.SET_PROFILE](data) {
    this.profileSelectedData = data;
  }

  @Action
  [Actions.PROFILE.VIEW]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("profile")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_PROFILE, data);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.PROFILE.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("update-profile", item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.PROFILE.UPDATE_PASSWORD](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("users/change-password", "0", item)
        .then(({ data }) => {
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response.data.error);
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
