<template>
  <CardSection heading="Appointment List">
    <template #header-actions>
      <label class="form-check my-auto form-check-custom form-check-solid">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="showFutureApt"
        />
        <span class="form-check-label user-select-none">
          Show Future Appointments
        </span>
      </label>
    </template>
    <template #default>
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
              Reason: {{ item.cancel_reason }}
            </div>
            <span
              >{{ item.aus_formatted_date }}
              {{ item.formatted_appointment_time }}</span
            >
            <span>@ {{ item.clinic_details.name }}</span>

            <span>{{ item.appointment_type.name }}</span>
            <span> {{ item.specialist_name }}</span>
          </div>
        </template>
        <template v-slot:cell-referral="{ row: item }">
          <div
            v-if="item.referral.referring_doctor_name"
            class="d-flex flex-column"
          >
            <div v-if="!item.is_no_referral" class="d-flex flex-column">
              <span>{{ item.referral.referring_doctor_name }}</span>
              <span>{{ item.referral.referral_date }}</span>
              <span>{{ item.referral.referral_duration }} months</span>
            </div>
            <div v-else-if="item.is_no_referral" class="d-flex flex-column">
              <span> NO REFERRAL </span>
              <span>{{ item.referral.no_referral_reason }}</span>
            </div>
          </div>
          <div v-else class="d-flex flex-column">No referral information</div>
          <button
            class="btn btn-bg-light btn-active-color-primary btn-sm mt-2"
            @click="handleReferral(item)"
          >
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
            <span>{{ item.collecting_person_name }}</span>
            <span>{{ item.collecting_person_phone }}</span>
            <span>{{ item.collecting_person_alternate_contact }}</span>
          </div>
          <button
            class="btn btn-bg-light btn-active-color-primary btn-sm mt-2"
            @click="handleCollectingPerson(item)"
          >
            Update Collecting Person
          </button>
        </template>
        <template v-slot:cell-report="{ row: item }">
          <div class="d-flex flex-column">
            <a
              @click="handlePay(item)"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/finance/fin002.svg" />
              </span>
              Payment
            </a>
            <a
              @click="handlePrintHospitalCertificate(item)"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
            >
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
            <a
              v-if="item.procedure_approval_status !== 'NOT_RELEVANT'"
              @click="handlePreAdmissionTest(item)"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/general/gen004.svg" />
              </span>
              Pre-Admission Test
            </a>
          </div>
        </template>
      </Datatable>
    </template>
  </CardSection>

  <CollectingPersonModal :selectedApt="selectedApt"></CollectingPersonModal>
  <AppointmentReferralModal
    :selectedApt="selectedApt"
  ></AppointmentReferralModal>
  <!--end::details View-->

  <ProcedureApprovalModal isEditable="false" :selectedApt="selectedApt" />
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
import { useRouter, useRoute } from "vue-router";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import moment from "moment";
import CollectingPersonModal from "./modals/CollectingPersonModal.vue";
import AppointmentReferralModal from "./modals/AppointmentReferralModal.vue";
import ProcedureApprovalModal from "./modals/ProcedureApprovalModal.vue";
import { Modal } from "bootstrap";
import { Actions } from "@/store/enums/StoreEnums";
import md5 from "js-md5";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import tableHeader from "element-plus/es/components/table/src/table-header";
export default defineComponent({
  name: "patient-appointments",
  components: {
    Datatable,
    CollectingPersonModal,
    AppointmentReferralModal,
    ProcedureApprovalModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
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
    const showFutureApt = ref(true);

    const renderTable = () => tableKey.value++;

    const handlePay = (item) => {
      store.dispatch(Actions.MAKE_PAYMENT.VIEW, item.id).then(() => {
        setTimeout(() => {
          router.push({ name: "make-payment-pay" });
        }, 100);
      });
    };

    const handlePreAdmission = (item) => {
      selectedApt.value = {
        patient_id: list.value.id,
        ...item,
      };
      const modal = new Modal(
        document.getElementById("modal_view_pre_admission")
      );
      modal.show();
    };

    const handlePreAdmissionTest = (item) => {
      router.push({
        path:
          "/appointment_pre_admissions/show/" +
          md5(item.id.toString()) +
          "/form_1",
      });
    };

    const handleView = () => {
      router.push({ name: "make-payment-view" });
    };

    const selectedApt = ref({});

    const handleCollectingPerson = (item) => {
      selectedApt.value = {
        patient_id: list.value.id,
        ...item,
      };
      // store.commit(Mutations.SET_APT.SELECT, item);
      const modal = new Modal(
        document.getElementById("modal_collecting_person")
      );
      modal.show();
    };

    const handleReferral = (item) => {
      selectedApt.value = {
        patient_id: list.value.id,
        ...item,
      };
      const modal = new Modal(
        document.getElementById("modal_appointment_referral")
      );
      modal.show();
    };

    const handlePrintHospitalCertificate = (item) => {
      router.push({
        name: "appointment-print-hospital-certificate-view",
      });
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
      renderTable();
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Appointments", ["Patients"]);
      const id = route.params.id;
      store.dispatch(PatientActions.PATIENTS.VIEW, id);
    });

    return {
      tableHeader,
      tableData,
      tableKey,
      formData,
      showFutureApt,
      selectedApt,
      generateID,
      handlePay,
      handlePreAdmission,
      handlePreAdmissionTest,
      handleReferral,
      handleCollectingPerson,
      handlePrintHospitalCertificate,
      handleView,
    };
  },
});
</script>
