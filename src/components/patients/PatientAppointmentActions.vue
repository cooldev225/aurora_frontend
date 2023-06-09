<template>
  <!--Specialist only actions-->
  <template v-if="userRole == 'specialist'">
    <AddRecallButton :appointment="appointment" :patient="patient" />
    <AddAudioButton :appointment="appointment" :patient="patient" />
    <CreateDocumentButton
      :appointment="appointment"
      :patient="patient"
      document-type="letter"
      :disabled="!hasLetterTemplates"
    />
    <CreateDocumentButton
      :appointment="appointment"
      :patient="patient"
      document-type="report"
      :disabled="!hasReportTemplates"
    />
    <CreateDocumentButton
      :appointment="appointment"
      :patient="patient"
      document-type="referral"
      :disabled="!hasReferralTemplates"
    />
  </template>

  <!--Admin only actions-->
  <template v-if="userRole != 'specialist'">
    <MakePaymentButton :appointment="appointment" :patient="patient" />
    <PrintLabelButton :appointment="appointment" :patient="patient" />
    <PrintHospitalCertificateButton
      :appointment="appointment"
      :patient="patient"
    />
  </template>

  <!--Actions for every body-->
  <PreAdmissionFormButton
    v-if="appointment.procedure_approval_status !== 'NOT_RELEVANT'"
    :appointment="appointment"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import store from "@/store";
import PreAdmissionFormButton from "./patientAppointmentActions/PreAdmissionFormButton.vue";
import CreateDocumentButton from "./patientAppointmentActions/CreateDocumentButton.vue";
import PrintLabelButton from "./patientAppointmentActions/PrintLabelButton.vue";
import AddRecallButton from "./patientAppointmentActions/AddRecallButton.vue";
import AddAudioButton from "./patientAppointmentActions/AddAudioButton.vue";
import PrintHospitalCertificateButton from "./patientAppointmentActions/PrintHospitalCertificateButton.vue";
import MakePaymentButton from "./patientAppointmentActions/MakePaymentButton.vue";
import IAppointment from "@/store/interfaces/IAppointment";
import IPatient from "@/store/interfaces/IPatient";
import IDocumentTemplate from "@/store/interfaces/IDocumentTemplate";
export default defineComponent({
  name: "patient-appointment-actions",
  components: {
    PreAdmissionFormButton,
    CreateDocumentButton,
    PrintLabelButton,
    PrintHospitalCertificateButton,
    AddRecallButton,
    AddAudioButton,
    MakePaymentButton,
  },
  props: {
    appointment: {
      required: true,
      type: Object as PropType<IAppointment>,
    },
    patient: {
      required: true,
      type: Object as PropType<IPatient>,
    },
    templates: {
      required: true,
      type: Array as PropType<Array<IDocumentTemplate>>,
    },
  },

  setup(props) {
    const userRole = computed(() => store.getters.userRole);

    const hasReportTemplates = computed(() => {
      if (!props.templates) {
        return false;
      }

      const templates = props.templates.filter(
        (template) => template.type == "REPORT"
      );

      return templates.length > 0;
    });

    const hasLetterTemplates = computed(() => {
      if (!props.templates) {
        return false;
      }

      const templates = props.templates.filter(
        (template) => template.type == "LETTER"
      );

      return templates.length > 0;
    });

    const hasReferralTemplates = computed(() => {
      if (!props.templates) {
        return false;
      }

      const templates = props.templates.filter(
        (template) => template.type == "REFERRAL"
      );

      return templates.length > 0;
    });

    return {
      userRole,
      hasReportTemplates,
      hasLetterTemplates,
      hasReferralTemplates,
    };
  },
});
</script>
