<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Input-->
        <div>
          <select
            class="form-select form-select-solid select2-hidden-accessible"
            v-model="currentClinic"
            @change="handleClinic"
          >
            <option label="All" :value="0">All</option>
            <option
              v-for="clinic in clinicsList"
              :key="clinic.id"
              :label="clinic.name"
              :value="clinic.id"
            >
              {{ clinic.name }}
            </option>
          </select>
        </div>
        <!--end::Input-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-subscription-table-toolbar="base"
        >
          <!--begin::Switch-->
          <label
            class="form-check form-switch form-check-custom form-check-solid"
          >
            <!--begin::Label-->
            <span
              class="form-check-label fw-bold text-muted"
              for="kt_modal_add_customer_billing"
            >
              Show Unpaid Only
            </span>
            <!--end::Label-->

            <!--begin::Input-->
            <input
              class="form-check-input ms-3"
              name="billing"
              type="checkbox"
              value="1"
              id="kt_modal_add_customer_billing"
              checked="checked"
              v-model="showAll"
              @change="handleSwitch"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span
              class="form-check-label fw-bold text-muted"
              for="kt_modal_add_customer_billing"
            >
              Show All
            </span>
            <!--end::Label-->
          </label>
          <!--end::Switch-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-time="{ row: item }">
          {{ item.time }}
        </template>
        <template v-slot:cell-patient_name="{ row: item }">
          {{ item.patient_name }}
        </template>
        <template v-slot:cell-attendance_status="{ row: item }">
          <span
            :class="`text-uppercase badge badge-light-${
              item.attendance_status === 'not_present'
                ? 'dark'
                : item.attendance_status === 'waiting'
                ? 'warning'
                : item.attendance_status === 'checked_in'
                ? 'success'
                : 'primary'
            }`"
          >
            {{ item.attendance_status.replace("_", " ") }}
          </span>
        </template>
        <template v-slot:cell-apt_date="{ row: item }">
          {{ item.apt_date }}
        </template>
        <template v-slot:cell-actions="{ row: item }">
          <button
            v-if="item.outstanding_balance > 0"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            @click="handlePay"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/finance/fin002.svg" />
            </span>
          </button>

          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            @click="handleView"
          >
            <span class="svg-icon svg-icon-3">
              <i class="fas fa-eye"></i>
            </span>
          </button>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import PaymentList from "@/store/dummy/Payments";

export default defineComponent({
  name: "make-payment-main",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "Time",
        key: "time",
        sortable: true,
      },
      {
        name: "Patient Name",
        key: "patient_name",
        sortable: true,
      },
      {
        name: "Attendance Status",
        key: "attendance_status",
        sortable: true,
      },
      {
        name: "Appointment Date",
        key: "apt_date",
        sortable: true,
      },
      {
        name: "Actions",
        key: "actions",
      },
    ]);
    const tableData = ref([]);
    const paymentData = ref(PaymentList);
    const clinicsList = computed(() => store.getters.clinicsList);
    const currentClinic = ref(0);
    const showAll = ref(true);

    const handleSwitch = () => {
      if (!showAll.value) {
        paymentData.value = PaymentList.filter(
          (data) => data.outstanding_balance > 0
        );
      } else {
        paymentData.value = PaymentList;
      }
    };

    const handleClinic = () => {
      if (currentClinic.value === 0) {
        paymentData.value = PaymentList;
      } else {
        paymentData.value = PaymentList.filter(
          (data) => data.clinic_id === currentClinic.value
        );
      }
    };

    const handlePay = (item) => {
      router.push({ name: "make-payment-pay" });
    };

    const handleView = (id) => {
      router.push({ name: "make-payment-view" });
    };

    watchEffect(() => {
      tableData.value = paymentData;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Out of Pocket Payment", ["Billing"]);
      store.dispatch(Actions.CLINICS.LIST);
    });

    return {
      tableHeader,
      tableData,
      clinicsList,
      currentClinic,
      showAll,
      handlePay,
      handleView,
      handleSwitch,
      handleClinic,
    };
  },
});
</script>
