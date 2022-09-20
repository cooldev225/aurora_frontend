<template>
  <CardSection>
    <Datatable
      :table-header="tableHeader"
      :table-data="tableData"
      :loading="loading"
      :rows-per-page="10"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-patient="{ row: recall }">
        {{ recall.summery.patient_name }} ({{
          recall.summery.patient_contact_number
        }})
      </template>
      <template v-slot:cell-specialist="{ row: recall }">
        {{ recall.summery.specialist_name }}
      </template>
      <template v-slot:cell-time_frame="{ row: recall }">
        {{ recall.date_recall_due }}
      </template>
      <template v-slot:cell-status="{ row: recall }">
        <div class="d-flex flex-column">
          <span v-for="log in recall.sent_logs" :key="log.id"
            >Sent via {{ log.sent_by }} @
            {{ moment(log.created_at).format("DD/M/YY") }}
          </span>
        </div>
      </template>
    </Datatable>
  </CardSection>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import moment from "moment";

export default defineComponent({
  name: "patient-recalls",

  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const tableHeader = ref([
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
        name: "Time Frame",
        key: "time_frame",
        sortable: true,
      },
      {
        name: "Status",
        key: "status",
        sortable: true,
      },
    ]);

    const tableData = ref([]);
    const recalls = computed(() => store.getters.patientsRecallList);
    const loading = ref(false);

    onMounted(() => {
      store.dispatch(PatientActions.RECALL.LIST);

      setCurrentPageBreadcrumbs("Patient Recalls");
    });

    watchEffect(() => {
      tableData.value = recalls;
      loading.value = false;
    });

    return {
      tableHeader,
      tableData,
      loading,
      moment,
    };
  },
});
</script>
