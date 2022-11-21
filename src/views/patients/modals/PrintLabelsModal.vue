<template>
  <ModalWrapper
    title="Print Label"
    :modalId="'print_label_' + appointmentId"
    width="500px"
  >
    <div
      :id="'print_preview_box_' + appointmentId"
      class="print-preview-box mb-4"
    >
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
        <label class="fw-bold-fit">{{
          "(H) " +
          patient.contact_number +
          " (M) " +
          patient.int_contact_number +
          " (W) " +
          patient.kin_phone_number
        }}</label>
      </div>
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
.print-preview-box {
  word-spacing: 1rem;
  font-weight: 300 !important;
  font-size: 1.2rem;
  .fw-bolder {
    font-size: 1.8rem;
    font-weight: 700 !important;
  }
  .fw-bold {
    font-weight: 700 !important;
    word-spacing: 0.8rem;
  }
  .fw-bold-fit {
    font-weight: 700 !important;
    word-spacing: 0.1rem;
    font-size: 1.1rem;
  }
}
</style>
<script>
import { defineComponent } from "vue";
import genders from "@/core/data/genders";
import moment from "moment";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "patient-print-label-modal",
  props: {
    appointmentId: { type: Number, required: true },
    patient: { type: Object, required: true },
    referral: { type: Object, required: true },
  },
  setup(props) {
    const handlePrint = async () => {
      let element = document.getElementById(
        "print_preview_box_" + props.appointmentId
      );
      let opt = {
        margin: 0.1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "b7", orientation: "landscape" },
      };
      html2pdf()
        .from(element)
        .set(opt)
        //.outputPdf()
        .output("blob")
        .then((blob) => {
          var blobURL = URL.createObjectURL(blob);
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
        });
      // .save();
    };

    return {
      genders,
      moment,
      handlePrint,
    };
  },
});
</script>
