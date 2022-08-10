<template>
  <div class="card w-75 mx-auto">
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
            v-model="filterAndSort.searchText"
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
          <!--begin::Add subscription-->
          <router-link to="/organisations/create" class="btn btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add New Organisation
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
        <template v-slot:cell-name="{ row: item }">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-50px me-2">
              <img :src="item.logo" class="h-50 align-self-center" />
            </div>
            <span class="text-dark fw-bolder text-hover-primary m-2 fs-3">
              {{ item.name }}
            </span>
          </div>
        </template>
        <template v-slot:cell-contact="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">{{
            item.username
          }}</span>
          <span class="text-muted fw-bold d-block">{{
            item.mobile_number
          }}</span>
          <span class="text-muted fw-bold d-block">{{ item.email }}</span>
        </template>
        <template v-slot:cell-stats="{ row: item }">
          <div class="d-flex flex-column">
            <div class="mb-2">
              <i class="bi bi-person-fill fs-1x"></i>
              <span class=""> 0 / {{ item.max_clinics }}</span>
            </div>
            <div>
              <i class="bi bi-building fs-1x"></i>
              <span class=""> 0 / {{ item.max_employees }}</span>
            </div>
          </div>
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
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watchEffect,
  watch,
  reactive,
} from "vue";
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
        name: "Organisation Name",
        key: "name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Contact",
        key: "contact",
        sortable: true,
        searchable: true,
      },
      {
        name: "Stats",
        key: "stats",
        sortable: false,
        searchable: false,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);

    const filterAndSort = reactive({
      searchText: "",
    });

    const tableData = ref([]);
    const filteredData = ref([]);
    const orgList = computed(() => store.getters.orgList);
    const loading = ref(true);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_ORG.SELECT, item);
      router.push({ name: "editOrganisation" });
    };

    const handleDelete = (id) => {
      loading.value = true;
      store
        .dispatch(Actions.ORG.DELETE, id)
        .then(() => {
          store.dispatch(Actions.ORG.LIST);
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

    const applyFilterAndSort = () => {
      if (filterAndSort.searchText != "") {
        filteredData.value = orgList.value.filter((org) => {
          if (
            org.name
              .toLowerCase()
              .search(filterAndSort.searchText.toLowerCase()) >= 0
          ) {
            return true;
          }

          if (
            org.email
              .toLowerCase()
              .search(filterAndSort.searchText.toLowerCase()) >= 0
          ) {
            return true;
          }

          if (
            org.username
              .toLowerCase()
              .search(filterAndSort.searchText.toLowerCase()) >= 0
          ) {
            return true;
          }

          if (org.mobile_number.search(filterAndSort.searchText) >= 0) {
            return true;
          }

          return false;
        });
      } else {
        filteredData.value = orgList.value;
      }

      tableData.value = filteredData;
    };

    watch(filterAndSort, () => {
      applyFilterAndSort();
    });

    watchEffect(() => {
      applyFilterAndSort();
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Organisations", []);
      store.dispatch(Actions.ORG.LIST).then(() => {
        tableData.value = orgList;
        loading.value = false;
      });
    });

    return { tableHeader, tableData, handleEdit, filterAndSort, handleDelete };
  },
});
</script>
