<template>
  <div class="stepper-item" :data-kt-stepper-element="dataStepperElement">
    <!--begin::Line-->
    <div class="stepper-line w-40px"></div>
    <!--end::Line-->

    <!--begin::Icon-->
    <div class="stepper-icon w-40px h-40px">
      <i class="stepper-check fas fa-check"></i>
      <span class="stepper-number">{{ stepperNumber }}</span>
    </div>
    <!--end::Icon-->

    <!--begin::Label-->
    <div class="stepper-label">
      <h3 class="stepper-title">{{ stepperTitle }}</h3>

      <div class="stepper-desc">{{ stepperDescription }}</div>
    </div>
    <!--end::Label-->
  </div>
</template>

<script lang="ts">
export default {
  props: {
    dataStepperElement: { type: String, required: true },
    stepperNumber: { type: String, required: true },
    stepperTitle: { type: String, required: true },
    stepperDescription: { type: String, required: true },
  },
};
</script>
