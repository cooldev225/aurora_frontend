<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-7 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Personal Contact</h2>
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
        <span class="required">First Name</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="firstName"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter first name"
      />
      <ErrorMessage
        name="address"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Last Name</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="lastName"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter last name"
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
        <span class="required">Email</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="suburb"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter Email"
      />
      <!--end::Input-->
      <ErrorMessage
        name="email"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Mobile Number</span>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        name="state"
        class="form-control form-control-lg form-control-solid"
        placeholder="Enter State"
      ></Field>
      <!--end::Input-->
      <ErrorMessage
        name="repassword"
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
  name: "step-2",
  components: {
    Field,
    ErrorMessage,
  },
});
</script>
