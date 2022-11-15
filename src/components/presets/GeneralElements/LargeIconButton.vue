<template>
  <a
    :class="
      'justify-content-' +
      justify +
      ' btn btn-light-' +
      color +
      ' border border-' +
      color +
      ' shadow p-2 px-4 d-flex align-items-center'
    "
  >
    <span :class="'svg-icon svg-icon-' + iconSize + 'x'">
      <inline-svg v-if="iconPath" :src="iconPath" />
    </span>

    <span class="d-block fw-bold text-start text-uppercase">
      <span class="text-dark fw-bolder d-block fs-5">
        {{ heading }}
      </span>
    </span>
  </a>
</template>
<script lang="ts">
export default {
  props: {
    iconPath: { type: String },
    heading: { required: false, type: String },
    color: { default: "primary", type: String },
    justify: { default: "center", type: String },
    iconSize: { default: "2", type: String },
  },
};
</script>
