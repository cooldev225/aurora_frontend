<template>
  <LargeIconButton text="Upload Document" @click="handleUploadDocument" />
  <UploadDocumentModal :patientId="patient.id + ''"></UploadDocumentModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";

import UploadDocumentModal from "@/views/patients/modals/UploadDocumentModal.vue";
export default {
  components: { UploadDocumentModal },
  props: {
    patient: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleUploadDocument = () => {
      const modal = new Modal(document.getElementById("modal_upload_document"));
      modal.show();
    };

    return { handleUploadDocument };
  },
};
</script>
