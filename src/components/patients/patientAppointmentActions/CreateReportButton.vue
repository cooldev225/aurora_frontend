<template>
  <LargeIconButton text="Create Report" @click="handleReport()" />
  <ReportModal></ReportModal>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
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
  },
  setup() {
    const handleReport = () => {
      store.dispatch(Actions.REPORT_TEMPLATES.LIST);
      const modal = new Modal(document.getElementById("modal_report"));
      modal.show();
    };

    return { handleReport };
  },
};
</script>
