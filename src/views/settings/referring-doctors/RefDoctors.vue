<template>
  <div class="card w-75 mx-auto">
    <div class="card-header row border-0 p-6">
      <div class="card-title col"></div>
      <!--begin::Add button-->
      <div class="card-toolbar col-12">
        <router-link
          to="/settings/referring-doctors/create"
          type="button"
          class="text-nowrap btn btn-light-primary ms-auto"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          Add
        </router-link>
      </div>
      <!--end::Add button-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="10"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-full_name="{ row: item }">
          {{ item.full_name }}
        </template>
        <template v-slot:cell-email="{ row: item }">
          {{ item.email }}
        </template>
        <template v-slot:cell-phone="{ row: item }">
          {{ item.phone }}
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

          <button
            @click="handleDelete(item.id)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5"
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
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "referring-doctors",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "Full Name",
        key: "full_name",
        sortable: true,
      },
      {
        name: "Email Address",
        key: "email",
        sortable: true,
      },
      {
        name: "Contact Number",
        key: "phone",
        sortable: true,
      },
      {
        name: "Action",
        key: "action",
      },
    ]);
    const tableData = ref([]);
    const referringDoctors = computed(
      () => store.getters.getReferralDoctorList
    );

    const handleEdit = (item) => {
      router.push({ name: "editRefDoctors", params: { id: item.id } });
    };

    const handleDelete = (id) => {
      //
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Referring Doctors", ["Settings"]);
    });

    watchEffect(() => {
      tableData.value = referringDoctors;
    });

    return { tableHeader, tableData, handleEdit, handleDelete };
  },
});
</script>
