<template>
  <ModalWrapper
    title="Update Patient Details"
    modalId="update_patient_details"
    modalRef="updatePatientDetailsRef"
  >
    <p>
      The Medicare card details only returned a partial match. The following
      details were found in the Medicare system, would you like to update this
      patient record?
    </p>

    <table class="text-center">
      <tr>
        <th></th>
        <th>Current Record</th>
        <th>→</th>
        <th>Medicare System</th>
      </tr>

      <tr
        v-for="(data, index) in updateDetails"
        :key="`medicare-update-details-${index}`"
      >
        <td>{{ data.name }}</td>
        <td>{{ data.old }}</td>
        <td>→</td>
        <td>{{ data.new }}</td>
      </tr>
    </table>
    <button
      :data-kt-indicator="loading ? 'on' : null"
      class="btn btn-lg btn-primary"
      type="submit"
    >
      <span v-if="!loading" class="indicator-label">Yes, update details</span>
      <span v-if="loading" class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>

    <button class="btn btn-lg btn-secondary" type="submit">No</button>
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
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";

export default defineComponent({
  name: "update-patient-details-modal",
  props: {
    patientId: { required: true },
    updateDetails: { required: true },
  },
  setup(props) {
    const store = useStore();
    const updatePatientDetailsRef = ref(null);
    const loading = ref(false);
    const patientId = computed(() => props.patientId);

    const submit = () => {
      loading.value = true;

      store
        .dispatch(Actions.DOCUMENT.AUDIO.CREATE, {})
        .then(() => {
          Swal.fire({
            text: "Successfully Created!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            // hideModal(createAudioModalRef.value);
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      loading,
      updatePatientDetailsRef,
      moment,
      submit,
    };
  },
});
</script>
