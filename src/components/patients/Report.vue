<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Report Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">{{ templateData }}</div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-report",
  components: {},
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.getReportTemplateSelected);
    const templateData = ref();

    watchEffect(() => {
      templateData.value = list.value;
      console.log(templateData.value);
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
    });

    return {
      templateData,
    };
  },
});
</script>
