<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_update_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Current Appointment</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div id="patient_update_appointments" class="card-body pt-0">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
              data-bs-toggle="collapse"
              href="#patient_update_appointments_details"
              role="button"
              aria-expanded="false"
              aria-controls="patient_update_appointments_details"
            >
              <!--begin::Summary-->
              <div class="me-3">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Appointment Details</div>
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
            id="patient_update_appointments_details"
            class="fs-6 ps-10 collapse"
            data-bs-parent="#patient_update_appointments"
          >
            <!--begin::Details-->
            <div class="row">
              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Service Reference Number</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="reference_number">
                  <el-input
                    type="number"
                    v-model="formData.current_appointment.reference_number"
                    placeholder="Service Reference Number"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Date</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="date">
                  <el-date-picker
                    class="w-100"
                    v-model="formData.current_appointment.date"
                    placeholder="Date"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Arrival Time</span>
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="arrival_time">
                  <el-time-picker
                    class="w-100"
                    v-model="formData.current_appointment.arrival_time"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>

            <div class="row">
              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Start Time</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="start_time">
                  <el-time-picker
                    class="w-100"
                    v-model="formData.current_appointment.start_time"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">End Time</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="end_time">
                  <el-time-picker
                    class="w-100"
                    v-model="formData.current_appointment.end_time"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Procedure Name</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="procedure_name">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.procedure_name"
                    placeholder="Procedure Name"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>

            <div class="row">
              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Clinical Code</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="clinical_code">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.clinical_code"
                    placeholder="Clinical Code"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">MBS Code</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="mbs_code">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.mbs_code"
                    placeholder="MBS Code"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Clinic</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="clinic_name">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.clinic_name"
                    placeholder="Clinic"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Option-->
        <div class="separator separator-dashed"></div>
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
              data-bs-toggle="collapse"
              href="#patient_update_appointments_specialist_details"
              role="button"
              aria-expanded="false"
              aria-controls="patient_update_appointments_specialist_details"
            >
              <!--begin::Summary-->
              <div class="me-3">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Specialist Details</div>
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
            id="patient_update_appointments_specialist_details"
            class="fs-6 ps-10 collapse"
            data-bs-parent="#patient_update_appointments_2"
          >
            <!--begin::Details-->
            <div class="row">
              <!--begin::Input group-->
              <div class="col-sm-6">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Specialist Name</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="specialist_name">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.specialist_name"
                    placeholder="Specialist Name"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-6">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Specialist Provider Number</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="specialist_number">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.specialist_number"
                    placeholder="Specialist Provider Number"
                    disabled
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Option-->
        <div class="separator separator-dashed"></div>
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
              data-bs-toggle="collapse"
              href="#patient_update_appointments_referral_details"
              role="button"
              aria-expanded="false"
              aria-controls="patient_update_appointments_referral_details"
            >
              <!--begin::Summary-->
              <div class="me-3">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Referral Details</div>
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
            id="patient_update_appointments_referral_details"
            class="fs-6 ps-10 collapse"
            data-bs-parent="#patient_update_appointments_3"
          >
            <!--begin::Details-->
            <div class="row">
              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Referral Date</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referral_date">
                  <el-date-picker
                    class="w-100"
                    v-model="formData.current_appointment.referral_date"
                    placeholder="Referral Date"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Referral Duration</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referral_duration">
                  <el-input
                    type="text"
                    v-model="formData.current_appointment.referral_duration"
                    placeholder="Referral Duration"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-4">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Referral Expiry Date</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referral_expiry_date">
                  <el-date-picker
                    class="w-100"
                    v-model="formData.current_appointment.referral_expiry_date"
                    placeholder="Referral Expiry Date"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="col-sm-12">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Referral Details</span>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="referral_details">
                  <el-input
                    type="textarea"
                    v-model="formData.current_appointment.referral_details"
                    placeholder="Referral Details"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Option-->
        <div class="separator separator-dashed"></div>
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
              data-bs-toggle="collapse"
              href="#patient_update_appointments_appointment_billing"
              role="button"
              aria-expanded="false"
              aria-controls="patient_update_appointments_appointment_billing"
            >
              <!--begin::Summary-->
              <div class="me-3">
                <div class="d-flex align-items-center">
                  <div class="text-gray-800 fw-bolder">Appointment Billing</div>
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
            id="patient_update_appointments_appointment_billing"
            class="fs-6 ps-10 collapse"
            data-bs-parent="#patient_update_appointments_4"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Charge Type
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.charge_type
                            ? formData.current_appointment.charge_type
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Concession Number
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.concession_number
                            ? formData.current_appointment.concession_number
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Concession Expiry Date
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.concession_expiry_date
                            ? formData.current_appointment
                                .concession_expiry_date
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Has co-payment
                      </td>
                      <td class="text-gray-800">(not applicable)</td>
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
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Patient Pay
                      </td>
                      <td class="text-gray-800">(not applicable)</td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Payment Status
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.payment_status
                            ? formData.current_appointment.payment_status
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Payment Source
                      </td>
                      <td class="text-gray-800">(not applicable)</td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Note
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.note
                            ? formData.current_appointment.note
                            : "(not applicable)"
                        }}
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
      </el-form>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_update_appointments_past">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Past Appointments</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div id="patient_update_appointments" class="card-body pt-0">
      <!--begin::Option-->
      <div class="py-0" data-kt-customer-payment-method="row">
        <!--begin::Header-->
        <div class="py-5 d-flex flex-stack flex-wrap">
          <!--begin::Toggle-->
          <div
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_update_appointments_history"
            role="button"
            aria-expanded="false"
            aria-controls="patient_update_appointments_history"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Appointment History</div>
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
          id="patient_update_appointments_history"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_update_appointments_5"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Cancelled Appointments
                    </td>
                    <td class="text-gray-800">0</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Missed Appointments
                    </td>
                    <td class="text-gray-800">1</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Future Appointments
                    </td>
                    <td class="text-gray-800">0</td>
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
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Past Appointments
                    </td>
                    <td class="text-gray-800">
                      <span
                        class="badge badge-light-success d-block mb-3"
                        style="width: fit-content"
                        >27 Aug 2019 09:00 AM (Colonoscopy)</span
                      >
                      <span
                        class="badge badge-light-success d-block mb-3"
                        style="width: fit-content"
                        >16 Jun 2020 12:00 PM (Gastroscopy)</span
                      >
                      <span
                        class="badge badge-light-danger d-block"
                        style="width: fit-content"
                        >27 Jun 2022 12:00 PM (Colonoscopy and
                        Gastroscopy)</span
                      >
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
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-appointments",
  components: {},
  setup() {
    const store = useStore();
    const formData = ref({});

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
    });

    return {
      formData,
    };
  },
});
</script>
