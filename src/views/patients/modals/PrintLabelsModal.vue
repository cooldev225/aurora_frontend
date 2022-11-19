<template>
  <ModalWrapper
    title="Print Label"
    :modalId="'print_label_' + appointmentId"
    width="500px"
  >
    <div class="pdf_viewer_wrapper">
      <div :id="'divPDFViewer_' + appointmentId" class="pdf_viewer"></div>
    </div>
    <div class="modal-footer flex-center">
      <button
        class="btn btn-lg btn-primary"
        type="button"
        @click="handlePrint()"
      >
        Print
      </button>
    </div>
  </ModalWrapper>
</template>
<style lang="scss">
.pdf_viewer_wrapper {
  width: 100%;
  height: 175px;
  > .pdf_viewer {
    height: 100%;
  }
}
// .print-preview-box {
//   word-spacing: 0.5rem;
//   font-weight: 300 !important;
//   font-size: 1.2rem;
//   & > .fw-bolder {
//     font-size: 1.8rem;
//     font-weight: 700 !important;
//   }
//   & > .fw-bold {
//     font-weight: 700 !important;
//     word-spacing: 1rem;
//   }
//   & > .fw-bold.fit {
//     word-spacing: 0.1rem;
//   }
// }
</style>
<script>
import { defineComponent, ref, onMounted } from "vue";
import genders from "@/core/data/genders";
import moment from "moment";
import pdf from "pdfobject";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";

export default defineComponent({
  name: "patient-print-label-modal",
  props: {
    appointmentId: { type: Number, required: true },
  },
  setup(props) {
    const store = useStore();
    const file = ref(null);
    const handlePrint = () => {
      //var blob = new Blob([tempFile.value], { type: "application/pdf" });
      var blobURL = URL.createObjectURL(file.value);

      let iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      iframe.style.display = "none";
      iframe.src = blobURL;
      iframe.onload = function () {
        setTimeout(function () {
          iframe.focus();
          iframe.contentWindow.print();
        }, 1);
      };
    };
    onMounted(() => {
      store
        .dispatch(PatientActions.PRINT_LABEL, props.appointmentId)
        .then((data) => {
          file.value = data;
          const blob = new Blob([data], { type: "application/pdf" });
          const objectUrl = URL.createObjectURL(blob);

          pdf.embed(objectUrl, "#divPDFViewer_" + props.appointmentId, {
            pdfOpenParams: { pagemode: "none" },
            width: "200%",
            height: "100%",
          });
        });
    });

    return {
      genders,
      moment,
      handlePrint,
    };
  },
});
</script>
