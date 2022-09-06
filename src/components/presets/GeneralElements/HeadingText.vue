<template>
  <div class="pb-5">
    <h3 class="fw-bold d-flex align-items-center text-dark">{{ text }}</h3>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: { type: String, required: true },
  },
};
</script>
