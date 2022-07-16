<template>
  <div class="card w-75 mx-auto">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title"></div>
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
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal_add_orgManager"
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
        :key="tableKey"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-first_name="{ row: item }">
          {{ item.first_name }}
        </template>
        <template v-slot:cell-last_name="{ row: item }">
          {{ item.last_name }}
        </template>
        <template v-slot:cell-username="{ row: item }">
          {{ item.username }}
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-action="{ row: item }">
          <a
            href="#"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/coding/cod008.svg" />
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
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import CreateModal from "@/components/organisation-managers/AddOrganisationManager.vue";
import EditModal from "@/components/organisation-managers/EditOrganisationManager.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "admin-main",

  components: {
    Datatable,
    CreateModal,
    EditModal,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "First Name",
        key: "first_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Last Name",
        key: "last_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Username",
        key: "username",
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
    const orgManagerList = computed(() => store.getters.orgManagerList);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_ORG_MANAGER.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_admin"));
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.ORG_MANAGER.DELETE, id)
        .then(() => {
          store.dispatch(Actions.ORG_MANAGER.LIST);
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
      setCurrentPageBreadcrumbs("Organisation Managers", []);
      store.dispatch(Actions.ORG_MANAGER.LIST);
      tableData.value = orgManagerList;
    });

    watchEffect(() => {
      tableData.value = orgManagerList;
    });
    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
