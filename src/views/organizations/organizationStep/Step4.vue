<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-7 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Appointment Information</h2>
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
          <span class="required"
            >Single Appointment Total Time (in minute)</span
          >
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          type="number"
          name="firstName"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter time in minute"
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
          <span class="required"
            >Double Appointment Total Time (in minute)</span
          >
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          type="number"
          name="lastName"
          class="form-control form-control-lg form-control-solid"
          placeholder="Enter time in minute"
        />
        <!--end::Input-->
        <ErrorMessage
          name="orgname"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->
    </div>

    <div class="d-flex flex-column">
      <!--begin::Input group-->
      <div class="d-flex flex-row justify-content-between">
        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="d-flex align-items-center form-label">
            <span class="required">Speical Requirement</span>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="specrequirement"
            class="form-control form-control-lg form-control-solid"
            placeholder="Enter Special Requirement"
          />
          <!--end::Input-->
          <ErrorMessage
            name="specrequirement"
            class="fv-plugins-message-container invalid-feedback"
          ></ErrorMessage>
        </div>

        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label required">Executed</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="executed"
            class="form-select form-select-lg form-select-solid"
            data-control="select2"
            data-placeholder="Select..."
            data-allow-clear="true"
            data-hide-search="true"
            as="select"
          >
            <option value="1">Before</option>
            <option value="0">After</option>
          </Field>
          <!--end::Input-->
          <ErrorMessage
            name="executed"
            class="fv-plugins-message-container invalid-feedback"
          ></ErrorMessage>
        </div>

        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label required">Time</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="time"
            class="form-select form-select-lg form-select-solid"
            data-control="select2"
            data-placeholder="Select..."
            data-allow-clear="true"
            data-hide-search="true"
            as="select"
          >
            <option value="01:00">01:00</option>
            <option value="01:30">01:30</option>
            <option value="02:00">02:00</option>
            <option value="02:30">02:30</option>
            <option value="03:00">03:00</option>
            <option value="03:30">03:30</option>
            <option value="04:00">04:00</option>
            <option value="04:30">04:30</option>
            <option value="05:00">05:00</option>
            <option value="05:30">05:30</option>
            <option value="06:00">06:00</option>
            <option value="06:30">06:30</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
          </Field>
          <!--end::Input-->
          <ErrorMessage
            name="time"
            class="fv-plugins-message-container invalid-feedback"
          ></ErrorMessage>
        </div>

        <div class="fv-row mb-10">
          <!--begin::Label-->
          <label class="form-label required">Session</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            name="session"
            class="form-select form-select-lg form-select-solid"
            data-control="select2"
            data-placeholder="Select..."
            data-allow-clear="true"
            data-hide-search="true"
            as="select"
          >
            <option value="1">AM</option>
            <option value="0">PM</option>
          </Field>
          <!--end::Input-->
          <ErrorMessage
            name="session"
            class="fv-plugins-message-container invalid-feedback"
          ></ErrorMessage>
        </div>
      </div>
      <!--end::Input group-->

      <button class="btn btn-primary">
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
        </span>
        Add Appointment Requirement
      </button>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "step-4",
  components: {
    Field,
    ErrorMessage,
  },
});
</script>
