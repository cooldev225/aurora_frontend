<template>
  <LargeIconButton
    :text="`Create ${toSentenceCase(documentType)}`"
    @click="handleButton()"
  />
</template>

<script lang="ts">
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
  },
  setup(props) {
    const router = useRouter();

    const handleButton = () => {
      router.push({
        name: "patients-document",
        params: {
          patientId: props.patient.id,
          appointmentId: props.appointment.id,
          documentType: props.documentType,
        },
      });
    };

    return {
      handleButton,
      toSentenceCase,
    };
  },
};
</script>
