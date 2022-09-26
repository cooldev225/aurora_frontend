<template>
  <div class="card w-75 mx-auto">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            data-kt-subscription-table-filter="search"
            class="form-control form-control-solid w-250px ps-14"
            placeholder="Search Referring Doctors"
            v-model="filterAndSort.searchText"
          />
        </div>
      </div>
      <!--begin::Add button-->
      <div class="card-toolbar">
        <router-link
          to="/settings/referring-doctors/create"
          type="button"
          class="text-nowrap btn btn-light-primary ms-auto"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          Add
        </router-link>
      </div>
      <!--end::Add button-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="10"
        :loading="loading"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-provider_no="{ row: item }">
          {{ item.provider_no }}
        </template>
        <template v-slot:cell-full_name="{ row: item }">
          {{ item.full_name }}
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-phone="{ row: item }">
          {{ item.phone }}
        </template>
        <template v-slot:cell-action="{ row: item }">
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
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5"
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
  reactive,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "referring-doctors",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const filterAndSort = reactive({
      searchText: "",
    });
    const tableHeader = ref([
      {
        name: "Provider Number",
        key: "provider_no",
        sortable: true,
      },
      {
        name: "Full Name",
        key: "full_name",
        sortable: true,
      },
      {
        name: "Email Address",
        key: "email",
        sortable: true,
      },
      {
        name: "Contact Number",
        key: "phone",
        sortable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);
    const tableData = ref([]);
    const filteredData = ref([]);
    const loading = ref(true);
    const referringDoctors = computed(
      () => store.getters.getReferralDoctorList
    );

    const handleEdit = (item) => {
      router.push({ name: "editRefDoctors", params: { id: item.id } });
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.REFERRAL_DOCTOR.DELETE, id)
        .then(() => {
          store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
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

    onMounted(() => {
      setCurrentPageBreadcrumbs("Referring Doctors", ["Settings"]);
    });

    watchEffect(() => {
      tableData.value = referringDoctors;
      loading.value = false;
    });

    const applyFilterAndSort = () => {
      if (filterAndSort.searchText != "") {
        filteredData.value = referringDoctors.value.filter((org) => {
          if (
            org.provider_no
              .toLowerCase()
              .search(filterAndSort.searchText.toLowerCase()) >= 0
          ) {
            return true;
          }

          if (
            org.full_name
              .toLowerCase()
              .search(filterAndSort.searchText.toLowerCase()) >= 0
          ) {
            return true;
          }

          return false;
        });
      } else {
        filteredData.value = referringDoctors.value;
      }
      tableData.value = filteredData;
    };

    watchEffect(() => {
      applyFilterAndSort();
    });

    watch(filterAndSort, () => {
      applyFilterAndSort();
    });

    return { tableHeader, tableData, handleEdit, handleDelete, filterAndSort };
  },
});
</script>
