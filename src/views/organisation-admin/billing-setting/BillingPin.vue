<template>
  <div class="card w-75 m-auto">
    <div class="card-header border-0 pt-6">
      <div class="card-title">Billing Pin</div>
    </div>

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <!--begin::Scroll-->
      <div class="row d-flex">
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <InputWrapper label="Billing Pin" prop="billing_pin">
            <el-input
              v-model="formData.billing_pin"
              type="password"
              placeholder="Enter your new pin"
            />
          </InputWrapper>

          <InputWrapper label="Confirm Billing Pin" prop="billing_pin_confirm">
            <el-input
              v-model="formData.billing_pin_confirm"
              type="password"
              placeholder="Confirm your new pin"
            />
          </InputWrapper>
        </el-form>
      </div>

      <div v-if="oldPin.length > 0" class="d-flex gap-4 align-items-center">
        <button
          class="btn btn-md btn-primary"
          @mousedown="showPin = true"
          @mouseup="showPin = false"
        >
          Show Current Pin
        </button>
        <p v-if="showPin" class="p-0 m-0 text-primary fw-bold">
          {{ oldPin }}
        </p>
      </div>

      <div class="mt-8 gap-4 d-flex justify-content-end">
        <button
          class="btn btn-lg btn-primary"
          :data-kt-indicator="loading ? 'on' : null"
          :disabled="
            formData.billing_pin !== formData.billing_pin_confirm ||
            formData.billing_pin === '' ||
            loading
          "
          @click="submit"
        >
          <span v-if="!loading" class="indicator-label">Save</span>
          <span v-if="loading" class="indicator-progress">
            Saving...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link type="reset" to="/settings" class="btn btn-light">
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "billing-pin",
  setup() {
    const store = useStore();
    const router = useRouter();
    const organization = computed(() => {
      const user = store.getters.currentUser;

      return user.organization;
    });
    const formData = ref({
      billing_pin: "",
      billing_pin_confirm: "",
    });
    const loading = ref(false);
    const showPin = ref(false);
    const oldPin = ref("");

    const confirmPinMatch = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Billing pin confirmation cannot be blank."));
      } else if (value !== formData.value.billing_pin) {
        callback(new Error("Confirmation does not match billing pin."));
      } else {
        callback();
      }
    };

    const rules = ref({
      billing_pin: [
        {
          required: true,
          message: "Billing pin cannot be blank.",
          trigger: "change",
        },
      ],
      billing_pin_confirm: [
        {
          validator: confirmPinMatch,
          trigger: "blur",
        },
      ],
    });

    const getOrganizationPin = () => {
      store
        .dispatch(Actions.ORG.PIN.SHOW, organization.value.id)
        .then((data) => {
          oldPin.value = data;
        });
    };

    watch(organization, (value) => {
      getOrganizationPin();
    });

    const submit = () => {
      const data = {
        pin: formData.value.billing_pin,
        organization_id: organization.value.id,
      };

      loading.value = true;
      store
        .dispatch(Actions.ORG.PIN.SET, data)
        .then(() => {
          Swal.fire({
            text: "Pin successfully updated!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            router.push({ name: "org-admin-settings" });
          });
        })
        .catch((message) => {
          Swal.fire({
            text: message ?? "Pin could not be updated!",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Billing Pin", ["Settings"]);

      if (organization.value) {
        getOrganizationPin();
      }
    });

    return {
      loading,
      formData,
      rules,
      organization,
      showPin,
      oldPin,
      submit,
    };
  },
});
</script>
