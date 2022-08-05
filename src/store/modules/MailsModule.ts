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

export interface IMailbox {
  inbox: Array<IMail>;
  starred: Array<IMail>;
  draft: Array<IMail>;
  sent: Array<IMail>;
  trash: Array<IMail>;
}

export interface MailInfo {
  mailbox: IMailbox;
  mailSelectData: IMail;
}

@Module
export default class MailModule extends VuexModule implements MailInfo {
  mailbox = {
    inbox: [],
    starred: [],
    draft: [],
    sent: [],
    trash: [],
  } as IMailbox;
  mailSelectData = {} as IMail;

  /**
   * Get Mail info for current User
   * @returns this
   */
  get getMailInfo(): IMailbox {
    return this.mailbox;
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
    this.mailbox.inbox = data;
  }

  @Mutation
  [Mutations.SET_MAILS.STARRED](data) {
    this.mailbox.starred = data;
  }

  @Mutation
  [Mutations.SET_MAILS.DRAFT](data) {
    this.mailbox.draft = data;
  }

  @Mutation
  [Mutations.SET_MAILS.SENT](data) {
    this.mailbox.sent = data;
  }

  @Mutation
  [Mutations.SET_MAILS.TRASH](data) {
    this.mailbox.trash = data;
  }

  @Mutation
  [Mutations.SET_MAILS.SELECT](data) {
    this.mailSelectData = data;
  }

  @Action
  [Actions.MAILS.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("mails", {
        params: { status: "inbox" },
      })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.INBOX, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.query("mails", {
        params: { status: "starred" },
      })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.STARRED, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.query("mails", {
        params: { status: "draft" },
      })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.DRAFT, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.query("mails", {
        params: { status: "sent" },
      })
        .then(({ data }) => {
          this.context.commit(Mutations.SET_MAILS.SENT, data.data);
          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });

      ApiService.query("mails", {
        params: { status: "deleted" },
      })
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
  [Actions.MAILS.VIEW](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("mails", id)
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
  [Actions.MAILS.STAR](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("mails/bookmark", id, { is_starred: true })
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
  [Actions.MAILS.UN_STAR](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("mails/bookmark", id, { is_starred: false })
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
  [Actions.MAILS.DELETE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("mails/delete", item.id, item)
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
  [Actions.MAILS.RESTORE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("mails/restore", item.id, item)
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
