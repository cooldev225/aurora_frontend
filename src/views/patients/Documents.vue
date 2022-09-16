<template>
  <CardSection>
    <DocumentList :appointments="selectedPatient.appointments" />
  </CardSection>
</template>

<script>
import { defineComponent, watch, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { DocumentActions } from "@/store/enums/StoreDocumentEnums";
import patientDocumentTypes from "@/core/data/patient-document-types";
import DocumentLabel from "@/views/patients/documents/DocumentLabel.vue";
import DocumentList from "@/views/specialist/DocumentList.vue";

export default defineComponent({
  name: "patient-documents",
  components: { DocumentList },
  setup() {
    const store = useStore();
    const route = useRoute();
    const selectedPatient = computed(() => store.getters.selectedPatient);

    // Set the document list to those of the currently selected patient
    watch(selectedPatient, () => {
      store.dispatch(DocumentActions.LIST, {
        patient_id: selectedPatient.value.id,
      });
    });

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.PATIENTS.VIEW, id);
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
    });

    return {
      patientDocumentTypes,
      DocumentLabel,
      selectedPatient,
      DocumentList,
    };
  },
});
</script>
