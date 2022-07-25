<template>
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Patient Details</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">Name</label>
            <label class="fs-6 text-gray-800">{{
              billingData.patient.first_name +
              " " +
              billingData.patient.last_name
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">Address</label>
            <label class="fs-6 text-gray-800">{{
              billingData.patient.address
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Contact Number</label
            >
            <label class="fs-6 text-gray-800">{{
              billingData.patient.contact_number
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Date of Birth</label
            >
            <label class="fs-6 text-gray-800"
              >{{ billingData.patient.date_of_birth }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Appointment Details</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Service Reference Number</label
            >
            <label class="fs-6 text-gray-800">{{
              billingData.appointment.reference_number
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Appointment Date and Time</label
            >
            <label class="fs-6 text-gray-800">{{
              billingData.appointment.date +
              " " +
              billingData.appointment.start_time
            }}</label>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Specialist</label
            >
            <label class="fs-6 text-gray-800">{{
              billingData.specialist.first_name +
              billingData.specialist.last_name
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
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
                  v-model="billingData.patient.charge_type"
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
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Your Payment Option</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <label class="text-muted fs-6 fw-bold mb-2 d-block"
          >Payment Options</label
        >
        <!--begin::Input-->
        <el-form>
          <el-form-item prop="payment_type mb-0" class="mb-0">
            <el-radio-group v-model="formData.payment_type" class="ml-4">
              <el-radio label="CASH" size="large">Pay with Cash</el-radio>
              <el-radio label="EFTPOS" size="large"
                >Pay by Terminal(etfpos)</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--end::Input-->
      </div>
    </div>
    <div class="card-header border-0 pt-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Payment Detail</span>
      </h3>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <label class="text-muted fs-6 fw-bold mb-2 d-block">{{
          billingData.appointment.type + ": " + billingData.appointment.name
        }}</label>
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
          >Total Payable Amount: ${{
            getProcedurePrice(
              billingData.payment,
              billingData.patient.charge_type
            )
          }}
          <br />
          Amount Paid: ${{ billingData.payment.paid_amount }}
          <br />
          Amount Outstanding: ${{
            getProcedurePrice(
              billingData.payment,
              billingData.patient.charge_type
            ) - billingData.payment.paid_amount
          }}
        </label>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div v-if="formData.payment_type" class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1"
          >PAY with
          {{ formData.payment_type === "CASH" ? "Cash" : "Terminal" }}</span
        >
      </h3>
    </div>
    <div class="card-body py-0">
      <div class="row">
        <label class="text-muted fs-6 fw-bold mb-2 d-block">Amount($)</label>
        <!--begin::Input-->
        <el-form
          class="d-flex align-items-center"
          @submit.prevent="submit()"
          :model="formData"
          ref="formRef"
        >
          <el-form-item prop="procedure_price">
            <el-input
              type="number"
              class="w-100"
              placeholder="Procedure Price"
              v-model="formData.amount"
            />
            <button type="submit" class="btn btn-primary mt-5 w-50">
              Confirm
            </button>
          </el-form-item>
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

export default defineComponent({
  name: "make-payment-pay",
  components: {},

  setup() {
    const store = useStore();
    const billingData = ref({
      appointment: {
        id: 0,
      },
      payment: {},
      patient: {
        charge_type: "",
      },
    });
    const list = computed(() => store.getters.paymentSelected);
    const total_amount = ref(0);
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      appointment_id: 0,
      payment_type: "",
      amount: 0,
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
          }).then(() => {
            console.log("confirmed");
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
          billingData.value.patient.charge_type
        );
      }
      console.log(billingData.value);
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
