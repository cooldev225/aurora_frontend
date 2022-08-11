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
          <el-option value="LETTER">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen005.svg"
            />
            LETTER
          </el-option>
          <el-option value="REPORT">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen016.svg"
            />
            REPORT
          </el-option>
          <el-option value="CLINICAL_NOTE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/files/fil003.svg"
            />
            CLINICAL NOTE
          </el-option>
          <el-option label="PATHOLOGY_REPORT" value="PATHOLOGY_REPORT">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/files/fil004.svg"
            />
            PATHOLOGY REPORT
          </el-option>
          <el-option value="ALL">
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
            v-model="document"
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
      <div class="col-md-8 border scroll h-100">
        <img v-if="document" :src="document.file_path" alt="document" />
      </div>
    </div>
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
// import { VuePdf, createLoadingTask } from "vue3-pdfjs/esm";
// import { VuePdfPropsType } from "vue3-pdfjs/components/vue-pdf/vue-pdf-props";
// import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

export default defineComponent({
  name: "patient-documents",
  components: {},
  setup() {
    const store = useStore();
    const formData = ref({});
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const documentList = ref(null);
    const _documentList = computed(() => store.getters.getPatientDocumentList);
    const document = ref(null);
    const documentType = ref(null);
    const pdfSrc = ref(null);

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

    watch(document, () => {
      pdfSrc.value = document.value;
    });

    return {
      formData,
      documentList,
      document,
      documentType,
      moment,
    };
  },
});
</script>
