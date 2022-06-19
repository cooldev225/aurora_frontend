<template>
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        svg-icon="media/icons/duotune/graphs/gra005.svg"
        color="success"
        icon-color="white"
        :title="'Total : ' + tableData.length + ' Members'"
        description="Total Organization"
      />
    </div>

    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        svg-icon="media/icons/duotune/ecommerce/ecm002.svg"
        color="danger"
        icon-color="white"
        title="Shopping Cart"
        description="Lands, Houses, Ranchos, Farms"
      />
    </div>

    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        svg-icon="media/icons/duotune/ecommerce/ecm008.svg"
        color="primary"
        icon-color="white"
        title="Appartments"
        description="Flats, Shared Rooms, Duplex"
      />
    </div>
  </div>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <span>Specialist Type</span>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          class="d-flex justify-content-end"
          data-kt-subscription-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_subscriptions_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            Export
          </button>
          <!--end::Export-->

          <!--begin::Add subscription-->
          <button
            type="button"
            class="btn btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-create-spectype"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add
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
        :key="tableKey"
      >
        <template v-slot:cell-name="{ row: item }">
          {{ item.name }}
        </template>
        <template v-slot:cell-action="{ row: item }">
          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen019.svg" />
            </span>
          </button>

          <button
            @click="handleEdit(item.id)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/art/art005.svg" />
            </span>
          </button>

          <button
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen027.svg" />
            </span>
          </button>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateModal></CreateModal>
  <EditModal :dataId="selectedId"></EditModal>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { ISpecialistType } from "@/core/data/types";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import StatsisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import CreateModal from "@/components/specialist-type/CreateSpecialistType.vue";
import EditModal from "@/components/specialist-type/EditSpecialistType.vue";
import { Modal } from "bootstrap";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "organization-main",

  components: {
    Datatable,
    CreateModal,
    EditModal,
    StatsisticsWidget5,
  },

  setup() {
    const tableHeader = ref([
      {
        name: "Type Name",
        key: "name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);
    const tableData = ref([]);
    const tableKey = ref(0);

    function renderTable() {
      tableKey.value++;
    }
    const selectedId = ref("1");
    const handleEdit = (id) => {
      // console.log(id);
      selectedId.value = id;
      const modal = new Modal(document.getElementById("modal-edit-spectype"));
      modal.show();
    };
    onMounted(() => {
      setCurrentPageTitle("Specialist Types");
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("specialist-types")
          .then(({ data }) => {
            let token = JSON.parse(JSON.stringify(data.data));
            tableData.value = [...token];
            renderTable();
          })
          .catch(({ response }) => {
            console.log(response.data.error);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    });
    return { tableHeader, tableData, tableKey, handleEdit };
  },
});
</script>
