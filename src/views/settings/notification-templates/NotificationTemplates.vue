<template>
  <div class="card w-75 mx-auto">
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="10"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-title="{ row: item }">
          <div class="row">
            <div class="col-auto">
              <button
                @click="handleEdit(item)"
                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5"
              >
                <span class="svg-icon svg-icon-3">
                  <inline-svg src="media/icons/duotune/art/art005.svg" />
                </span>
              </button>
            </div>
            <div class="col-auto">
              <span class="text-primary">{{ item.title }}</span> <br />
              <span v-if="item.allow_day_edit != 0"
                >Days Before: {{ item.days_before }}<br />
              </span>
              Status: {{ item.status }} <br />
              {{ item.description }} <br />
            </div>
          </div>
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
import EditModal from "@/views/settings/notification-templates/EditNtfTemplate.vue";
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
        name: "Notification Type",
        key: "title",
        sortable: true,
      },
      {
        name: "",
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
      setCurrentPageBreadcrumbs("Patient Notifications", ["Settings"]);
      store.dispatch(Actions.NTF_TEMPLATES.LIST);
      tableData.value = ntfTemplates;
    });

    watchEffect(() => {
      tableData.value = ntfTemplates;
    });

    return { tableHeader, tableData, handleEdit };
  },
});
</script>
