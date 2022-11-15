<template>
  <ModalWrapper title="Print Label" modalId="print_label">
    Print Labels for {{ patient.full_name }}
  </ModalWrapper>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "patient-print-label-modal",
  props: {
    patient: { type: Object, required: true },
  },
});
</script>
