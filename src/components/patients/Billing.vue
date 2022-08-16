<template>
  <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="patient_view_billing_information">
      <!--begin::Card body-->
      <div id="patient_view_billing" class="card-body pt-0">
        <!--begin::Option-->

        <div class="py-0">
          <div class="me-3 mt-6">
            <div class="d-flex align-items-center">
              <div class="text-gray-800 fw-bolder">Medicare Details</div>
            </div>
          </div>

          <div class="container py-6">
            <div class="row justify-content-md-center">
              <InputWrapper
                :class="colString"
                label="Medicare Number"
                prop="medicare_number"
              >
                <el-input
                  v-model="formData.medicare_number"
                  type="text"
                  placeholder="Medicare Number"
                />
              </InputWrapper>
              <InputWrapper
                :class="colString"
                label="Medicare Reference Number"
                prop="medicare_reference_number"
              >
                <el-input
                  v-model="formData.medicare_reference_number"
                  type="text"
                  placeholder="Medicare Reference Number"
                />
              </InputWrapper>
              <InputWrapper
                :class="colString"
                label="Medicare Expiry Date"
                prop="medicare_expiry_date"
              >
                <el-input
                  v-model="formData.medicare_expiry_date"
                  type="text"
                  placeholder="Medicare Expiry Date"
                />
              </InputWrapper>
              <span class="m-auto" :class="colString"
                ><button class="btn btn-light-warning m-3">
                  Validate Medicare</button
                >Last validated on: xx/xxx/xxxx</span
              >
            </div>
          </div>
        </div>

        <div class="separator separator-dashed"></div>

        <div>
          <div class="py-0">
            <div class="me-3 mt-6">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Concession</div>
              </div>
            </div>

            <div class="container py-6">
              <div class="row justify-content-md-center">
                <InputWrapper
                  :class="colString"
                  label="Pension Card Number"
                  prop="pension_number"
                >
                  <el-input
                    v-model="formData.pension_number"
                    type="text"
                    placeholder="Pension Card Number"
                  />
                </InputWrapper>
                <InputWrapper
                  :class="colString"
                  label="Pension Card Expiry Date"
                  prop="pension_expiry_date"
                >
                  <el-date-picker
                    class="w-100"
                    v-model="formData.pension_expiry_date"
                    placeholder="Pension Expiry Date"
                  />
                </InputWrapper>

                <InputWrapper
                  :class="colString"
                  label="Healthcare Card Number"
                  prop="healthcare_card_number"
                >
                  <el-input
                    v-model="formData.healthcare_card_number"
                    type="text"
                    placeholder="Healthcare Card Number"
                  />
                </InputWrapper>
                <InputWrapper
                  :class="colString"
                  label="Healthcare Card Expiry Date"
                  prop="healthcare_card_expiry_date"
                >
                  <el-date-picker
                    class="w-100"
                    v-model="formData.healthcare_card_expiry_date"
                    placeholder="Healthcare Expiry Date"
                  />
                </InputWrapper>
              </div>
            </div>
          </div>

          <div class="separator separator-dashed"></div>
        </div>

        <div>
          <div class="py-0">
            <div class="me-3 mt-6">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Health Fund Details</div>
              </div>
            </div>

            <div class="container py-6">
              <div class="row justify-content-md-center">
                <InputWrapper
                  :class="colString"
                  label="Health Fund"
                  prop="health_fund_id"
                >
                  <el-select
                    class="w-100"
                    v-model="formData.health_fund_id"
                    placeholder="Health Fund"
                  >
                    <template v-for="item in healthFundsList" :key="item.id">
                      <el-option
                        :value="item.id"
                        :label="item.code + '-' + item.name"
                      />
                    </template>
                  </el-select>
                </InputWrapper>
                <InputWrapper
                  :class="colString"
                  label="Health Fund Membership Number"
                  prop="health_fund_membership_number"
                >
                  <el-input
                    v-model="formData.health_fund_membership_number"
                    type="text"
                    placeholder="Health Fund Membership Number"
                  />
                </InputWrapper>
                <InputWrapper
                  :class="colString"
                  label="Health Fund Reference Number"
                  prop="health_fund_reference_number"
                >
                  <el-input
                    v-model="formData.health_fund_reference_number"
                    type="text"
                    placeholder="Health Fund Reference Number"
                  />
                </InputWrapper>
                <InputWrapper
                  :class="colString"
                  label="Health Fund Expiry Date"
                  prop="health_fund_expiry_date"
                >
                  <el-date-picker
                    class="w-100"
                    v-model="formData.health_fund_expiry_date"
                    placeholder="Health Fund Expiry Date"
                  />
                </InputWrapper>
              </div>
            </div>
          </div>

          <div class="d-flex ms-auto justify-content-end">
            <button type="submit" class="btn btn-primary w-25">Save</button>
          </div>
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
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "patient-billing",
  components: { InputWrapper },
  data: function () {
    return {
      colString: "col-12 col-sm-6 ",
    };
  },
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
          });
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
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
