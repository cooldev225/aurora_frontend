<template>
  <div v-if="Object.prototype.hasOwnProperty.call(billingData, 'appointment')">
    <CardSection heading="Appointment Details">
      <div class="d-flex flex-column flex-sm-row gap-4">
        <div class="col-sm-6">
          <div class="d-flex flex-column gap-4">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">
              Appointment
            </label>

            <InfoSection heading="Date">
              {{ billingData.appointment?.aus_formatted_date }},
              {{ billingData.appointment?.start_time }}
            </InfoSection>

            <InfoSection heading="Clinic">
              {{ billingData.appointment?.clinic?.name }}
            </InfoSection>
          </div>
        </div>

        <div class="col-sm-6 mt-6 mt-sm-0">
          <div class="d-flex flex-column gap-4">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">
              Patient
            </label>

            <InfoSection heading="Name">
              {{ billingData.appointment.patient_name.full }}
            </InfoSection>

            <InfoSection heading="Contact Number">
              {{ billingData.appointment.patient_details.contact_number }}
            </InfoSection>

            <InfoSection heading="Email">
              {{ billingData.appointment.patient_details.email }}
            </InfoSection>
          </div>
        </div>
      </div>
    </CardSection>

    <div class="card mb-5 mb-xxl-8">
      <div class="card-header pt-5">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-3 mb-1">Payment Details</span>
        </h3>
      </div>
      <div class="card-body pt-3 pb-0">
        <div class="row">
          <div class="col-md-7 p-3">
            <div class="fv-row mb-8">
              <label class="text-muted fs-6 fw-bold mb-2 d-block">
                Procedures
              </label>

              <Datatable
                :table-header="tableHeader"
                :table-data="billingData.charges.procedures"
                :enable-items-per-page-dropdown="false"
              >
                <template v-slot:cell-mbs_code="{ row: item }">
                  {{ item.mbs_code }}
                </template>

                <template v-slot:cell-description="{ row: item }">
                  {{ item.description }}
                </template>

                <template v-slot:cell-price="{ row: item }">
                  <el-input
                    type="number"
                    class="w-100"
                    placeholder="Item Price"
                    v-model="item.price"
                  />
                </template>
              </Datatable>
            </div>

            <div class="fv-row mb-8">
              <label class="text-muted fs-6 fw-bold mb-2 d-block">
                Extra Items
              </label>

              <Datatable
                :table-header="tableHeader"
                :table-data="billingData.charges.extra_items"
                :enable-items-per-page-dropdown="false"
                empty-table-text="No items added"
              >
                <template v-slot:cell-mbs_code="{ row: item }">
                  {{ item.mbs_code }}
                </template>

                <template v-slot:cell-description="{ row: item }">
                  {{ item.description }}
                </template>

                <template v-slot:cell-price="{ row: item }">
                  <el-input
                    type="number"
                    class="w-100"
                    placeholder="Item Price"
                    v-model="item.price"
                  />
                </template>
              </Datatable>
            </div>
          </div>

          <div class="col-md-5 p-3">
            <div class="fv-row mb-8">
              <label class="text-muted fs-6 fw-bold mb-2 d-block">
                Charge Type
              </label>
              <el-form>
                <el-form-item prop="charge_type">
                  <el-select
                    class="w-100"
                    v-model="billingData.appointment.charge_type"
                    placeholder="Select Charge Type"
                    disabled
                  >
                    <el-option
                      v-for="type in getChargeTypes(
                        billingData.appointment.patient
                      )"
                      :key="type.value"
                      :value="type.value"
                      :label="type.label"
                      :selected="type.label === 'self-insured'"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>

            <div class="fv-row mb-8">
              <div class="fs-6 fw-bold mt-2 d-flex flex-column gap-2">
                <InfoSection heading="Total Payable Amount">
                  {{ procedurePrice() }}
                </InfoSection>

                <InfoSection heading="Amount Paid">
                  {{ amountPaid() }}
                </InfoSection>

                <InfoSection heading="Amount Outstanding">
                  {{ amountOutstanding() }}
                </InfoSection>
              </div>
            </div>

            <el-divider />

            <el-form @submit.prevent="submit()" ref="formRef">
              <div class="fv-row mb-4">
                <label class="text-muted fs-6 fw-bold mb-2 d-block">
                  Amount to Pay
                </label>
                <el-input
                  type="number"
                  class="w-100"
                  placeholder="Procedure Price"
                  v-model="formData.amount"
                />
              </div>

              <div class="fv-row mb-4">
                <div
                  class="d-flex w-100 flex-row justify-content-between gap-4"
                >
                  <el-form-item class="mb-0" prop="payment_type">
                    <el-radio-group v-model="formData.payment_type">
                      <el-radio label="EFTPOS" size="large">Etfpos</el-radio>
                      <el-radio label="CASH" size="large">Cash</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item class="mb-0" prop="is_send_receipt">
                    <el-checkbox
                      type="checkbox"
                      v-model="formData.is_send_receipt"
                      label="Send receipt?"
                    />
                  </el-form-item>
                </div>
              </div>

              <div class="fv-row mb-4">
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  :disabled="formData.amount === 0"
                >
                  Confirm
                </button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!--end::Card-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import chargeTypes, {
  getProcedurePrice,
  getChargeTypes,
} from "@/core/data/charge-types";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import CardSection from "../presets/GeneralElements/CardSection.vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "make-payment-pay",
  components: {
    InfoSection,
    CardSection,
    Datatable,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const appointmentId = route.params.id;
    const billingData = computed(() => store.getters.paymentSelected);
    const amounts = ref({
      procedurePrice: 0,
      amountPaid: 0,
    });
    const total_amount = ref(0);
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      appointment_id: 0,
      payment_type: "EFTPOS",
      amount: 0,
      is_deposit: false,
      is_send_receipt: true,
    });

    const tableHeader = ref([
      {
        name: "MBS Code",
        key: "mbs_code",
        sortable: true,
      },
      {
        name: "MBS Description",
        key: "description",
        sortable: false,
      },
      {
        name: "Price",
        key: "price",
        sortable: false,
      },
      {
        name: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);

    const procedurePrice = () => {
      let price = 0;
      if (Object.prototype.hasOwnProperty.call(billingData.value, "charges")) {
        price = getProcedurePrice(
          billingData.value.charges,
          billingData.value.appointment.charge_type
        );
      }

      amounts.value.procedurePrice = price;

      return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(price);
    };

    const amountPaid = () => {
      let total = 0;

      if (
        Object.prototype.hasOwnProperty.call(billingData.value, "payment_list")
      ) {
        billingData.value.payment_list.forEach((payment) => {
          total += payment.amount;
        });
      }

      amounts.value.amountPaid = total;

      return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(total);
    };

    const amountOutstanding = () => {
      const total = amounts.value.procedurePrice - amounts.value.amountPaid;

      return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(total);
    };

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

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pay", ["Billing", "Out of Pocket"]);
      store.dispatch(Actions.MAKE_PAYMENT.VIEW, appointmentId).then(() => {
        formData.value.appointment_id = parseInt(appointmentId.toString());
      });
    });

    return {
      billingData,
      chargeTypes,
      formData,
      formRef,
      total_amount,
      submit,
      getProcedurePrice,
      getChargeTypes,
      amountPaid,
      procedurePrice,
      amountOutstanding,
      tableHeader,
    };
  },
});
</script>
