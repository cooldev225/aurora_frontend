<template>
  <ModalWrapper
    title="Report Document Preview"
    modalId="report_document_preview"
    :updateRef="updateRef"
  >
    {{ pdfId }}
    <div class="h-450px" id="documentField">
      <div class="fv-row pdf_previewer_wrapper">
        <div id="document-preview" class="pdf_viewer"></div>
      </div>
    </div>
  </ModalWrapper>
</template>
<style lang="scss">
.pdf_previewer_wrapper {
  height: 100%;
  > .pdf_viewer {
    height: 100%;
    overflow: auto;
  }
}
.filter-appointment {
  width: calc(100% - 215px);
}
</style>
<script>
import { defineComponent, ref, watchEffect, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Mutations } from "@/store/enums/StoreEnums";
import { Actions } from "@/store/enums/StoreEnums";
import pdf from "pdfobject";

export default defineComponent({
  name: "report-preview-modal",
  components: {},
  props: {
    patient: { required: true },
    appointment: { required: true },
    pdfId: { required: true },
  },
  setup(props) {
    const store = useStore();

    const documentReportRef = ref();
    console.log("props", props);
    const updateRef = (_ref) => {
      documentReportRef.value = _ref;
    };

    const tempFile = ref();

    watchEffect(() => {
      props.pdfId &&
        store
          .dispatch(Actions.FILE.VIEW, {
            path: props.pdfId,
            type: "PATIENT_PREVIEW_DOCUMENT",
          })
          .then((data) => {
            document.getElementById("document-preview").innerHTML = "";
            tempFile.value = data;
            let blob = new Blob([data], { type: "application/pdf" });
            let objectUrl = URL.createObjectURL(blob);
            pdf.embed(objectUrl + "#toolbar=0", "#document-preview");
          })
          .catch(() => {
            console.log("Document Load Error");
          });
    });

    return {
      documentReportRef,
      updateRef,
    };
  },
});
</script>
