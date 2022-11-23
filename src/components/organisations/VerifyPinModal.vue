<template>
  <ModalWrapper
    :title="modalTitle"
    :modalId="modalId"
    modalRef="verifyOrganizationPinModalRef"
    :static="true"
  >
    <p v-if="message">{{ message }}</p>

    <div class="row justify-content-md-center mb-4">
      <label class="text-muted fs-6 fw-bold mb-2 d-block">
        Organization Pin
      </label>

      <el-input
        type="password"
        v-model="formData.pin"
        placeholder="Enter pin"
      />
    </div>

    <AlertBadge
      v-if="verificationFailed"
      text="The pin entered is incorrect"
      color="danger"
      icon=""
    />

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
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";

export default defineComponent({
  name: "verify-organization-pin-modal",
  components: {
    AlertBadge,
  },
  emits: ["verified", "closeModal"],
  props: {
    title: { type: [String, null] },
    customId: { type: [String, null] },
    customMessage: { type: [String, null] },
  },
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.getters.currentUser);
    const verifyOrganizationPinModalRef = ref(null);
    const formData = ref({
      pin: "",
    });
    const loading = ref(false);
    const verificationFailed = ref(false);
    const modalTitle = computed(() => props.title ?? "Verify Access");
    const modalId = computed(() => props.customId ?? "verify_organization_pin");
    const message = computed(() => props.customMessage);

    const closeModal = () => {
      emit("closeModal");
    };

    const submit = () => {
      const data = {
        organization_id: user.value.organization.id,
        pin: formData.value.pin,
      };

      loading.value = true;
      store
        .dispatch(Actions.ORG.PIN.VERIFY, data)
        .then((verified) => {
          if (verified) {
            Swal.fire({
              text: `Pin verified!`,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Okay",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });

            emit("verified");
          } else {
            throw new Error();
          }
        })
        .catch(({ error }) => {
          verificationFailed.value = true;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      const modal = document.getElementById("modal_verify_organization_pin");
      modal.addEventListener("shown.bs.modal", function () {
        loading.value = false;
        formData.value.pin = "";
        verificationFailed.value = false;
      });
    });

    return {
      store,
      formData,
      loading,
      closeModal,
      submit,
      verificationFailed,
      modalTitle,
      modalId,
      message,
    };
  },
});
</script>
