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
            @click="handleAddMbsItem"
          >
            <span class="svg-icon svg-icon-2">
              <InlineSVG icon="plus" />
            </span>
            Add MBS Item
          </button>

          <button
            type="button"
            class="btn btn-light-primary ms-4"
            @click="handleAddCustomItem"
          >
            <span class="svg-icon svg-icon-2">
              <InlineSVG icon="plus" />
            </span>
            Add Custom Item
          </button>
          <!--end::Add subscription-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        v-if="healthFundsList.length > 0"
        :table-header="tableHeader"
        :table-data="tableData"
        :loading="loading"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
        :key="`schedule-fee-table-${tableKey}`"
      >
        <template
          v-bind:key="column.key"
          v-for="column in tableHeader"
          v-slot:[cellName(column.key)]="{ row: item }"
        >
          <div
            v-if="column.key == 'mbs_item_code'"
            class="d-flex justify-content-between"
          >
            <span
              @click="handleEditItem(item)"
              style="cursor: pointer; font-weight: bold"
            >
              {{ item?.mbs_item_code ?? item?.internal_code ?? item.name }}
            </span>
            <span
              class="svg-icon svg-icon-3 me-3"
              @click="handleDelete(item.mbs_item_code)"
              style="cursor: pointer"
            >
              <InlineSVG icon="bin" />
            </span>
          </div>
          <span
            v-if="column.key != 'mbs_item_code'"
            @click="
              handleEdit(item.mbs_item_code, column.key, item[column.key])
            "
            style="cursor: pointer"
          >
            {{
              convertToCurrency(
                item[column.key] == null ? item.amount : item[column.key]
              )
            }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>

  <ScheduleFeeModal></ScheduleFeeModal>
  <ScheduleItemModal :item="selectedItem" />
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
import ScheduleFeeModal from "@/views/organisation-admin/billing-setting/ScheduleFeeModal.vue";
import ScheduleItemModal from "@/views/organisation-admin/billing-setting/ScheduleItemModal.vue";
import { convertToCurrency } from "@/core/data/billing";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "schedule-fee",

  components: {
    Datatable,
    ScheduleFeeModal,
    ScheduleItemModal,
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

    const selectedItem = ref();
    const scheduleItemModal = ref();
    const scheduleFeeModal = ref();

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const scheduleItemList = computed(() => store.getters.scheduleItemList);
    const loading = ref(false);
    const tableKey = ref(1);

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Schedule Fees", ["Settings"]);
      store.dispatch(Actions.HEALTH_FUND.LIST).then(() => {
        store.dispatch(Actions.SCHEDULE_ITEM.LIST).then(() => {
          store.dispatch(Actions.MBS.LIST).then(() => {
            loading.value = false;
          });
        });
      });
    });

    watch(healthFundsList, () => {
      let list = [
        {
          code: "mbs_item_code",
          key: "mbs_item_code",
          name: "Item",
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

    watch(scheduleItemList, () => {
      loading.value = true;
      filterData.value = [];

      scheduleItemList.value.map((item) => {
        let row = {
          ...item,
        };
        let cols = item.schedule_fees;
        if (cols.length) {
          cols.map((col) => {
            row[col.health_fund_code] = col.amount;
          });
        }
        filterData.value.push(row);
      });
      tableData.value = filterData.value;
      loading.value = false;
      tableKey.value++;
    });

    watchEffect(() => {
      tableData.value = filterData.value;
    });

    const handleAddMbsItem = () => {
      selectedItem.value = {
        name: "",
        description: "",
        amount: 0,
        mbs_item_code: "",
        type: "mbs",
        mode: "add",
      };

      if (!scheduleItemModal.value) {
        scheduleItemModal.value = new Modal(
          document.getElementById("modal_schedule_item")
        );
      }
      scheduleItemModal.value.show();
    };

    const handleAddCustomItem = () => {
      selectedItem.value = {
        name: "",
        description: "",
        amount: 0,
        internal_code: "",
        type: "custom",
        mode: "add",
      };

      if (!scheduleItemModal.value) {
        scheduleItemModal.value = new Modal(
          document.getElementById("modal_schedule_item")
        );
      }
      scheduleItemModal.value.show();
    };

    const handleEditItem = (item) => {
      selectedItem.value = { ...item };

      if (!scheduleItemModal.value) {
        scheduleItemModal.value = new Modal(
          document.getElementById("modal_schedule_item")
        );
      }
      scheduleItemModal.value.show();
    };

    const handleCloseScheduleItemModal = () => {
      scheduleItemModal.value.hide();
      selectedItem.value = null;
    };

    const handleEdit = (mbs_item_code, health_fund_code, amount) => {
      let item = {
        _title: "Update Schedule Fee",
        _button: "Update",
        mbs_item_code: mbs_item_code,
        health_fund_code: health_fund_code,
        is_base_amount:
          mbs_item_code == "mbs_item_code" && health_fund_code == "NA" ? 1 : 0,
        amount: amount,
      };
      store.commit(Mutations.SET_SCHEDULE_FEE.SELECT, item);
      const modal = new Modal(document.getElementById("modal_schedule_fee"));
      modal.show();
    };

    const handleDelete = (mbs_item_code) => {
      loading.value = true;

      const html =
        "<h3>Are you sure you want to remove this item? All custom fees will be lost.</h3><br/><p>MBS Item Code: <span style='font-weight: bold;'>" +
        mbs_item_code +
        "</span></p>";

      Swal.fire({
        html: html,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async () => {
          store
            .dispatch(Actions.SCHEDULE_FEE.DELETE, mbs_item_code)
            .then(() => {
              store.dispatch(Actions.SCHEDULE_FEE.LIST);
            });
          loading.value = false;
          return true;
        },
      });
    };

    return {
      tableHeader,
      tableData,
      loading,
      handleAddMbsItem,
      handleAddCustomItem,
      handleCloseScheduleItemModal,
      handleEdit,
      handleEditItem,
      handleDelete,
      selectedItem,
      healthFundsList,
      tableKey,
      convertToCurrency,
    };
  },
});
</script>
