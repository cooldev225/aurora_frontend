<template>
  <div
    class="modal fade"
    id="modal_outgoing"
    tabindex="-1"
    aria-hidden="true"
    ref="viewOutgoingModalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_outgoing_header">
          <div class="">
            <p>
              from:
              {{
                outgoingData.sending_doctor_name +
                ", " +
                outgoingData.sending_doctor_provider
              }}
            </p>
            <p>
              from:
              {{
                outgoingData.receiving_doctor_name +
                ", " +
                outgoingData.receiving_doctor_provider
              }}
            </p>
          </div>
          <div
            id="kt_modal_outgoing_close"
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
            id="kt_modal_view_outgoing_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_view_outgoing_header"
            data-kt-scroll-wrappers="#kt_modal_view_outgoing_scroll"
            data-kt-scroll-offset="300px"
          >
            <article v-html="outgoingData.message_contents"></article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "communication-outgoing-content-modal",
  components: {},
  setup() {
    const store = useStore();
    const loading = ref(false);
    const outgoingData = ref("");

    onMounted(() => {
      //
    });

    return {
      loading,
      outgoingData,
    };
  },
});
</script>
