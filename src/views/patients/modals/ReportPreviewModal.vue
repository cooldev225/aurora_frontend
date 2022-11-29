<template>
  <ModalWrapper
    title="Report Document Preview"
    modalId="report_document_preview"
    :updateRef="updateRef"
  >
    <div class="preview-pdf-title">
      <div>
        <p>Patient Name : {{ patient.full_name }}</p>
        <p>Appointment Type : {{ appointment.appointment_type_name }}</p>
        <p>
          Date : {{ appointment.date
          }}{{ appointment.formatted_appointment_time }}
        </p>
      </div>
      <div>
        <p>To : {{ appointment?.referral?.doctor_address_book?.full_name }}</p>
        <p>
          Number : {{ appointment?.referral?.doctor_address_book?.provider_no }}
        </p>
      </div>
    </div>
    <div class="h-450px" id="documentField">
      <div class="fv-row pdf_previewer_wrapper">
        <div id="document-preview" class="pdf_viewer"></div>
      </div>
    </div>
    <div class="preview-pdf-action">
      <div>
        <button
          class="btn btn-lg btn-secondary"
          data-bs-dismiss="modal"
          type="button"
        >
          Edit Report
        </button>
      </div>
      <div class="save-action-container">
        <button
          class="btn btn-lg btn-primary"
          data-bs-dismiss="modal"
          type="button"
        >
          Save And Send
        </button>
        <button
          class="btn btn-lg btn-primary"
          data-bs-dismiss="modal"
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>
<style lang="scss">
.preview-pdf-title,
.preview-pdf-action {
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
  > .save-action-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    > button {
      margin-left: 15px;
    }
  }
}
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
import { DocumentMutations } from "@/store/enums/StoreDocumentEnums";
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
    const router = useRouter();

    const documentReportRef = ref();
    console.log("props", props);
    const updateRef = (_ref) => {
      documentReportRef.value = _ref;
    };

    const tempFile = ref();

    const submit = () => {
      store.commit(DocumentMutations.SET_SELECTED_DOCUMENT, {
        id: data,
      });
      router.push({
        path: "/patients/" + patientId + "/documents",
      });
    };

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
