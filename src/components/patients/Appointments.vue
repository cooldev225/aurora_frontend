<template>
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_appointments_details"
            role="button"
            aria-expanded="false"
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
          class="fs-6 ps-10 collapse"
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
                    <td class="text-gray-800">22100341</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Date
                    </td>
                    <td class="text-gray-800">27/06/2022</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Arrival Time
                    </td>
                    <td class="text-gray-800">11:45 AM</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Start Time
                    </td>
                    <td class="text-gray-800">12:00 PM</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      End Time
                    </td>
                    <td class="text-gray-800">12:30 PM</td>
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
                    <td class="text-gray-800">Colonoscopy and Gastroscopy</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Clinical Code
                    </td>
                    <td class="text-gray-800">(not applicable)</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      MBS Cod3
                    </td>
                    <td class="text-gray-800">123456</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Clinic
                    </td>
                    <td class="text-gray-800">
                      Bayside Day Procedure And Specialist Centre
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_appointments_specialist_details"
            role="button"
            aria-expanded="false"
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
          class="fs-6 ps-10 collapse"
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
                    <td class="text-gray-800">DR AARON THORNTON</td>
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
                    <td class="text-gray-800">2272847A</td>
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_appointments_referral_details"
            role="button"
            aria-expanded="false"
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
          class="fs-6 ps-10 collapse"
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
                    <td class="text-gray-800">25/08/2022</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Referral Duration
                    </td>
                    <td class="text-gray-800">1 Month</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Referral Expiry Date
                    </td>
                    <td class="text-gray-800">25/09/2022</td>
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
                    <td class="text-gray-800">
                      Name: DR SAMANTHA MIMERAN, <br />
                      Address: 209 Balaclava Road, Caulfield North VIC,
                      Australia, <br />
                      Phone number: 0399998888, <br />
                      Provider number: 282828GG
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_appointments_appointment_billing"
            role="button"
            aria-expanded="false"
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
          class="fs-6 ps-10 collapse"
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
                    <td class="text-gray-800">Healthcare Card</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Concession Number
                    </td>
                    <td class="text-gray-800">(not applicable)</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Concession Expiry Date
                    </td>
                    <td class="text-gray-800">(not applicable)</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Has co-payment
                    </td>
                    <td class="text-gray-800">No</td>
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
                    <td class="text-gray-800">$250</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Payment Status
                    </td>
                    <td class="text-gray-800">(not applicable)</td>
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_appointments_history"
            role="button"
            aria-expanded="false"
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
          class="fs-6 ps-10 collapse"
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
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "patient-appointments",
  components: {},
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
    });
  },
});
</script>
