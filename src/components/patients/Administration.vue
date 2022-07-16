<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="patient_view_administration_patient">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">Patient Details</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--end::Card header-->
      <!--begin::Card body-->
      <div id="patient_view_administration_details" class="card-body pt-0">
        <!--begin::Option-->
        <div class="py-0">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_administration_profile"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_administration_profile"
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
          <div
            id="patient_view_administration_profile"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_administration_details"
          >
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
                            <el-option value="mr" label="Mr" />
                            <el-option value="mrs" label="Mrs" />
                            <el-option value="ms" label="Ms" />
                            <el-option value="master" label="Master" />
                            <el-option value="miss" label="Miss" />
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
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_administration_demographic"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_administration_demographic"
            >
              <!--begin::Summary-->
              <div class="me-3">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Patient Demographic</div>
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
          <div
            id="patient_view_administration_demographic"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_administration_details"
          >
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
                        Do you identify as Aboriginal or Torres Strait Islander?
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
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_administration_kin"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_administration_kin"
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
          <div
            id="patient_view_administration_kin"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_administration_details"
          >
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
      </div>
      <!--end::Card body-->
    </div>
    <!--end::details View-->
    <div class="d-flex ms-auto justify-content-end w-25">
      <button type="submit" class="btn btn-primary w-25">Save</button>
      <button type="reset" class="btn btn-light-primary w-25 ms-2">
        Cancel
      </button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import maritalStatus from "@/core/data/marital-status";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "patient-administration",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
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
          store
            .dispatch(Actions.PATIENTS.UPDATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.PATIENTS.LIST);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                console.log("Updated");
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Administration", ["Patients"]);
    });

    return {
      formData,
      formRef,
      rules,
      submit,
      maritalStatus,
    };
  },
});
</script>
