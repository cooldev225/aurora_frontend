<template>
  <div class="card mx-auto mb-3">
    <!--end::Alert-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">Unconfirmed Appointments</div>

      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
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
          {{ item.patient_first_name }} {{ item.patient_last_name }} ({{
            item.contact_number
          }})
        </template>
        <template v-slot:cell-specialist="{ row: item }">
          {{ item.specialist_name }}
        </template>
        <template v-slot:cell-appointment="{ row: item }">
          {{ item.appointment_type_name }}
        </template>
        <template v-slot:cell-action="{ row: item }">
          <button
            @click="removeFromWaitlist(item)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            Remove From Waitlist
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

      console.log(tableData.value);
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
