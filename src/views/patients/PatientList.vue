<template>
  <div class="card">
    <div class="card-header border-0 p-5">
      <div class="card border border-dashed border-primary w-100">
        <div class="card-header">
          <div class="card-title">
            <span>SEARCH PATIENT</span>
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
                        <el-input type="text" />
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >Last Name</label
                      >
                      <el-form-item prop="last_name">
                        <el-input type="text" />
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
                        >Date Of Birth</label
                      >
                      <el-form-item prop="date">
                        <el-date-picker
                          class="w-100"
                          format="YYYY-MM"
                          placeholder="2022-01-01"
                        />
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-lg-6">
                      <label class="fs-6 form-label fw-bolder text-dark"
                        >UR Number</label
                      >
                      <el-form-item prop="last_name">
                        <el-input type="text" />
                      </el-form-item>

                      <div
                        class="d-flex align-items-center justify-content-end mt-5"
                      >
                        <button type="submit" class="btn btn-primary me-5 w-50">
                          SEARCH
                        </button>
                        <button
                          type="submit"
                          class="btn btn-light-primary w-50"
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
            class="badge"
            :style="`width: fit-content; background-color: ${
              item.upcoming_appointment
                ? item.upcoming_appointment.color
                : 'black'
            }`"
            >{{
              item.upcoming_appointment
                ? item.upcoming_appointment.name
                : "(not applicable)"
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
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  computed,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

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
    const tableData = ref([]);
    const list = computed(() => store.getters.patientsList);
    const loading = ref(true);
    const searchName = ref("");

    const handleView = (item) => {
      store.commit(Mutations.SET_PATIENT.SELECT, item);
      router.push({ name: "patients-view-appointments" });
    };

    watch(searchName, () => {
      console.log(searchName.value);
      // tableData.value = tableData.value.filter(
      //   (data) =>
      //     data.first_name
      //       .toLowerCase()
      //       .includes(searchName.value.toLowerCase()) ||
      //     data.last_name.toLowerCase().includes(searchName.value.toLowerCase())
      // );
    });

    watchEffect(() => {
      tableData.value = list;
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Patients", []);
      store.dispatch(Actions.PATIENTS.LIST).then(() => {
        tableData.value = list;
        loading.value = false;
      });
    });

    return { tableHeader, tableData, searchName, handleView };
  },
});
</script>
