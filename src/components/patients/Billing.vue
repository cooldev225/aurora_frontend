<template>
  <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
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
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_billing_account"
              role="button"
              aria-expanded="true"
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
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_billing"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <!-- <td class="text-muted min-w-125px w-125px w-md-250px">
                        Account Holder Type
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.account_holder_type
                            ? formData.account_holder_type
                            : "(not applicable)"
                        }}
                      </td> -->
                      TBC
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
                      <!-- <td class="text-muted min-w-125px w-125px w-md-250px">
                        Account Holder
                      </td>
                      <td class="text-gray-800">
                        {{
                          formData.account_holder_id
                            ? formData.account_holder_id
                            : "(not applicable)"
                        }}
                      </td> -->
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
        <div>
          <div class="py-0">
            <!--begin::Header-->
            <div class="py-5 d-flex flex-stack flex-wrap">
              <!--begin::Toggle-->
              <div
                class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
                data-bs-toggle="collapse"
                href="#patient_view_billing_medicare"
                role="button"
                aria-expanded="true"
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
              class="fs-6 ps-10 collapse show"
              data-bs-parent="#patient_view_billing_2"
            >
              <!--begin::Details-->
              <div class="d-flex flex-wrap py-5">
                <!--begin::Col-->
                <div class="flex-equal me-5">
                  <table class="table table-flush fw-bold gy-1">
                    <tbody>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Medicare Number
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="medicare_number">
                            <el-input
                              v-model="formData.medicare_number"
                              class="w-50"
                              type="text"
                              placeholder="Medicare Number"
                            />
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Medicare Card Ref
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="medicare_reference_number">
                            <el-input
                              v-model="formData.medicare_reference_number"
                              class="w-50"
                              type="text"
                              placeholder="Medicare Card Ref"
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
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Medicare Expiry Date
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="medicare_expiry_date">
                            <el-date-picker
                              class="w-50"
                              v-model="formData.medicare_expiry_date"
                              placeholder="Medicare Expiry Date"
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
        </div>
        <!--begin::Option-->
        <div>
          <div class="py-0">
            <!--begin::Header-->
            <div class="py-5 d-flex flex-stack flex-wrap">
              <!--begin::Toggle-->
              <div
                class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
                data-bs-toggle="collapse"
                href="#patient_view_billing_concession"
                role="button"
                aria-expanded="true"
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
              class="fs-6 ps-10 collapse show"
              data-bs-parent="#patient_view_billing_3"
            >
              <!--begin::Details-->
              <div class="d-flex flex-wrap py-5">
                <!--begin::Col-->
                <div class="flex-equal me-5">
                  <table class="table table-flush fw-bold gy-1">
                    <tbody>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Pension Card Number
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="pension_number">
                            <el-input
                              v-model="formData.pension_number"
                              class="w-50"
                              type="text"
                              placeholder="Pension Card Number"
                            />
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Pension Card Expiry Date
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="pension_expiry_date">
                            <el-date-picker
                              class="w-50"
                              v-model="formData.pension_expiry_date"
                              placeholder="Pension Expiry Date"
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
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Healthcare Card Number
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="healthcare_card_number">
                            <el-input
                              v-model="formData.healthcare_card_number"
                              class="w-50"
                              type="text"
                              placeholder="Healthcare Card Number"
                            />
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Healthcare Card Expiry Date
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="healthcare_card_expiry_date">
                            <el-date-picker
                              class="w-50"
                              v-model="formData.healthcare_card_expiry_date"
                              placeholder="Healthcare Expiry Date"
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
        </div>
        <!--begin::Option-->
        <div>
          <div class="py-0">
            <!--begin::Header-->
            <div class="py-5 d-flex flex-stack flex-wrap">
              <!--begin::Toggle-->
              <div
                class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
                data-bs-toggle="collapse"
                href="#patient_view_billing_health"
                role="button"
                aria-expanded="true"
                aria-controls="patient_view_billing_health"
              >
                <!--begin::Summary-->
                <div class="me-3">
                  <div class="d-flex align-items-center">
                    <div class="text-gray-800 fw-bolder">
                      Health Fund Details
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
              class="fs-6 ps-10 collapse show"
              data-bs-parent="#patient_view_billing_4"
            >
              <!--begin::Details-->
              <div class="d-flex flex-wrap py-5">
                <!--begin::Col-->
                <div class="flex-equal me-5">
                  <table class="table table-flush fw-bold gy-1">
                    <tbody>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Health Fund
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="health_fund_id">
                            <el-select
                              class="w-50"
                              v-model="formData.health_fund_id"
                              placeholder="Health Fund"
                            >
                              <template
                                v-for="item in healthFundsList"
                                :key="item.id"
                              >
                                <el-option
                                  :value="item.id"
                                  :label="item.code + '-' + item.name"
                                />
                              </template>
                            </el-select>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Health Fund Membership Number
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="health_fund_membership_number">
                            <el-input
                              v-model="formData.health_fund_membership_number"
                              class="w-50"
                              type="text"
                              placeholder="Health Fund Membership Number"
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
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Health Fund Reference Number
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="health_fund_reference_number">
                            <el-input
                              v-model="formData.health_fund_reference_number"
                              class="w-50"
                              type="text"
                              placeholder="Health Fund Reference Number"
                            />
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-muted min-w-125px w-125px w-md-250px">
                          Health Fund Expiry Date
                        </td>
                        <td class="text-gray-800">
                          <el-form-item prop="health_fund_expiry_date">
                            <el-date-picker
                              class="w-50"
                              v-model="formData.health_fund_expiry_date"
                              placeholder="Health Fund Expiry Date"
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
              class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
              data-bs-toggle="collapse"
              href="#patient_view_billing_invoices_list"
              role="button"
              aria-expanded="true"
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
            class="fs-6 ps-10 collapse show"
            data-bs-parent="#patient_view_billing_5"
          >
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Col-->
              <div class="flex-equal me-5">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <tr>
                      <!-- <td class="text-muted min-w-125px w-125px w-md-250px">
                        Cancelled billing
                      </td>
                      <td class="text-gray-800">0</td> -->
                      TBC
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="flex-equal">
                <table class="table table-flush fw-bold gy-1">
                  <tbody>
                    <!-- <tr>
                      <td class="text-muted min-w-125px w-125px w-md-250px">
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
    <div class="d-flex ms-auto justify-content-end w-25">
      <button type="submit" class="btn btn-primary w-25">Save</button>
      <button type="reset" class="btn btn-light-primary w-25 ms-2">
        Cancel
      </button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "patient-billing",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const formData = ref({
      medicare_number: "",
      medicare_reference_number: "",
      medicare_expiry_date: "",
      pension_number: "",
      pension_expiry_date: "",
      healthcare_card_number: "",
      healthcare_card_expiry_date: "",
      health_fund_id: "",
      health_fund_membership_number: "",
      health_fund_reference_number: "",
      health_fund_expiry_date: "",
    });
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const loading = ref(false);

    const submit = () => {
      if (!formRef.value) {
        return;
      }

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
      console.log(formRef.value);
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);
    });

    return {
      formRef,
      formData,
      healthFundsList,
      submit,
    };
  },
});
</script>
