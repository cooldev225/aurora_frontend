<template>
  <!--begin::Card-->
  <CardSection heading="Patient Details">
    <InfoSection :heading="'Name'"
      >{{ billingData.appointment.patient_name.full }}
    </InfoSection>

    <InfoSection :heading="'Contact Number'"
      >{{ billingData.appointment.patient_details.contact_number }}
    </InfoSection>
    <InfoSection :heading="'Date of Birth'"
      >{{ billingData.appointment.patient_details.date_of_birth }}
    </InfoSection>
  </CardSection>

  <CardSection heading="Appointment Details">
    <InfoSection :heading="'Name'"
      >{{ billingData.appointment.patient_name.full }}
    </InfoSection>

    <InfoSection :heading="'Contact Number'"
      >{{ billingData.appointment.patient_details.contact_number }}
    </InfoSection>
    <InfoSection :heading="'Date of Birth'"
      >{{ billingData.appointment.patient_details.date_of_birth }}
    </InfoSection>
  </CardSection>

  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Charge Type</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Charge Type</label
            >
            <el-form>
              <el-form-item prop="charge_type">
                <el-select
                  class="w-100"
                  v-model="billingData.charge_type"
                  placeholder="Select Charge Type"
                >
                  <el-option
                    v-for="type in chargeTypes"
                    :key="type.value"
                    :value="type.value"
                    :label="type.label"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Payment Detail</span>
      </h3>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <label class="text-muted fs-6 fw-bold mb-2 d-block">
          {{ billingData.appointment?.appointment_type.type }}
          : {{ billingData.appointment?.name }}</label
        >
        <!--begin::Input-->
        <el-form class="d-flex align-items-center">
          <el-form-item prop="procedure_price" class="mb-0">
            <el-input
              type="number"
              class="w-100"
              placeholder="Procedure Price"
              v-model="total_amount"
              disabled
            />
          </el-form-item>
          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/art/art005.svg" />
            </span>
          </a>
        </el-form>
        <!--end::Input-->
        <label class="text-muted fs-6 fw-bold mt-2 d-block"
          >Total Payable Amount: $
          {{
            getProcedurePrice(
              billingData.payment,
              billingData.appointment.charge_type
            )
          }}

          <br />
          Amount Paid: ${{ billingData.payment.paid_amount }}
          <br />
          <ul>
            <li
              class="p-5"
              v-for="payment in billingData.payment_list"
              :key="payment.id"
            >
              <span
                >${{ payment.amount }}
                <span v-if="payment.is_deposit"> deposit </span>
                <span v-if="payment.payment_type == 'CASH'">
                  paid in cash
                </span>
                <span v-if="payment.payment_type == 'EFTPOS'">
                  paid via eftpos
                </span>
                ({{ payment.confirmed_user_name }}
                {{ payment.created_at }}) </span
              ><br />
            </li>
          </ul>
          <span class="text-danger">
            Outstanding: ${{
              getProcedurePrice(
                billingData.payment,
                billingData.appointment.charge_type
              ) - billingData.payment.paid_amount
            }}</span
          >
        </label>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Make a payment</span>
      </h3>
    </div>
    <div class="card-body py-0">
      <div class="row">
        <!--begin::Input-->
        <el-form
          class="d-flex row align-items-center"
          @submit.prevent="submit()"
          :model="formData"
          ref="formRef"
        >
          <div class="d-flex w-50 row justify-content-between">
            <el-form-item prop="payment_type mb-0" class="col-6 mb-0">
              <el-radio-group v-model="formData.payment_type" class="ml-4">
                <el-radio label="EFTPOS" size="large">Etfpos</el-radio>
                <el-radio label="CASH" size="large">Cash</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="is_deposit"
              class="justify-content-end col-6 m-0"
            >
              <el-checkbox
                type="checkbox"
                v-model="formData.is_deposit"
                label="Is deposit?"
              />
            </el-form-item>
          </div>
          <label class="text-muted fs-6 fw-bold mb-2 d-block">Amount($)</label>
          <el-form-item prop="procedure_price">
            <el-input
              type="number"
              class="w-100"
              placeholder="Procedure Price"
              v-model="formData.amount"
            />
          </el-form-item>

          <el-form-item prop="is_send_receipt" class="m-0">
            <el-checkbox
              type="checkbox"
              v-model="formData.is_send_receipt"
              label="Send receipt?"
            />
          </el-form-item>
          <el-form-item prop="email" class="m-0">
            <el-input
              type="email"
              class="w-100"
              placeholder="Recipient Email"
              v-model="formData.email"
            />
          </el-form-item>
          <button type="submit" class="btn btn-primary mt-5 w-50">
            Confirm
          </button>
        </el-form>
        <!--end::Input-->
      </div>
    </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import chargeTypes, { getProcedurePrice } from "@/core/data/charge-types";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import CardSection from "../presets/GeneralElements/CardSection.vue";

export default defineComponent({
  name: "make-payment-pay",
  components: { InfoSection, CardSection },

  setup() {
    const store = useStore();
    const billingData = ref({
      appointment: {
        id: 0,
        charge_type: "",
      },
      payment: {},
    });
    const list = computed(() => store.getters.paymentSelected);
    const total_amount = ref(0);
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      appointment_id: 0,
      payment_type: "EFTPOS",
      amount: 0,
      is_deposit: 1,
      is_send_receipt: 1,
      email: "",
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      formData.value.appointment_id = billingData.value.appointment.id;
      store
        .dispatch(Actions.MAKE_PAYMENT.CREATE, formData.value)
        .then(() => {
          store.dispatch(
            Actions.MAKE_PAYMENT.VIEW,
            formData.value.appointment_id
          );
          Swal.fire({
            text: "Payment Received.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };

    watchEffect(() => {
      billingData.value = list.value;
      if (billingData.value.payment) {
        total_amount.value = getProcedurePrice(
          billingData.value.payment,
          billingData.value.appointment.charge_type
        );
      }
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pay", ["Billing", "Out of Pocket"]);
    });

    return {
      billingData,
      chargeTypes,
      formData,
      formRef,
      total_amount,
      submit,
      getProcedurePrice,
    };
  },
});
</script>
