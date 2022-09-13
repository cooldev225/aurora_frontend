<template>
  <label
    class="btn btn-outline btn-outline-dashed btn-outline-default p-3 d-flex align-items-center mb-5"
    :for="document.id"
  >
    <span class="svg-icon svg-icon-3x me-5">
      <inline-svg
        :src="
          patientDocumentTypes.find(
            (documentType) => documentType.value === document.document_type
          ).icon
        "
      />
    </span>

    <!--begin::Info-->
    <span class="d-block fw-bold text-start">
      <span class="text-dark fw-bolder d-block fs-4 mb-1">
        {{ document.document_name }}
      </span>
      <span class="text-gray-400 fw-bold fs-6">{{
        moment(document.created_at).format("DD/MM/YYYY HH:mm A")
      }}</span>
    </span>
    <!--end::Info-->
  </label>
</template>
<script lang="ts">
import patientDocumentTypes from "@/core/data/patient-document-types";
import moment from "moment";
export default {
  props: {
    document: { required: true, type: Object },
  },
  setup: () => {
    return { patientDocumentTypes, moment };
  },
};
</script>
