<template>
  <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
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
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import maritalStatus from "@/core/data/marital-status";

export default defineComponent({
  name: "patient-administration",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const formData = ref({});

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      console.log(formRef.value);
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
      submit,
      maritalStatus,
    };
  },
});
</script>
