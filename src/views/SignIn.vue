<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <img alt="Logo" src="aurora-logo.png" class="h-75px logo" />
      </div>
      <!--begin::Heading-->
      <div v-if="errorMessage" class="text-danger fw-bold fs-3 mb-6">
        {{ errorMessage }}
      </div>
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Username</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="username"
          autocomplete="off"
        />
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0"
            >Password</label
          >
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Continue </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import moment from "moment";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userRole = computed(() => store.getters.userRole);
    const user = computed(() => store.getters.currentUser);
    const organization = computed(() => store.getters.userOrganization);

    const errorMessage = ref("");

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      username: Yup.string().required().label("username"),
      password: Yup.string().required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values) => {
      // Clear existing errors
      await store.dispatch(Actions.LOGOUT);

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await loginAction(values);

      const user = store.getters.currentUser;
      const error = store.getters.getErrors["status"];

      if (error != "failed") {
        // Go to page after successfully login
        if (userRole.value === "organizationAdmin")
          router.push({ name: "org-admin-settings" });

        if (!user.outside_hours && !outsideHoursAccess()) {
          router.push({ name: "my-schedule" });
          return;
        }

        if (
          userRole.value === "organizationManager" ||
          userRole.value === "receptionist"
        )
          router.push({ name: "booking-dashboard" });
        if (userRole.value === "anesthetist")
          router.push({ name: "anesthetist-dashboard" });

        if (userRole.value === "admin") router.push({ name: "organisations" });

        if (userRole.value === "specialist")
          router.push({ name: "employee-booking-dashboard" });
      } else {
        errorMessage.value = "Incorrect username or password.";
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };

    const outsideHoursAccess = () => {
      if (user.value.role !== "organizationAdmin") {
        const timeNow = moment();
        const orgStartTime = moment(organization.value.start_time, "HH:mm:ss");
        const orgEndTime = moment(organization.value.end_time, "HH:mm:ss");
        if (timeNow.isAfter(orgStartTime) && timeNow.isBefore(orgEndTime))
          return true;
        return false;
      }
      return true;
    };

    const loginAction = (values) => {
      return new Promise(function (resolve) {
        store.dispatch(Actions.LOGIN, values).then(() => {
          resolve("");
        });
      });
    };
    return {
      onSubmitLogin,
      login,
      submitButton,
      errorMessage,
    };
  },
});
</script>
