<template>
  <ModalWrapper
    title="Create Recall"
    modalId="patient_recall_reminder"
    :modalRef="patientRecallReminderModal"
  >
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
      <InputWrapper label="Time Frame" prop="time_frame">
        <el-select
          class="w-100"
          v-model="formData.time_frame"
          placeholder="Select Time Frame"
        >
          <el-option
            v-for="option in timeFrames"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </InputWrapper>

      <InputWrapper required label="Reason" prop="reason">
        <el-input
          v-model="formData.reason"
          class="w-100"
          type="textarea"
          rows="3"
          placeholder="Reason for recall"
        />
      </InputWrapper>

      <!--begin::Modal footer-->
      <div class="modal-footer flex-center">
        <!--begin::Button-->
        <button type="reset" data-bs-dismiss="modal" class="btn btn-light me-3">
          Cancel
        </button>
        <!--end::Button-->

        <!--begin::Button-->
        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          <span v-if="!loading" class="indicator-label"> Save </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
    </el-form>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import timeFrames from "@/core/data/time-frames";

export default defineComponent({
  name: "patient-recall-reminder-modal",
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const patientRecallReminderModal = ref(null);
    const loading = ref(false);

    const formData = ref({
      patient_id: 0,
      time_frame: 1,
      reason: "",
    });
    const patientData = ref([]);

    watchEffect(() => {
      patientData.value = store.getters.selectedPatient;
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      loading.value = true;
      formData.value.patient_id = patientData.value.id;
      store
        .dispatch(Actions.PATIENTS.RECALL.CREATE, formData.value)
        .then(() => {
          loading.value = false;
          Swal.fire({
            text: "Recall Created",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            hideModal(patientRecallReminderModal.value);
          });
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
      formRef.value.resetFields();
    };

    return {
      formData,
      formRef,
      loading,
      patientRecallReminderModal,
      timeFrames,
      submit,
    };
  },
});
</script>