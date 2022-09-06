<template>
  <div class="card mx-auto mb-3">
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :loading="loading"
        :rows-per-page="10"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-appointment_details="{ row: item }">
          {{ item.date }} {{ item.time }}
        </template>
        <template v-slot:cell-patient="{ row: item }">
          {{ item.patient_name.full }} ({{
            item.patient_details.contact_number
          }})
        </template>
        <template v-slot:cell-specialist="{ row: item }">
          {{ item.specialist_name }}
        </template>
        <template v-slot:cell-appointment="{ row: item }">
          {{ item.appointment_type.name }}
        </template>
        <template v-slot:cell-cancel_reason="{ row: item }">
          {{ item.confirmation_status_reason }}
        </template>
        <template v-slot:cell-actions="">
          <button class="btn btn-bg-light btn-active-color-primary btn-sm me-1">
            CONFIRM
          </button>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "admin-main",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Appointment Details",
        key: "appointment_details",
        sortable: true,
      },
      {
        name: "Patient",
        key: "patient",
        sortable: true,
      },
      {
        name: "Specialist",
        key: "specialist",
        sortable: true,
      },
      {
        name: "Appointment",
        key: "appointment",
        sortable: true,
      },
      {
        name: "Actions",
        key: "actions",
        sortable: true,
      },
    ]);
    const tableData = ref([]);
    const unConfirmed_Apts = computed(
      () => store.getters.getUnconfirmedAptList
    );
    const loading = ref(true);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Unconfirmed Appointments", ["Booking"]);
      store.dispatch(Actions.APT.UNCONFIRMED.LIST).then(() => {
        tableData.value = unConfirmed_Apts;
        loading.value = false;
      });
    });

    watchEffect(() => {
      tableData.value = unConfirmed_Apts;
      loading.value = false;
    });
    return {
      tableHeader,
      tableData,
    };
  },
});
</script>
