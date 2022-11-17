<template>
  <ModalWrapper
    title="Document action log"
    modalId="document_action_log"
    :updateRef="letterModalRef"
  >
    <template v-for="(item, index) in logData" :key="index">
      <div>
        {{ item.status }}, {{ item.user.full_name }}
        {{ moment(item.created_at).format("DD/MM/YYYY").toString() }}
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { DocumentActions } from "@/store/enums/StoreDocumentEnums";
import moment from "moment";

export default defineComponent({
  name: "send-email-modal",
  components: {},
  props: {
    document: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const actionLogModalRef = ref(null);
    const loading = ref(false);
    const documentId = computed(() => props.document.id);
    const updateRef = (_ref) => {
      actionLogModalRef.value = _ref;
    };

    const logData = ref([]);

    watchEffect(() => {
      documentId.value &&
        store
          .dispatch(DocumentActions.ACTION_LOGS.LIST, {
            patient_document_id: documentId.value,
          })
          .then(({ data }) => {
            logData.value = data || [];
          });
    });

    return {
      loading,
      actionLogModalRef,
      updateRef,
      logData,
      moment,
    };
  },
});
</script>
