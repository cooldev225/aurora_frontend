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
                      v-model="filterFirstName"
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
                      v-model="filterLastName"
                      placeholder="Last Name"
                    />
                  </el-form-item>
                </div>
                <!--begin::Col-->
                <div class="col-lg-4">
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
        <template v-slot:cell-patient_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.first_name }} {{ item.last_name }}
          </span>
        </template>

        <template v-slot:cell-date_time="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.date }} {{ item.start_time }}
          </span>
        </template>

        <template v-slot:cell-specialist_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.specialist_name }}
          </span>
        </template>

        <template v-slot:cell-appointment_type="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.appointment_type.name }}
          </span>
        </template>

        <template v-slot:cell-procedure_approval_status="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.procedure_approval_status }}
          </span>
        </template>

        <template v-slot:cell-actions="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ item.action }}
          </span>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "patients-list",

  components: {
    Datatable,
  },

  setup() {
    const store = useStore();
    const tableHeader = ref([
      {
        name: "Patient Name",
        key: "patient_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Date/Time",
        key: "date_time",
        sortable: true,
        searchable: true,
      },
      {
        name: "Specialist Name",
        key: "specialist_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Appointment Type",
        key: "appointment_type",
        sortable: true,
        searchable: true,
      },
      {
        name: "Procedure Approval Status",
        key: "procedure_approval_status",
        sortable: true,
        searchable: true,
      },
      {
        name: "Actions",
        key: "actions",
        sortable: true,
        searchable: true,
      },
    ]);
    const patientData = ref([]);
    const tableData = ref([]);
    const list = computed(() => store.getters.procedureApprovalsList);
    const loading = ref(true);
    const filterFirstName = ref("");
    const filterLastName = ref("");
    const tableKey = ref(0);

    const renderTable = () => tableKey.value++;

    const searchPatient = () => {
      tableData.value = patientData.value.filter((data) => {
        let result = true;
        if (filterFirstName.value.trim()) {
          result =
            result &&
            data.first_name
              .toLowerCase()
              .indexOf(filterFirstName.value.toLowerCase()) !== -1;
        }
        if (filterLastName.value.trim()) {
          result =
            result &&
            data.last_name
              .toLowerCase()
              .indexOf(filterLastName.value.toLowerCase()) !== -1;
        }
        return result;
      });
      renderTable();
    };

    const clearFilters = () => {
      filterFirstName.value = "";
      filterLastName.value = "";
      tableData.value = patientData.value;
      renderTable();
      return false;
    };

    watch(list, () => {
      patientData.value = list.value;
      tableData.value = patientData.value;
      renderTable();
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Dashboard", ["Anesthetist"]);
      store.dispatch(Actions.PROCEDURE_APPROVALS.LIST);
    });

    return {
      tableHeader,
      tableData,
      filterFirstName,
      filterLastName,
      tableKey,
      searchPatient,
      clearFilters,
    };
  },
});
</script>
