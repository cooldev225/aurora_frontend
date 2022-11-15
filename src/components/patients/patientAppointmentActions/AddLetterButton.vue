<template>
  <LargeIconButton text="Add Letter" @click="handleAddLetter" />
  <ReferralModal :patientId="patient.id"></ReferralModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
import ReferralModal from "@/views/patients/modals/ReferralModal.vue";
export default {
  components: { ReferralModal },
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
    const handleAddLetter = () => {
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
      const modal = new Modal(document.getElementById("modal_referral"));
      modal.show();
    };

    return { handleAddLetter };
  },
};
</script>
