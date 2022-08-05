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
  is_read: boolean;
  sent_at: string;
  attachment: Array<string>;
}

export interface MailInfo {
  inbox: Array<IMail>;
  starred: Array<IMail>;
  draft: Array<IMail>;
  sent: Array<IMail>;
  trash: Array<IMail>;
  mailSelectData: IMail;
}

@Module
export default class MailModule extends VuexModule implements MailInfo {
  inbox = [] as Array<IMail>;
  starred = [] as Array<IMail>;
  draft = [] as Array<IMail>;
  sent = [] as Array<IMail>;
  trash = [] as Array<IMail>;
  mailSelectData = {} as IMail;

  /**
   * Get Mail info for current User
   * @returns this
   */
  get getMailInfo(): MailModule {
    return this;
  }

  /**
   * Get Selected Mail for current User
   * @returns mailSelectData
   */
  get getMailSelected(): IMail {
    return this.mailSelectData;
  }

  @Mutation
  [Mutations.SET_MAILS.INBOX](data) {
    this.inbox = data;
  }

  @Mutation
  [Mutations.SET_MAILS.STARRED](data) {
    this.starred = data;
  }

  @Mutation
  [Mutations.SET_MAILS.DRAFT](data) {
    this.draft = data;
  }

  @Mutation
  [Mutations.SET_MAILS.SENT](data) {
    this.sent = data;
  }

  @Mutation
  [Mutations.SET_MAILS.TRASH](data) {
    this.trash = data;
  }

  @Mutation
  [Mutations.SET_MAILS.SELECT](data) {
    this.mailSelectData = data;
  }

  @Action
  [Actions.MAILS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("mails?status=inbox")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.INBOX, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.get("mails?status=starred")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.STARRED, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.get("mails?status=draft")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.DRAFT, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.get("mails?status=sent")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.SENT, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.get("mails?status=deleted")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.TRASH, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
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
