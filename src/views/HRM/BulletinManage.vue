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
        :loading="loading"
        :rows-per-page="20"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-title="{ row: item }">
          <div class="d-flex align-items-center">
            {{ item.title }}
          </div>
        </template>
        <template v-slot:cell-author="{ row: item }">
          <div class="d-flex align-items-center">
            {{ item.created_by_name }}
          </div>
        </template>
        <template v-slot:cell-date="{ row: item }">
          <div class="d-flex align-items-center">
            {{ new Date(item.created_at).toLocaleDateString("en-AU") }}
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
  <BulletinEditModal></BulletinEditModal>
</template>

<script>
import { defineComponent, onMounted, computed, ref, watchEffect } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import BulletinEditModal from "@/views/HRM/BulletinEditModal.vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "bulletin-manage",
  components: {
    Datatable,
    BulletinEditModal,
  },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const tableData = ref(null);
    const bulletins = computed(() => store.getters.getBulletinList);

    const tableHeader = ref([
      {
        name: "Title",
        key: "title",
        sortable: true,
      },
      {
        name: "Author",
        key: "author",
        sortable: true,
      },
      {
        name: "Date",
        key: "date",
        sortable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);

    watchEffect(() => {
      tableData.value = bulletins;
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("HRM", ["Manage Bulletins"]);
      store.dispatch(HRMActions.BULLETIN.LIST).then(() => {
        loading.value = false;
      });
    });

    const handleAdd = () => {
      const new_item = {
        title: "",
        body: "",
        created_by_name: "",
        created_at: new Date(),
        _title: "Create Bulletin",
        _button: "Save",
        _submit: HRMActions.BULLETIN.CREATE,
        _submit_text: "Successfully Created!",
      };

      store.commit(HRMMutations.BULLETIN.SET_SELECT, new_item);
      const modal = new Modal(document.getElementById("modal_eidt_bulletin"));
      modal.show();
    };

    const handleEdit = (item) => {
      item._title = "Edit Bulletin";
      item._button = "Update";
      item._submit = HRMActions.BULLETIN.UPDATE;
      item._submit_text = "Successfully Updated!";

      store.commit(HRMMutations.BULLETIN.SET_SELECT, item);
      const modal = new Modal(document.getElementById("modal_eidt_bulletin"));
      modal.show();
    };

    const handleDelete = (id) => {
      //delete templates
      store
        .dispatch(HRMActions.BULLETIN.DELETE, id)
        .then(() => {
          store.dispatch(HRMActions.BULLETIN.LIST);
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
          console.log(response);
        });
    };

    return {
      bulletins,
      loading,
      tableData,
      tableHeader,
      handleAdd,
      handleEdit,
      handleDelete,
    };
  },
});
</script>
