<template>
  <div>
    <TablesWidget9 widget-classes="card-xxl-stretch mb-5 mb-xl-8" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import TablesWidget9 from "@/components/widgets/tables/Widget9.vue";

export default defineComponent({
  name: "org-main",

  components: {
    TablesWidget9,
  },

  setup() {
    setCurrentPageTitle("Organizations");
  },
});
</script>
