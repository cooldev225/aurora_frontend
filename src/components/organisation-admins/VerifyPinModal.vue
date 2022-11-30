<template>
  <ModalWrapper
    :title="modalTitle"
    :modalId="modalId"
    modalRef="verifyAuthorizationPinModalRef"
    :is-static="true"
  >
    <p class="fs-6 text-center mb-6">
      {{ message }}
      Please enter an administrator pin to continue.
    </p>

    <div class="row justify-content-md-center mb-4">
      <label class="text-muted fs-6 fw-bold mb-2 d-block">
        Authorize Access
      </label>

      <el-input
        type="password"
        v-model="formData.pin"
        placeholder="Enter pin"
      />
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-lg btn-primary me-2"
        :data-kt-indicator="loading ? 'on' : null"
        :disabled="formData.pin.length < 4 || loading"
        @click="submit"
      >
        <span v-if="!loading" class="indicator-label">Verify</span>
        <span v-if="loading" class="indicator-progress">
          Verifying...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>

      <button
        class="btn btn-lg btn-secondary"
        data-bs-dismiss="modal"
        type="submit"
      >
        Cancel
      </button>
    </div>
  </ModalWrapper>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "verify-organization-pin-modal",
  emits: ["verified", "closeModal"],
  props: {
    title: { type: [String, null] },
    customId: { type: [String, null] },
    customMessage: { type: [String, null] },
  },
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.getters.currentUser);
    const verifyAuthorizationPinModalRef = ref(null);
    const formData = ref({
      pin: "",
    });
    const loading = ref(false);
    const modalTitle = computed(() => props.title ?? "Verify Access");
    const modalId = computed(
      () => props.customId ?? "verify_authorization_pin"
    );
    const message = computed(() => props.customMessage);

    const closeModal = () => {
      emit("closeModal");
    };

    const submit = () => {
      loading.value = true;
      store
        .dispatch(Actions.PROFILE.PIN.VERIFY, formData.value)
        .then((data) => {
          emit("verified", data.confirming_user);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      const modal = document.getElementById("modal_verify_authorization_pin");
      modal.addEventListener("shown.bs.modal", function () {
        loading.value = false;
        formData.value.pin = "";
      });
    });

    return {
      store,
      formData,
      loading,
      closeModal,
      submit,
      modalTitle,
      modalId,
      message,
    };
  },
});
</script>
