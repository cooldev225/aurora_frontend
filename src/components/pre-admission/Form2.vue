<template>
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
      :preview-modal="true"
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
        <div class="card w-100 h-100">
          <!--begin::Card header-->
          <div class="card-header border-0 p-5">
            <div
              class="m-auto border border-success border-3 d-flex align-items-center justify-content-center w-250px h-250px"
            >
              <img
                :src="patientData.organization_logo"
                alt="organization logo"
                class="w-100 h-100"
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
                <!--begin::Toggle-->
                <div
                  class="d-flex justify-content-between w-100 align-items-center"
                >
                  <!--begin::Summary-->
                  <div class="me-3">
                    <div class="d-flex align-items-center">
                      <div class="text-gray-800 fw-bolder">
                        Appointment Information
                      </div>
                    </div>
                  </div>
                  <!--end::Summary-->
                  <!--begin::Arrow-->
                  <div class="me-3 rotate-90">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
                    </span>
                  </div>
                  <!--end::Arrow-->
                </div>
                <!--end::Toggle-->
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
                            <label>{{ aptData.specialist_name }}</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Appointment Type
                          </td>
                          <td class="text-gray-800 text-capitalize">
                            <label>{{ aptData.appointment_type_name }} </label>
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
                            <label>{{ aptData.clinic_name }}</label>
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
                <!--begin::Toggle-->
                <div
                  class="d-flex justify-content-between w-100 align-items-center"
                >
                  <!--begin::Summary-->
                  <div class="me-3">
                    <div class="d-flex align-items-center">
                      <div class="text-gray-800 fw-bolder">General</div>
                    </div>
                  </div>
                  <!--end::Summary-->
                  <!--begin::Arrow-->
                  <div class="me-3 rotate-90">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
                    </span>
                  </div>
                  <!--end::Arrow-->
                </div>
                <!--end::Toggle-->
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
                            Title
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="title">
                              <el-select
                                class="w-50"
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
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            First Name
                          </td>
                          <td class="text-gray-800 text-capitalize">
                            <el-form-item prop="first_name">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.first_name"
                                placeholder="First Name"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Last Name
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="last_name">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.last_name"
                                placeholder="Last Name"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Date of Birth
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="date_of_birth">
                              <el-date-picker
                                class="w-50"
                                v-model="formData.date_of_birth"
                                format="YYYY-MM-DD"
                                placeholder="1990-01-01"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="flex-equal">
                    <table class="table table-flush fw-bold gy-1">
                      <tbody>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Contact Number
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="contact_number">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.contact_number"
                                placeholder="Contact Number"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Email
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="email">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.email"
                                placeholder="Email"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Address
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="address">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.address"
                                placeholder="Address"
                              />
                            </el-form-item>
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
                <!--begin::Toggle-->
                <div
                  class="d-flex justify-content-between w-100 align-items-center"
                >
                  <!--begin::Summary-->
                  <div class="me-3">
                    <div class="d-flex align-items-center">
                      <div class="text-gray-800 fw-bolder">
                        Patient Demographic
                      </div>
                    </div>
                  </div>
                  <!--end::Summary-->
                  <!--begin::Arrow-->
                  <div class="me-3 rotate-90">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
                    </span>
                  </div>
                  <!--end::Arrow-->
                </div>
                <!--end::Toggle-->
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
                            Gender
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="gender">
                              <el-select
                                class="w-50"
                                v-model="formData.gender"
                                placeholder="Select Gender"
                              >
                                <el-option value="male" label="Male" />
                                <el-option value="female" label="Female" />
                                <el-option value="other" label="Other" />
                                <el-option
                                  value="undisclosed"
                                  label="Not Stated / Inadequately Desribed"
                                />
                              </el-select>
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-250px">
                            Do you identify as Aboriginal or Torres Strait
                            Islander?
                          </td>
                          <td class="text-gray-800 text-capitalize">
                            <el-form-item prop="aborginality">
                              <el-select
                                class="w-50"
                                v-model="formData.aborginality"
                                placeholder="Aborginality"
                              >
                                <el-option :value="0" label="No" />
                                <el-option :value="1" label="Yes" />
                              </el-select>
                            </el-form-item>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="flex-equal">
                    <table class="table table-flush fw-bold gy-1">
                      <tbody>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Occupation
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="occupation">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.occupation"
                                placeholder="Occupation"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Marital Status
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="marital_status">
                              <el-select
                                class="w-50"
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
                            </el-form-item>
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
                <!--begin::Toggle-->
                <div
                  class="d-flex justify-content-between w-100 align-items-center"
                >
                  <!--begin::Summary-->
                  <div class="me-3">
                    <div class="d-flex align-items-center">
                      <div class="text-gray-800 fw-bolder">Next of KIN</div>
                    </div>
                  </div>
                  <!--end::Summary-->
                  <!--begin::Arrow-->
                  <div class="me-3 rotate-90">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
                    </span>
                  </div>
                  <!--end::Arrow-->
                </div>
                <!--end::Toggle-->
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
                            Name
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="kin_name">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.kin_name"
                                placeholder="Kin Name"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Number
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="kin_phone_number">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.kin_phone_number"
                                placeholder="Kin Number"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="flex-equal">
                    <table class="table table-flush fw-bold gy-1">
                      <tbody>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Relationship
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="kin_relationship">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="formData.kin_relationship"
                                placeholder="Kin Relationship"
                              />
                            </el-form-item>
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
            <div class="py-0">
              <!--begin::Header-->
              <div class="py-5 d-flex flex-stack flex-wrap">
                <!--begin::Toggle-->
                <div
                  class="d-flex justify-content-between w-100 align-items-center"
                >
                  <!--begin::Summary-->
                  <div class="me-3">
                    <div class="d-flex align-items-center">
                      <div class="text-gray-800 fw-bolder">
                        Question and Consent
                      </div>
                    </div>
                  </div>
                  <!--end::Summary-->
                  <!--begin::Arrow-->
                  <div class="me-3 rotate-90">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
                    </span>
                  </div>
                  <!--end::Arrow-->
                </div>
                <!--end::Toggle-->
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
                            Previous surgery? What & When?
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="question1">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="qaData.question1"
                                placeholder="Previous Surgery"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-150px">
                            Previous anaesthetic?
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="question2">
                              <el-input
                                type="text"
                                class="w-50"
                                v-model="qaData.question2"
                                placeholder="Prevous Anaesthetic"
                              />
                            </el-form-item>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Col-->
                  <!--begin::Col-->
                  <div class="flex-equal">
                    <table class="table table-flush fw-bold gy-1">
                      <tbody>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-300px">
                            Has a family member had life threatening
                            complications with anaesthetic
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="select1">
                              <el-radio-group
                                v-model="qaData.select1"
                                class="ml-4"
                              >
                                <el-radio label="Yes" size="large"
                                  >Yes</el-radio
                                >
                                <el-radio label="No" size="large">No</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-300px">
                            Do you suffer from reflux
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="select2">
                              <el-radio-group
                                v-model="qaData.select2"
                                class="ml-4"
                              >
                                <el-radio label="Yes" size="large"
                                  >Yes</el-radio
                                >
                                <el-radio label="No" size="large">No</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-300px">
                            Do you have any false teeth, caps, crowns, loose or
                            chipped teeth or other dental work
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="select3">
                              <el-radio-group
                                v-model="qaData.select3"
                                class="ml-4"
                              >
                                <el-radio label="Yes" size="large"
                                  >Yes</el-radio
                                >
                                <el-radio label="No" size="large">No</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted min-w-125px w-125px w-md-300px">
                            Do you have any issues with your neck or jaw
                          </td>
                          <td class="text-gray-800">
                            <el-form-item prop="select4">
                              <el-radio-group
                                v-model="qaData.select4"
                                class="ml-4"
                              >
                                <el-radio label="Yes" size="large"
                                  >Yes</el-radio
                                >
                                <el-radio label="No" size="large">No</el-radio>
                              </el-radio-group>
                            </el-form-item>
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
          </div>
          <div class="d-flex ms-auto justify-content-end mb-5 me-5">
            <button type="submit" class="btn btn-primary w-min-250px">
              Confirm
            </button>
            <button type="reset" class="btn btn-light-primary w-min-250px ms-2">
              Cancel
            </button>
          </div>
          <!--end::Card body-->
        </div>
        <!--end::details View-->
      </template>
    </vue3-html2pdf>
  </el-form>
