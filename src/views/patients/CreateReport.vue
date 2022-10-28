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

          <InputWrapper
            required
            class="fill-out"
            label="Procedures Undertaken"
            prop="procedures_undertaken"
          >
            <div
              class="d-flex flex-column flex-md-row align-items-center w-100 gap-3"
            >
              <div
                class="d-flex flex-column flex-md-row gap-3 flex-grow-1 w-100"
              >
                <el-input
                  class="w-100 w-md-50"
                  type="text"
                  v-model="proceduresUndertakenSearch.item_number"
                  placeholder="Search by MBS item number"
                  :disabled="proceduresLoading"
                />

                <el-input
                  class="w-100 w-md-50"
                  type="text"
                  v-model="proceduresUndertakenSearch.description"
                  placeholder="Search by MBS description"
                  :disabled="proceduresLoading"
                />
              </div>

              <button
                :data-kt-indicator="proceduresLoading ? 'on' : null"
                class="btn btn-lg btn-primary text-nowrap"
                :disabled="
                  proceduresLoading ||
                  (!proceduresUndertakenSearch.item_number &&
                    !proceduresUndertakenSearch.description)
                "
                @click="handleProceduresUndertakenSearch"
              >
                <span v-if="!proceduresLoading" class="indicator-label">
                  Search
                </span>

                <span v-if="proceduresLoading" class="indicator-progress">
                  Searching...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>

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
                :label="taken"
              />
            </el-select>

            <div
              v-for="(item, index) in formData.procedures_undertaken"
              :key="`procedures-undertaken-${index}`"
              class="w-100 d-flex flex-row align-items-center p-3 card border border-dashed border-primary mt-3"
            >
              <div class="col-11 text-truncate">
                {{ item }}
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
            required
            class="fill-out"
            label="Extra items used"
            prop="extra_items_used"
          >
            <div
              class="d-flex flex-column flex-md-row align-items-center w-100 gap-3"
            >
              <div
                class="d-flex flex-column flex-md-row gap-3 flex-grow-1 w-100"
              >
                <el-input
                  class="w-100 w-md-50"
                  type="text"
                  v-model="extraItemsUsedSearch.item_number"
                  placeholder="Search by MBS item number"
                  :disabled="extraItemsLoading"
                />

                <el-input
                  class="w-100 w-md-50"
                  type="text"
                  v-model="extraItemsUsedSearch.description"
                  placeholder="Search by MBS description"
                  :disabled="extraItemsLoading"
                />
              </div>

              <button
                :data-kt-indicator="extraItemsLoading ? 'on' : null"
                class="btn btn-lg btn-primary text-nowrap"
                :disabled="
                  extraItemsLoading ||
                  (!extraItemsUsedSearch.item_number &&
                    !extraItemsUsedSearch.description)
                "
                @click="handleExtraItemsSearch"
              >
                <span v-if="!extraItemsLoading" class="indicator-label">
                  Search
                </span>

                <span v-if="extraItemsLoading" class="indicator-progress">
                  Searching...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>

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
                :label="taken"
              />
            </el-select>

            <div
              v-for="(item, index) in formData.extra_items_used"
              :key="`extra-items-${index}`"
              class="w-100 d-flex flex-row align-items-center p-3 card border border-dashed border-primary mt-3"
            >
              <div class="col-11 text-truncate">
                {{ item }}
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
              {{ appointmentData?.referral?.referring_doctor_name }}
            </InfoSection>
          </div>
          <div
            v-for="section in templateData?.sections"
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
import { defineComponent, watchEffect, ref, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
import { DocumentMutations } from "@/store/enums/StoreDocumentEnums";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import InputWrapper from "../../components/presets/FormElements/InputWrapper.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "patient-report",
  components: { InfoSection, InputWrapper },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const templateData = computed(
      () => store.getters.getReportTemplateSelected
    );
    const patientList = computed(() => store.getters.selectedPatient);
    const headerFooterList = computed(
      () => store.getters.getHeaderFooterTemplateList
    );
    const appointmentData = computed(
      () => store.getters.getReportAppointmentSelected
    );
    const proceduresUndertakenData = ref<Array<string>>([]);
    const proceduresUndertakenDataFiltered = ref<Array<string>>([]);
    const extraItemsUsedData = ref<Array<string>>([]);
    const extraItemsUsedDataFiltered = ref<Array<string>>([]);
    const proceduresUndertakenSearch = ref({
      item_number: null,
      description: null,
    });
    const extraItemsUsedSearch = ref({
      item_number: null,
      description: null,
    });
    const patientData = ref();
    const formData = ref({
      title: "",
      section: {},
      headerFooter: null,
      procedures_undertaken: [] as Array<string>,
      extra_items_used: [] as Array<string>,
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
          required: true,
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
          proceduresUndertakenDataFiltered.value =
            proceduresUndertakenData.value.filter((item) => {
              return item.toLowerCase().includes(query.toLowerCase());
            });
        }, 200);
      } else {
        proceduresUndertakenDataFiltered.value = [];
      }
    };

    const filterExtraHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          extraItemsUsedDataFiltered.value = extraItemsUsedData.value.filter(
            (item) => {
              return item.toLowerCase().includes(query.toLowerCase());
            }
          );
        }, 200);
      } else {
        extraItemsUsedDataFiltered.value = [];
      }
    };

    const handleProceduresUndertakenSearch = () => {
      searchMbs(
        proceduresUndertakenSearch,
        proceduresUndertakenData,
        proceduresUndertakenDataFiltered,
        proceduresLoading
      );
    };

    const handleExtraItemsSearch = () => {
      searchMbs(
        extraItemsUsedSearch,
        extraItemsUsedData,
        extraItemsUsedDataFiltered,
        extraItemsLoading
      );
    };

    const searchMbs = (search, destination, filter, loader) => {
      loader.value = true;

      store
        .dispatch(Actions.MBS.LIST, search.value)
        .then(() => {
          const items = store.getters.mbsItems.items;
          let itemList = [] as Array<string>;

          items.forEach((item) => {
            itemList.push(item.label_name);
          });

          destination.value = itemList;
          filter.value = itemList;
        })
        .finally(() => {
          loader.value = false;
        });
    };

    const selectNewProceduresUndertaken = (event) => {
      formData.value.procedures_undertaken.push(event);
    };

    const selectNewExtraItems = (event) => {
      formData.value.extra_items_used.push(event);
    };

    const deleteProcedureUndertaken = (index) => {
      formData.value.procedures_undertaken.splice(index, 1);
    };

    const deleteExtraItems = (index) => {
      formData.value.extra_items_used.splice(index, 1);
    };

    const submit = () => {
      loading.value = true;
      if (!formRef.value) {
        loading.value = false;
        return;
      }

      if (formData.value.headerFooter == null) {
        ElMessage.error("Header/Footer Template cannot be blank");
        loading.value = false;
        return;
      }

      (formRef.value as any).validate(async (valid) => {
        if (valid) {
          const reportData: unknown[] = [];
          const icd_10_code: string[] = [];
          (templateData.value.sections as any).forEach((data) => {
            reportData.push({
              sectionId: data.id,
              free_text_default: data.free_text_default,
              value: formData.value.section["section" + data.id],
            });
            data.auto_texts.forEach((auto) => {
              icd_10_code.push(auto.icd_10_code);
            });
          });
          const data = {
            title: formData.value.title,
            patient_id: patientList.value.id,
            reportData: reportData,
            doctorAddressBook:
              appointmentData.value.referral.referring_doctor_name,
            patientName:
              patientData.value.first_name + " " + patientData.value.last_name,
            appointmentId: appointmentData.value.id,
            specialistId: appointmentData.value.specialist_id,
            documentName: appointmentData.value.appointment_type_name,
            header_footer_id:
              formData.value.headerFooter != null
                ? headerFooterList.value[formData.value.headerFooter].id
                : null,
            procedures_undertaken: formData.value.procedures_undertaken,
            extra_items_used: formData.value.extra_items_used,
            icd_10_code: icd_10_code,
          };
          store
            .dispatch(StoreReportActions.REPORT.PATIENT, data)
            .then((data) => {
              store.commit(DocumentMutations.SET_SELECTED_DOCUMENT, {
                id: data,
              });
              router.push({
                path: "/patients/" + patientList.value.id + "/documents",
              });
            });
        }
      });
    };

    watchEffect(() => {
      patientData.value = patientList.value;
      formData.value.title = templateData.value.title;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
      loading.value = true;
      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST).then(() => {
        loading.value = false;
      });
    });

    return {
      formRef,
      rules,
      templateData,
      patientData,
      appointmentData,
      formData,
      moment,
      submit,
      headerFooterList,
      proceduresUndertakenDataFiltered,
      extraItemsUsedDataFiltered,
      proceduresUndertakenSearch,
      extraItemsUsedSearch,
      loading,
      proceduresLoading,
      extraItemsLoading,
      filterProceduresHandle,
      filterExtraHandle,
      handleProceduresUndertakenSearch,
      handleExtraItemsSearch,
      selectNewProceduresUndertaken,
      selectNewExtraItems,
      deleteProcedureUndertaken,
      deleteExtraItems,
    };
  },
});
</script>
