<template>
  <div class="card w-75 m-auto">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">Schedule Fees</div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-subscription-table-toolbar="base"
        >
          <!--begin::Add subscription-->
          <button
            type="button"
            class="btn btn-light-primary ms-auto"
            @click="handleCreate"
          >
            <span class="svg-icon svg-icon-2">
              <InlineSVG icon="plus" />
            </span>
            New MBS Item
          </button>
          <!--end::Add subscription-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :loading="loading"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-mbscode="{ row: item }">
          {{ item.mbs_item_code }}
        </template>
        <template
          v-bind:key="column.key"
          v-for="column in tableHeader"
          v-slot:[cellName(column.key)]="{ row: item }"
        >
          <span
            @click="handleEdit(item.id, column.key)"
            style="cursor: pointer"
          >
            {{ item[column.key] }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>
  <RoomModal></RoomModal>
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
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import RoomModal from "@/components/clinics/EditRoom.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "schedule-fee",

  components: {
    Datatable,
    RoomModal,
  },
  methods: {
    cellName(name) {
      return "cell-" + name;
    },
  },
  setup() {
    const store = useStore();
    const tableHeader = ref(null);
    const tableData = ref([]);
    const filterData = ref([]);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const scheduleFeeList = computed(() => store.getters.getScheduleFeeList);
    const loading = ref(false);

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Schedule Fees", ["Settings"]);
      store.dispatch(Actions.HEALTH_FUND.LIST).then(() => {
        store.dispatch(Actions.SCHEDULE_FEE.LIST).then(() => {
          loading.value = false;
        });
      });
    });

    watch(healthFundsList, () => {
      let list = [
        {
          code: "mbscode",
          key: "mbscode",
          name: "MBS Item",
          sortable: true,
        },
      ];
      healthFundsList.value.map((h) => {
        h.key = h.code;
        h.sortable = true;
        list.push(h);
      });
      tableHeader.value = list;
    });

    watch(scheduleFeeList, () => {
      loading.value = true;
      let keys = new Set(
        scheduleFeeList.value.map((item) => item.mbs_item_code)
      );
      Array.from(keys).map((mbs) => {
        let row = {
          mbscode: mbs,
          //is_base_amount:
        };
        let cols = scheduleFeeList.value.filter(
          (sch) => sch.mbs_item_code === mbs
        );
        if (cols.length) {
          cols.map((col) => {
            row[col.health_fund_code] = col.amount;
          });
        }
        filterData.value.push(row);
      });
      tableData.value = filterData;
      loading.value = false;
    });

    watchEffect(() => {
      tableData.value = filterData;
    });

    const handleCreate = () => {
      let item = {};
      store.commit(Mutations.SET_SCHEDULE_FEE.SELECT, item);
      const modal = new Modal(document.getElementById("modal_schedule_fee"));
      modal.show();
    };

    const handleEdit = (item) => {
      store.commit(Mutations.SET_SCHEDULE_FEE.SELECT, item);
      const modal = new Modal(document.getElementById("modal_schedule_fee"));
      modal.show();
    };

    return {
      tableHeader,
      tableData,
      loading,
      handleCreate,
      handleEdit,
    };
  },
});
</script>
