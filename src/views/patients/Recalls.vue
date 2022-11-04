<template>
  <CardSection heading="Recalls">
    <el-select
      class="w-100 mb-6"
      placeholder="Select Confirm State"
      v-model="recallsFilter"
    >
      <el-option value="-1" label="All State"></el-option>
      <template v-for="(state, index) in confirmStateList" :key="index">
        <el-option :value="index" :label="state"></el-option>
      </template>
    </el-select>
    <Datatable
      :table-header="tableHeader"
      :table-data="tableData"
      :loading="loading"
      :rows-per-page="10"
      :emptyTableText="`This patient has no recalls`"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-specialist="{ row: recall }">
        {{ recall.summery.specialist_name }}
      </template>
      <template v-slot:cell-time_frame="{ row: recall }">
        {{ recall.date_recall_due }}
      </template>
      <template v-slot:cell-appointment="{ row: recall }">
        {{ recall.summery.appointment_type }} @
        {{ recall.summery.appointment_clinic }}
        {{ recall.summery.appointment_date }}
      </template>
      <template v-slot:cell-reason="{ row: recall }">
        {{ recall.reason }}
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
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import moment from "moment";
import { useRoute } from "vue-router";
import confirmStateList from "@/core/data/confirm-state";

export default defineComponent({
  name: "patient-recalls-view",

  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Specialist",
        key: "specialist",
        sortable: true,
      },
      {
        name: "Recall Date",
        key: "time_frame",
        sortable: true,
      },
      {
        name: "Related Appointment",
        key: "appointment",
        sortable: true,
      },
      {
        name: "Reason",
        key: "reason",
        sortable: true,
      },
      {
        name: "Status",
        key: "status",
        sortable: true,
      },
    ]);

    let tableData = ref([]);
    let filteredData = ref([]);
    const recalls = computed(() => store.getters.patientsRecallList);
    const patient = computed(() => store.getters.selectedPatient);
    const loading = ref(false);
    const route = useRoute();
    const recallsFilter = ref("-1");

    const applyFilterAndSort = () => {
      if (recallsFilter.value !== "-1") {
        filteredData.value = recalls.value.filter((item) => {
          return item.confirmed === Number(recallsFilter.value);
        });
      } else {
        filteredData.value = recalls.value;
      }
    };

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.RECALL.LIST, { patient_id: id });
      setCurrentPageBreadcrumbs("Recalls", ["Patients"]);
    });

    watch([recallsFilter, recalls], () => {
      applyFilterAndSort();
    });

    watch(filteredData, () => {
      tableData.value = filteredData.value;
    });

    watchEffect(() => {
      // loading.value = false;
      // const id = route.params.id;
      // store.dispatch(PatientActions.VIEW, id);
    });

    return {
      tableHeader,
      tableData,
      loading,
      moment,
      confirmStateList,
      recalls,
      recallsFilter,
    };
  },
});
</script>
