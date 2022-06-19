<template>
  <!--begin::Wrapper-->
  <div
    class="w-100"
    style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem"
  >
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12" style="grid-column: span 2 / span 2">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Organization Details</h2>
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
        <span class="required">Username</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="username"
        class="form-control form-control-lg form-control-solid"
        placeholder="Username"
      />
      <ErrorMessage
        name="username"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Organization Name</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="orgname"
        class="form-control form-control-lg form-control-solid"
        placeholder="Organization Name"
      />
      <!--end::Input-->
      <ErrorMessage
        name="orgname"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Password</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        type="password"
        name="password"
        class="form-control form-control-lg form-control-solid"
        placeholder="Password"
      />
      <!--end::Input-->
      <ErrorMessage
        name="password"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Confirm Password</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        type="password"
        name="repassword"
        class="form-control form-control-lg form-control-solid"
        placeholder="Confirm Password"
      ></Field>
      <!--end::Input-->
      <ErrorMessage
        name="repassword"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-0">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Provider Number</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="providernumber"
        class="form-control form-control-lg form-control-solid"
        placeholder="Provider Number"
      />
      <!--end::Input-->
      <ErrorMessage
        name="providernumber"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-0">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">VAED Number</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="vaednumber"
        class="form-control form-control-lg form-control-solid"
        placeholder="VAED Number"
      />
      <!--end::Input-->
      <ErrorMessage
        name="providernumber"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "step-1",
  components: {
    Field,
    ErrorMessage,
  },
});
</script>
