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
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <input
              class="w-100 h-50px p-3 fs-1 text-primary"
              :value="templateData.title"
            />
          </div>
          <!--end::Input group-->

          <div class="d-flex flex-column gap-2 mb-6">
            <InfoSection heading="Patient"
              >{{ patientData.title }} {{ patientData.first_name }}
              {{ patientData.last_name }},
              {{
                moment(patientData.date_of_birth)
                  .format("DD/MM/YYYY")
                  .toString()
              }}</InfoSection
            >

            <InfoSection heading="Referring Doctor">{{
              appointmentData.referral.referring_doctor_name
            }}</InfoSection>

            <InfoSection heading="Header Footer">{{
              headerFooterData.title
            }}</InfoSection>
          </div>
          <div
            v-for="section in templateData.sections"
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

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
import { DocumentMutations } from "@/store/enums/StoreDocumentEnums";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";

export default defineComponent({
  name: "patient-report",
  components: { InfoSection },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const templateList = computed(
      () => store.getters.getReportTemplateSelected
    );
    const patientList = computed(() => store.getters.selectedPatient);
    const headerFooter = computed(
      () => store.getters.getReportHeaderFooterSelected
    );
    const appointment = computed(
      () => store.getters.getReportAppointmentSelected
    );

    const templateData = ref({
      id: "",
      title: "",
      organization_id: "",
      sections: [],
      created_at: "",
      update_at: "",
    });

    const patientData = ref();
    const appointmentData = ref();
    const headerFooterData = ref();
    const formData = ref({
      section: {},
    });

    const rules = ref({});
    const loading = ref(false);
    const submit = () => {
      loading.value = true;
      if (!formRef.value) {
        loading.value = false;
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (formRef.value as any).validate(async (valid) => {
        if (valid) {
          const reportData: unknown[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (templateData.value.sections as any).forEach((data) => {
            reportData.push({
              sectionId: data.id,
              free_text_default: data.free_text_default,
              value: formData.value.section["section" + data.id],
            });
          });
          store
            .dispatch(StoreReportActions.REPORT.PATIENT, {
              patient_id: patientList.value.id,
              reportData: reportData,
              referringDoctor:
                appointmentData.value.referral.referring_doctor_name,
              patientName:
                patientData.value.first_name +
                " " +
                patientData.value.last_name,
              appointmentId: appointmentData.value.id,
              specialistId: appointmentData.value.specialist_id,
              documentName: appointmentData.value.appointment_type_name,
              header_footer_id: headerFooterData.value.id,
            })
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
      templateData.value = templateList.value;
      patientData.value = patientList.value;
      appointmentData.value = appointment.value;
      headerFooterData.value = headerFooter.value;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
    });

    return {
      formRef,
      rules,
      templateData,
      patientData,
      appointmentData,
      headerFooterData,
      formData,
      moment,
      submit,
    };
  },
});
</script>
