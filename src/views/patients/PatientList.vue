<template>
  <div class="card w-xxl-75 m-auto">
    <div class="card-header border-0 p-5">
      <div class="card border border-dashed border-primary w-100">
        <div class="card-body">
          <div class="card-info">
            <el-form class="w-100" ref="formRef_1">
              <!--begin::Row-->
              <div class="row g-8">
                <!--begin::Col-->
                <div class="col-lg-4">
                  <label class="fs-6 form-label fw-bolder text-dark"
                    >First Name</label
                  >
                  <el-form-item prop="first_name">
                    <el-input
                      type="text"
                      v-model="filter.first_name"
                      placeholder="First Name"
                    />
                  </el-form-item>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-lg-4">
                  <label class="fs-6 form-label fw-bolder text-dark"
                    >Last Name</label
                  >
                  <el-form-item prop="last_name">
                    <el-input
                      type="text"
                      v-model="filter.last_name"
                      placeholder="Last Name"
                    />
                  </el-form-item>
                </div>
                <!--begin::Col-->
                <div class="col-lg-4">
                  <label class="fs-6 form-label fw-bolder text-dark"
                    >Date of Birth</label
                  >
                  <el-form-item prop="date">
                    <el-date-picker
                      class="w-100"
                      v-model="filter.date_of_birth"
                      format="DD/MM/YYYY"
                      placeholder="01/01/1990"
                    />
                  </el-form-item>

                  <div
                    class="d-flex align-items-center justify-content-end mt-5"
                  >
                    <button
                      type="submit"
                      class="btn btn-primary me-5 w-50"
                      :disabled="
                        filter.first_name.length < 2 &&
                        filter.last_name.length < 2 &&
                        filter.date_of_birth.length < 2
                      "
                      @click.prevent="searchPatient"
                    >
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      class="btn btn-light-primary w-50"
                      :disabled="
                        filter.first_name.length === 0 &&
                        filter.last_name.length === 0 &&
                        filter.date_of_birth.length === 0
                      "
                      @click="clearFilters"
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="5"
        :key="tableKey"
        :loading="loading"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-full_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            <button
              @click="handleView(item)"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <i class="fas fa-eye"></i>
              </span>
            </button>
            {{ item.first_name }} {{ item.last_name }}
          </span>
        </template>
        <template v-slot:cell-dob="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ new Date(item.date_of_birth).toLocaleDateString("en-AU") }}
          </span>
        </template>
        <template v-slot:cell-contact_number="{ row: item }">
          {{ item.contact_number }}
        </template>
        <template
          v-if="userRole != 'specialist'"
          v-slot:cell-upcoming="{ row: item }"
        >
          <span
            v-for="upcoming_appointment in item.upcoming_appointments"
            :key="upcoming_appointment.id"
            :class="`badge ${
              upcoming_appointment.id ? '' : 'badge-light-success'
            }`"
            style="color: #000000"
            :style="`width: fit-content; background-color: ${
              upcoming_appointment.id
                ? upcoming_appointment.appointment_type.color
                : ''
            }; cursor: ${upcoming_appointment.id ? 'pointer' : 'not-allowed'}`"
            @click="
              upcoming_appointment.id ? handleBadge(upcoming_appointment) : ''
            "
          >
            {{
              upcoming_appointment.id
                ? upcoming_appointment.date +
                  " " +
                  upcoming_appointment.start_time +
                  "(" +
                  upcoming_appointment.appointment_type.name +
                  ")"
                : "none"
            }}</span
          >
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
  reactive,
  watch,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { AppointmentMutations } from "@/store/enums/StoreAppointmentEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import moment from "moment";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import store from "@/store";

export default defineComponent({
  name: "patients-list",

  components: {
    Datatable,
  },

  data: function () {
    return {
      userRole: computed(() => store.getters.userRole),
    };
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "Full Name",
        key: "full_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Date of Birth",
        key: "dob",
        sortable: true,
        searchable: true,
      },
      {
        name: "Contact Number",
        key: "contact_number",
        sortable: true,
        searchable: true,
      },
      {
        name: "Upcoming Appointments",
        key: "upcoming",
      },
    ]);
    const patientData = ref([]);
    const tableData = ref([]);
    const list = computed(() => store.getters.patientsList);
    const loading = ref(false);
    const tableKey = ref(0);
    const filter = reactive({
      first_name: "",
      last_name: "",
      date_of_birth: "",
    });

    const renderTable = () => tableKey.value++;

    const generateID = (id) => {
      let prefix = "";
      let i = 0;
      while (i < 6 - id.toString().length) {
        prefix += "0";
        i++;
      }
      return prefix + id.toString();
    };

    const searchPatient = () => {
      loading.value = true;
      store
        .dispatch(PatientActions.LIST, {
          first_name: filter.first_name,
          last_name: filter.last_name,
          date_of_birth: filter.date_of_birth,
        })
        .finally(() => {
          loading.value = false;
          renderTable();
        });
    };
    searchPatient();
    const clearFilters = () => {
      filter.first_name = "";
      filter.last_name = "";
      filter.date_of_birth = "";
      tableData.value = [];
      renderTable();
    };

    const handleView = (item) => {
      store.dispatch(PatientActions.VIEW, item.id);
      router.push({
        name: "patients-view-appointments",
        params: { id: item.id },
      });
    };

    const handleBadge = (upcoming_appointment) => {
      store.commit(AppointmentMutations.SET_APT.SELECT, upcoming_appointment);
      DrawerComponent?.getInstance("appointment-drawer")?.setBookingDrawerShown(
        true
      );
      router.push({ name: "booking-dashboard" });
    };

    watch(list, () => {
      patientData.value = list.value;
      tableData.value = patientData.value;
      console.log(tableData.value[0]);
      renderTable();
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Patients", []);
    });

    return {
      tableHeader,
      tableData,
      filter,
      tableKey,
      generateID,
      handleView,
      handleBadge,
      searchPatient,
      clearFilters,
      loading,
    };
  },
});
</script>
