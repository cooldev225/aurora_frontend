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
              formData.patient.first_name + formData.patient.last_name
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">Address</label>
            <label class="fs-6 text-gray-800">{{
              formData.patient.address
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Contact Number</label
            >
            <label class="fs-6 text-gray-800">{{
              formData.patient.contact_number
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Date of Birth</label
            >
            <label class="fs-6 text-gray-800"
              >{{ formData.patient.date_of_birth }}
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
              formData.appointment.reference_number
            }}</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Appointment Date and Time</label
            >
            <label class="fs-6 text-gray-800">{{
              formData.appointment.date + formData.appointment.start_time
            }}</label>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Specialist</label
            >
            <label class="fs-6 text-gray-800">{{
              formData.specialist.first_name + formData.specialist.last_name
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
                  v-model="formData.patient.charge_type"
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
          <el-form-item prop="payment_option mb-0" class="mb-0">
            <el-radio-group v-model="payment_option" class="ml-4">
              <el-radio label="cash" size="large">Pay with Cash</el-radio>
              <el-radio label="terminal" size="large"
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
        <label class="text-muted fs-6 fw-bold mb-2 d-block"
          >Procedure: {{ formData.payment.name }}</label
        >
        <!--begin::Input-->
        <el-form class="d-flex align-items-center">
          <el-form-item prop="procedure_price" class="mb-0">
            <el-input
              type="number"
              class="w-100"
              placeholder="Procedure Price"
              v-model="formData.payment.procedure_price"
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
          >Total Payable Amount: ${{ formData.payment.procedure_price }}</label
        >
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div v-if="payment_option" class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1"
          >PAY with {{ payment_option === "cash" ? "Cash" : "Terminal" }}</span
        >
      </h3>
    </div>
    <div class="card-body py-0">
      <div class="row">
        <label class="text-muted fs-6 fw-bold mb-2 d-block">Amount($)</label>
        <!--begin::Input-->
        <el-form class="d-flex align-items-center">
          <el-form-item prop="procedure_price">
            <el-input
              type="number"
              class="w-100"
              placeholder="Procedure Price"
              v-model="formData.payment.procedure_price"
              disabled
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
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import chargeTypes from "@/core/data/charge-types";

export default defineComponent({
  name: "make-payment-pay",
  components: {},

  setup() {
    const store = useStore();
    const formData = ref({});
    const payment_option = ref("");

    watchEffect(() => {
      formData.value = store.getters.paymentSelected;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pay", ["Billing", "Out of Pocket"]);
    });

    return {
      formData,
      payment_option,
      chargeTypes,
    };
  },
});
</script>
