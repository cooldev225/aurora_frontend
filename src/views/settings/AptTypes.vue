<template>
  <div class="card w-75 mx-auto">
    <div class="card-header row border-0 p-6">
      <div class="card-title col"></div>
      <!--begin::Add button-->
      <div class="card-toolbar col-12 col-sm-2">
        <button
          type="button"
          class="btn btn-light-primary ms-auto"
          data-bs-toggle="modal"
          data-bs-target="#modal_add_apt_type"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          Add
        </button>
      </div>
      <!--end::Add button-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="20"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-name="{ row: item }">
          <div class="d-flex align-items-center">
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
            <span
              class="p-2"
              :style="{
                'border-radius': '5px',
                color: 'black',
                'background-color': item.color,
              }"
              >{{ item.name }}</span
            >
          </div>
        </template>
        <template v-slot:cell-type="{ row: item }">
          {{ item.type }}
        </template>
        <template v-slot:cell-appointment_time="{ row: item }">
          <span class="text-capitalize">{{ item.appointment_time }}</span>
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
import CreateModal from "@/components/apt-types/CreateAptType.vue";
import EditModal from "@/components/apt-types/EditAptType.vue";
import { Modal } from "bootstrap";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "apt-types",

  components: {
    Datatable,
    CreateModal,
    EditModal,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Name",
        key: "name",
        sortable: true,
      },
      {
        name: "Type",
        key: "type",
        sortable: true,
      },
      {
        name: "Appointment Time",
        key: "appointment_time",
        sortable: true,
      },
    ]);
    const tableData = ref([]);
    const aptTypes = computed(() => store.getters.getAptTypesList);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_APT.TYPES.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_apt_type"));
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.APT.TYPES.DELETE, id)
        .then(() => {
          store.dispatch(Actions.APT.TYPES.LIST);
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
      setCurrentPageBreadcrumbs("Appointment Types", ["Settings"]);
      store.dispatch(Actions.APT.TYPES.LIST);
    });

    watchEffect(() => {
      tableData.value = aptTypes;
    });

    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
