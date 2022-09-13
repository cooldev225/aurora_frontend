<template>
  <div class="card mb-6">
    <div v-if="heading" class="card-header cursor-pointer">
      <div class="card-title m-0">
        <HeadingText :text="heading" />
      </div>
      <span class="my-auto">
        <slot name="header-actions"></slot>
      </span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    heading: { type: String, required: false },
  },
};
</script>
