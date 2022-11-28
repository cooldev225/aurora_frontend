<template>
  <ModalWrapper
    title="Report Document Preview"
    modalId="report_document_preview"
    :updateRef="updateRef"
  >
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "report-preview-modal",
  components: {},
  props: {},
  setup() {
    const documentReportRef = ref();

    const updateRef = (_ref) => {
      documentReportRef.value = _ref;
    };
    return {
      documentReportRef,
      updateRef,
    };
  },
});
</script>
