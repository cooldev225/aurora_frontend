<template>
  <a class="btn btn-sm btn-light btn-icon-primary me-2 mb-2">
    <span v-if="iconSRC" class="svg-icon svg-icon-1">
      <inline-svg :src="iconSRC" />
    </span>
    {{ label }}
  </a>
</template>

<script lang="ts">
export default {
  props: {
    label: { type: String, required: true },
    iconSRC: { type: String },
  },
};
</script>
