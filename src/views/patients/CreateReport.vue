<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Create Report</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body">
      <el-form>
        <div class="report-template-wrapper">
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <h2
              style="
                font-weight: 600;
                color: #373fa2;
                font-size: 25px;
                margin-bottom: 4px;
              "
            >
              {{ templateData.title }}
            </h2>
            <label class="col-md-6 fs-4 fw-bold mb-2">
              DATE:
              <span style="font-weight: 400">{{
                moment(templateData.created_at).format("YYYY-MM-DD").toString()
              }}</span>
            </label>
          </div>
          <!--end::Input group-->

          <div class="d-flex flex-column gap-2 m">
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                NAME:
                <span style="font-weight: 400"
                  >{{ patientData.title }} {{ patientData.first_name }}
                  {{ patientData.last_name }}</span
                >
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                DOB:
                <span style="font-weight: 400">{{
                  patientData.date_of_birth
                }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                GENDER:
                <span style="font-weight: 400">{{ patientData.gender }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                ADDRESS:
                <span style="font-weight: 400">{{ patientData.address }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                REFERRING DOCTOR:
                <span style="font-weight: 400">{{
                  patientData.referring_doctor
                }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                APPOINTMENT TYPES:
                <span style="font-weight: 400">{{
                  patientData.appointment_type_name
                }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                SPECIALIST:
                <span style="font-weight: 400">{{
                  patientData.specialist_name
                }}</span>
              </label>
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="fv-row">
              <label class="col-md-6 fs-4 fw-bold mb-2">
                PROVIDER NUMBER:
                <span style="font-weight: 400">{{
                  patientData.provider_number
                }}</span>
              </label>
            </div>
            <!--end::Input group-->
          </div>

          <div class="fv-row my-10">
            <label class="col-md-6 fs-4 fw-bold mb-2">
              Dear Dr MIMERAN:
              <span style="font-weight: 400"
                >Thank you for referring this patient</span
              >
            </label>
          </div>
          <div
            v-for="section in templateData.sections"
            class="d-flex flex-column gap-2"
            :key="section.id"
          >
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
        <div class="d-flex ms-auto justify-content-end w-25">
          <button type="submit" class="btn btn-primary w-25">Create</button>
          <button type="reset" class="btn btn-light-primary w-25 ms-2">
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
import { useStore } from "vuex";
import moment from "moment";

export default defineComponent({
  name: "patient-report",
  components: {},
  setup() {
    const store = useStore();
    const templateList = computed(
      () => store.getters.getReportTemplateSelected
    );
    const patientList = computed(() => store.getters.selectedPatient);

    const templateData = ref({
      id: "",
      title: "",
      organization_id: "",
      sections: [],
      created_at: "",
      update_at: "",
    });

    const patientData = ref();
    const formData = ref({
      section: {},
    });

    watchEffect(() => {
      templateData.value = templateList.value;
      patientData.value = patientList.value;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
    });

    return {
      templateData,
      patientData,
      formData,
      moment,
    };
  },
});
</script>
