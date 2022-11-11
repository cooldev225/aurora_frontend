<template>
  <div
    class="modal fade"
    id="modal_outgoing"
    tabindex="-1"
    aria-hidden="true"
    ref="viewOutgoingModalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-700px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_outgoing_header">
          <div class="d-block">
            <h2 class="fw-bolder">Outgoing Message Log</h2>
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
        <div class="modal-body">
          <div
            class="scroll-y"
            id="kt_modal_view_outgoing_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_view_outgoing_header"
            data-kt-scroll-wrappers="#kt_modal_view_outgoing_scroll"
            data-kt-scroll-offset="300px"
          >
            <div class="fw-bold">
              <span class="me-1">
                <span class="svg-icon svg-icon-primary">From</span>
                {{
                  outgoingData.sending_doctor_name +
                  ", " +
                  outgoingData.sending_doctor_provider
                }}
              </span>
              <span class="ms-1 me-1">
                <span class="svg-icon svg-icon-primary me-1">To</span>
                {{
                  outgoingData.receiving_doctor_name +
                  ", " +
                  outgoingData.receiving_doctor_provider
                }}
              </span>
              <span class="ms-1 me-1">
                <span class="svg-icon svg-icon-primary me-1">Patient</span>
                {{
                  outgoingData.patient?.full_name +
                  " (" +
                  moment(outgoingData.patient?.date_of_birth)
                    .format("DD/MM/YYYY")
                    .toString() +
                  ")"
                }}
              </span>
            </div>
            <div class="fw-bold mt-5">
              <span class="me-1">
                <span class="svg-icon svg-icon-primary">Content</span>
              </span>
            </div>
            <article v-html="outgoingData.message_contents"></article>
            <p class="pt-10">
              <IconText iconSRC="media/icons/duotune/files/fil002.svg">
                <span class="ms-1">
                  {{
                    moment(outgoingData.created_at)
                      .format("DD/MM/YYYY HH:mm")
                      .toString()
                  }}
                </span>
                <span class="ms-1">
                  {{
                    outgoingData.send_method + ", " + outgoingData.send_status
                  }}
                </span>
              </IconText>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import IconText from "@/components/presets/GeneralElements/IconText.vue";

export default defineComponent({
  name: "communication-outgoing-content-modal",
  components: {
    IconText,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const outgoingData = computed(() => store.getters.getOutgoingSelectedList);

    onMounted(() => {
      //
    });

    return {
      loading,
      outgoingData,
      moment,
    };
  },
});
</script>
