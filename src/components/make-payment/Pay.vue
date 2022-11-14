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
          <div class="col-md-7 mb-4 p-3 pe-5">
            <div class="fv-row mb-8">
              <div
                class="d-flex justify-content-between align-items-center gap-4"
              >
                <label class="text-muted fs-6 fw-bold">Procedures</label>

                <IconButton
                  label="Add Procedure"
                  @click="handleAddItem('procedures')"
                />
              </div>

              <Datatable
                :table-header="mbsTableHeader"
                :table-data="billingData.charges.procedures"
                :enable-items-per-page-dropdown="false"
                empty-table-text="No items added"
              >
                <template v-slot:cell-mbs_code="{ row: item }">
                  {{ item.mbs_item_code }}
                </template>

                <template v-slot:cell-description="{ row: item }">
                  {{ item.description }}
                </template>

                <template v-slot:cell-price="{ row: item }">
                  {{ convertToCurrency(item.price) }}
                </template>

                <template v-slot:cell-actions="{ row: item }">
                  <button
                    type="button"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    @click="handleEditItem('procedures', item)"
                  >
                    <span class="svg-icon svg-icon-3">
                      <InlineSVG icon="pencil" />
                    </span>
                  </button>
                </template>
              </Datatable>
            </div>

            <div class="fv-row mb-8">
              <div
                class="d-flex justify-content-between align-items-center gap-4"
              >
                <label class="text-muted fs-6 fw-bold">Extra Items</label>

                <IconButton
                  label="Add Extra Item"
                  @click="handleAddItem('extra_items')"
                />
              </div>

              <Datatable
                :table-header="mbsTableHeader"
                :table-data="billingData.charges.extra_items"
                :enable-items-per-page-dropdown="false"
                empty-table-text="No items added"
              >
                <template v-slot:cell-mbs_code="{ row: item }">
                  {{ item.mbs_item_code }}
                </template>

                <template v-slot:cell-description="{ row: item }">
                  {{ item.description }}
                </template>

                <template v-slot:cell-price="{ row: item }">
                  {{ convertToCurrency(item.price) }}
                </template>

                <template v-slot:cell-actions="{ row: item }">
                  <button
                    type="button"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    @click="handleEditItem('extra_items', item)"
                  >
                    <span class="svg-icon svg-icon-3">
                      <InlineSVG icon="pencil" />
                    </span>
                  </button>
                </template>
              </Datatable>
            </div>

            <div class="fv-row mb-8">
              <div
                class="d-flex justify-content-between align-items-center gap-4"
              >
                <label class="text-muted fs-6 fw-bold">Non-MBS Items</label>

                <IconButton
                  label="Add Non-MBS Item"
                  @click="handleAddItem('admin_items')"
                />
              </div>

              <Datatable
                :table-header="tableHeader"
                :table-data="billingData.charges.admin_items"
                :enable-items-per-page-dropdown="false"
                empty-table-text="No items added"
              >
                <template v-slot:cell-mbs_code="{ row: item }">
                  {{ item.mbs_item_code }}
                </template>

                <template v-slot:cell-description="{ row: item }">
                  {{ item.description }}
                </template>

                <template v-slot:cell-price="{ row: item }">
                  {{ convertToCurrency(item.price) }}
                </template>

                <template v-slot:cell-actions="{ row: item }">
                  <button
                    type="button"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    @click="handleEditItem('admin_items', item)"
                  >
                    <span class="svg-icon svg-icon-3">
                      <InlineSVG icon="pencil" />
                    </span>
                  </button>
                </template>
              </Datatable>
            </div>

            <PaymentItemModal
              :item="paymentItemModalData"
              v-on:deleteItem="handleDeleteItem"
              v-on:submitItem="handlePaymentItemModalSubmit"
              v-on:closeModal="handleCloseModal"
            />
          </div>

          <div class="col-md-5 p-3 ps-5 mb-4 border-start border-light">
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
                  {{ convertToCurrency(procedurePrice) }}
                </InfoSection>

                <InfoSection heading="Amount Paid">
                  {{ convertToCurrency(amountPaid) }}
                </InfoSection>

                <InfoSection heading="Amount Outstanding">
                  {{ convertToCurrency(amountOutstanding) }}
                </InfoSection>
              </div>
            </div>

            <el-divider />

            <el-form @submit.prevent="submit()" ref="formRef">
              <div class="fv-row mb-4">
                <label class="text-muted fs-6 fw-bold mb-2 d-block">
                  Amount to Pay
                </label>
                <CurrencyInput
                  class="w-100"
                  v-model="formData.amount"
                  placeholder="Procedure Price"
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

              <div class="fv-row">
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
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import chargeTypes, {
  getProcedurePrice,
  getChargeTypes,
} from "@/core/data/charge-types";
import { convertToCurrency } from "@/core/data/billing";
import { Actions } from "@/store/enums/StoreEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import CardSection from "../presets/GeneralElements/CardSection.vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import PaymentItemModal from "@/components/make-payment/PaymentItemModal.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "make-payment-pay",
  components: {
    InfoSection,
    CardSection,
    Datatable,
    IconButton,
    PaymentItemModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const appointmentId = route.params.id;
    const billingData = computed(() => store.getters.paymentSelected);
    const total_amount = ref(0);
    const paymentItemModal = ref();
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      appointment_id: 0,
      payment_type: "EFTPOS",
      amount: 0,
      is_deposit: false,
      is_send_receipt: true,
    });
    const paymentItemModalData = ref({
      mode: "",
      category: "",
      item: null,
    });

    const mbsTableHeader = ref([
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

    const tableHeader = ref([
      {
        name: "Name",
        key: "name",
        sortable: true,
      },
      {
        name: "Description",
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

    const proceduresUndertakenList = computed(() => {
      let list = [] as Array<number>;

      if (Object.prototype.hasOwnProperty.call(billingData.value, "charges")) {
        const charges = billingData.value.charges.procedures;

        charges.forEach((charge) => {
          list.push(charge.id);
        });
      }

      return list;
    });

    const extraItemsList = computed(() => {
      let list = [] as Array<number>;

      if (Object.prototype.hasOwnProperty.call(billingData.value, "charges")) {
        const charges = billingData.value.charges.extra_items;

        charges.forEach((charge) => {
          list.push(charge.id);
        });
      }

      return list;
    });

    const adminItemsList = computed(() => {
      let list = [] as Array<number>;

      if (Object.prototype.hasOwnProperty.call(billingData.value, "charges")) {
        const charges = billingData.value.charges.admin_items;

        charges.forEach((charge) => {
          list.push(charge.id);
        });
      }

      return list;
    });

    const procedurePrice = computed(() => {
      let price = 0;
      if (Object.prototype.hasOwnProperty.call(billingData.value, "charges")) {
        price = getProcedurePrice(
          billingData.value.charges,
          billingData.value.appointment.charge_type
        );
      }

      return price;
    });

    const amountPaid = computed(() => {
      let total = 0;

      if (
        Object.prototype.hasOwnProperty.call(billingData.value, "payment_list")
      ) {
        billingData.value.payment_list.forEach((payment) => {
          total += payment.amount;
        });
      }

      return total;
    });

    const amountOutstanding = computed(() => {
      const total = procedurePrice.value - amountPaid.value;

      return total;
    });

    const handleDeleteItem = () => {
      const category = paymentItemModalData.value.category;
      const item = paymentItemModalData.value.item;

      deleteItem(category, item);
    };

    const handleEditItem = (category, item) => {
      if (!paymentItemModal.value) {
        paymentItemModal.value = new Modal(
          document.getElementById("modal_payment_item")
        );
      }

      paymentItemModalData.value.mode = "edit";
      paymentItemModalData.value.category = category;
      paymentItemModalData.value.item = item;

      paymentItemModal.value.show();
    };

    const handleAddItem = (category) => {
      if (!paymentItemModal.value) {
        paymentItemModal.value = new Modal(
          document.getElementById("modal_payment_item")
        );
      }

      paymentItemModalData.value.mode = "add";
      paymentItemModalData.value.category = category;

      paymentItemModal.value.show();
    };

    const deleteItem = (category, item) => {
      const index = billingData.value.charges[category].findIndex(
        (charge) => charge.id === item.id
      );

      billingData.value.charges[category].splice(index, 1);
      updateAppointmentDetail();
    };

    const updatePrice = (item, price, category) => {
      const found = billingData.value.charges[category].find(
        (charge) => charge.id === item.id
      );

      found.price = price;
    };

    const addPaymentItem = (item) => {
      billingData.value.charges[paymentItemModalData.value.category].push(item);
      updateAppointmentDetail();
    };

    const handlePaymentItemModalSubmit = (event) => {
      if (paymentItemModalData.value.mode === "add") {
        addPaymentItem(event);
      }

      if (paymentItemModalData.value.mode === "edit") {
        updatePrice(
          paymentItemModalData.value.item,
          event.price,
          paymentItemModalData.value.category
        );
      }

      handleCloseModal();
    };

    const handleCloseModal = () => {
      paymentItemModal.value.hide();
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

    const updateAppointmentDetail = () => {
      const data = {
        appointment_id: billingData.value.appointment.id,
        procedures_undertaken: proceduresUndertakenList.value,
        extra_items_used: extraItemsList.value,
        admin_items: adminItemsList.value,
      };

      store.dispatch(AppointmentActions.DETAIL.UPDATE, data);
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
      mbsTableHeader,
      handleDeleteItem,
      updatePrice,
      convertToCurrency,
      handleEditItem,
      paymentItemModalData,
      handlePaymentItemModalSubmit,
      handleCloseModal,
      handleAddItem,
    };
  },
});
</script>
