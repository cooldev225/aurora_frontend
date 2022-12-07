<template>
  <a
    class="btn btn-light btn-icon-primary p-2"
    :class="{ 'opacity-50 ': disabled }"
    :disabled="disabled"
  >
    <el-tooltip
      :disabled="tooltip == null"
      :content="tooltip"
      placement="bottom"
      effect="light"
    >
      <span v-if="iconSRC" class="svg-icon svg-icon-1 m-0">
        <inline-svg :src="iconSRC" />
      </span>

      <template v-if="label">
        {{ label }}
      </template>
    </el-tooltip>
  </a>
</template>

<script lang="ts">
export default {
  props: {
    label: { type: String, required: false },
    iconSRC: { type: String, required: false },
    disabled: { type: Boolean, default: false },
    tooltip: { type: String, required: false },
  },
};
</script>
