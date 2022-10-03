<template>
  <div
    @click="openAlertModal"
    :class="
      'cursor-pointer alert bg-light-' +
      color +
      ' border border-' +
      color +
      ' d-flex flex-column flex-sm-row w-100 p-2 mb-6'
    "
  >
    <span :class="'svg-icon svg-icon-2hx svg-icon-' + color">
      <inline-svg :src="icon" />
    </span>
    <h5 class="mx-2 my-auto fw-light">{{ alert.title }}</h5>
  </div>
</template>
<script lang="ts">
import icons from "@/core/data/icons";
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

export default {
  props: {
    alert: { required: true, type: Object },
  },
  setup(props) {
    const icon = ref("");
    const color = ref("");

    onMounted(() => {
      if (props.alert.alert_level === "WARNING") {
        icon.value = icons.pencil;
        color.value = "warning";
      } else if (props.alert.alert_level === "BLACKLISTED") {
        icon.value = icons.cross;
        color.value = "danger";
      } else {
        icon.value = icons.bell;
        color.value = "primary";
      }
    });

    const openAlertModal = () => {
      const modal = new Modal(
        document.getElementById("modal_patient_alert_" + props.alert.id)
      );
      modal.show();
    };

    return {
      icon,
      color,
      openAlertModal,
    };
  },
};
</script>
