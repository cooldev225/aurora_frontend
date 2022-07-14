<template>
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Patient Details</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">Name</label>
            <label class="fs-6 text-gray-800">JOE SMITH</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block">Address</label>
            <label class="fs-6 text-gray-800"
              >200 Kooyong Road, Caulfield North VIC, Australia</label
            >
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Contact Number</label
            >
            <label class="fs-6 text-gray-800">+61 404 017 775</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Date of Birth</label
            >
            <label class="fs-6 text-gray-800">1990/01/01</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
  <!--begin::Card-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Appointment Details</span>
      </h3>
    </div>
    <div class="card-body pt-3 pb-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Service Reference Number</label
            >
            <label class="fs-6 text-gray-800">22100341</label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Appointment Date and Time</label
            >
            <label class="fs-6 text-gray-800">27/06/2022</label>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="fv-row mb-7">
            <label class="text-muted fs-6 fw-bold mb-2 d-block"
              >Specialist</label
            >
            <label class="fs-6 text-gray-800">DR AARON THORNTON</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "make-payment-pay",
  components: {},

  setup() {
    const store = useStore();
    const formData = ref({});

    watchEffect(() => {
      // formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pay", ["Billing", "Out of Pocket"]);
    });

    return {
      formData,
    };
  },
});
</script>
