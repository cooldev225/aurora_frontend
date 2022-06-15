<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            data-kt-subscription-table-filter="search"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search Subscriptions"
          />
        </div>
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
            to="/apps/subscriptions/add-subscription"
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
        :rows-per-page="10"
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
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  name: "admin-main",

  components: {
    Datatable,
  },

  setup() {
    const tableHeader = ref([
      {
        name: "First Name",
        key: "firstname",
        sortable: true,
      },
      {
        name: "Last Name",
        key: "lastname",
        sortable: true,
      },
      {
        name: "Username",
        key: "username",
        sortingField: "status.label",
        sortable: true,
      },
      {
        name: "Email",
        key: "email",
        sortable: true,
      },
      {
        name: "Status",
        key: "status",
        sortingField: "status.label",
        sortable: true,
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
      setCurrentPageTitle("Administrator");
    });

    return { tableHeader, tableData };
  },
});
</script>
