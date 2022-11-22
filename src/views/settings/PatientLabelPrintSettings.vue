<template>
  <LargeIconButton @click="printTestLabel" heading="PRINT TEST LABEL" />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { printPatientLabel } from "@/helpers/helpers";
export default defineComponent({
  name: "patient-label-print-settings",

  components: {},

  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Patient Label Print Settings");
    });

    const printTestLabel = () => {
      const printerName = "ZDesigner GK420d";
      const testPatient = {};
      printPatientLabel(testPatient, printerName);
    };

    return { printTestLabel };
  },
});
</script>
