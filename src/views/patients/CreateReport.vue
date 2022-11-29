<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Procedure Report:</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="report-template-wrapper">
          <InputWrapper class="fill-out" label="Report Template">
            <el-select
              class="w-100"
              v-model="templateData"
              placeholder="Select Report Template"
            >
              <el-option
                v-for="(option, idx) in reportTemplatesData"
                :key="option.id"
                :value="idx"
                :label="option.title"
              />
            </el-select>
          </InputWrapper>

          <InputWrapper class="title-input-wrapper fill-out" prop="title">
            <el-input
              v-model="formData.title"
              type="text"
              placeholder="Title"
            />
          </InputWrapper>
          <InputWrapper
            required
            class="fill-out"
            label="Header/Footer Template"
            prop="header_footer_templates"
          >
            <el-select
              class="col-12"
              v-model="formData.headerFooter"
              placeholder="Select Header/Footer Template"
              props="header_footer_templates_select"
            >
              <el-option
                v-for="(option, idx) in headerFooterList"
                :key="option.id"
                :value="idx"
                :label="option.title"
              />
            </el-select>
          </InputWrapper>

          <el-divider />

          <InputWrapper
            class="fill-out"
            label="Procedures Undertaken"
            prop="procedures_undertaken"
          >
            <el-select
              class="col-12 mt-3"
              placeholder="Select MBS item"
              props="procedures_undertaken_select"
              filterable
              remote
              reserve-keyword
              :remote-method="filterProceduresHandle"
              :loading="loading"
              :disabled="proceduresUndertakenDataFiltered.length === 0"
              @change="selectNewProceduresUndertaken"
            >
              <el-option
                v-for="(taken, idx) in proceduresUndertakenDataFiltered"
                :key="idx"
                :value="taken"
                :label="getItemName(taken)"
              />
            </el-select>

            <div
              v-for="(item, index) in formData.procedures_undertaken"
              :key="`procedures-undertaken-${index}`"
              class="w-100 d-flex flex-row align-items-center p-3 card border border-dashed border-primary mt-3"
            >
              <div class="col-11 text-truncate">
                {{ getItemName(item) }}
              </div>

              <div class="col-1 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  @click="deleteProcedureUndertaken(index)"
                >
                  <span class="svg-icon svg-icon-3">
                    <InlineSVG icon="bin" />
                  </span>
                </button>
              </div>
            </div>
          </InputWrapper>

          <InputWrapper
            class="fill-out"
            label="Extra items used"
            prop="extra_items_used"
          >
            <el-select
              class="col-12 mt-3"
              placeholder="Select MBS item"
              props="extra_items_select"
              filterable
              remote
              reserve-keyword
              :remote-method="filterExtraHandle"
              :loading="loading"
              :disabled="extraItemsUsedDataFiltered.length === 0"
              @change="selectNewExtraItems"
            >
              <el-option
                v-for="(taken, idx) in extraItemsUsedDataFiltered"
                :key="idx"
                :value="taken"
                :label="getItemName(taken)"
              />
            </el-select>

            <div
              v-for="(item, index) in formData.extra_items_used"
              :key="`extra-items-${index}`"
              class="w-100 d-flex flex-row align-items-center p-3 card border border-dashed border-primary mt-3"
            >
              <div class="col-11 text-truncate">
                {{ getItemName(item) }}
              </div>

              <div class="col-1 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  @click="deleteExtraItems(index)"
                >
                  <span class="svg-icon svg-icon-3">
                    <InlineSVG icon="bin" />
                  </span>
                </button>
              </div>
            </div>
          </InputWrapper>

          <InputWrapper
            class="fill-out"
            label="Non-MBS items used"
            prop="admin_items_used"
          >
            <el-select
              class="col-12 mt-3"
              placeholder="Select Non-MBS item"
              props="admin_items_used"
              filterable
              remote
              reserve-keyword
              :remote-method="filterAdminHandle"
              :loading="loading"
              :disabled="adminItemsUsedDataFiltered.length === 0"
              @change="selectNewAdminItems"
            >
              <el-option
                v-for="(taken, idx) in adminItemsUsedDataFiltered"
                :key="idx"
                :value="taken"
                :label="getItemName(taken)"
              />
            </el-select>

            <div
              v-for="(item, index) in formData.admin_items_used"
              :key="`admin-items-${index}`"
              class="w-100 d-flex flex-row align-items-center p-3 card border border-dashed border-primary mt-3"
            >
              <div class="col-11 text-truncate">
                {{ getItemName(item) }}
              </div>

              <div class="col-1 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  @click="deleteAdminItems(index)"
                >
                  <span class="svg-icon svg-icon-3">
                    <InlineSVG icon="bin" />
                  </span>
                </button>
              </div>
            </div>
          </InputWrapper>
          <el-divider />
          <div class="d-flex flex-column gap-2 mb-6">
            <InfoSection heading="Patient"
              >{{ patientData?.title }} {{ patientData?.first_name }}
              {{ patientData?.last_name }},
              {{
                moment(patientData?.date_of_birth)
                  .format("DD/MM/YYYY")
                  .toString()
              }}</InfoSection
            >
            <InfoSection heading="Doctor Address Book">
              {{ appointmentData?.referral?.doctor_address_book_name }}
            </InfoSection>
          </div>
          <div
            v-for="section in reportSections"
            class="d-flex flex-column gap-2"
            :key="section.id"
          >
            <el-divider />
            <div class="fv-row">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">{{
                section.title
              }}</label>
              <!--end::Label-->
              <el-form-item>
                <el-select
                  class="w-100"
                  multiple
                  v-model="formData.section['section' + section.id]"
                >
                  <el-option
                    v-for="item in section.auto_texts"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="fv-row">
              <el-form-item prop="note">
                <el-input
                  type="textarea"
                  v-model="section.free_text_default"
                  placeholder="Free Text"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="d-flex ms-auto justify-content-end">
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label"> Create </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button type="reset" class="btn btn-light-primary ms-2">
            Cancel
          </button>
        </div>
      </el-form>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
  <ReportPreviewModal
    :patient="patientData"
    :appointment="appointmentData"
    :pdfId="reportPreviewPdfId"
  ></ReportPreviewModal>
