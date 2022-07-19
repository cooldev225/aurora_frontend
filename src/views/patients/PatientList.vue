<template>
  <div class="card">
    <div class="card-header border-0 p-5">
      <div class="card border border-dashed border-primary w-100">
        <div class="card-header">
          <div class="card-title">
            <span>SEARCH PATIENTS</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-info">
            <el-form class="w-100" ref="formRef_1">
              <!--begin::Row-->
              <div class="row g-8">
                <!--begin::Col-->
                <div class="col-xxl-6">
                  <!--begin::Row-->
                  <div class="row g-8">
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >First Name</label
                      >
                      <el-form-item prop="first_name">
                        <el-input
                          type="text"
                          v-model="filterFirstName"
                          placeholder="First Name"
                        />
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >Last Name</label
                      >
                      <el-form-item prop="last_name">
                        <el-input
                          type="text"
                          v-model="filterLastName"
                          placeholder="Last Name"
                        />
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-xxl-6">
                  <!--begin::Row-->
                  <div class="row g-8">
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >Date of Birth</label
                      >
                      <el-form-item prop="date">
                        <el-date-picker
                          class="w-100"
                          v-model="filterBirth"
                          format="YYYY-MM-DD"
                          placeholder="1990-01-01"
                        />
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >UR Number</label
                      >
                      <el-form-item prop="ur_number">
                        <el-input
                          type="text"
                          v-model="filterUR"
                          placeholder="UR Number"
                        />
                      </el-form-item>

                      <div
                        class="d-flex align-items-center justify-content-end mt-5"
                      >
                        <button
                          type="submit"
                          class="btn btn-primary me-5 w-50"
                          @click="searchPatient"
                        >
                          SEARCH
                        </button>
                        <button
                          type="submit"
                          class="btn btn-light-primary w-50"
                          @click="clearFilters"
                        >
                          CLEAR FILTERS
                        </button>
                      </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
              <!--begin::Separator-->
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
        <template v-slot:cell-UR_number="{ row: item }">
          {{ item.UR_number }}
        </template>
        <template v-slot:cell-full_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.first_name }} {{ item.last_name }}
          </span>
        </template>
        <template v-slot:cell-dob="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.date_of_birth }}
          </span>
        </template>
        <template v-slot:cell-contact_number="{ row: item }">
          {{ item.contact_number }}
        </template>
        <template v-slot:cell-upcoming="{ row: item }">
          <span
            :class="`badge ${
              item.upcoming_appointment.id ? '' : 'badge-light-success'
            }`"
            :style="`width: fit-content; background-color: ${
              item.upcoming_appointment.id
                ? item.upcoming_appointment.color
                : ''
            }; cursor: ${
              item.upcoming_appointment.id ? 'pointer' : 'not-allowed'
            }`"
            @click="item.upcoming_appointment.id ? handleBadge(item) : ''"
            >{{
              item.upcoming_appointment.id
                ? item.upcoming_appointment.date +
                  " " +
                  item.upcoming_appointment.start_time +
                  "(" +
                  item.upcoming_appointment.procedure_name +
                  ")"
                : "none"
            }}</span
          >
        </template>
        <template v-slot:cell-action="{ row: item }">
          <button
            @click="handleView(item)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <span class="svg-icon svg-icon-3">
              <i class="fas fa-eye"></i>
            </span>
          </button>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import moment from "moment";

export default defineComponent({
  name: "patients-list",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const tableHeader = ref([
      {
        name: "UR Number",
        key: "UR_number",
        sortable: true,
        searchable: true,
      },
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
        name: "Upcoming Appointment",
        key: "upcoming",
      },
      {
        name: "",
        key: "action",
      },
    ]);
    const patientData = ref([]);
    const tableData = ref([]);
    const list = computed(() => store.getters.patientsList);
    const loading = ref(true);
    const filterFirstName = ref("");
    const filterLastName = ref("");
    const filterBirth = ref("");
    const filterUR = ref("");
    const tableKey = ref(0);

    const renderTable = () => tableKey.value++;

    const searchPatient = () => {
      tableData.value = patientData.value.filter((data) => {
        let result = true;
        if (filterFirstName.value) {
          result =
            result &&
            data.first_name.toLowerCase() ===
              filterFirstName.value.toLowerCase();
        }
        if (filterLastName.value) {
          result =
            result &&
            data.last_name.toLowerCase() === filterLastName.value.toLowerCase();
        }
        if (filterBirth.value) {
          let searchDate = moment(filterBirth.value)
            .format("YYYY-MM-DD")
            .toString();
          result = result && data.date_of_birth === searchDate;
        }
        if (filterUR.value) {
          result =
            result &&
            data.ur_number.toLowerCase() === filterUR.value.toLowerCase();
        }
        return result;
      });
      renderTable();
    };

    const clearFilters = () => {
      filterFirstName.value = "";
      filterLastName.value = "";
      filterBirth.value = "";
      filterUR.value = "";
      tableData.value = patientData.value;
      renderTable();
    };

    const handleView = (item) => {
      store.dispatch(Actions.PATIENTS.VIEW, item.id);
      router.push({ name: "patients-view-appointments" });
    };

    const handleBadge = (item) => {
      store.commit(Mutations.SET_APT.SELECT, item.upcoming_appointment);
      router.push({ name: "booking-dashboard" });
      localStorage.setItem("booking-drawer", true);
    };

    watch(list, () => {
      patientData.value = list.value;
      tableData.value = patientData.value;
      renderTable();
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Patients", []);
      store.dispatch(Actions.PATIENTS.LIST);
    });

    return {
      tableHeader,
      tableData,
      filterFirstName,
      filterLastName,
      filterBirth,
      filterUR,
      tableKey,
      handleView,
      handleBadge,
      searchPatient,
      clearFilters,
    };
  },
});
</script>
