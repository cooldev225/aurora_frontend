<template>
  <div>Administrator</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "admin-main",

  setup() {
    onMounted(() => {
      setCurrentPageTitle("Administrator");
    });
  },
});
</script>
