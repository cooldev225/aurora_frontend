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
          data-bs-target="#modal_add_report_template"
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
            {{ item.title }}
          </div>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateReportTemplate />
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import CreateReportTemplate from "@/components/report-templates/CreateReportTemplate.vue";
import { Modal } from "bootstrap";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "report-templates",

  components: {
    Datatable,
    CreateReportTemplate,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Title",
        key: "title",
        sortable: true,
      },
    ]);

    const tableData = ref([]);
    const reportTemplates = computed(
      () => store.getters.getReportTemplatesList
    );

    const handleEdit = (item) => {
      store.commit(Mutations.SET_REPORT_TEMPLATES.SELECT, item);
      const modal = new Modal(
        document.getElementById("modal_add_report_template")
      );
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.SET_REPORT_TEMPLATES.DELETE, id)
        .then(() => {
          store.dispatch(Actions.SET_REPORT_TEMPLATES.LIST);
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
      setCurrentPageBreadcrumbs("Report Templates", ["Settings"]);
      store.dispatch(Actions.REPORT_TEMPLATES.LIST);
    });

    watchEffect(() => {
      tableData.value = reportTemplates;
    });

    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
