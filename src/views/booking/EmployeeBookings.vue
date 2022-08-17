<template>
  <div class="">
    <AptCalendar></AptCalendar>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AptCalendar from "@/components/booking/AptCalendar.vue";

export default defineComponent({
  name: "employee-bookings-dashboard",
  components: {
    AptCalendar,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("My Bookings", ["Booking Dashboard"]);
    });
  },
});
</script>
