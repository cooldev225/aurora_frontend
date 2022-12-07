<template>
  <LargeIconButton text="Create Report" @click="handleReport()" />
  <ReportModal></ReportModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import ReportModal from "@/views/patients/modals/ReportTemplateSelectModal.vue";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
export default {
  components: { ReportModal },
  props: {
    appointment: {
      required: true,
      type: Object,
    },
    patient: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const router = useRouter();
    const handleReport = () => {
      // const modal = new Modal(document.getElementById("modal_report"));
      // modal.show();
      router.push({
        name: "patients-report",
        params: {
          patientId: props.patient.id,
          appointmentId: props.appointment.id,
        },
      });
    };

    return { handleReport };
  },
};
</script>
