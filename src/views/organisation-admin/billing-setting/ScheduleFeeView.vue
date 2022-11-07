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
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
      >
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
import { useRoute } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import RoomModal from "@/components/clinics/EditRoom.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "clinics-room",

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
    const route = useRoute();
    let clinic = ref({
      id: -1,
      name: "",
    });
    const tableHeader = ref(null);
    const tableData = ref([
      {
        id: 1,
        mbs_code: "mbs",
        CHF: 1200,
      },
      {
        id: 2,
        mbs_code: "mbs",
        CHF: 1200,
      },
    ]);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const scheduleFeeList = computed(() => store.getters.getScheduleFeeList);

    const deleteAfterConfirmation = (item) => {
      const html =
        '<p class="fs-2">Please type <b>' +
        item.name +
        "</b> to confirm deletion</p><br/>";

      Swal.fire({
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          placeholder: "Room Name",
        },
        html: html,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async (data) => {
          if (data.toLowerCase() == item.name.toLowerCase()) {
            return "success";
          }

          return false;
        },
      }).then((result) => {
        if (result.value == "success") {
          store
            .dispatch(Actions.CLINICS.ROOMS.DELETE, item)
            .then(() => {
              Swal.fire({
                text: "Successfully Deleted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                store.dispatch(Actions.CLINICS.LIST);
                store.dispatch(Actions.CLINICS.ROOMS.LIST, clinic.value.id);
              });
            })
            .catch(({ response }) => {
              console.log(response.data.error);
            });
        }
      });
    };

    const handleDelete = (item) => {
      deleteAfterConfirmation(item);
    };

    const handleRoomEdit = (item) => {
      console.log(["handleRoomEdit=", item]);
      store.commit(Mutations.SET_CLINICS.SELECTROOMS, item);
      const modal = new Modal(
        document.getElementById("modal_edit_clinic_room")
      );
      modal.show();
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Schedule Fees", ["Settings"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.SCHEDULE_FEE.LIST);
    });

    watch(healthFundsList, () => {
      tableHeader.value = [];
      healthFundsList.value.map((h) => {
        h.key = h.code;
        h.sortable = true;
        tableHeader.value.push(h);
      });
    });

    watch(scheduleFeeList, () => {
      tableData.value = [];
      let keys = new Set(
        scheduleFeeList.value.map((item) => item.mbs_item_code)
      );
      Array.from(keys).map((mbs) => {
        tableData.value.push({
          mbs_item_code: mbs,
        });
      });
    });

    return {
      tableHeader,
      tableData,
      handleDelete,
      handleRoomEdit,
      clinic,
    };
  },
});
</script>
