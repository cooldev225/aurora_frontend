<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search -->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            data-kt-subscription-table-filter="search"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search Organizations"
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
        <template v-slot:cell-full_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.first_name }} {{ item.last_name }}
          </span>
          <span class="text-muted fw-bold d-block">{{
            item.phone_number
          }}</span>
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-action="{ row: item }">
          <button
            @click="handleView(item)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/general/gen019.svg" />
            </span>
          </button>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "patients-list",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "Logo",
        key: "logo",
        sortable: true,
        searchable: true,
      },
      {
        name: "Full Name",
        key: "full_name",
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
        name: "Action",
        key: "action",
      },
    ]);
    const tableData = ref([]);
    const list = computed(() => store.getters.patientsList);
    const loading = ref(true);

    const handleView = (item) => {
      store.commit(Mutations.SET_PATIENT.SELECT, item);
      router.push({ name: "patients-view-appointments" });
    };

    watchEffect(() => {
      tableData.value = list;
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Patients", []);
      store.dispatch(Actions.PATIENTS.LIST).then(() => {
        tableData.value = list;
        loading.value = false;
      });
    });

    return { tableHeader, tableData, handleView };
  },
});
</script>
