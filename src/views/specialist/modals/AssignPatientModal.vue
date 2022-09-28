<template>
  <ModalWrapper
    title="Search Patients"
    modalId="assign_patient"
    :updateRef="updateRef"
  >
    <el-form class="w-100" ref="formRef">
      <!--begin::Row-->
      <div class="row g-8">
        <!--begin::Col-->
        <div class="col-lg-4">
          <label class="fs-6 form-label fw-bolder text-dark">First Name</label>
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
          <label class="fs-6 form-label fw-bolder text-dark">Last Name</label>
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

          <div class="d-flex align-items-center justify-content-end mt-5">
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
    <div class="row g-8">
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
      </Datatable>
    </div>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { hideModal } from "@/core/helpers/dom";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";

export default defineComponent({
  components: {
    Datatable,
  },
  name: "assign-patient-modal",
  props: {},
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.patientsList);
    const formData = ref({});
    const loading = ref(false);
    const assignPatientModalRef = ref(null);
    const filter = reactive({
      first_name: "",
      last_name: "",
      date_of_birth: "",
    });

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
    ]);

    const patientData = ref([]);
    const tableData = ref([]);
    const tableKey = ref(0);
    const renderTable = () => tableKey.value++;
    const clearFilters = () => {
      filter.first_name = "";
      filter.last_name = "";
      filter.date_of_birth = "";
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
          // hideModal(assignPatientModalRef.value);
        });
    };

    searchPatient();
    const updateRef = (_ref) => {
      assignPatientModalRef.value = _ref;
    };

    watch(list, () => {
      patientData.value = list.value;
      tableData.value = list.value;
      console.log(tableData.value[0]);
      renderTable();
    });

    return {
      filter,
      searchPatient,
      formData,
      clearFilters,
      assignPatientModalRef,
      updateRef,
      tableHeader,
      patientData,
      tableData,
    };
  },
});
</script>
