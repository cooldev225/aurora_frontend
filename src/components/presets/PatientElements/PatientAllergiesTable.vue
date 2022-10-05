<template>
  <table class="table">
    <tr class="fw-bold">
      <th>Name</th>
      <th>Severity</th>
      <th>Symptoms</th>
    </tr>

    <tr v-for="allergy in patient.allergies" :key="allergy.id">
      <td>{{ allergy.name }}</td>
      <td>{{ allergy.severity }}</td>
      <td>{{ allergy.symptoms }}</td>
    </tr>
  </table>
</template>
<script lang="ts">
export default {
  props: {
    patient: { required: true, type: Object },
  },
};
</script>
