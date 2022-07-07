<template>
  <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
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
      <div id="patient_view_appointments" class="card-body pt-0">
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_appointments_details"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_appointments_details"
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
            id="patient_view_appointments_details"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_appointments"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Service Reference Number
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.reference_number
                            ? formData.current_appointment.reference_number
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Date
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.date
                            ? formData.current_appointment.date
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Arrival Time
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.arrival_time
                            ? formData.current_appointment.arrival_time
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Start Time
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.start_time
                            ? formData.current_appointment.start_time
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        End Time
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.end_time
                            ? formData.current_appointment.end_time
                            : "(not applicable)"
                        }}
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
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Procedure Name
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.procedure_name
                            ? formData.current_appointment.procedure_name
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Clinical Code
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.clinical_code
                            ? formData.current_appointment.clinical_code
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        MBS Code
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.mbs_code
                            ? formData.current_appointment.mbs_code
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Clinic
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.clinic_name
                            ? formData.current_appointment.clinic_name
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
        <div class="separator separator-dashed"></div>
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_appointments_specialist_details"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_appointments_specialist_details"
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
            id="patient_view_appointments_specialist_details"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_appointments_2"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Specialist Name
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
                        Specialist Provider Number
                      </td>
                      <td class="text-gray-800">(not applicable)</td>
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
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_appointments_referral_details"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_appointments_referral_details"
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
            id="patient_view_appointments_referral_details"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_appointments_3"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Referral date
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.referral_date
                            ? formData.current_appointment.referral_date
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Referral Duration
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.referral_duration
                            ? formData.current_appointment.referral_duration
                            : "(not applicable)"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Referral Expiry Date
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.current_appointment &&
                          formData.current_appointment.referral_expiry_date
                            ? formData.current_appointment.referral_expiry_date
                            : "(not applicable)"
                        }}
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
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Referral Details
                      </td>
                      <td class="text-gray-800">(not applicable)</td>
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
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_appointments_appointment_billing"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_appointments_appointment_billing"
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
            id="patient_view_appointments_appointment_billing"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_appointments_4"
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
                        <el-form-item prop="first_name">
                          <el-input
                            v-model="formData.current_appointment.charge_type"
                            class="w-50"
                            type="text"
                            placeholder="First Name"
                            :disabled="
                              formData.current_appointment.payment_status !=
                              'pending'
                            "
                          />
                        </el-form-item>
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
      </div>
      <!--end::Card body-->
    </div>
    <!--end::details View-->
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="patient_view_appointments_past">
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
      <div id="patient_view_appointments" class="card-body pt-0">
        <!--begin::Option-->
        <div class="py-0" data-kt-customer-payment-method="row">
          <!--begin::Header-->
          <div class="py-5 d-flex flex-stack flex-wrap">
            <!--begin::Toggle-->
            <div
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_appointments_history"
              role="button"
              aria-expanded="true"
              aria-controls="patient_view_appointments_history"
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
            id="patient_view_appointments_history"
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_appointments_5"
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
  </el-form>
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
    const formRef = ref(null);
    const formData = ref({
      current_appointment: {
        charge_type: "",
      },
    });

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      console.log(formRef.value);
    };

    return {
      formRef,
      formData,
      submit,
    };
  },
});
</script>
