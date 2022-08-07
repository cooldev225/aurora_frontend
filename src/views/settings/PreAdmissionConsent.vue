<template>
  <div></div>
</template>

<script>
import { defineComponent, onMounted } from "vue";

import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "pre-admission-consent",

  components: {},

  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Consent", ["Settings"]);
    });
  },
});
</script>
