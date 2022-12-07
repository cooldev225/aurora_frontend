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

          <template v-if="documentType == 'report'">
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
                multiple
                :loading="loading"
                :disabled="mbsItems.length === 0"
                v-model="formData.procedures_undertaken"
              >
                <el-option
                  v-for="item in mbsItems"
                  :key="item.id"
                  :value="item.id"
                  :label="getItemName(item)"
                />
              </el-select>
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
                multiple
                reserve-keyword
                :loading="loading"
                :disabled="mbsItems.length === 0"
                v-model="formData.extra_items_used"
              >
                <el-option
                  v-for="item in mbsItems"
                  :key="item.id"
                  :value="item.id"
                  :label="getItemName(item)"
                />
              </el-select>
            </InputWrapper>

            <InputWrapper
              class="fill-out"
              label="Non-MBS items used"
              prop="admin_items_used"
            >
              <el-select
                class="col-12 mt-3"
                placeholder="Select MBS item"
                props="admin_items_select"
                filterable
                multiple
                reserve-keyword
                :loading="loading"
                :disabled="mbsItems.length === 0"
                v-model="formData.admin_items_used"
              >
                <el-option
                  v-for="item in nonMbsItems"
                  :key="item.id"
                  :value="item.id"
                  :label="getItemName(item)"
                />
              </el-select>
            </InputWrapper>
          </template>

          <el-divider />

          <div class="d-flex flex-column gap-2 mb-6">
            <InfoSection heading="Patient">
              {{ patientData?.title }} {{ patientData?.first_name }}
              {{ patientData?.last_name }},
              {{
                moment(patientData?.date_of_birth)
                  .format("DD/MM/YYYY")
                  .toString()
              }}
            </InfoSection>

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
              <label class="required fs-6 fw-bold mb-2">
                {{ section.title }}
              </label>

              <el-form-item v-if="reportTemplatesData.use_autotext">
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
    v-if="patientData && appointmentData"
    :patient="patientData"
    :appointment="appointmentData"
    :pdfId="reportPreviewPdfId"
    :handleSave="handleSave"
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
import { defineComponent, ref, onMounted, computed, watch } from "vue";
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
import { toSentenceCase } from "@/core/helpers/text";
import IDocumentSection from "@/store/interfaces/IDocumentSection";
import IAppointment from "@/store/interfaces/IAppointment";
import { ElForm } from "element-plus";
import { FormRulesMap } from "element-plus/es/components/form/src/form.type";

