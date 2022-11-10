<template>
  <CardSection>
    <div class="row">
      <CardSection class="col-md-6 col-sm-12" heading="Allergies">
        <PatientAllergiesTable :patient="patient" />
      </CardSection>
      <CardSection class="col-md-6 col-sm-12" heading="Medications">
        <PatientMedicationsTable :patient="patient" />
      </CardSection>

      <CardSection class="col-md-6 col-sm-12" heading="Medical History">
        <PatientMedicalHistoryTable :patient="patient" />
      </CardSection>
    </div>
  </CardSection>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import CardSection from "@/components/presets/GeneralElements/CardSection.vue";
import PatientAllergiesTable from "../../components/presets/PatientElements/PatientAllergiesTable.vue";
import PatientMedicationsTable from "../../components/presets/PatientElements/PatientMedicationsTable.vue";
import PatientMedicalHistoryTable from "../../components/presets/PatientElements/PatientMedicalHistoryTable.vue";

export default defineComponent({
  name: "patient-clinical",
  components: {
    CardSection,
    PatientAllergiesTable,
    PatientMedicationsTable,
    PatientMedicalHistoryTable,
  },
  setup() {
    const store = useStore();
    const patient = computed(() => store.getters.selectedPatient);
    const route = useRoute();

    watch(patient, () => {
      //
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
      const id = route.params.id;
      store.dispatch(PatientActions.VIEW, id);
    });

    return { patient };
  },
});
</script>
