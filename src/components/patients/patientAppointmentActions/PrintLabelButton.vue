<template>
  <LargeIconButton text="Print Label" @click="handlePrintLabel()" />
  <PrintLabelModal
    :patient="patient"
    :referral="appointment.referral"
  ></PrintLabelModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import PrintLabelModal from "@/views/patients/modals/PrintLabelsModal.vue";

export default {
  components: { PrintLabelModal },
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
  setup() {
    const handlePrintLabel = () => {
      const modal = new Modal(document.getElementById("modal_print_label"));
      modal.show();
    };

    return { handlePrintLabel };
  },
};
</script>
