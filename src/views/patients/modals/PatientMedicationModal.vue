<template>
  <ModalWrapper
    :title="title"
    :modalId="customId"
    modalRef="patientMedicationRef"
    :is-static="true"
  >
    <el-form
      @submit.prevent
      :model="formData"
      :rules="rules"
      ref="patientMedicationFormRef"
    >
      <div class="row justify-content-md-center">
        <InputWrapper label="Name" prop="name">
          <el-input type="text" v-model="formData.name" placeholder="Name" />
        </InputWrapper>

        <InputWrapper label="Instruction" prop="instruction">
          <el-input
            type="text"
            v-model="formData.instruction"
            placeholder="Instruction"
          />
        </InputWrapper>

        <InputWrapper label="Active" prop="active">
          <el-input
            type="text"
            v-model="formData.active"
            placeholder="Active"
          />
        </InputWrapper>
      </div>
    </el-form>

    <AlertBadge
      v-if="validationMessage != null"
      :text="validationMessage"
      :color="validated ? 'success' : 'warning'"
      icon=""
    />

    <div class="d-flex justify-content-end">
      <button
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary me-2"
        :disabled="loading || isDataUnchanged"
        @click="handleClick"
      >
        <span v-if="!loading" class="indicator-label">{{ title }}</span>
        <span v-if="loading" class="indicator-progress">
          Please wait...
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

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  PropType,
} from "vue";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import IPatientMedication from "@/store/interfaces/IPatientMedication";
import IPatient from "@/store/interfaces/IPatient";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "patient-medication-modal",
  props: {
    patient: { required: true, type: Object as PropType<IPatient> },
    medication: Object as PropType<IPatientMedication>,
    shouldEmit: { type: Boolean, default: false },
    modalId: { type: String },
  },
  emits: ["closeModal"],
  components: {
    AlertBadge,
  },
  setup(props, { emit }) {
    const store = useStore();
    const medication = computed<null | IPatientMedication>(() => {
      return props.medication ? props.medication : null;
    });
    const parentModal = ref<Modal>(null);
    const patientMedicationFormRef = ref<null | HTMLFormElement>(null);
    const patientMedicationRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const patient = computed<IPatient>(() => props.patient);
    const validated = ref(null);
    const validationMessage = ref(null);
    const customId = computed<string>(
      () => props.modalId ?? "patient_medication"
    );
    const title = computed<string>(() =>
      medication.value ? "Update Medication" : "Add Medication"
    );
    const isDataUnchanged = ref<boolean>(medication.value ? true : false);
    const formData = ref({
      name: "",
      instruction: "",
      active: "",
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Name cannot be blank",
          trigger: "change",
        },
      ],
      instruction: [
        {
          required: true,
          message: "Instruction cannot be blank",
          trigger: "change",
        },
      ],
      active: [
        {
          required: true,
          message: "Active cannot be blank",
          trigger: "change",
        },
      ],
    });

    const closeModal = () => {
      if (medication.value) isDataUnchanged.value = true;
      emit("closeModal");
    };

    const handleClick = () => {
      medication.value ? updateMedication() : addNewMedication();
    };

    const addNewMedication = () => {
      const medicationSource = JSON.parse(JSON.stringify(formData))._value;
      loading.value = true;
      medicationSource.patient_id = patient.value.id;
      store
        .dispatch(PatientActions.MEDICATION.ADD, medicationSource)
        .then(() => {
          closeModal();
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const updateMedication = () => {
      loading.value = true;
      const data = {
        id: medication?.value?.id,
        patient_id: patient.value.id,
        ...formData.value,
      };

      store
        .dispatch(PatientActions.MEDICATION.UPDATE, data)
        .then(() => {
          closeModal();
        })
        .finally(() => {
          loading.value = false;
          isDataUnchanged.value = true;
        });
    };

    const resetForm = () => {
      if (medication.value) isDataUnchanged.value = true;
      patientMedicationFormRef?.value?.resetFields();
    };

    watch(
      () => formData,
      () => {
        validated.value = null;
        validationMessage.value = null;
        if (medication.value) {
          for (let key in formData.value) {
            if (formData.value[key] != medication.value[key])
              isDataUnchanged.value = false;
          }
        }
      },
      { deep: true }
    );

    watch(
      () => medication,
      () => {
        resetForm();

        formData.value.name = medication?.value?.name ?? "";
        formData.value.instruction = medication?.value?.instruction ?? "";
        formData.value.active = medication?.value?.active ?? "";
      },
      { deep: true }
    );

    onMounted(() => {
      if (medication.value) isDataUnchanged.value = true;
      parentModal.value = document.getElementById(`modal_${customId.value}`);
      parentModal.value.addEventListener("hidden.bs.modal", function () {
        resetForm();
      });
    });

    return {
      loading,
      patientMedicationFormRef,
      patientMedicationRef,
      validated,
      validationMessage,
      formData,
      rules,
      addNewMedication,
      customId,
      title,
      handleClick,
    };
  },
});
</script>
