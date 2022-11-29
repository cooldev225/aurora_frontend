<template>
  <ModalWrapper
    title="Report Document Preview"
    modalId="report_document_preview"
    :updateRef="updateRef"
  >
    {{ pdfId }}
    <div class="h-450px" id="documentField">
      <div class="fv-row pdf_viewer_wrapper">
        <div id="document-view" class="pdf_viewer"></div>
      </div>
    </div>
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
  props: {
    patient: { required: true },
    appointment: { required: true },
    pdfId: { required: true },
  },
  setup(props) {
    const documentReportRef = ref();
    console.log("props", props);
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
