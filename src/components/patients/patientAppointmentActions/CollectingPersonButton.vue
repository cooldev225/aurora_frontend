<template>
  <LargeIconButton
    text="Update Collecting Person"
    @click="handleCollectingPerson"
  />

  <CollectingPersonModal :selectedApt="appointment" />
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import CollectingPersonModal from "@/views/patients/modals/CollectingPersonModal.vue";

export default {
  components: { CollectingPersonModal },
  props: {
    appointment: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const handleCollectingPerson = () => {
      const modal = new Modal(
        document.getElementById("modal_collecting_person")
      );
      modal.show();
    };
    return { handleCollectingPerson };
  },
};
</script>
