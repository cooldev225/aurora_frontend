<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_documents">
    <div class="row h-450px p-5">
      <div class="col-md-4">
        <el-select
          class="w-100 mb-5"
          placeholder="Select Document Type"
          v-model="documentType"
        >
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
          <el-option value="ALL" label="ALL DOCUMENT TYPE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen054.svg"
            />
            ALL DOCUMENT TYPE
          </el-option>
        </el-select>
        <div
          v-if="documentList?.length === 0"
          class="d-flex justify-content-center align-items-center p-5 fs-3"
        >
          No Document Exist
        </div>
        <div v-for="(item, idx) in documentList" :key="item.id">
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
              <inline-svg v-else src="media/icons/duotune/files/fil004.svg" />
            </span>

            <!--begin::Info-->
            <span class="d-block fw-bold text-start">
              <span class="text-dark fw-bolder d-block fs-4 mb-1">
                DOCUMENT - {{ idx + 1 }}
              </span>
              <span class="text-gray-400 fw-bold fs-6">{{
                moment(item.created_at).format("DD-MM-YYYY HH:mm A")
              }}</span>
            </span>
            <!--end::Info-->
          </label>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="d-flex flex-row justify-content-end align-items-end">
          <IconButton
            iconSRC="media/icons/duotune/general/gen060.svg"
            label="Print"
            v-print="printObj"
          />
          <IconButton
            iconSRC="media/icons/duotune/communication/com011.svg"
            label="Email"
            @click="handleSendEmail"
          />
        </div>
        <div class="h-100 scroll border">
          <img
            id="documentField"
            v-if="selectedDocument"
            :src="selectedDocument.file_path"
            alt="document"
          />
        </div>
      </div>
    </div>
  </div>
  <SendDocumentViaEmail></SendDocumentViaEmail>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import SendDocumentViaEmail from "./SendDocumentViaEmail.vue";
import { Modal } from "bootstrap";
// import { VuePdf, createLoadingTask } from "vue3-pdfjs/esm";
// import { VuePdfPropsType } from "vue3-pdfjs/components/vue-pdf/vue-pdf-props";
// import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

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
    const selectedDocument = ref<any>(null);
    const documentType = ref(null);
    const pdfSrc = ref(null);
    const printObj = ref({
      url: "",
      id: "documentField",
      preview: true,
      previewTitle: "Print Document",
      extraCss:
        "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
      extraHead: '<meta http-equiv="Content-Language" content="en-us"/>',
      beforeOpenCallback(vue) {
        console.log("Before");
      },
      openCallback(vue) {
        console.log("Open");
      },
      closeCallback(vue) {
        console.log("Close");
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
      pdfSrc.value = selectedDocument.value;
      printObj.value.url = selectedDocument.value["file_path"];
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
      handleSendEmail,
    };
  },
});
</script>
