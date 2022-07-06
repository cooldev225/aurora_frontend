<template>
  <div class="card w-75 mx-auto mb-3">
    <!--end::Alert-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">TODAY'S APPOINTMENTS</div>

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
        :table-data="todayData"
        :loading="loading"
        :rows-per-page="5"
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
  <div class="card w-75 mx-auto mb-3">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">TOMORROW'S APPOINTMENTS</div>

      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar"></div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tomorrowData"
        :loading="loading"
        :rows-per-page="5"
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
  <div class="card w-75 mx-auto">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">FUTURE APPOINTMENTS</div>

      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar"></div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="futureData"
        :loading="loading"
        :rows-per-page="5"
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
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watchEffect,
  reactive,
} from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "admin-main",

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
    const todayData = ref([]);
    const tomorrowData = ref([]);
    const futureData = ref([]);
    const unConfirmed_Apts = computed(
      () => store.getters.getUnconfirmedAptList
    );

    const handleEdit = (item) => {
      store.commit(Mutations.SET_APT.UNCONFIRMED.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_admin"));
      modal.show();
    };

    const handleDelete = (id) => {
      store
        .dispatch(Actions.APT.UNCONFIRMED.DELETE, id)
        .then(() => {
          store.dispatch(Actions.APT.UNCONFIRMED.LIST);
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
      setCurrentPageBreadcrumbs("Unconfirmed Appointments", ["Booking"]);
      store.dispatch(Actions.APT.UNCONFIRMED.LIST).then(() => {
        if (unConfirmed_Apts.value.today)
          todayData.value = unConfirmed_Apts.value.today;
        if (unConfirmed_Apts.value.tomorrow)
          todayData.value = unConfirmed_Apts.value.tomorrow;
        if (unConfirmed_Apts.value.future)
          todayData.value = unConfirmed_Apts.value.future;
        // tomorrowData.value = unConfirmed_Apts.value.tomorrow;
        // futureData.value = unConfirmed_Apts.value.future;
      });
    });

    watchEffect(() => {
      if (unConfirmed_Apts.value.today)
        todayData.value = unConfirmed_Apts.value.today;
      if (unConfirmed_Apts.value.tomorrow)
        todayData.value = unConfirmed_Apts.value.tomorrow;
      if (unConfirmed_Apts.value.future)
        todayData.value = unConfirmed_Apts.value.future;
      // tomorrowData.value = unConfirmed_Apts.value.tomorrow;
      // futureData.value = unConfirmed_Apts.value.future;
    });
    return {
      tableHeader,
      todayData,
      tomorrowData,
      futureData,
      handleEdit,
      handleDelete,
    };
  },
});
</script>
