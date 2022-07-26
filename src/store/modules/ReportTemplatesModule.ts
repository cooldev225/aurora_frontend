import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface IAutoText {
  id: number;
  text: string;
}

export interface IReportSection {
  id: number;
  title: string;
  free_text_default: string;
  auto_texts: Array<IAutoText>;
}

export interface IReportTemplate {
  id: number;
  title: string;
  sections: Array<IReportSection>;
}

export interface ReportTemplateInfo {
  reportTemplatesData: Array<IReportTemplate>;
  reportTemplateSelectData: IReportTemplate;
}

@Module
export default class ReportTemplateModule
  extends VuexModule
  implements ReportTemplateInfo
{
  reportTemplatesData = [] as Array<IReportTemplate>;
  reportTemplateSelectData = {} as IReportTemplate;

  /**
   * Get Report Template for current organization
   * @returns reportTemplatesData
   */
  get getReportTemplateList(): Array<IReportTemplate> {
    return this.reportTemplatesData;
  }

  /**
   * Get Selected Report Template for current organization
   * @returns reportTemplateSelectData
   */
  get getReportTemplateSelected(): IReportTemplate {
    return this.reportTemplateSelectData;
  }

  @Mutation
  [Mutations.SET_REPORT_TEMPLATES.LIST](data) {
    this.reportTemplatesData = data;
  }

  @Mutation
  [Mutations.SET_REPORT_TEMPLATES.SELECT](data) {
    this.reportTemplateSelectData = data;
  }

  @Action
  [Actions.REPORT_TEMPLATES.LIST]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("report-templates")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_REPORT_TEMPLATES.LIST, data.data);
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
  [Actions.REPORT_TEMPLATES.CREATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("report-templates", item)
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
  [Actions.REPORT_TEMPLATES.UPDATE](item) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.update("report-templates", item.id, item)
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
  [Actions.REPORT_TEMPLATES.DELETE](id) {
    if (JwtService.getToken()) {
      ApiService.setHeader();

      ApiService.delete("report-templates/" + id)
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
