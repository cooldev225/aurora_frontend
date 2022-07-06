<template>
  <div class="card w-75 mx-auto mb-3">
    <!--end::Alert-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">Unapproved Procedure</div>

      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :loading="loading"
        :rows-per-page="10"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-full_name="{ row: item }">
          {{ item.first_name }} {{ item.last_name }}
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
  name: "unapproved-procedure",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Clinic",
        key: "clinic",
        sortable: true,
      },
      {
        name: "Specialist",
        key: "specialist",
        sortable: true,
        searchable: true,
      },
      {
        name: "Procedure",
        key: "procedure",
        sortable: true,
        searchable: true,
      },
      {
        name: "Patient Name",
        key: "patient_name",
      },
      {
        name: "Patient Number",
        key: "patient_number",
      },
      {
        name: "Appointment Date",
        key: "appintment-date",
      },
      {
        name: "Start Time",
        key: "start_time",
      },
      {
        name: "Status",
        key: "status",
      },
      {
        name: "Actions",
        key: "actions",
      },
    ]);
    const tableData = ref([]);
    const unapproved_pro = computed(() => store.getters.getUnapprovedAptList);
    const loading = ref(true);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_APT.UNAPPROVED.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_admin"));
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.APT.UNAPPROVED.DELETE, id)
        .then(() => {
          store.dispatch(Actions.APT.UNAPPROVED.LIST);
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
      loading.value = true;
      setCurrentPageBreadcrumbs("Unapproved Procedures", ["Booking"]);
      store.dispatch(Actions.APT.UNAPPROVED.LIST).then(() => {
        tableData.value = unapproved_pro;
        loading.value = false;
      });
    });

    watchEffect(() => {
      tableData.value = unapproved_pro;
      loading.value = false;
    });
    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
