<template>
  <ModalWrapper title="Print Label" modalId="print_label" width="227px">
    <div class="pdf_viewer_wrapper">
      <div id="divPDFViewer" class="pdf_viewer"></div>
    </div>
    <!-- <div id="print_preview" class="print-preview-box mb-4">
      <div class="d-flex justify-content-between fw-bolder">
        <label>{{ patient.last_name }}</label>
      </div>
      <div class="d-flex justify-content-between fw-bold">
        <label>{{ patient.first_name }}</label>
        <label>{{
          "DOB: " +
          moment(patient.date_of_birth).format("DD/MM/YYYY") +
          " " +
          genders.filter((g) => g.value === patient.gender)[0].label.charAt(0)
        }}</label>
      </div>
      <div class="d-flex justify-content-between">
        <label>{{ patient.address }}</label>
        <label class="fw-bold">{{ patient.id }}</label>
      </div>
      <div>
        <label>{{
          patient.suburb + ", " + patient.postcode + ", " + patient.birth_state
        }}</label>
      </div>
      <div>
        <label class="fw-bold">{{
          "Ref Doc: " + referral.doctor_address_book_name
        }}</label>
      </div>
      <div>
        <label class="fw-bold">{{
          referral.doctor_address_book.address
        }}</label>
      </div>
      <div>
        <label>{{
          "M/C #: " +
          patient.medicare_details.medicare_no +
          " - " +
          patient.medicare_details.medicare_reference_no
        }}</label>
      </div>
      <div>
        <label class="fw-bold fit" style="word-spacing: '0.1rem'">{{
          "(H) " +
          patient.contact_number +
          " (M) " +
          patient.int_contact_number +
          " (W) " +
          patient.kin_phone_number
        }}</label>
      </div>
    </div> -->
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
  width: 227px;
  height: 90px;
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

      pdf.embed(blobURL, "#divPDFViewer", {
        pdfOpenParams: { pagemode: "none" },
      });

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
          console.log(objectUrl);
          pdf.embed(objectUrl, "#divPDFViewer", {
            pdfOpenParams: { pagemode: "none" },
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
