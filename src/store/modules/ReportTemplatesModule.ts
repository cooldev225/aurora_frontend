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
  reportAppointmentsData: Array<unknown>;
  reportTemplateSelectData: IReportTemplate;
  reportAppointmentSelectData: unknown;
  reportHeaderFooterSelectData: unknown;
}

@Module
export default class ReportTemplateModule
  extends VuexModule
  implements ReportTemplateInfo
{
  reportTemplatesData = [] as Array<IReportTemplate>;
  reportTemplateSelectData = {} as IReportTemplate;

  reportAppointmentsData = [] as Array<unknown>;
  reportAppointmentSelectData = {} as unknown;
  reportHeaderFooterSelectData = {} as unknown;

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
    console.log(["getReportTempl====", this.reportTemplateSelectData]);
    return this.reportTemplateSelectData;
  }

  get getReportAppointmentSelected(): unknown {
    return this.reportAppointmentSelectData;
  }

  get getReportHeaderFooterSelected(): unknown {
    return this.reportHeaderFooterSelectData;
  }

  @Mutation
  [Mutations.SET_REPORT_APPOINTMENTS.LIST](data) {
    this.reportAppointmentsData = data;
  }

  @Mutation
  [Mutations.SET_REPORT_TEMPLATES.LIST](data) {
    this.reportTemplatesData = data;
  }

  @Mutation
  [Mutations.SET_REPORT_TEMPLATES.SELECT](data) {
    this.reportTemplateSelectData = data.template;
    this.reportAppointmentSelectData = data.appointment;
    this.reportHeaderFooterSelectData = data.headerFooter;
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
