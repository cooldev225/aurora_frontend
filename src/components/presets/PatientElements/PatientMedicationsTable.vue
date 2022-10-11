<template>
  <table class="table">
    <tr class="fw-bold">
      <th>Name</th>
      <th>Instructions</th>
      <th>Active</th>
    </tr>

    <tr v-for="medications in patient.medications" :key="medications.id">
      <td>{{ medications.name }}</td>
      <td>{{ medications.instructions }}</td>
      <td>{{ medications.active }}</td>
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
