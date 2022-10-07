<template>
  <div
    class="modal fade"
    :id="'modal_patient_alert_' + alertData.id"
    tabindex="-1"
    aria-hidden="true"
    ref="viewAlertModalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">
            <span :class="'svg-icon svg-icon-2hx svg-icon-' + color">
              <inline-svg :src="icon" />
              {{ alertData.title }}
            </span>
          </h2>
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
        </div>
        <div class="modal-body py-10 px-lg-17">
          <div
            class="scroll-y me-n7 pe-7"
            id="kt_modal_view_alert_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_view_alert_header"
            data-kt-scroll-wrappers="#kt_modal_view_alert_scroll"
            data-kt-scroll-offset="300px"
          >
            <div>
              {{ alertData.explanation }}
            </div>
            <p class="pt-10">
              <IconText iconSRC="media/icons/duotune/files/fil002.svg">
                {{ alertData.created_by_name }} on
                {{ new Date(alertData.created_at).toLocaleDateString("en-AU") }}
              </IconText>
            </p>
          </div>
        </div>
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-light me-3"
            @click="dismissHandle()"
          >
            Mark Resolved
          </button>
          <!--end::Button-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import icons from "@/core/data/icons";
import IconText from "@/components/presets/GeneralElements/IconText.vue";

export default defineComponent({
  name: "patient-alert-view-modal",
  props: {
    alert: { required: true, type: Object },
  },
  components: {
    IconText,
  },
  setup(props) {
    const loading = ref(false);
    const alertData = ref("");
    const icon = ref("");
    const color = ref("");

    const dismissHandle = () => {
      //
    };

    onMounted(() => {
      alertData.value = props.alert;
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
      console.log(["props.alert=" + props.alert.id, props.alert, color.value]);
    });

    return {
      loading,
      alertData,
      icon,
      color,
      dismissHandle,
    };
  },
});
</script>
