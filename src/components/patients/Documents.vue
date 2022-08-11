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
          <el-option label="LETTER" value="LETTER" />
          <el-option label="REPORT" value="REPORT" />
          <el-option label="CLINICAL_NOTE" value="CLINICAL_NOTE" />
          <el-option label="PATHOLOGY_REPORT" value="PATHOLOGY_REPORT" />
        </el-select>
        <div v-for="item in documentList" :key="item.id">
          <input
            type="radio"
            class="btn-check"
            :name="item.created_at"
            :value="item"
            :id="item.id"
            v-model="document"
          />
          <label
            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
            :for="item.id"
          >
            <span class="svg-icon svg-icon-3x me-5">
              <inline-svg src="media/icons/duotune/communication/com005.svg" />
            </span>

            <!--begin::Info-->
            <span class="d-block fw-bold text-start">
              <span class="text-dark fw-bolder d-block fs-4 mb-2">
                {{ moment(item.created_at).format("DD-MM-YYYY HH:mm") }}
              </span>
              <span class="text-gray-400 fw-bold fs-6">{{
                moment(item.created_at).format("DD-MM-YYYY HH:mm")
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

    onMounted(() => {
      store.dispatch(Actions.PATIENTS.DOCUMENT.LIST, selectedPatient.value.id);
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
    });

    watch(_documentList, () => {
      documentList.value = _documentList.value;
    });

    watch(documentType, () => {
      documentList.value = _documentList.value.filter(
        (item) => item.document_type === documentType.value
      );
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
