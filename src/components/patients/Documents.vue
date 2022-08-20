<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_documents">
    <div class="row p-5">
      <div class="col-md-4">
        <el-select
          class="w-100 mb-5"
          placeholder="Select Document Type"
          v-model="documentType"
        >
          <el-option value="ALL" label="ALL DOCUMENT TYPE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen054.svg"
            />
            ALL DOCUMENT TYPE
          </el-option>
          <el-option value="LETTER" label="LETTER">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen005.svg"
            />
            LETTER
          </el-option>
          <el-option value="REPORT" label="REPORT">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen016.svg"
            />
            REPORT
          </el-option>
          <el-option value="CLINICAL_NOTE" label="CLINICAL NOTE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/files/fil003.svg"
            />
            CLINICAL NOTE
          </el-option>
          <el-option label="PATHOLOGY REPORT" value="PATHOLOGY_REPORT">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/files/fil004.svg"
            />
            PATHOLOGY REPORT
          </el-option>
          <el-option label="AUDIO" value="AUDIO">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen015.svg"
            />
            AUDIO
          </el-option>
          <el-option label="USB CAPTURE" value="USB_CAPTURE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/electronics/elc007.svg"
            />
            USB CAPTURE
          </el-option>
          <el-option label="OTHER" value="OTHER">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen025.svg"
            />
            OTHER
          </el-option>
        </el-select>
        <div
          v-if="documentList?.length === 0"
          class="d-flex justify-content-center align-items-center p-5 fs-3"
        >
          No Document Exist
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
            <label
              class="btn btn-outline btn-outline-dashed btn-outline-default p-3 d-flex align-items-center mb-5"
              :for="item.id"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg
                  v-if="item.document_type === 'LETTER'"
                  src="media/icons/duotune/general/gen005.svg"
                />
                <inline-svg
                  v-else-if="item.document_type === 'REPORT'"
                  src="media/icons/duotune/general/gen016.svg"
                />
                <inline-svg
                  v-else-if="item.document_type === 'CLINICAL_NOTE'"
                  src="media/icons/duotune/files/fil003.svg"
                />
                <inline-svg
                  v-else-if="item.document_type === 'PATHOLOGY_REPORT'"
                  src="media/icons/duotune/files/fil004.svg"
                />
                <inline-svg
                  v-else-if="item.document_type === 'AUDIO'"
                  src="media/icons/duotune/general/gen015.svg"
                />
                <inline-svg
                  v-else-if="item.document_type === 'USB_CAPTURE'"
                  src="media/icons/duotune/electronics/elc007.svg"
                />
                <inline-svg
                  v-else
                  src="media/icons/duotune/general/gen025.svg"
                />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-1">
                  {{ item.document_name }}
                </span>
                <span class="text-gray-400 fw-bold fs-6">{{
                  moment(item.created_at).format("DD-MM-YYYY HH:mm A")
                }}</span>
              </span>
              <!--end::Info-->
            </label>
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
  </div>
  <SendDocumentViaEmail
    v-if="selectedDocument"
    :document="selectedDocument"
  ></SendDocumentViaEmail>
  <!--end::details View-->
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
import moment from "moment";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import SendDocumentViaEmail from "./SendDocumentViaEmail.vue";
import { Modal } from "bootstrap";
import pdf from "pdfobject";

export default defineComponent({
  name: "patient-documents",
  components: {
    IconButton,
    SendDocumentViaEmail,
  },
  setup() {
    const store = useStore();
    const formData = ref({});
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const documentList = ref(null);
    const _documentList = computed(() => store.getters.getPatientDocumentList);
    const selectedDocument = ref(null);
    const documentType = ref("ALL");
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
      moment,
      printObj,
      printLoading,
      handleSendEmail,
    };
  },
});
</script>
