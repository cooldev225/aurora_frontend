<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-7 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Prova Devices</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <!-- <div class="text-gray-400 fw-bold fs-6">
        If you need more info, please check out
        <a href="#" class="link-primary fw-bolder">Help Page</a>.
      </div> -->
      <!--end::Notice-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Device Name</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="deviceName"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter Device name"
      />
      <ErrorMessage
        name="deviceName"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Otac</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="otac"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter OTAC"
      />
      <!--end::Input-->
      <ErrorMessage
        name="otac"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->
    <div class="d-flex flex-row gap-2">
      <!--begin::Input group-->
      <div class="col-md-6 fv-row">
        <label class="required fs-6 fw-bold mb-2">Expire Date of Key</label>

        <!--begin::Input-->
        <div class="position-relative align-items-center">
          <!--begin::Icon-->
          <div class="symbol symbol-20px me-4 position-absolute ms-4">
            <span class="symbol-label bg-secondary">
              <span class="svg-icon">
                <inline-svg src="media/icons/duotune/general/gen025.svg" />
              </span>
            </span>
          </div>
          <!--end::Icon-->

          <!--begin::Datepicker-->
          <el-date-picker
            placeholder="Select a date"
            name="dueDate"
            class="w-100"
          />
          <!--end::Datepicker-->
        </div>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="col-md-6 fv-row">
        <label class="required fs-6 fw-bold mb-2">Expire date of device</label>

        <!--begin::Input-->
        <div class="position-relative align-items-center">
          <!--begin::Icon-->
          <div class="symbol symbol-20px me-4 position-absolute ms-4">
            <span class="symbol-label bg-secondary">
              <span class="svg-icon">
                <inline-svg src="media/icons/duotune/general/gen025.svg" />
              </span>
            </span>
          </div>
          <!--end::Icon-->

          <!--begin::Datepicker-->
          <el-date-picker
            placeholder="Select a date"
            name="dueDate"
            class="w-100"
          />
          <!--end::Datepicker-->
        </div>
        <!--end::Input-->
      </div>
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
  },
});
</script>
