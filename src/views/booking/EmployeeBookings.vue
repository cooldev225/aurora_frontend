<template>
  <div class=""></div>
</template>
<script>
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  computed,
} from "vue";
import { useStore } from "vuex";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";
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
