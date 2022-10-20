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
              class="col-9"
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
            <el-select
              class="col-9"
              v-model="formData.procedures_undertaken"
              placeholder="Please enter a keyword"
              props="procedures_undertaken_select"
              multiple
              filterable
              remote
              reserve-keyword
              :remote-method="filterProceduresHandle"
              :loading="loading"
            >
              <el-option
                v-for="(taken, idx) in proceduresUndertakenData"
                :key="idx"
                :value="taken"
                :label="taken"
              />
            </el-select>
          </InputWrapper>

          <InputWrapper
            required
            class="fill-out"
            label="Extra items used"
            prop="extra_items_used"
          >
            <el-form-item>
              <el-select
                class="col-9"
                v-model="formData.extra_items_used"
                placeholder="Select Extra items used"
                props="extra_items_used_select"
                multiple
                filterable
                remote
                reserve-keyword
                :remote-method="filterExtraHandle"
                :loading="loading"
              >
                <el-option
                  v-for="(extra, idx) in extraItemsUsedData"
                  :key="idx"
                  :value="extra"
                  :label="extra"
                />
              </el-select>
            </el-form-item>
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
            <InfoSection heading="Referring Doctor">
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
          <button type="submit" class="btn btn-primary">Create</button>
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
    const _proceduresUndertakenData = ref([
      "66500 - Gamete intra-fallopian transfer",
      "39109 - Gangliectomy, radiofrequency trigeminal",
      "30473 - Gastro-camera investigation",
    ]);
    const _extraItemsUsedData = ref([
      "66500 - Gamete intra-fallopian transfer",
      "39109 - Gangliectomy, radiofrequency trigeminal",
      "30473 - Gastro-camera investigation",
    ]);
    const proceduresUndertakenData = ref();
    const extraItemsUsedData = ref();
    const patientData = ref();
    const formData = ref({
      title: "",
      section: {},
      headerFooter: null,
      procedures_undertaken: null,
      extra_items_used: null,
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

    const filterProceduresHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          proceduresUndertakenData.value =
            _proceduresUndertakenData.value.filter((item) => {
              return item.toLowerCase().includes(query.toLowerCase());
            });
        }, 200);
      } else {
        proceduresUndertakenData.value = [];
      }
    };

    const filterExtraHandle = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          extraItemsUsedData.value = _extraItemsUsedData.value.filter(
            (item) => {
              return item.toLowerCase().includes(query.toLowerCase());
            }
          );
        }, 200);
      } else {
        extraItemsUsedData.value = [];
      }
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
          (templateData.value.sections as any).forEach((data) => {
            reportData.push({
              sectionId: data.id,
              free_text_default: data.free_text_default,
              value: formData.value.section["section" + data.id],
            });
          });
          const data = {
            title: formData.value.title,
            patient_id: patientList.value.id,
            reportData: reportData,
            referringDoctor:
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
          };
          console.log("submit data", data, formData.value.headerFooter);
          store
            .dispatch(StoreReportActions.REPORT.PATIENT, data)
            .then((data) => {
              console.log(data);
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
      // console.log(["appointmentData", appointmentData.value]);
      proceduresUndertakenData.value = _proceduresUndertakenData.value;
      extraItemsUsedData.value = _extraItemsUsedData.value;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
      loading.value = true;
      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST).then(() => {
        loading.value = false;
        console.log(["HEADER_FOOTER_TEMPLATE", headerFooterList.value]);
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
      proceduresUndertakenData,
      extraItemsUsedData,
      loading,
      filterProceduresHandle,
      filterExtraHandle,
    };
  },
});
</script>
