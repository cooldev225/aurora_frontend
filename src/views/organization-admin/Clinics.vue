<template>
  <div class="card w-75 m-auto">
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
            placeholder="Search Clinic"
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
          <router-link to="/clinics/create" class="btn btn-primary">
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
        <template v-slot:cell-name="{ row: item }">
          {{ item.name }}
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-city="{ row: item }">
          {{ item.city }}
        </template>
        <template v-slot:cell-state="{ row: item }">
          {{ item.state }}
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
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "clinics-main",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Clinic Name",
        key: "name",
        sortable: true,
      },
      {
        name: "Email Address",
        key: "email",
        sortable: true,
      },
      {
        name: "City",
        key: "city",
        sortable: true,
      },
      {
        name: "State",
        key: "state",
        sortable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);
    const tableData = ref([]);
    const clinicsList = computed(() => store.getters.clinicsList);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_CLINICS.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_clinics"));
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.CLINICS.DELETE, id)
        .then(() => {
          store.dispatch(Actions.CLINICS.LIST);
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
      setCurrentPageBreadcrumbs("Clinics", []);
      store.dispatch(Actions.CLINICS.LIST);
      tableData.value = clinicsList;
    });

    watchEffect(() => {
      tableData.value = clinicsList;
    });
    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
