<template>
  <div class="px-6 py-3">
    <label class="fs-6 fw-bold mb-2" :class="{ required: required }">{{
      label
    }}</label>

    <el-form-item prop="prop">
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    prop: { type: String, required: true },
    required: { type: Boolean, default: false },
  },
};
</script>