</template>

<style lang="scss">
.report-template-wrapper {
  .fill-out {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
  .title-input-wrapper {
    input {
      height: 50px;
      font-weight: bold;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  watchEffect,
  ref,
  onMounted,
  computed,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import { DocumentMutations } from "@/store/enums/StoreDocumentEnums";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import InputWrapper from "../../components/presets/FormElements/InputWrapper.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { IScheduleItem } from "@/store/modules/ScheduleItemModule";
import { Modal } from "bootstrap";
import ReportPreviewModal from "@/views/patients/modals/ReportPreviewModal.vue";

export default defineComponent({
  name: "patient-report",
  components: { InfoSection, InputWrapper, ReportPreviewModal },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const route = useRoute();
    const patientId = route.params.patientId;
    const appointmentId = route.params.appointmentId;

    const reportTemplatesData = computed(
      () => store.getters.getReportTemplateList
    );
    const patientData = computed(() => store.getters.selectedPatient);

    const templateData = ref();
    const reportSections = ref([]);
    const headerFooterList = computed(
      () => store.getters.getHeaderFooterTemplateList
    );

    const appointmentData = ref();
    const scheduleItems = computed(() => store.getters.scheduleItemList);
    const proceduresUndertakenDataFiltered = ref<Array<IScheduleItem>>([]);
    const extraItemsUsedDataFiltered = ref<Array<IScheduleItem>>([]);
    const adminItemsUsedDataFiltered = ref<Array<IScheduleItem>>([]);

    const reportPreviewPdfId = ref(null);

    const formData = ref({
      title: "",
      section: {},
      headerFooter: null,
      procedures_undertaken: [] as Array<IScheduleItem>,
      extra_items_used: [] as Array<IScheduleItem>,
      admin_items_used: [] as Array<IScheduleItem>,
    });

    const mbsItems = computed(() => {
      return scheduleItems.value.filter((item) => item.mbs_item_code);
    });

    const nonMbsItems = computed(() => {
      return scheduleItems.value.filter((item) => !item.mbs_item_code);
    });

    const rules = ref({
      title: [
        {
          required: true,
          message: "Title cannot be blank",
          trigger: "change",
        },
      ],
      headerFooter: [
        {
          required: false,
          message: "Header/Footer Template cannot be blank",
          trigger: "change",
        },
      ],
    });
    const loading = ref(false);
    const proceduresLoading = ref(false);
    const extraItemsLoading = ref(false);

    const filterProceduresHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          proceduresUndertakenDataFiltered.value = mbsItems.value.filter(
            (item) => {
              return (
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.mbs_item_code
                  .toString()
                  .toLowerCase()
                  .includes(query.toLowerCase())
              );
            }
          );
        }, 200);
      } else {
        proceduresUndertakenDataFiltered.value = mbsItems.value;
      }
    };

    const filterExtraHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          extraItemsUsedDataFiltered.value = mbsItems.value.filter((item) => {
            return (
              item.description.toLowerCase().includes(query.toLowerCase()) ||
              item.mbs_item_code
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase())
            );
          });
        }, 200);
      } else {
        extraItemsUsedDataFiltered.value = mbsItems.value;
      }
    };

    const filterAdminHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          adminItemsUsedDataFiltered.value = nonMbsItems.value.filter(
            (item) => {
              return (
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.mbs_item_code
                  .toString()
                  .toLowerCase()
                  .includes(query.toLowerCase())
              );
            }
          );
        }, 200);
      } else {
        extraItemsUsedDataFiltered.value = nonMbsItems.value;
      }
    };

    const selectNewProceduresUndertaken = (event) => {
      formData.value.procedures_undertaken.push(event);
    };

    const selectNewExtraItems = (event) => {
      formData.value.extra_items_used.push(event);
    };

    const selectNewAdminItems = (event) => {
      formData.value.admin_items_used.push(event);
    };

    const deleteProcedureUndertaken = (index) => {
      formData.value.procedures_undertaken.splice(index, 1);
    };

    const deleteExtraItems = (index) => {
      formData.value.extra_items_used.splice(index, 1);
    };

    const deleteAdminItems = (index) => {
      formData.value.admin_items_used.splice(index, 1);
    };

    const handlePreviewModal = () => {
      console.log("");
      const modal = new Modal(
        document.getElementById("modal_report_document_preview")
      );
      modal.show();
    };
    const submit = () => {
      loading.value = true;
      if (!formRef.value) {
        loading.value = false;
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (formRef.value as any).validate(async (valid) => {
        if (valid) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const reportData: any[] = [];
          const icd_10_code: string[] = [];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reportSections.value.forEach((section: any) => {
            reportData.push({
              sectionId: section.id,
              free_text_default: section.free_text_default,
              value: formData.value.section["section" + section.id],
            });
            section.auto_texts.forEach((auto) => {
              icd_10_code.push(auto.icd_10_code);
            });
          });

          const proceduresUndertaken = [] as Array<Record<string, unknown>>;
          formData.value.procedures_undertaken.forEach((item) => {
            proceduresUndertaken.push({
              id: item.id,
              price: item.amount,
            });
          });

          const extraItems = [] as Array<Record<string, unknown>>;
          formData.value.extra_items_used.forEach((item) => {
            extraItems.push({
              id: item.id,
              price: item.amount,
            });
          });

          const adminItems = [] as Array<Record<string, unknown>>;
          formData.value.admin_items_used.forEach((item) => {
            adminItems.push({
              id: item.id,
              price: item.amount,
            });
          });

          const data = {
            title: formData.value.title,
            patient_id: patientId,
            reportData: reportData,
            doctorAddressBook:
              appointmentData.value.referral?.doctor_address_book_name,
            patientName:
              patientData.value.first_name + " " + patientData.value.last_name,
            appointmentId: appointmentData.value.id,
            specialistId: appointmentData.value.specialist_id,
            documentName: appointmentData.value.appointment_type_name,
            header_footer_id:
              formData.value.headerFooter != null
                ? headerFooterList.value[formData.value.headerFooter].id
                : null,
            procedures_undertaken: proceduresUndertaken,
            extra_items_used: extraItems,
            admin_items_used: adminItems,
            icd_10_code: icd_10_code,
          };
          store
            .dispatch(StoreReportActions.REPORT.PATIENT_PREVIEW, data)
            .then((data) => {
              console.log("report result", data);
              reportPreviewPdfId.value = data;
              handlePreviewModal();
              // store.commit(DocumentMutations.SET_SELECTED_DOCUMENT, {
              //   id: data,
              // });
              // router.push({
              //   path: "/patients/" + patientId + "/documents",
              // });
            });
        }
      });
    };

    const getItemName = (item: IScheduleItem) => {
      const isMbs = item.mbs_item_code ? true : false;

      if (isMbs) {
        return `${item.mbs_item_code} - ${item.name}`;
      }

      let name = [] as Array<string>;
      if (item.internal_code) {
        name.push(item.internal_code);
      }

      name.push(item.name);

      return name.join(" - ");
    };

    watch(templateData, () => {
      formData.value.title =
        reportTemplatesData.value[templateData.value].title;
      reportSections.value =
        reportTemplatesData.value[templateData.value].sections;
    });

    watch(patientData, () => {
      if (patientData.value)
        appointmentData.value = patientData.value.appointments?.find(
          (appointment) => appointment.id === Number(appointmentId)
        );
    });

    watchEffect(() => {
      if (patientData.value)
        appointmentData.value = patientData.value.appointments?.find(
          (appointment) => appointment.id === Number(appointmentId)
        );
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
      loading.value = true;
      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST).then(() => {
        loading.value = false;
      });
      store.dispatch(Actions.SCHEDULE_ITEM.LIST).then(() => {
        proceduresUndertakenDataFiltered.value = mbsItems.value;
        extraItemsUsedDataFiltered.value = mbsItems.value;
        adminItemsUsedDataFiltered.value = nonMbsItems.value;
      });
    });

    return {
      formRef,
      rules,
      templateData,
      reportSections,
      patientData,
      reportTemplatesData,
      appointmentData,
      formData,
      moment,
      submit,
      headerFooterList,
      proceduresUndertakenDataFiltered,
      extraItemsUsedDataFiltered,
      adminItemsUsedDataFiltered,
      loading,
      proceduresLoading,
      extraItemsLoading,
      filterProceduresHandle,
      filterExtraHandle,
      selectNewProceduresUndertaken,
      selectNewExtraItems,
      deleteProcedureUndertaken,
      deleteExtraItems,
      filterAdminHandle,
      selectNewAdminItems,
      deleteAdminItems,
      getItemName,
      handlePreviewModal,
      reportPreviewPdfId,
    };
  },
});
</script>
