<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_clinical"></div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-documents",
  components: {},
  setup() {
    const store = useStore();
    const formData = ref({});

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
    });

    return {
      formData,
    };
  },
});
</script>
