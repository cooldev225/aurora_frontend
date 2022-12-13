<template>
  <LargeIconButton text="View Referral" @click="handleReferral()" />
  <AppointmentReferralModal
    :appointment="appointment"
  ></AppointmentReferralModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import AppointmentReferralModal from "@/views/patients/modals/AppointmentReferralModal.vue";
import { PropType } from "vue";
import IAppointment from "@/store/interfaces/IAppointment";

export default {
  components: { AppointmentReferralModal },
  props: {
    appointment: {
      required: true,
      type: Object as PropType<IAppointment>,
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
