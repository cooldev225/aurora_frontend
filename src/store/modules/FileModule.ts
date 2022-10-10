import ApiService from "@/core/services/ApiService";
import { Actions } from "@/store/enums/StoreEnums";
import { Module, Action, VuexModule } from "vuex-module-decorators";

@Module
export default class FileModule extends VuexModule {
  @Action
  [Actions.FILE.VIEW](data) {
    return ApiService.post(
      "file",
      {
        path: data.path,
        type: data.type,
      },
      {
        responseType: "blob",
      }
    )
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        console.log(response.data.error);
      });
  }
}
