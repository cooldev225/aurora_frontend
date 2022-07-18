<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Appointment List</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <Datatable
        v-if="tableData"
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-reference_number="{ row: item }">
          {{ item.reference_number }}
        </template>
        <template v-slot:cell-date="{ row: item }">
          {{ item.date }} {{ item.start_time }}
        </template>
        <template v-slot:cell-specialist="{ row: item }">
          {{ item.specialist_name }}
        </template>
        <template v-slot:cell-clinic="{ row: item }">
          {{ item.clinic_name }}
        </template>
        <template v-slot:cell-appointment_type="{ row: item }">
          {{ item.appointment_type_name }}
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
        <template v-slot:cell-payment>
          <button
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
        <template v-slot:cell-report>
          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/finance/fin002.svg" />
            </span>
          </button>

          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <span class="svg-icon svg-icon-3">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "patient-appointments",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = ref();
    const tableHeader = ref([
      {
        name: "Service Ref Number",
        key: "reference_number",
        sortable: true,
      },
      {
        name: "Date / Time",
        key: "date",
        sortable: true,
      },
      {
        name: "Specialist",
        key: "specialist",
        sortable: false,
      },
      {
        name: "Clinic",
        key: "clinic",
        sortable: false,
      },
      {
        name: "Appointment Type",
        key: "appointment_type",
        sortable: false,
      },
      {
        name: "Attendance Status",
        key: "attendance_status",
        sortable: false,
      },
      {
        name: "Payment",
        key: "payment",
        sortable: false,
      },
      {
        name: "Report",
        key: "report",
        sortable: false,
      },
    ]);
    const tableData = ref([]);

    const handlePay = () => {
      router.push({ name: "make-payment-pay" });
    };

    const handleView = () => {
      router.push({ name: "make-payment-view" });
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
      tableData.value = formData.value.appointments;
      console.log(tableData.value);
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
    });

    return {
      tableHeader,
      tableData,
      formData,
      handlePay,
      handleView,
    };
  },
});
</script>
