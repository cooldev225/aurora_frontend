<template>
  <LargeIconButton text="Print Label" @click="handlePrintLabel()" />
</template>

<script lang="ts">
import IPatient from "@/store/interfaces/IPatient";
import { PropType } from "vue";
import { printPatientLabel } from "@/helpers/helpers";
import IAppointment from "@/store/interfaces/IAppointment";

export default {
  props: {
    appointment: {
      required: true,
      type: Object as PropType<IAppointment>,
    },
    patient: {
      required: true,
      type: Object as PropType<IPatient>,
    },
  },
  setup(props) {
    const handlePrintLabel = () => {
      printPatientLabel(props.patient, props.appointment, "ZDesigner GK420d");
    };

    return { handlePrintLabel };
  },
};
</script>
