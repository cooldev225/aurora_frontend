<template>
  <LargeIconButton
    :text="`Create ${toSentenceCase(documentType)}`"
    @click="handleButton()"
    :loading="loading"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toSentenceCase } from "@/core/helpers/text";
export default {
  props: {
    appointment: {
      required: true,
      type: Object,
    },
    patient: {
      required: true,
      type: Object,
    },
    documentType: {
      required: true,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    const router = useRouter();
    const loading = ref<boolean>(false);

    const handleButton = () => {
      loading.value = true;

      router
        .push({
          name: "patients-document",
          params: {
            patientId: props.patient.id,
            appointmentId: props.appointment.id,
            documentType: props.documentType,
          },
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      handleButton,
      toSentenceCase,
      loading,
    };
  },
};
</script>
