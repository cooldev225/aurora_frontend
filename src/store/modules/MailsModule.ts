import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IMail {
  id: number;
  subject: string;
  from_user_id: number;
  to_user_ids: Array<number>;
  body: string;
  is_starred: boolean;
  sent_at: string;
  attachment: Array<string>;
}

export interface MailInfo {
  mailsData: Array<IMail>;
  mailSelectData: IMail;
}

@Module
export default class MailModule extends VuexModule implements MailInfo {
  mailsData = [] as Array<IMail>;
  mailSelectData = {} as IMail;

  /**
   * Get Mail for current User
   * @returns mailsData
   */
  get getMailList(): Array<IMail> {
    return this.mailsData;
  }

  /**
   * Get Selected Mail for current User
   * @returns mailSelectData
   */
  get getMailSelected(): IMail {
    return this.mailSelectData;
  }

  @Mutation
  [Mutations.SET_MAILS.LIST](data) {
    this.mailsData = data;
  }

  @Mutation
  [Mutations.SET_MAILS.SELECT](data) {
    this.mailSelectData = data;
  }

  @Action
  [Actions.MAILS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("mails")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.LIST, data.data);
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
  [Actions.MAILS.COMPOSE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("mails", item)
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
  [Actions.MAILS.SEND](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("mails/send", item)
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
  [Actions.MAILS.UPDATE_DRAFT](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("mails", item.id, item)
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
  [Actions.MAILS.DELETE_DRAFT](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();

      ApiService.delete("mails/" + id)
        .then((data) => {
          return data;
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
