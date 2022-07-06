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
                    <td class="text-gray-800">
                      {{
                        formData.account_holder_type
                          ? formData.account_holder_type
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
                      Account Holder
                    </td>
                    <td class="text-gray-800">
                      {{
                        formData.account_holder_id
                          ? formData.account_holder_id
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
      <div v-if="formData.medicare_number">
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
                      <td class="text-gray-800">
                        {{ formData.medicare_number }}
                      </td>
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
                      <td class="text-gray-800">
                        {{ formData.medicare_expiry_date }}
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
      </div>
      <!--begin::Option-->
      <div v-if="formData.pension_number || formData.healthcare_card_number">
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
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Pension Card Number
                      </td>
                      <td class="text-gray-800">
                        {{ formData.pension_number }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Pension Card Expiry Date
                      </td>
                      <td class="text-gray-800">
                        {{ formData.pension_expiry_date }}
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
                        Healthcare Card Number
                      </td>
                      <td class="text-gray-800">
                        {{ formData.healthcare_card_number }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Healthcare Card Expiry Date
                      </td>
                      <td class="text-gray-800">
                        {{ formData.healthcare_card_expiry_date }}
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
      </div>
      <!--begin::Option-->
      <div v-if="formData.health_fund_id">
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
                  <div class="text-gray-800 fw-bolder">Health fund details</div>
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
                      <td class="text-gray-800">
                        {{ formData.health_fund_id }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Health Fund Number
                      </td>
                      <td class="text-gray-800">
                        {{ formData.health_fund_membership_number }}
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
                      <td class="text-muted min-w-125px w-125px w-md-250px">
                        Health Fund Reference Number
                      </td>
                      <td class="text-gray-800">
                        {{ formData.health_fund_reference_number }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted min-w-125px w-125px w-md-200px">
                        Health Fund Expiry Date
                      </td>
                      <td class="text-gray-800">
                        {{ formData.health_fund_expiry_date }}
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
            href="#patient_view_billing_invoices_list"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_billing_invoices_list"
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
          id="patient_view_billing_invoices_list"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_billing_5"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <!-- <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Cancelled billing
                    </td>
                    <td class="text-gray-800">0</td>
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
                      Past billing
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
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-billing",
  components: {},
  setup() {
    const store = useStore();
    const formData = ref({});

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
      console.log(formData.value);
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
    });

    return {
      formData,
    };
  },
});
</script>
