<template>
  <div class="card w-xxl-75 m-auto">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex-reverse justify-content-end"
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
              Show Unassessed Only
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
        :key="tableKey"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-time="{ row: item }">
          {{ item.start_time }}
        </template>
        <template v-slot:cell-patient_name="{ row: item }">
          {{ item.patient_name }}
        </template>
        <template v-slot:cell-approval_status="{ row: item }">
          <span
            :class="`text-uppercase badge badge-light-${
              item.procedure_approval_status === 'NOT_ACCESSED'
                ? 'warning'
                : item.procedure_approval_status === 'NOT_APPROVED'
                ? 'danger'
                : item.procedure_approval_status === 'APPROVED'
                ? 'success'
                : 'primary'
            }`"
          >
            {{ item.attendance_status.replace("_", " ") }}
          </span>
        </template>
        <template v-slot:cell-date="{ row: item }">
          {{ item.date }}
        </template>
        <template v-slot:cell-actions="{ row: item }">
          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            @click="handleView(item)"
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
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "procedure-approvals",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Appointment Date",
        key: "date",
        sortable: true,
      },
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
        name: "Approval Status",
        key: "approval_status",
        sortable: true,
      },

      {
        name: "Actions",
        key: "actions",
      },
    ]);
    const tableData = ref([]);
    const list = computed(() => store.getters.anesthetistAppointmentList);
    const showAll = ref(true);
    const tableKey = ref(0);

    const renderTable = () => tableKey.value++;

    const handleView = () => {
      // Show modal
    };

    watch(list, () => {
      renderTable();
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Procedure Approvals", [
        "Anesthetist Dashboard",
      ]);
    });

    return {
      tableHeader,
      tableData,
      tableKey,
      showAll,
      handleView,
    };
  },
});
</script>
