import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import {
  displayServerError,
  displaySuccessModal,
  displaySuccessToast,
} from "@/helpers/helpers";
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
          return displayServerError(response, "viewing user profile");
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
        .then(() => {
          return displaySuccessToast("Profile Updated");
        })
        .catch(({ response }) => {
          return displayServerError(response, "Updating user profile");
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.PROFILE.UPDATE_PASSWORD](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("users/change-password", item)
        .then(() => {
          return displaySuccessToast("Password Updated");
        })
        .catch(({ response }) => {
          return displayServerError(response, "Updating user password");
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.PROFILE.UPDATE_SIGNATURE](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("profile/signature", data)
        .then(() => {
          return displaySuccessToast("Signature Updated");
        })
        .catch(({ response }) => {
          return displayServerError(response, "Updating user signature");
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
