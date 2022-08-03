<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Appointment List</h3>
      </div>
      <span class="my-auto">
        <label class="form-check my-auto form-check-custom form-check-solid">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="showFutureApt"
          />
          <span class="form-check-label user-select-none">
            Show Future Appointments
          </span>
        </label></span
      >
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <Datatable
        v-if="tableData"
        :table-header="tableHeader"
        :table-data="tableData"
        :key="tableKey"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-date="{ row: item }">
          <div class="p-4 d-flex flex-column">
            <span
              :class="`mb-1 p-2 rounded text-uppercase badge-xl badge-${
                item.confirmation_status === 'CONFIRMED'
                  ? 'success'
                  : item.confirmation_status === 'CANCELED'
                  ? 'danger'
                  : item.confirmation_status === 'MISSED'
                  ? 'danger'
                  : 'warning'
              } mb-2`"
              style="width: fit-content"
            >
              {{ item.confirmation_status.replace("_", " ") }}</span
            >
            <div v-if="item.confirmation_status === 'CANCELED'">
              Reason: cancel_reason
            </div>
            <span>{{ item.date }} {{ item.start_time }}</span>
            <span>@ {{ item.clinic_name }}</span>

            <span>{{ item.appointment_type_name }}</span>
            <span> {{ item.specialist_name }}</span>
          </div>
        </template>
        <template v-slot:cell-referral="">
          <div class="d-flex flex-column">
            <span>referral_date</span>
            <span>referral_duration</span>
            <span>referral_expiry date</span>
          </div>
          <button class="btn btn-bg-light btn-active-color-primary btn-sm mt-2">
            Update Referral
          </button>
        </template>
        <template v-slot:cell-attendance_status="{ row: item }">
          <div class="d-flex flex-column">
            <span
              :class="`text-uppercase badge badge-light-${
                item.attendance_status === 'not_present'
                  ? 'dark'
                  : item.attendance_status === 'waiting'
                  ? 'warning'
                  : item.attendance_status === 'checked_in'
                  ? 'success'
                  : 'primary'
              } mb-2`"
              style="width: fit-content"
            >
              {{ item.attendance_status.replace("_", " ") }}</span
            >

            <span>collecting_person_name</span>
            <span>collecting_person_phone</span>
            <span>collecting_person_alternate_contact</span>
          </div>
          <button class="btn btn-bg-light btn-active-color-primary btn-sm mt-2">
            Update Collecting Person
          </button>
        </template>
        <template v-slot:cell-report="{ row: item }">
          <div class="d-flex flex-column">
            <a
              @click="handlePay"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/finance/fin002.svg" />
              </span>
              Payment
            </a>
            <a class="btn btn-sm btn-light btn-icon-primary me-2 mb-2">
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/files/fil017.svg" />
              </span>
              Hospital Certificate
            </a>
            <a
              v-if="item.procedure_approval_status !== 'NOT_RELEVANT'"
              @click="handlePreAdmission(item)"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/general/gen004.svg" />
              </span>
              Pre-Admission Form
            </a>
          </div>
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import {
  defineComponent,
  watchEffect,
  watch,
  ref,
  onMounted,
  computed,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import moment from "moment";
import { Mutations } from "@/store/enums/StoreEnums";
import md5 from "js-md5";

export default defineComponent({
  name: "patient-appointments",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const list = computed(() => store.getters.selectedPatient);
    const formData = ref();
    const tableHeader = ref([
      {
        name: "Time/Place",
        key: "date",
        sortable: true,
      },
      {
        name: "Referral",
        key: "referral",
        sortable: false,
      },
      {
        name: "Attendance Status",
        key: "attendance_status",
        sortable: false,
      },
      {
        name: "Actions",
        key: "report",
        sortable: false,
      },
    ]);
    const tableData = ref([]);
    const tableKey = ref(0);
    const showFutureApt = ref(false);

    const renderTable = () => tableKey.value++;

    const handlePay = () => {
      router.push({ name: "make-payment-pay" });
    };

    const handlePreAdmission = (item) => {
      // store.commit(Mutations.SET_APT.SELECT, item);
      router.push({
        path: "/appointment_pre_admissions/show/" + md5(item.id.toString()),
      });
    };

    const handleView = () => {
      router.push({ name: "make-payment-view" });
    };

    const generateID = (id) => {
      let prefix = "";
      let i = 0;
      while (i < 6 - id.toString().length) {
        prefix += "0";
        i++;
      }
      return prefix + id.toString();
    };

    watch(showFutureApt, () => {
      console.log(showFutureApt.value);
      const today = moment(new Date());
      if (showFutureApt.value) {
        tableData.value = formData.value;
      } else {
        tableData.value = formData.value.filter((data) => {
          return moment(data.date).isSameOrBefore(today.startOf("day"), "day");
        });
      }
      renderTable();
    });

    watchEffect(() => {
      formData.value = list.value.appointments;
      if (formData.value) {
        const today = moment(new Date());
        tableData.value = formData.value.filter((data) => {
          return moment(data.date).isSameOrBefore(today.startOf("day"), "day");
        });
      } else {
        tableData.value = formData.value;
      }
      console.log(formData.value);
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
    });

    return {
      tableHeader,
      tableData,
      tableKey,
      formData,
      showFutureApt,
      generateID,
      handlePay,
      handlePreAdmission,
      handleView,
    };
  },
});
</script>
