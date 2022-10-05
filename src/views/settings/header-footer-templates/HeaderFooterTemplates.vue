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
          {{ item.title }}
        </template>
        <template v-slot:cell-header_file="{ row: item }">
          <div class="img-previewer">
            <img :src="item.header_file" />
          </div>
        </template>
        <template v-slot:cell-footer_file="{ row: item }">
          <div class="img-previewer">
            <img :src="item.footer_file" />
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
  <EditHeaderFooterTemplate />
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import EditHeaderFooterTemplate from "@/views/settings/header-footer-templates/EditHeaderFooterTemplate.vue";
import { Modal } from "bootstrap";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "document-header-footer-templates",

  components: {
    Datatable,
    EditHeaderFooterTemplate,
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
        name: "Header",
        key: "header_file",
      },
      {
        name: "Footer",
        key: "footer_file",
      },
      {
        name: "Action",
        key: "action",
      },
    ]);

    const tableData = ref([]);
    const headerFooterTemplates = computed(
      () => store.getters.getHeaderFooterTemplateList
    );

    const handleAdd = () => {
      //add templates
      const new_item = {
        id: 0,
        title: "",
        header_file: "",
        footer_file: "",
        _title: "Create Header/Footer Template",
        _button: "Save",
        _submit: Actions.HEADER_FOOTER_TEMPLATE.CREATE,
        _submit_text: "Successfully Created!",
      };

      store.commit(Mutations.SET_HEADER_FOOTER_TEMPLATE.SELECT, new_item);
      const modal = new Modal(
        document.getElementById("modal_edit_header_footer_template")
      );
      modal.show();
    };

    const handleEdit = (item) => {
      //edit templates
      item._title = "Edit Header/Footer Template";
      item._button = "Update";
      item._submit = Actions.HEADER_FOOTER_TEMPLATE.UPDATE;
      item._submit_text = "Successfully Updated!";

      store.commit(Mutations.SET_HEADER_FOOTER_TEMPLATE.SELECT, item);
      const modal = new Modal(
        document.getElementById("modal_edit_heaedr_footer_template")
      );
      modal.show();
    };

    const handleDelete = (id) => {
      //delete templates
      store
        .dispatch(Actions.HEADER_FOOTER_TEMPLATE.DELETE, id)
        .then(() => {
          store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST);
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
      setCurrentPageBreadcrumbs("Header/Footer Templates", ["Settings"]);
      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST);
    });

    watchEffect(() => {
      tableData.value = headerFooterTemplates;
    });

    return { tableHeader, tableData, handleAdd, handleEdit, handleDelete };
  },
});
</script>
