<template>
  <div>Organizations Page</div>
</template>

<script>
import { defineComponent } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "org-main",

  setup() {
    setCurrentPageTitle("Organizations");
  },
});
</script>
