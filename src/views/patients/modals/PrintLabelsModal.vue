<template>
  <ModalWrapper
    title="Print Label"
    :modalId="'print_label_' + appointmentId"
    width="500px"
  >
    <div
      :id="'print_preview_box_' + appointmentId"
      class="-m-5 d-flex text-xs p-5 flex-column print-preview-box mb-4 border-primary border-solid"
    >
      <span class="font-uppercase">{{ patient.last_name }}</span
      ><br />
      {{ patient.first_name }}<br />

      {{
        "DOB: " +
        moment(patient.date_of_birth).format("DD/MM/YYYY") +
        " " +
        genders.filter((g) => g.value === patient.gender)[0].label.charAt(0)
      }}
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
<style>
@media print {
  @page {
    size: portrait;
    margin-left: 0.5in;
    margin-right: 0.5in;
    margin-top: 0px;
    margin-bottom: 0;
  }

  body {
    width: 2in;
    height: 1in;
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
    const printElem = (elem) => {
      var mywindow = window.open("", "PRINT");

      mywindow.document.write("<html><head>");
      mywindow.document.write("</head><body class='print'>");
      mywindow.document.write(
        "<style>@media   @page {size: portrait; margin-left: 0.5in; margin-right:0.5in;     margin-bottom: 0;  }}</style>"
      );
      mywindow.document.write(document.getElementById(elem).innerHTML);
      mywindow.document.write("</body></html>");

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10

      mywindow.print();
      mywindow.close();

      return true;
    };

    const handlePrint = async () => {
      printElem("print_preview_box_" + props.appointmentId);
      /*
      let element = document.getElementById(
        "print_preview_box_" + props.appointmentId
      );
      let opt = {
        margin: 0.1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 100, letterRendering: true },
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
        });*/
    };

    return {
      genders,
      moment,
      handlePrint,
    };
  },
});
</script>
