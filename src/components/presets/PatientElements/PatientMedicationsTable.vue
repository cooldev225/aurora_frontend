<template>
  <CardSection class="col-md-6 col-sm-12" heading="Medications">
    <template #header-actions>
      <IconButton label="Create New" @click="handleAddMedication" />
    </template>
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
  </CardSection>
</template>
<script lang="ts">
export default {
  props: {
    patient: { required: true, type: Object },
  },
  setup() {
    const handleAddMedication = () => {
      alert("");
    };
    return {
      handleAddMedication,
    };
  },
};
</script>
