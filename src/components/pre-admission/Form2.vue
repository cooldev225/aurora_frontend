<template>
  <div class="card w-100 h-100 px-20">
    <el-form
      @submit.prevent="generatePDF()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <vue3-html2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="false"
        :preview-modal="false"
        :paginate-elements-by-height="3000"
        filename="template"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a2"
        :pdf-margin="10"
        pdf-orientation="portrait"
        pdf-content-width="100%"
        @progress="onProgress($event)"
        @beforeDownload="beforeDownload($event)"
        ref="html2Pdf"
      >
        <template v-slot:pdf-content>
          <!--begin::details View-->
          <!--begin::Card header-->
          <div class="card-header border-0 p-5">
            <div
              class="m-auto border border-success border-3 d-flex align-items-center justify-content-center w-250px h-250px"
              style="border-radius: 50%"
            >
              <img
                :src="patientData.organization_logo"
                alt="Logo"
                class="w-100 h-100"
                style="border-radius: 50%"
              />
            </div>
          </div>
          <!--end::Card header-->
          <!--begin::Card body-->
          <div class="card-body pt-0">
            <!--begin::Option-->
            <div class="py-0">
              <!--begin::Header-->
              <div class="py-5 d-flex flex-stack flex-wrap">
                <!--begin::Summary-->
                <div class="me-3">
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bolder">
                      Appointment Information
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Header-->
              <!--begin::Body-->
              <div class="fs-6 ps-10">
                <!--begin::Details-->
                <div class="d-flex flex-wrap py-5">
                  <!--begin::Col-->
                  <div class="flex-equal me-5">
                    <table class="table table-flush fw-bold gy-1">
                      <tbody>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Specialist
                          </td>
                          <td class="text-gray-800">
                            <template v-if="patientData.specialist_user">
                              <label
                                >{{ patientData.specialist_user.first_name }}
                                {{
                                  patientData.specialist_user.last_name
                                }}</label
                              >
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Appointment Type
                          </td>
                          <td class="text-gray-800 text-capitalize">
                            <template v-if="patientData.appointment_type">
                              <label
                                >{{ patientData.appointment_type.name }}
                              </label>
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Date and TIme
                          </td>
                          <td class="text-gray-800">
                            <label>{{
                              aptData.date + " " + aptData.start_time
                            }}</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Clinic
                          </td>
                          <td class="text-gray-800">
                            <template v-if="patientData.clinic">
                              <label>{{ patientData.clinic.name }}</label>
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Details-->
              </div>
              <!--end::Body-->
            </div>
            <!--end::Option-->
            <div class="separator separator-dashed"></div>
            <!--begin::Option-->
            <div class="py-0">
              <!--begin::Header-->
              <div class="py-5 d-flex flex-stack flex-wrap">
                <div class="me-3">
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bolder">Your Information</div>
                  </div>
                </div>
              </div>
              <div class="container py-6">
                <div class="row justify-content-md-center">
                  <InputWrapper :class="colString" label="Title" prop="title">
                    <el-select
                      class="w-100"
                      v-model="formData.title"
                      placeholder="Select Title"
                    >
                      <el-option
                        v-for="item in titles"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="First Name"
                    prop="first_name"
                  >
                    <el-input
                      type="text"
                      v-model="formData.first_name"
                      placeholder="First Name"
                    />
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Last Name"
                    prop="last_name"
                  >
                    <el-input
                      type="text"
                      v-model="formData.last_name"
                      placeholder="Last Name"
                    />
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Date Of Birth"
                    prop="date_of_birth"
                  >
                    <el-date-picker
                      class="w-100"
                      v-model="formData.date_of_birth"
                      format="YYYY-MM-DD"
                      placeholder="1990-01-01"
                    />
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Contact Number"
                    prop="contact_number"
                  >
                    <el-input
                      type="text"
                      v-mask="'0#-####-####'"
                      v-model="formData.contact_number"
                      placeholder="Contact Number"
                    />
                  </InputWrapper>

                  <InputWrapper :class="colString" label="Email" prop="email">
                    <el-input
                      type="email"
                      v-model="formData.email"
                      placeholder="Email"
                    />
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Address"
                    prop="address"
                  >
                    <el-input
                      type="text"
                      v-model="formData.address"
                      placeholder="Address"
                    />
                  </InputWrapper>

                  <InputWrapper :class="colString" label="Gender" prop="gender">
                    <el-select
                      class="w-100"
                      v-model="formData.gender"
                      placeholder="Select Gender"
                    >
                      <el-option value="male" label="Male" />
                      <el-option value="female" label="Female" />
                      <el-option value="other" label="Other" />
                      <el-option
                        value="undisclosed"
                        label="Not Stated / Inadequately Described"
                      />
                    </el-select>
                  </InputWrapper>
                  <InputWrapper
                    :class="colString"
                    label="Marital Status"
                    prop="marital_status"
                  >
                    <el-select
                      class="w-100"
                      v-model="formData.marital_status"
                      placeholder="Marital Status"
                    >
                      <el-option
                        v-for="status in maritalStatus"
                        :key="status.value"
                        :value="status.value"
                        :label="status.label"
                      />
                    </el-select>
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Occupation"
                    prop="occupation"
                  >
                    <el-input
                      type="text"
                      v-model="formData.occupation"
                      placeholder="Occupation"
                    />
                  </InputWrapper>

                  <InputWrapper
                    :class="colString"
                    label="Aboriginal or Torres Strait Islander?"
                    prop="aborginality"
                  >
                    <el-select
                      class="w-100"
                      v-model="formData.aborginality"
                      placeholder="Aborginality"
                    >
                      <el-option :value="0" label="No" />
                      <el-option :value="1" label="Yes" />
                    </el-select>
                  </InputWrapper>
                  <span :class="colString"></span>
                </div>
              </div>
            </div>
            <div class="separator separator-dashed"></div>
            <div class="py-0">
              <div class="me-3 mt-6">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Next Of Kin</div>
                </div>
              </div>
              <div class="container py-6">
                <div class="row justify-content-md-center">
                  <InputWrapper :class="colString" label="Name" prop="kin_name">
                    <el-input
                      type="text"
                      v-model="formData.kin_name"
                      placeholder="Kin First Name"
                    />
                  </InputWrapper>
                  <InputWrapper
                    :class="colString"
                    label="Phone Number"
                    prop="kin_phone_number"
                  >
                    <el-input
                      type="text"
                      v-mask="'0#-####-####'"
                      v-model="formData.kin_phone_number"
                      placeholder="Kin Phone Number"
                    />
                  </InputWrapper>
                  <InputWrapper
                    :class="colString"
                    label="Kin Relationship"
                    prop="kin_relationship"
                  >
                    <el-input
                      type="text"
                      v-model="formData.kin_relationship"
                      placeholder="Kin Relationship"
                    />
                  </InputWrapper>
                  <span :class="colString"></span>
                </div>
              </div>
            </div>
            <!--end::Option-->
            <div class="separator separator-dashed"></div>
            <div
              v-for="section in patientData.pre_admission_sections"
              :key="section.id"
              class="py-0"
            >
              <!--begin::Header-->
              <div class="py-5 d-flex flex-stack flex-wrap">
                <div class="me-3">
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bolder">
                      {{ section.title }}
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Header-->
              <!--begin::Body-->
              <div class="fs-6 ps-10">
                <template
                  v-for="question in section.questions"
                  :key="question.id"
                >
                  <InputWrapper :label="question.text">
                    <el-input
                      v-if="question.answer_format === 'TEXT'"
                      v-model="
                        pre_admission_answers[
                          section.id.toString() + question.id.toString()
                        ]
                      "
                    />
                    <el-radio-group
                      v-if="question.answer_format === 'BOOLEAN'"
                      v-model="
                        pre_admission_answers[
                          section.id.toString() + question.id.toString()
                        ]
                      "
                    >
                      <el-radio label="Yes" size="large">Yes</el-radio>
                      <el-radio label="No" size="large">No</el-radio>
                    </el-radio-group>
                  </InputWrapper>
                </template>
              </div>
              <!--end::Body-->
            </div>

            <div class="separator separator-dashed"></div>
            <div class="py-0">
              <!--begin::Header-->
              <div class="py-5 d-flex flex-stack flex-wrap">
                <div class="me-3">
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bolder">Consent</div>
                  </div>
                </div>
              </div>
              <el-input
                type="textarea"
                v-model="patientData.pre_admission_consent.text"
                rows="15"
                readonly
              />
              <el-checkbox
                type="checkbox"
                :label="
                  'I, ' +
                  formData.first_name +
                  ' ' +
                  formData.last_name +
                  ', agree to the conditions stated above.'
                "
              />
            </div>
          </div>
        </template>
      </vue3-html2pdf>
      <div class="d-flex justify-content-end mb-5 me-5 gap-5">
        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          <span v-if="!loading" class="indicator-label"> Confirm </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <button type="reset" class="btn btn-light-primary w-min-250px">
          Cancel
        </button>
      </div>
      <!--end::Card body-->
      <!--end::details View-->
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import maritalStatus from "@/core/data/marital-status";
import titles from "@/core/data/titles";
import { Actions } from "@/store/enums/StoreEnums";
import Vue3Html2pdf from "vue3-html2pdf";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "pre-admission-form2",
  directives: {
    mask,
  },
  components: {
    Vue3Html2pdf,
    InputWrapper,
  },
  data: function () {
    return {
      colString: "col-12 col-sm-6 col-lg-4 ",
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const patientData = computed(() => store.getters.getAptPreAdmissionOrg);
    const pre_admission_answers = ref([]);
    const apt_id = ref("");
    const Data = new FormData();
    const html2Pdf = ref("");
    const formData = ref({
      title: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      contact_number: "",
      email: "",
      address: "",
      gender: "",
      aborginality: "",
      occupation: "",
      marital_status: "",
      kin_name: "",
      kin_phone_number: "",
      kin_relationship: "",
    });
    const loading = ref(false);

    const aptData = ref({
      specialist_id: "",
      specialist_name: "",
      appointment_type_id: "",
      appointment_type_name: "",
      date: "",
      start_time: "",
      end_time: "",
      clinic_id: "",
    });

    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
      contact_number: [
        {
          required: true,
          message: "Contact Number cannot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      email: [
        {
          required: true,
          message: "Email cannot be blank",
          trigger: "change",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
      address: [
        {
          required: true,
          message: "Address cannot be blank",
          trigger: "change",
        },
      ],
      kin_name: [
        {
          required: true,
          message: "Kin Name cannot be blank",
          trigger: "change",
        },
      ],
      kin_phone_number: [
        {
          required: true,
          message: "Kin Number cannnot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      kin_relationship: [
        {
          required: true,
          message: "Kin Relationship cannot be blank",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid) => {
        if (valid) {
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          Data.append("apt_id", apt_id.value);
          await store.dispatch(Actions.APT.PRE_ADMISSION.STORE, Data);
          loading.value = false;
          router.push({
            path:
              "/appointment_pre_admissions/show/" + apt_id.value + "/form_3",
          });
        } else {
          console.log("validation error");
        }
      });
    };

    watch(patientData, () => {
      for (let key in formData.value)
        formData.value[key] = patientData.value.patient[key];
      for (let key in aptData.value)
        aptData.value[key] = patientData.value.appointment[key];
    });

    onMounted(async () => {
      setCurrentPageBreadcrumbs("Administration", ["Patients"]);
      apt_id.value = router.currentRoute.value.params.id.toString();
      await store.dispatch(Actions.APT.PRE_ADMISSION.ORG, apt_id.value);
    });

    watch(patientData, () => {
      if (
        patientData.value.status !== "BOOKED" &&
        patientData.value.status !== "VALIDATED"
      ) {
        router.push({
          path: "/appointment_pre_admissions/show/" + apt_id.value + "/form_1",
        });
      }
    });

    const generatePDF = () => {
      loading.value = true;
      html2Pdf.value.generatePdf();
    };

    const onProgress = (event) => {
      console.log(`Processed: ${event} / 100`);
    };

    const beforeDownload = ({ html2pdf, options, pdfContent }) => {
      html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .output("datauristring")
        .then((pdfAsString) => {
          Data.append("pdf", pdfAsString);
          submit();
        });
    };

    return {
      aptData,
      formData,
      formRef,
      rules,
      titles,
      maritalStatus,
      patientData,
      html2Pdf,
      loading,
      pre_admission_answers,
      submit,
      onProgress,
      generatePDF,
      beforeDownload,
    };
  },
});
</script>
