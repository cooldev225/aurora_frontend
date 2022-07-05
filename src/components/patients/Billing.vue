<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_billing_information">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Information</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div id="patient_view_billing" class="card-body pt-0">
      <!--begin::Option-->
      <div class="py-0">
        <!--begin::Header-->
        <div class="py-5 d-flex flex-stack flex-wrap">
          <!--begin::Toggle-->
          <div
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_billing_account"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_account"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">
                  Account Holder Details
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
        <div
          id="patient_view_billing_account"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Account Holder Type
                    </td>
                    <td class="text-gray-800">Self</td>
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
                      Account Holder
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
      <div class="py-0">
        <!--begin::Header-->
        <div class="py-5 d-flex flex-stack flex-wrap">
          <!--begin::Toggle-->
          <div
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_billing_medicare"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_medicare"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Medicare Details</div>
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
          id="patient_view_billing_medicare"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing_2"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Medicare Number
                    </td>
                    <td class="text-gray-800">3353535353</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Medicare Card Ref
                    </td>
                    <td class="text-gray-800">3</td>
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
                      Medicare Expiry Date
                    </td>
                    <td class="text-gray-800">12/2022</td>
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_billing_concession"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_concession"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Concession</div>
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
          id="patient_view_billing_concession"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing_3"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <!-- <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Referral date
                    </td>
                    <td class="text-gray-800">25/08/2022</td>
                  </tr> -->
                </tbody>
              </table>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="flex-equal">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <!-- <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Referral Details
                    </td>
                  </tr> -->
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
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_billing_health"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_health"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">
                  Health fund details and concessions
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
        <div
          id="patient_view_billing_health"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing_4"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Health Fund
                    </td>
                    <td class="text-gray-800"></td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Health Fund Number
                    </td>
                    <td class="text-gray-800"></td>
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
                    <td class="text-muted min-w-125px w-125px w-md-250px">
                      Health Fund Reference Number
                    </td>
                    <td class="text-gray-800"></td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Health Fund Expiry Date
                    </td>
                    <td class="text-gray-800"></td>
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
  <div class="card mb-5 mb-xl-10" id="patient_view_billing_invoices">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Invoices</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div id="patient_view_billing" class="card-body pt-0">
      <!--begin::Option-->
      <div class="py-0">
        <!--begin::Header-->
        <div class="py-5 d-flex flex-stack flex-wrap">
          <!--begin::Toggle-->
          <div
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_billing_invoices"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_invoices"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Invoices History</div>
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
          id="patient_view_billing_invoices"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing_5"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Cancelled billing
                    </td>
                    <td class="text-gray-800">0</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Missed billing
                    </td>
                    <td class="text-gray-800">1</td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Future billing
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
                      Past billing
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
  name: "patient-billing",
  components: {},
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
    });
  },
});
</script>
