<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-3">
        <VueCtkDateTimePicker
          :format="format"
          v-model="date_value"
          inline="false"
          onlyDate
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
  },
  setup() {
    const format = ref("MM/D/YY");
    const date_value = ref("");

    return {
      format,
      date_value,
    };
  },
});
</script>
