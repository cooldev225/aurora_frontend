<template>
  <CardSection>
    <Datatable
      :table-header="tableHeader"
      :table-data="outgoingLogs"
      :loading="loading"
      :rows-per-page="10"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-created_at="{ row: item }">
        {{ moment(item.created_at).format("DD/MM/YYYY HH:mm").toString() }}
      </template>
      <template v-slot:cell-sending_user_name="{ row: item }">
        {{ item.sending_user_name }}
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
        {{ item.patient.title }} {{ item.patient.first_name }}
        {{ item.patient.last_name }} ({{
          moment(item.patient.date_of_birth).format("DD/MM/YYYY").toString()
        }})
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

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import OutgoingModal from "@/views/communication/OutgoingModal.vue";
import { Modal } from "bootstrap";
import IOutgoingMessageLog from "@/store/interfaces/IOutgoingMessageLog";

export default defineComponent({
  name: "communication-outgoing",
  components: {
    Datatable,
    OutgoingModal,
  },
  setup() {
    const store = useStore();
    const outgoingLogs = computed<IOutgoingMessageLog[]>(
      () => store.getters.getOutgoingList
    );
    const loading = ref(false);
    const tableHeader = ref([
      {
        name: "Date/Time",
        key: "created_at",
        sortable: true,
      },
      {
        name: "Sent By",
        key: "sending_user_name",
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

    onMounted(() => {
      setCurrentPageBreadcrumbs("Outgoing logs", ["Communication"]);
      loading.value = true;
      store.dispatch(Actions.OUTGOING.LIST).then(() => {
        loading.value = false;
      });
    });

    const handleView = (item) => {
      store.commit(Mutations.SET_OUTGOING.SELECT, item);
      const modal = new Modal(document.getElementById("modal_outgoing"));
      modal.show();
    };

    return {
      outgoingLogs,
      tableHeader,
      loading,
      handleView,
      moment,
    };
  },
});
</script>
