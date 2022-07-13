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
            class="form-control form-control-solid w-300px ps-14"
            placeholder="Search Notification Template"
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
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-title="{ row: item }">
          {{ item.title }}
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
        </template>
      </Datatable>
    </div>
  </div>
  <EditModal></EditModal>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import EditModal from "@/components/notification-templates/EditNtfTemplate.vue";
import { Modal } from "bootstrap";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "notifiaction-templates",

  components: {
    Datatable,
    EditModal,
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
    const ntfTemplates = computed(() => store.getters.getNtfTemplatesList);

    const handleEdit = (item) => {
      store.commit(Mutations.SET_NTF_TEMPLATES.SELECT, item);
      const modal = new Modal(
        document.getElementById("modal_edit_notification_template")
      );
      modal.show();
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Notification Templates", ["Settings"]);
      store.dispatch(Actions.NTF_TEMPLATES.LIST);
      tableData.value = ntfTemplates;
      console.log(ntfTemplates);
    });

    watchEffect(() => {
      tableData.value = ntfTemplates;
    });

    return { tableHeader, tableData, handleEdit };
  },
});
</script>
