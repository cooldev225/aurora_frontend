<template>
  <div class="px-6">
    <label
      v-if="label"
      class="fs-6 fw-bold mb-2"
      style="color: grey"
      :class="{ required: required }"
      >{{ label }}</label
    >

    <el-form-item :prop="prop" :rules="rule">
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    prop: { type: String },
    rule: { type: Array, required: false },
    required: { type: Boolean, default: false },
  },
};
</script>
