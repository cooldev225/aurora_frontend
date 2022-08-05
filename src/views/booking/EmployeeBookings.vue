<template>
  <div class=""></div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "employee-bookings-dashboard",
  components: {},
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("My Bookings", ["Booking Dashboard"]);
    });
  },
});
</script>
