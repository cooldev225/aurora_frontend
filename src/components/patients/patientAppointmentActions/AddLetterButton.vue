<template>
  <LargeIconButton text="Add Letter" @click="handleAddLetter" />
  <ReferralModal v-if="patient.id" patientId="patient.id" />
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
import ReferralModal from "@/views/patients/modals/ReferralModal.vue";
export default {
  components: { ReferralModal },
  props: {
    patient: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleAddLetter = () => {
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
      const modal = new Modal(document.getElementById("modal_referral"));
      modal.show();
    };

    return { handleAddLetter };
  },
};
</script>
