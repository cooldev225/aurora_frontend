<template>
  <CardSection>
    <div class="d-flex flex-row-reverse">
      <div class="form-check form-switch form-check-custom form-check-solid">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexSwitchChecked"
          checked="checked"
        />
        <label class="form-check-label" for="flexSwitchChecked">
          Show Complete
        </label>
      </div>
    </div>

    <Datatable
      :table-header="tableHeader"
      :table-data="tableData"
      :rows-per-page="20"
      :loading="loading"
      :enable-items-per-page-dropdown="true"
    >
      <template v-slot:cell-complete="{ row: item }">
        {{ item.codes.is_complete }}
      </template>
    </Datatable>
    <CodingModal></CodingModal>
  </CardSection>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import CodingModal from "@/views/coding/codingModal.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "coding-reports",
  components: {
    Datatable,
    CodingModal,
  },
  setup() {
    const store = useStore();

    const tableData = ref([]);
    const aptList = computed(() => store.getters.getCodingAptList);
    const loading = ref(true);
    const tableHeader = ref([
      {
        name: "Appointment",
        key: "appointment",
        sortable: true,
      },
    ]);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Coding");
      store.dispatch(CodingActions.LIST);
    });

    watchEffect(() => {
      tableData.value = aptList;
      loading.value = false;
    });

    return {
      tableData,
      tableHeader,
      loading,
    };
  },
});
</script>
