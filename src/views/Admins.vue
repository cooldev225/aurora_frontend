<template>
  <div class="row g-5 g-xl-8">
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

    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        svg-icon="media/icons/duotune/graphs/gra005.svg"
        color="success"
        icon-color="white"
        title="Sales Stats"
        description="50% Increased for FY20"
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
  </div>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <span>Administrators</span>
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
            data-bs-target="#modal_add_admin"
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
      >
        <template v-slot:cell-firstname="{ row: admin }">
          {{ admin.firstname }}
        </template>
        <template v-slot:cell-lastname="{ row: admin }">
          {{ admin.lastname }}
        </template>
        <template v-slot:cell-username="{ row: admin }">
          {{ admin.username }}
        </template>
        <template v-slot:cell-email="{ row: admin }">
          {{ admin.email }}
        </template>
        <template v-slot:cell-status="{ row: admin }">
          <span :class="`badge badge-light-${admin.status.state}`">{{
            admin.status.label
          }}</span>
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
  <AddAdminModal></AddAdminModal>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import AddAdminModal from "@/components/modals/forms/AddAdminModal.vue";
import StatsisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

export default defineComponent({
  name: "admin-main",

  components: {
    Datatable,
    AddAdminModal,
    StatsisticsWidget5,
  },

  setup() {
    const tableHeader = ref([
      {
        name: "First Name",
        key: "firstname",
        sortable: true,
        searchable: true,
      },
      {
        name: "Last Name",
        key: "lastname",
        sortable: true,
        searchable: true,
      },
      {
        name: "Username",
        key: "username",
        sortingField: "status.label",
        sortable: true,
        searchable: true,
      },
      {
        name: "Email",
        key: "email",
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
        name: "Action",
        key: "action",
      },
    ]);

    const tableData = ref([
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        firstname: "PAUL",
        lastname: "SMITH",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        firstname: "KEVIN",
        lastname: "ALIX",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
    ]);
    onMounted(() => {
      setCurrentPageTitle("Administrators");
    });

    return { tableHeader, tableData };
  },
});
</script>
