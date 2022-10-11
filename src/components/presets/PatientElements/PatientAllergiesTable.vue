<template>
  <table class="table">
    <tr class="fw-bold">
      <th>Name</th>
      <th>Severity</th>
      <th>Symptoms</th>
      <th></th>
    </tr>
    <template v-for="allergy in patient.allergies" :key="allergy.id">
      <PatientAllergiesRow :allergy="allergy" />
    </template>
  </table>
</template>
<script lang="ts">
import PatientAllergiesRow from "./PatientAllergiesRow.vue";
export default {
  props: {
    patient: { required: true, type: Object },
  },
  components: { PatientAllergiesRow },
};
</script>
