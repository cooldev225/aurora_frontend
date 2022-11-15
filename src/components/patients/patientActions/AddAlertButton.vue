<template>
  <LargeIconButton text="Add Alert" @click="handleAddAlert" />

  <CreatePatientAlertModal :patientId="patient.id"></CreatePatientAlertModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import CreatePatientAlertModal from "@/views/patients/modals/CreatePatientAlertModal.vue";
export default {
  components: { CreatePatientAlertModal },
  props: {
    patient: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleAddAlert = () => {
      const modal = new Modal(document.getElementById("modal_patient_alert"));
      modal.show();
    };

    return { handleAddAlert };
  },
};
</script>
