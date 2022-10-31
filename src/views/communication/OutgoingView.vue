<template>
  <CardSection>
    <Datatable
      :table-header="tableHeader"
      :table-data="outgoingLogs"
      :loading="loading"
      :rows-per-page="10"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-appointment_details="{ row: item }">
        {{ item.date }}
      </template>
    </Datatable>
  </CardSection>
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
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "communication-outgoing",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
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
        name: "Date/Time",
        key: "created_at",
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
    });

    watch(outgoingLogs, () => {
      console.log(["watch", outgoingLogs.value]);
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Outgoing Log", ["Communication"]);
      store.dispatch(Actions.OUTGOING.LIST).then(() => {
        loading.value = false;
      });
    });

    return {
      outgoingLogs,
      tableHeader,
      loading,
    };
  },
});
</script>
