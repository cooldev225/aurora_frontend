<template>
  <div class="card w-xxl-75 m-auto">
    <div class="card-header border-0 p-5">
      <div class="card border border-dashed border-primary w-100">
        <div class="card-body">
          <div class="card-info">
            <div class="card-toolbar mb-4 me-4 d-flex flex-row-reverse">
              <!--begin::Toolbar-->
              <div
                class="d-flex justify-content-end"
                data-kt-subscription-table-toolbar="base"
              >
                <!--begin::Switch-->
                <label
                  class="form-check form-switch form-check-custom form-check-solid"
                >
                  <!--begin::Label-->
                  <span
                    class="form-check-label fw-bold text-muted"
                    for="chkShowType"
                  >
                    Show Unassed Only
                  </span>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <input
                    class="form-check-input ms-3"
                    name="show_type"
                    type="checkbox"
                    value="1"
                    id="chkShowType"
                    checked="checked"
                    v-model="showAll"
                    @change="searchPatient"
                  />
                  <!--end::Input-->

                  <!--begin::Label-->
                  <span
                    class="form-check-label fw-bold text-muted"
                    for="chkShowType"
                  >
                    Show All
                  </span>
                  <!--end::Label-->
                </label>
                <!--end::Switch-->
              </div>
              <!--end::Toolbar-->
            </div>
            <!--end::Card toolbar-->

            <el-form class="w-100 flex-row" ref="formRef_1">
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
                      type="button"
                      class="btn btn-primary me-5 w-50"
                      @click="searchPatient"
                    >
                      SEARCH
                    </button>
                    <button
                      type="button"
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
            {{ item.patient_name.full }}
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
            <button
              @click="handleFormModal(item)"
              class="btn btn-active-color-primary btn-primary"
            >
              View Pre Admission Form
            </button>
          </span>
        </template>
      </Datatable>
    </div>
  </div>

  <PreAdmissionFormModal></PreAdmissionFormModal>
</template>

<script>
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";
import PreAdmissionFormModal from "@/components/anesthetist/PreAdmissionForm.vue";

export default defineComponent({
  name: "procedure-approvals-list",

  components: {
    Datatable,
    PreAdmissionFormModal,
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
    const procedureApprovalsData = ref([]);
    const tableData = ref([]);
    const procedureApprovalsList = computed(
      () => store.getters.getProcedureApprovalList
    );
    const loading = ref(true);
    const filterFirstName = ref("");
    const filterLastName = ref("");
    const tableKey = ref(0);
    const showAll = ref(false);

    const renderTable = () => tableKey.value++;

    const handleFormModal = (item) => {
      store.commit(Mutations.SET_PROCEDURE_APPROVAL.DATA, item);
      const modal = new Modal(
        document.getElementById("modal_view_pre_admission")
      );
      modal.show();
    };

    const searchPatient = () => {
      tableData.value = procedureApprovalsData.value.filter((data) => {
        let result = true;
        if (filterFirstName.value.trim()) {
          result =
            result &&
            data.patient_name.first
              .toLowerCase()
              .indexOf(filterFirstName.value.toLowerCase()) !== -1;
        }
        if (filterLastName.value.trim()) {
          result =
            result &&
            data.patient_name.last
              .toLowerCase()
              .indexOf(filterLastName.value.toLowerCase()) !== -1;
        }
        if (!showAll.value) {
          result = result && data.procedure_approval_status === "NOT_ACCESSED";
        }

        return result;
      });
      renderTable();
    };

    const clearFilters = () => {
      filterFirstName.value = "";
      filterLastName.value = "";
      searchPatient();
      return false;
    };

    watch(procedureApprovalsList, () => {
      procedureApprovalsData.value = procedureApprovalsList.value;
      searchPatient();
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Dashboard", ["Anesthetist"]);
      store.dispatch(Actions.PROCEDURE_APPROVAL.LIST);
    });

    return {
      tableHeader,
      tableData,
      handleFormModal,
      filterFirstName,
      filterLastName,
      tableKey,
      searchPatient,
      clearFilters,
      showAll,
    };
  },
});
</script>
