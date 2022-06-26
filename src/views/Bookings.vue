<template>
  <div class="row">
    <div class="col-xxl-9 col-xl-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span>SEARCH NEXT AVAILABLE APPOINTMENT</span>
            <!-- <div class="row mb-2">
              <el-select
                class="col-3"
                v-model="procedure"
                placeholder="Select Procedure Type/Consultation"
              ></el-select>
            </div> -->
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <VueCtkDateTimePicker
                :format="format"
                v-model="date_value"
                inline="false"
                onlyDate
              />
            </div>
            <div class="col-md-4">
              <div class="card border border-dashed border-primary">
                <div class="card-header">
                  <div class="card-title">
                    <span>AVAILABLE SPECAILIST</span>
                  </div>
                </div>
                <div class="card-body card-scroll h-300px">
                  <div class="d-flex flex-column">
                    <el-checkbox size="large" label="DR AARON THORNTON" />
                    <el-checkbox size="large" label="DR ANTONY JACOB" />
                    <el-checkbox size="large" label="DR DAVID BADOV" />
                    <el-checkbox size="large" label="DR AARON THORNTON" />
                    <el-checkbox size="large" label="DR ANTONY JACOB" />
                    <el-checkbox size="large" label="DR DAVID BADOV" />
                    <el-checkbox size="large" label="DR AARON THORNTON" />
                    <el-checkbox size="large" label="DR ANTONY JACOB" />
                    <el-checkbox size="large" label="DR DAVID BADOV" />
                  </div>
                </div>
              </div>
              <button class="btn btn-light-danger w-100 mt-2">SEARCH</button>
            </div>
            <div class="col-md-4">
              <div class="card border border-dashed border-primary">
                <div class="card-header">
                  <div class="card-title">
                    <span>SPECAILIST REQUIREMENTS</span>
                  </div>
                </div>
                <div class="card-body card-scroll h-300px">
                  <div class="d-flex flex-column">
                    <el-checkbox size="large" label="DR AARON THORNTON" />
                    <el-checkbox size="large" label="DR ANTONY JACOB" />
                  </div>
                </div>
              </div>
              <button class="btn btn-light-primary w-100 mt-2">
                CLEAR FILTERS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-3 col-xl-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span>SEARCH BOOKED PATIENT APPOINTMENT</span>
          </div>
        </div>
        <div class="card-body">
          <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
          >
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Patient Name</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="patient_name">
                <el-select
                  class="w-100"
                  v-model="SearchPatient.patient_name"
                  placeholder="Enter Patient Name"
                />
              </el-form-item>
              <!--end::Input-->
            </div>

            <div class="row mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">UR Number</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="ur_number">
                <el-select
                  class="w-100"
                  v-model="SearchPatient.ur_number"
                  placeholder="Enter UR Number"
                />
              </el-form-item>
              <!--end::Input-->
            </div>

            <div class="row mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Date Of Birth</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="date_of_birth">
                <el-select
                  class="w-100"
                  v-model="SearchPatient.date_of_birth"
                  placeholder="Enter DOB"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="d-flex flex-row justify-content-between">
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label"> SEARCH </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <button
                type="reset"
                data-bs-dismiss="modal"
                id="kt_modal_add_customer_cancel"
                class="btn btn-light me-3"
              >
                CLEAR FILTER
              </button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-5">
    <div class="card-body">
      <div style="overflow-x: scroll">
        <table class="table align-middle gs-0 gy-4 my-0">
          <thead>
            <tr
              class="fw-bolder center-row text-white"
              style="background: linear-gradient(45deg, #4d94ff, #ff30bf)"
            >
              <th
                class="cell-120px border-0"
                style="position: relative; left: 0px"
              ></th>
              <th class="cell-35px border-0"></th>
              <th colspan="7" class="text-xxl-center text-xl-left border-0">
                Casey Day Procedure & Specialist Centre (Mon, Jun 27)
              </th>
            </tr>
            <tr class="bg-light-warning doctor-row text-center text-primary">
              <th class="cell-120px" style="position: relative; left: 0px"></th>
              <th class="cell-35px"></th>
              <th colspan="1" class="fw-bolder">DR ELHAM AMINI</th>
              <th colspan="2" class="fw-bolder">DR ELHAM AMINI</th>
              <th colspan="2" class="fw-bolder">DR ELHAM AMINI</th>
              <th colspan="2" class="fw-bolder">DR ELHAM AMINI</th>
            </tr>
            <tr class="fw-bolder">
              <th
                class="cell-120px text-center"
                style="position: relative; left: 0px"
              >
                START TIME
              </th>
              <th class="cell-35px"></th>
              <th clsss="text-left" style="min-width: 441px">
                PATIENT DETAILS
              </th>
              <th class="cell-35px"></th>
              <th clsss="text-left" style="min-width: 441px">
                PATIENT DETAILS
              </th>
              <th class="cell-35px"></th>
              <th clsss="text-left" style="min-width: 441px">
                PATIENT DETAILS
              </th>
              <th class="cell-35px"></th>
              <th clsss="text-left" style="min-width: 441px">
                PATIENT DETAILS
              </th>
            </tr>
          </thead>
        </table>
        <div
          style="
            max-height: 300px;
            overflow: scroll visible;
            width: max-content;
            min-width: 100%;
          "
        >
          <table class="table align-middle gs-0 gy-4 my-0 bg-light">
            <tbody>
              <template v-for="index in 10" :key="index">
                <tr class="text-center">
                  <td
                    class="cell-120px bg-white"
                    style="position: relative; left: 0px"
                  >
                    07:00 AM
                  </td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    class="d-flex justify-content-xxl-evenly justify-content-xl-between mt-5"
  >
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen005.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> VIEW </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-success border border-success shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen054.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> COPY </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen056.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> BOOK </span>
          <span class="text-gray-400 fw-bold fs-6">ANAESTHETIST</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-success border border-success shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen055.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> EDIT </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen027.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> CANCEL </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
  },
  setup() {
    const format = ref("MM/D/YY");
    const date_value = ref("");
    const _Specialist = ref([
      "DR DAVID BADOV",
      "DR CHAMARA BASNAYAKE",
      "DR STUART ROBERTS",
    ]);
    const SearchPatient = ref({
      patient_name: "",
      ur_number: "",
      date_of_birth: "",
    });

    return {
      format,
      date_value,
      SearchPatient,
      _Specialist,
    };
  },
});
</script>

<style>
.cell-35px {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
}

.cell-120px {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
}

td,
th {
  border: 1px dashed gray !important;
}

table tr:first-child th:first-child {
  border-radius: 50px 0 0 0;
}

table tr:first-child th:last-child {
  border-radius: 0 50px 0 0;
}
</style>
