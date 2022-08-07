<template>
  <div></div>
</template>

<script>
import { defineComponent, onMounted } from "vue";

import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "pre-admission-questions",

  components: {},

  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Question", ["Settings"]);
    });
  },
});
</script>
