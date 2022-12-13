<template>
  <div class="card w-75 mx-auto">
    <div class="card-header row p-6">
      <div class="card-title col"></div>
      <!--begin::Add button-->
      <div class="card-toolbar text-center col-sm-2">
        <button
          type="button"
          class="btn btn-light-primary ms-auto text-nowrap"
          @click="handleAdd()"
        >
          <span class="svg-icon svg-icon-2">
            <InlineSVG icon="plus" />
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
        <template v-slot:cell-title="{ row: item }">
          <div class="d-flex align-items-center">
            {{ item.title }}
          </div>
        </template>

        <template v-slot:cell-action="{ row: item }">
          <button
            @click="handleEdit(item)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <InlineSVG icon="pencil" />
            </span>
          </button>

          <button
            @click="handleDelete(item.id)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <span class="svg-icon svg-icon-3">
              <InlineSVG icon="bin" />
            </span>
          </button>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateDocumentTemplate />
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import CreateDocumentTemplate from "@/views/settings/document-templates/CreateDocumentTemplate.vue";
import { Modal } from "bootstrap";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "document-templates",

  components: {
    Datatable,
    CreateDocumentTemplate,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Title",
        key: "title",
        sortable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);

    const tableData = ref([]);
    const documentTemplates = computed(
      () => store.getters.getDocumentTemplateList
    );

    const handleAdd = () => {
      const new_item = {
        id: 0,
        title: "",
        sections: [],
      };

      store.commit(Mutations.SET_DOCUMENT_TEMPLATES.SELECT, {
        template: new_item,
        appointment: null,
        headerFooter: null,
      });
      const modal = new Modal(
        document.getElementById("modal_add_document_template")
      );
      modal.show();
    };

    const handleEdit = (item) => {
      store.commit(Mutations.SET_DOCUMENT_TEMPLATES.SELECT, {
        template: item,
        appointment: null,
        headerFooter: null,
      });
      const modal = new Modal(
        document.getElementById("modal_add_document_template")
      );
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.DOCUMENT_TEMPLATES.DELETE, id)
        .then(() => {
          store.dispatch(Actions.DOCUMENT_TEMPLATES.LIST);
        })
        .catch((response) => {
          console.log(response);
        });
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Document Templates", ["Settings"]);
      store.dispatch(Actions.DOCUMENT_TEMPLATES.LIST);
    });

    watchEffect(() => {
      tableData.value = documentTemplates.value;
    });

    return { tableHeader, tableData, handleAdd, handleEdit, handleDelete };
  },
});
</script>
