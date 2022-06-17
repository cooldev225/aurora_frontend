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
        <span>Health Fund</span>
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
          <router-link
            to="/organizations/addorganization"
            class="btn btn-primary"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add
          </router-link>
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
        <template v-slot:cell-fundCode="{ row: fund }">
          {{ fund.fundCode }}
        </template>
        <template v-slot:cell-fundName="{ row: fund }">
          {{ fund.fundName }}
        </template>
        <template v-slot:cell-onlineSubmission="{ row: fund }">
          {{ fund.onlineSubmission }}
        </template>
        <template v-slot:cell-status="{ row: fund }">
          <span :class="`badge badge-light-${fund.status.state}`">{{
            fund.status.label
          }}</span>
        </template>
        <template v-slot:cell-lastUpdate="{ row: fund }">
          {{ fund.lastUpdate }}
        </template>
        <template v-slot:cell-action>
          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen019.svg" />
            </span>
          </a>

          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/art/art005.svg" />
            </span>
          </a>

          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen027.svg" />
            </span>
          </a>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import StatsisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

export default defineComponent({
  name: "organization-main",

  components: {
    Datatable,
    StatsisticsWidget5,
  },

  setup() {
    const tableHeader = ref([
      {
        name: "Fund Code",
        key: "fundCode",
        sortable: true,
        searchable: true,
      },
      {
        name: "Fund Name",
        key: "fundName",
        sortable: true,
        searchable: true,
      },
      {
        name: "Online Submission To Eclipse",
        key: "onlineSubmission",
        sortable: true,
        searchable: true,
      },
      {
        name: "Status",
        key: "status",
        sortingField: "status.label",
        sortable: true,
        searchable: true,
      },
      {
        name: "Last Updated On",
        key: "lastUpdate",
        sortable: true,
        searchable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);

    const tableData = ref([
      {
        fundCode: "ACA",
        fundName: "ACA Health Benefits Fund",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "AHM",
        fundName: "AHM Health Insurance",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "ACA",
        fundName: "ACA Health Benefits Fund",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "AHM",
        fundName: "AHM Health Insurance",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "ACA",
        fundName: "ACA Health Benefits Fund",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "AHM",
        fundName: "AHM Health Insurance",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "ACA",
        fundName: "ACA Health Benefits Fund",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
      {
        fundCode: "AHM",
        fundName: "AHM Health Insurance",
        onlineSubmission: "Yes",
        status: {
          label: "Enabled",
          state: "success",
        },
        lastUpdate: "N/A",
      },
    ]);

    onMounted(() => {
      setCurrentPageTitle("Health Fund");
    });

    return { tableHeader, tableData };
  },
});
</script>