export default defineComponent({
  components: {
    ReportPreviewModal,
  },
  setup() {
    const store = useStore();
    const loading = ref<boolean>(false);
    const router = useRouter();
    const route = useRoute();
    const patientId = route.params.patientId;
    const appointmentId = route.params.appointmentId;
    const documentType = route.params.documentType;
    const formRef = ref<typeof ElForm | null>(null);
    const templateData = ref<number | null>(null);
    const appointmentData = ref<IAppointment | null>(null);
    const reportPreviewPdfId = ref(null);
    const reportSections = ref<Array<IDocumentSection>>([]);

    const formData = ref({
      title: "",
      section: [],
      headerFooter: null,
      procedures_undertaken: [] as Array<IScheduleItem>,
      extra_items_used: [] as Array<IScheduleItem>,
      admin_items_used: [] as Array<IScheduleItem>,
    });

    const rules = ref<FormRulesMap>({
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

    const scheduleItems = computed(() => store.getters.scheduleItemList);
    const patientData = computed(() => store.getters.selectedPatient);

    const mbsItems = computed(() =>
      scheduleItems.value.filter((item: IScheduleItem) => item.mbs_item_code)
    );

    const nonMbsItems = computed(() =>
      scheduleItems.value.filter((item: IScheduleItem) => !item.mbs_item_code)
    );

    const reportTemplatesData = computed(
      () => store.getters.getDocumentTemplateList
    );

    const headerFooterList = computed(
      () => store.getters.getHeaderFooterTemplateList
    );

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

    const handlePreviewModal = () => {
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

      formRef.value.validate((valid) => {
        if (valid) {
          const reportData: Array<Record<string, unknown>> = [];
          const icd_10_code: Array<string> = [];

          reportSections.value.forEach((section) => {
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
            const mbsItem = mbsItems.value.find((mbs) => mbs.id == item);
            proceduresUndertaken.push({
              id: mbsItem.id,
              price: mbsItem.amount,
            });
          });

          const extraItems = [] as Array<Record<string, unknown>>;
          formData.value.extra_items_used.forEach((item) => {
            const mbsItem = mbsItems.value.find((mbs) => mbs.id == item);
            extraItems.push({
              id: mbsItem.id,
              price: mbsItem.amount,
            });
          });

          const adminItems = [] as Array<Record<string, unknown>>;
          formData.value.admin_items_used.forEach((item) => {
            const adminItem = nonMbsItems.value.find(
              (admin) => admin.id == item
            );
            adminItems.push({
              id: adminItem.id,
              price: adminItem.amount,
            });
          });

          const data = {
            title: formData.value.title,
            patient_id: patientId,
            reportData: reportData,
            doctorAddressBook:
              appointmentData.value?.referral?.doctor_address_book_name,
            patientName:
              patientData.value.first_name + " " + patientData.value.last_name,
            appointmentId: appointmentData.value?.id,
            specialistId: appointmentData.value?.specialist_id,
            documentName: appointmentData.value?.appointment_type_name,
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
              loading.value = false;
              reportPreviewPdfId.value = data;
              handlePreviewModal();
            });
        }
      });
    };

    const handleSave = (flag = false) => {
      setTimeout(() => {
        loading.value = true;
        if (!formRef.value) {
          loading.value = false;
          return;
        }

        formRef.value.validate((valid) => {
          if (valid) {
            const icd_10_code: Array<string> = [];

            reportSections.value.forEach((section) => {
              section.auto_texts.forEach((auto) => {
                icd_10_code.push(auto.icd_10_code);
              });
            });

            const proceduresUndertaken = [] as Array<Record<string, unknown>>;
            formData.value.procedures_undertaken.forEach((item) => {
              const mbsItem = mbsItems.value.find((mbs) => mbs.id == item);
              proceduresUndertaken.push({
                id: mbsItem.id,
                price: mbsItem.amount,
              });
            });

            const extraItems = [] as Array<Record<string, unknown>>;
            formData.value.extra_items_used.forEach((item) => {
              const mbsItem = mbsItems.value.find((mbs) => mbs.id == item);
              extraItems.push({
                id: mbsItem.id,
                price: mbsItem.amount,
              });
            });

            const adminItems = [] as Array<Record<string, unknown>>;
            formData.value.admin_items_used.forEach((item) => {
              const adminItem = nonMbsItems.value.find(
                (admin) => admin.id == item
              );
              adminItems.push({
                id: adminItem.id,
                price: adminItem.amount,
              });
            });

            const data = {
              title: formData.value.title,
              patient_id: patientId,
              doctorAddressBook:
                appointmentData.value?.referral?.doctor_address_book_name,
              patientName:
                patientData.value.first_name +
                " " +
                patientData.value.last_name,
              appointmentId: appointmentData.value?.id,
              specialistId: appointmentData.value?.specialist_id,
              documentName: appointmentData.value?.appointment_type_name,
              procedures_undertaken: proceduresUndertaken,
              extra_items_used: extraItems,
              admin_items_used: adminItems,
              icd_10_code: icd_10_code,
              flag: flag ? 1 : 0,
              file_name: reportPreviewPdfId.value,
            };

            store
              .dispatch(StoreReportActions.REPORT.PATIENT, data)
              .then((data) => {
                loading.value = false;

                store.commit(DocumentMutations.SET_SELECTED_DOCUMENT, {
                  id: data,
                });
                router.push({
                  path: "/patients/" + patientId + "/documents",
                });
              });
          }
        });
      }, 1000);
    };

    watch(templateData, () => {
      if (templateData.value !== null) {
        formData.value.title =
          reportTemplatesData.value[templateData.value].title;
        reportSections.value =
          reportTemplatesData.value[templateData.value].sections;
      }
    });

    watch(patientData, () => {
      if (patientData.value)
        appointmentData.value = patientData.value.appointments?.find(
          (appointment) => appointment.id === Number(appointmentId)
        );
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs(toSentenceCase(documentType.toString()), [
        "Patients",
      ]);

      loading.value = true;

      store.dispatch(
        Actions.DOCUMENT_TEMPLATES.LIST,
        documentType.toString().toUpperCase()
      );

      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST).then(() => {
        loading.value = false;
      });

      if (documentType == "report") {
        store.dispatch(Actions.SCHEDULE_ITEM.LIST);
      }
    });

    return {
      mbsItems,
      nonMbsItems,
      formData,
      templateData,
      patientData,
      appointmentData,
      headerFooterList,
      loading,
      reportTemplatesData,
      rules,
      submit,
      formRef,
      getItemName,
      reportSections,
      moment,
      ReportPreviewModal,
      reportPreviewPdfId,
      handleSave,
      documentType,
    };
  },
});
</script>
