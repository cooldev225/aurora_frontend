import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Mutations } from "@/store/enums/StoreEnums";
import {
  DocumentActions,
  DocumentMutations,
} from "@/store/enums/StoreDocumentEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IDocument {
  id: number;
}

export interface Documents {
  documentsData: Array<IDocument>;
}

@Module
export default class DocumentModule extends VuexModule implements Documents {
  documentsData = [] as Array<IDocument>;

  get documentsList(): Array<IDocument> {
    return this.documentsData;
  }

  @Mutation
  [DocumentMutations.SET_LIST](data) {
    this.documentsData = data;
  }

  @Action
  [DocumentActions.LIST](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.query("documents", {
        params: {
          specialist_id: data.specialist_id,
          appointment_id: data.appointment_id,
          patient_id: data.patient_id,

          before_date: data.before_date,
          after_date: data.after_date,

          is_seen: data.is_seen,
          origin: data.origin,

          is_missing_information: data.is_missing_information,
        },
      })
        .then(({ data }) => {
          console.log(data.data);
          this.context.commit(DocumentMutations.SET_LIST, data.data);
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
  [DocumentActions.SHOW](data) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.post(
        "file",
        {
          path: data.path,
          type: "PATIENT_DOCUMENT",
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
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }
}
