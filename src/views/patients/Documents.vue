<template>
  <CardSection>
    <div class="row">
      <div class="col-md-4">
        <el-select
          class="w-100 mb-6"
          placeholder="Select Document Type"
          v-model="documentType"
        >
          <el-option value="ALL" label="ALL DOCUMENT TYPE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen054.svg"
            />
            ALL DOCUMENT TYPES
          </el-option>
          <template v-for="type in patientDocumentTypes" :key="type.value">
            <el-option :value="type.value" :label="type.label">
              <inline-svg class="me-5" :src="type.icon" />
              {{ type.label }}
            </el-option>
          </template>
        </el-select>
        <div
          v-if="documentList?.length === 0"
          class="d-flex justify-content-center align-items-center fs-3"
        >
          No Documents Exist
        </div>
        <div class="d-flex flex-column h-450px scroll">
          <div v-for="item in documentList" :key="item.id">
            <input
              type="radio"
              class="btn-check"
              :name="item.created_at"
              :value="item"
              :id="item.id"
              v-model="selectedDocument"
            />
            <DocumentLabel :document="item" />
          </div>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="d-flex flex-row justify-content-end align-items-end">
          <template v-if="selectedDocument">
            <button
              :data-kt-indicator="printLoading ? 'on' : null"
              class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
              v-print="printObj"
              type="submit"
            >
              <span v-if="!printLoading" class="indicator-label">
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="media/icons/duotune/general/gen060.svg" />
                </span>
                Print
              </span>
              <span v-if="printLoading" class="indicator-progress pb-1">
                <span
                  class="spinner-border spinner-border-sm svg-icon svg-icon-1"
                ></span>
                Processing
              </span>
            </button>
            <IconButton
              iconSRC="media/icons/duotune/communication/com011.svg"
              label="Email"
              @click="handleSendEmail"
            />
          </template>
        </div>
        <div class="h-450px border" id="documentField">
          <img v-if="false" :src="selectedDocument.file_path" alt="document" />
          <div class="fv-row my-4 pdf_viewer_wrapper">
            <div id="divPDFViewer" class="pdf_viewer"></div>
          </div>
        </div>
      </div>
    </div>
  </CardSection>
  <SendDocumentViaEmail
    v-if="selectedDocument"
    :document="selectedDocument"
  ></SendDocumentViaEmail>
</template>

<style lang="scss">
.pdf_viewer_wrapper {
  height: 100%;
  > .pdf_viewer {
    height: 100%;
  }
}
</style>

<script>
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import SendDocumentViaEmail from "./SendDocumentViaEmail.vue";
import { Modal } from "bootstrap";
import pdf from "pdfobject";
import patientDocumentTypes from "@/core/data/patient-document-types";
import DocumentLabel from "@/views/patients/documents/DocumentLabel.vue";

export default defineComponent({
  name: "patient-documents",
  components: {
    IconButton,
    SendDocumentViaEmail,
    DocumentLabel,
  },
  setup() {
    const store = useStore();
    const formData = ref({});
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const _documentList = computed(() => store.getters.getPatientDocumentList);
    const documentList = ref(null);
    const selectedDocument = ref(null);
    const documentType = ref("ALL");
    const appointments = ref();
    const printLoading = ref(false);
    const printObj = ref({
      id: "documentField",
      extraCss:
        "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
      extraHead: '<meta http-equiv="Content-Language" content="en-us"/>',
      beforeOpenCallback() {
        printLoading.value = true;
      },
      openCallback() {
        printLoading.value = false;
      },
    });
    onMounted(() => {
      store.dispatch(Actions.PATIENTS.DOCUMENT.LIST, selectedPatient.value.id);
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
    });

    watch(_documentList, () => {
      documentList.value = _documentList.value;
    });

    watch(documentType, () => {
      if (documentType.value === "ALL") {
        documentList.value = _documentList.value;
      } else {
        documentList.value = _documentList.value.filter(
          (item) => item.document_type === documentType.value
        );
      }
    });

    watch(selectedDocument, () => {
      if (selectedDocument.value.file_path) {
        pdf.embed(selectedDocument.value.file_path, "#divPDFViewer");
        // pdf.embed(
        //   "https://pspdfkit.com/downloads/pspdfkit-web-demo.pdf",
        //   "#divPDFViewer"
        // );
      }
      // pdfSrc.value = selectedDocument.value;
      // printObj.value.url = selectedDocument.value["file_path"];
    });

    const handleSendEmail = () => {
      const modal = new Modal(document.getElementById("modal_send_email"));
      modal.show();
    };

    return {
      formData,
      documentList,
      selectedDocument,
      documentType,
      printObj,
      printLoading,
      handleSendEmail,
      patientDocumentTypes,
      DocumentLabel,
    };
  },
});
</script>
