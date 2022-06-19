<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-7 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">HL7 Provider</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <!-- <div class="text-gray-400 fw-bold fs-6">
        If you need more info, please check out
        <a href="#" class="link-primary fw-bolder">Help Page</a>.
      </div> -->
      <!--end::Notice-->
    </div>
    <!--end::Heading-->
    <div class="d-flex flex-row justify-content-between">
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">ReferralNet Url</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralURL"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter first name"
        />
        <ErrorMessage
          name="referralURL"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">ReferralNet Username</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralUsername"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter last name"
        />
        <!--end::Input-->
        <ErrorMessage
          name="referralUsername"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">RefferalNet Password</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="refferalPwd"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Email"
        />
        <!--end::Input-->
        <ErrorMessage
          name=""
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->
    </div>
    <div class="d-flex flex-row justify-content-between">
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Argus Url</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralURL"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter first name"
        />
        <ErrorMessage
          name="referralURL"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Argus Username</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralUsername"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter last name"
        />
        <!--end::Input-->
        <ErrorMessage
          name="referralUsername"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Argus Password</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="refferalPwd"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Email"
        />
        <!--end::Input-->
        <ErrorMessage
          name=""
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->
    </div>
    <div class="d-flex flex-row justify-content-between">
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Medical Objects Url</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralURL"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter first name"
        />
        <ErrorMessage
          name="referralURL"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Medical Objects Username</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="referralUsername"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter last name"
        />
        <!--end::Input-->
        <ErrorMessage
          name="referralUsername"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Medical Objects Password</span>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="refferalPwd"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter Email"
        />
        <!--end::Input-->
        <ErrorMessage
          name=""
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->
    </div>
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
