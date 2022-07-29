<template>
  <a>
    <label
      :class="
        'btn btn-light-' +
        color +
        ' border border-' +
        color +
        ' shadow p-5 d-flex align-items-center'
      "
    >
      <span class="svg-icon svg-icon-3x me-5">
        <inline-svg :src="iconPath" />
      </span>

      <!--begin::Info-->
      <span class="d-block fw-bold text-start text-uppercase">
        <span class="text-dark fw-bolder d-block fs-4 mb-2">
          {{ heading }}
        </span>
        <span class="text-gray-400 fw-bold fs-6"> {{ subheading }} </span>
      </span>
      <!--end::Info-->
    </label>
  </a>
</template>
<script lang="ts">
export default {
  props: {
    iconPath: { required: true, type: String },
    heading: { required: true, type: String },
    subheading: { required: true, type: String },
    color: { default: "primary", type: String },
  },
};
</script>
