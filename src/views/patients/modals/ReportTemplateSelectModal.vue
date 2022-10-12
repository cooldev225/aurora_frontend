<template>
  <ModalWrapper
    title="Select Report Template"
    modalId="report"
    modalRef="reportModal"
    class="modal fade"
    aria-hidden="true"
  >
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
      <InputWrapper label="Report Template">
        <el-select
          class="w-100"
          v-model="reportTemplate"
          placeholder="Select Report Template"
        >
          <el-option
            v-for="(option, idx) in reportTemplatesData"
            :key="option.id"
            :value="idx"
            :label="option.title"
          />
        </el-select>
      </InputWrapper>

      <InputWrapper label="Header/Footer Template">
        <el-select
          class="w-100"
          v-model="reportTemplate"
          placeholder="Select Header/Footer Template"
        >
          <el-option
            v-for="(option, idx) in headerFooterTemplatesData"
            :key="option.id"
            :value="idx"
            :label="option.title"
          />
        </el-select>
      </InputWrapper>

      <InputWrapper label="Appointment">
        <el-select
          class="w-100"
          v-model="appointment"
          placeholder="Select Appointment"
        >
          <el-option
            v-for="(option, idx) in appointmentsData"
            :key="option.id"
            :value="idx"
            :label="option.appointment_type_name"
          />
        </el-select>
      </InputWrapper>

      <button
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary m-6"
        type="submit"
        data-bs-dismiss="modal"
      >
        <span v-if="!loading" class="indicator-label"> Select </span>
        <span v-if="loading" class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>
    </el-form>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, watchEffect, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "report-modal",
  components: {},
  props: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const list = computed(() => store.getters.getReportTemplateList);
    const headerFooterData = computed(
      () => store.getters.getHeaderFooterTemplateList
    );
    const patientData = computed(() => store.getters.selectedPatient);
    const loading = ref(false);
    const reportTemplate = ref();
    const appointment = ref();
    const reportTemplatesData = ref([]);
    const headerFooterTemplatesData = ref([]);
    const appointmentsData = ref([]);
    const reportModal = ref(null);

    onMounted(() => {
      loading.value = true;
      store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST).then(() => {
        loading.value = false;
      });
    });

    watchEffect(() => {
      reportTemplatesData.value = list.value;
      headerFooterTemplatesData.value = headerFooterData.value;
      appointmentsData.value = patientData.value.appointments;
      store.commit(
        Mutations.SET_REPORT_APPOINTMENTS.LIST,
        patientData.value.appointments
      );
    });

    const submit = () => {
      store.commit(Mutations.SET_REPORT_TEMPLATES.SELECT, {
        template: reportTemplatesData.value[reportTemplate.value],
        appointment: appointmentsData.value[appointment.value],
      });

      // hideModal(reportModal.value);
      router.push({ name: "patients-report" });
    };

    return {
      loading,
      reportModal,
      reportTemplate,
      reportTemplatesData,
      appointment,
      appointmentsData,
      submit,
    };
  },
});
</script>
