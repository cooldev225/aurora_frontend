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
import { defineComponent, onMounted, computed, ref } from "vue";
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
        name: "Date",
        key: "date",
        sortable: true,
      },
    ]);

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
