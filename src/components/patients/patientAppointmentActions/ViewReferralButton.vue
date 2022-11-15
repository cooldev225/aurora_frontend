<template>
  <LargeIconButton text="View Referral" @click="handleReferral()" />
  <AppointmentReferralModal
    :selectedApt="appointment"
  ></AppointmentReferralModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import AppointmentReferralModal from "@/views/patients/modals/AppointmentReferralModal.vue";

export default {
  components: { AppointmentReferralModal },
  props: {
    appointment: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleReferral = () => {
      const modal = new Modal(
        document.getElementById("modal_appointment_referral")
      );
      modal.show();
    };

    return { handleReferral };
  },
};
</script>
