<template>
  <ModalWrapper
    title="Add New Allergy"
    :modalId="customId"
    modalRef="addPatientAllergyRef"
    :is-static="true"
  >
    <el-form
      @submit.prevent
      :model="formData"
      :rules="rules"
      ref="addPatientAllergyFormRef"
    >
      <div class="row justify-content-md-center">
        <InputWrapper label="Name" prop="name">
          <el-input type="text" v-model="formData.name" placeholder="Name" />
        </InputWrapper>

        <InputWrapper label="Severity" prop="severity">
          <el-select
            class="w-100"
            v-model="formData.severity"
            placeholder="Select Severity"
          >
            <el-option
              v-for="item in patientAllergyTypes"
              :key="item.value"
              :value="item.label"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper label="Symptoms" prop="symptoms">
          <el-input
            type="text"
            v-model="formData.symptoms"
            placeholder="Symptoms"
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
        :disabled="loading"
        @click="addNewAllergy"
      >
        <span v-if="!loading" class="indicator-label">Add Allergy</span>
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

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import patientAllergyTypes from "@/core/data/patient-allergy-types";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";

export default defineComponent({
  name: "add-patient-allergy-modal",
  props: {
    patient: { required: true },
    shouldEmit: { type: Boolean, default: false },
    modalId: { type: [String, null] },
  },
  emits: ["addAllergy", "closeModal"],
  components: {
    AlertBadge,
  },
  setup(props, { emit }) {
    const store = useStore();
    const shouldEmit = computed(() => props.shouldEmit);
    const parentModal = ref(null);
    const addPatientAllergyFormRef = ref(null);
    const addPatientAllergyRef = ref(null);
    const loading = ref(false);
    const patient = computed(() => props.patient);
    const validated = ref(null);
    const validationMessage = ref(null);
    const concessionValidated = ref(null);
    const concessionValidationMessage = ref(null);
    const customId = computed(() => props.modalId ?? "add_patient_allergy");
    const formData = ref({
      name: null,
      severity: null,
      symptoms: null,
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Name cannot be blank",
          trigger: "change",
        },
      ],
      severity: [
        {
          required: true,
          message: "Must select severity type",
          trigger: "change",
        },
      ],
      symptoms: [
        {
          required: true,
          message: "Symptoms cannot be blank",
          trigger: "change",
        },
      ],
    });

    const closeModal = () => {
      emit("closeModal");
    };

    const addNewAllergy = () => {
      const allergySource = JSON.parse(JSON.stringify(formData))._value;

      if (shouldEmit.value) {
        emit("addAllergy", allergySource);
        closeModal();
      } else {
        loading.value = true;
        allergySource.patient_id = patient.value.id;
        store
          .dispatch(PatientActions.ALLERGY.ADD, allergySource)
          .then(() => {
            closeModal();
          })
          .finally(() => {
            loading.value = false;
          });
      }
    };

    const resetForm = () => {
      addPatientAllergyFormRef.value.resetFields();
    };

    watch(
      () => formData,
      () => {
        validated.value = null;
        validationMessage.value = null;
      },
      { deep: true }
    );

    onMounted(() => {
      parentModal.value = document.getElementById(`modal_${customId.value}`);
      parentModal.value.addEventListener("hidden.bs.modal", function () {
        resetForm();
      });
    });

    return {
      loading,
      addPatientAllergyFormRef,
      addPatientAllergyRef,
      validated,
      validationMessage,
      formData,
      patientAllergyTypes,
      rules,
      addNewAllergy,
      customId,
    };
  },
});
</script>
