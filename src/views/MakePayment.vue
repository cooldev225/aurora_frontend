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
            placeholder="Search Organisations"
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
          <router-link to="/organizations/create" class="btn btn-primary">
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
        :loading="loading"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-logo="{ row: item }">
          <div class="symbol symbol-45px me-2">
            <span class="symbol-label">
              <img :src="item.logo" class="h-50 align-self-center" />
            </span>
          </div>
        </template>
        <template v-slot:cell-name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">{{
            item.username
          }}</span>
          <span class="text-muted fw-bold d-block">{{
            item.mobile_number
          }}</span>
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-clinics="{ row: item }">
          <span class="badge badge-light-success">{{ item.max_clinics }}</span>
        </template>
        <template v-slot:cell-users="{ row: item }">
          <span class="badge badge-light-danger">{{ item.max_employees }}</span>
        </template>
        <template v-slot:cell-action="{ row: item }">
          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen019.svg" />
            </span>
          </a>

          <button
            @click="handleEdit(item)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/art/art005.svg" />
            </span>
          </button>

          <button
            @click="handleDelete(item.id)"
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
  <EditModal></EditModal>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "org-main",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "Time",
        key: "time",
        sortable: true,
      },
      {
        name: "Patient Name",
        key: "patient_name",
        sortable: true,
      },
      {
        name: "Attendance Status",
        key: "attendance_status",
        sortable: true,
        sortingField: "status.label",
      },
      {
        name: "Appointment Date",
        key: "apt-date",
        sortable: true,
      },
      {
        name: "Actions",
        key: "actions",
      },
    ]);
    const tableData = ref([]);
    const orgList = computed(() => store.getters.orgList);
    const loading = ref(true);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_MAKE_PAYMENT.SELECT, item);
      router.push({ name: "editOrganization" });
    };

    const handleDelete = (id) => {
      loading.value = true;
      store
        .dispatch(Actions.MAKE_PAYMENT.DELETE, id)
        .then(() => {
          store.dispatch(Actions.MAKE_PAYMENT.LIST);
          loading.value = false;
          Swal.fire({
            text: "Successfully Deleted!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };

    watchEffect(() => {
      tableData.value = orgList;
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Make Paymenet", ["Billing"]);
      store.dispatch(Actions.MAKE_PAYMENT.LIST).then(() => {
        tableData.value = orgList;
        loading.value = false;
      });
    });

    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
