<template>
  <table class="table">
    <tr class="fw-bold">
      <th>Timeframe</th>
      <th>Description</th>
      <th>Added by</th>
    </tr>
    <tr v-for="history in patient.medical_history" :key="history.id">
      <td>{{ history.timeframe }}</td>
      <td>{{ history.description }}</td>
      <td>{{ history.added_by }}</td>
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
