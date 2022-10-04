<template>
  <Datatable
    :table-header="tableHeader"
    :table-data="tableData"
    :rows-per-page="20"
    :enable-items-per-page-dropdown="true"
  >
    <template v-slot:cell-appointment="{ row: item }">
      {{ item.date }}
    </template>

    <template v-slot:cell-actions="{ row: item }">
      <IconButton @click="updateCodes(item)" label="Update Codes" />
    </template>

    <template v-slot:cell-complete="{ row: item }">
      {{ item.codes.is_complete }}
    </template>
  </Datatable>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { CodingActions } from "@/store/enums/StoreCodingEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "coding-dashboard",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();

    const list = computed(() => store.getters.getCodingAptList);
    const tableData = ref([]);
    const tableHeader = ref([
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
      {
        name: "Complete",
        key: "complete",
        sortable: true,
      },
    ]);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Coding");
      store.dispatch(CodingActions.LIST);
    });

    watchEffect(() => {
      tableData.value = list.value;
    });

    const updateCodes = (appointment) => {
      console.log(appointment);
    };

    return {
      tableData,
      tableHeader,
      updateCodes,
    };
  },
});
</script>