</template>

<script>
import {
  defineComponent,
  ref,
  watchEffect,
  onMounted,
  computed,
  reactive,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import maritalStatus from "@/core/data/marital-status";
import titles from "@/core/data/titles";
import { Actions } from "@/store/enums/StoreEnums";
import Vue3Html2pdf from "vue3-html2pdf";

export default defineComponent({
  name: "pre-admission-form2",
  components: {
    Vue3Html2pdf,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const patientData = computed(
      () => store.getters.getAptPreAdmissionValidateData
    );
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
    const qaData = ref({
      question1: "",
      question2: "",
      select1: "",
      select2: "",
      select3: "",
      select4: "",
    });

    const aptData = ref({});
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
      ],
      kin_relationship: [
        {
          required: true,
          message: "Kin Relationship cannot be blank",
          trigger: "change",
        },
      ],
    });
    const loading = ref(false);

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
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
      console.log(patientData.value.patient);
      debugger;
      for (let key in formData.value)
        formData.value[key] = patientData.value.patient[key];
    });

    // watchEffect(() => {
    //   console.log(aptData.value);
    // });

    const apt_id = ref("");
    const patientQuery = reactive({
      last_name: "",
      date_of_birth: "",
    });
    const Data = new FormData();

    onMounted(() => {
      setCurrentPageBreadcrumbs("Administration", ["Patients"]);
      apt_id.value = router.currentRoute.value.params.id.toString();
      patientQuery.last_name =
        router.currentRoute.value.query.last_name.toString();
      patientQuery.date_of_birth =
        router.currentRoute.value.query.date_of_birth.toString();
      store.dispatch(Actions.APT.PRE_ADMISSION.VALIDATE, {
        apt_id: apt_id.value,
        ...patientQuery,
      });
    });

    const html2Pdf = ref("");

    const generatePDF = () => {
      html2Pdf.value.generatePdf();
      console.log(1);
    };

    const onProgress = (event) => {
      console.log(`Processed: ${event} / 100`);
    };

    const beforeDownload = async ({ html2pdf, options, pdfContent }) => {
      debugger;
      let data = html2pdf().from(pdfContent).toPdf().get("pdf");
      console.log(data);
    };

    return {
      aptData,
      qaData,
      formData,
      formRef,
      rules,
      titles,
      maritalStatus,
      patientData,
      html2Pdf,
      submit,
      onProgress,
      generatePDF,
      beforeDownload,
    };
  },
});
</script>
