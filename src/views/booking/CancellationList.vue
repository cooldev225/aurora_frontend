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
  name: "cancellation-appointments",

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
        name: "Cancel Reason",
        key: "cancel_reason",
        sortable: true,
      },
    ]);
    const tableData = ref([]);
    const cancellation_Apts = computed(
      () => store.getters.getCancellationAptList
    );

    const loading = ref(true);

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Cancellation List", ["Booking"]);
      store.dispatch(Actions.APT.CANCELLATION.LIST).then(() => {
        tableData.value = cancellation_Apts;
        loading.value = false;
      });
    });

    watchEffect(() => {
      tableData.value = cancellation_Apts;
      loading.value = false;
    });
    return { tableHeader, tableData };
  },
});
</script>
