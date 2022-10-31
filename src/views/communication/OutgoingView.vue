<template>
  <CardSection>
    <Datatable
      :table-header="tableHeader"
      :table-data="tableData"
      :loading="loading"
      :rows-per-page="10"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-created_at="{ row: item }">
        {{ moment(item.created_at).format("DD/MM/YYYY HH:mm").toString() }}
      </template>
      <template v-slot:cell-sending_doctor_name="{ row: item }">
        {{ item.sending_doctor_name + ", " + item.sending_doctor_provider }}
      </template>
      <template v-slot:cell-receiving_doctor_name="{ row: item }">
        {{ item.receiving_doctor_name + ", " + item.receiving_doctor_provider }}
      </template>
      <template v-slot:cell-send_method="{ row: item }">
        {{ item.send_method + ", " + item.send_status }}
      </template>
      <template v-slot:cell-patient_id="{ row: item }">
        {{
          item.patient.full_name +
          " (" +
          moment(item.patient.date_of_birth).format("DD/MM/YYYY").toString() +
          ")"
        }}
      </template>
      <template v-slot:cell-actions="{ row: item }">
        <button
          @click="handleView(item)"
          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
        >
          <span class="svg-icon svg-icon-3">
            <i class="fas fa-eye"></i>
          </span>
        </button>
      </template>
    </Datatable>
  </CardSection>
  <OutgoingModal />
</template>

<script>
import {
  defineComponent,
  onMounted,
  watchEffect,
  watch,
  computed,
  ref,
} from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import OutgoingModal from "@/views/communication/OutgoingModal.vue";

export default defineComponent({
  name: "communication-outgoing",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const tableData = ref([]);
    const outgoingLogs = computed(() => store.getters.getOutgoingList);
    const loading = ref(false);
    const tableHeader = ref([
      {
        name: "Date/Time",
        key: "created_at",
        sortable: true,
      },
      {
        name: "Sending Doctor",
        key: "sending_doctor_name",
        sortable: true,
      },
      {
        name: "Receiving doctor",
        key: "receiving_doctor_name",
        sortable: true,
      },
      {
        name: "Status",
        key: "send_method",
        sortable: true,
      },
      {
        name: "Patient",
        key: "patient_id",
        sortable: true,
      },
      {
        name: "Actions",
        key: "actions",
      },
    ]);

    watchEffect(() => {
      console.log(["watchEffect", outgoingLogs.value]);
      tableData.value = outgoingLogs;
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Outgoing Log", ["Communication"]);
      store.dispatch(Actions.OUTGOING.LIST).then(() => {
        loading.value = false;
      });
    });

    const handleView = (item) => {
      //
    };

    return {
      tableData,
      tableHeader,
      loading,
      handleView,
      moment,
    };
  },
});
</script>
