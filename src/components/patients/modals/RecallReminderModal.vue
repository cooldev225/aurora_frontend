<template>
  <div
    class="modal fade"
    id="modal_patient_recall_reminder"
    tabindex="-1"
    aria-hidden="true"
    ref="patientRecallReminderModal"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add Recall</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
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
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              data-bs-dismiss="modal"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
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
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import timeFrames from "@/core/data/time-frames";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "patient-recall-reminder-modal",
  components: { InputWrapper },
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
