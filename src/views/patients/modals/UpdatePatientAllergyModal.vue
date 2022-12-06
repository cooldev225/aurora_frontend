<template>
  <ModalWrapper
    title="Update Allergy"
    modalId="update_patient_allergy"
    modalRef="updatePatientAllergyRef"
    :is-static="true"
  >
    <el-form
      @submit.prevent
      :model="formData"
      :rules="rules"
      ref="updatePatientAllergyFormRef"
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
        :disabled="loading || isDataUnchanged"
        @click="updateAllergy"
      >
        <span v-if="!loading" class="indicator-label">Update Allergy</span>
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
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import patientAllergyTypes from "@/core/data/patient-allergy-types";

export default defineComponent({
  name: "update-patient-allergy-modal",
  props: {
    patient: { required: true },
    allergy: { type: Object },
  },
  emits: ["updateAllergy", "closeModal"],
  components: {
    AlertBadge,
  },
  setup(props, { emit }) {
    const store = useStore();
    const allergy = computed(() => props.allergy);
    const parentModal = ref(null);
    const updatePatientAllergyFormRef = ref(null);
    const loading = ref(false);
    const patient = computed(() => props.patient);
    const validated = ref(null);
    const validationMessage = ref(null);
    const isDataUnchanged = ref(true);
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
      isDataUnchanged.value = true;
      emit("closeModal");
    };

    const updateAllergy = () => {
      loading.value = true;
      const data = {
        id: allergy.value.id,
        patient_id: patient.value.id,
        ...formData.value,
      };

      store
        .dispatch(PatientActions.ALLERGY.UPDATE, data)
        .then(() => {
          closeModal();
        })
        .finally(() => {
          loading.value = false;
          isDataUnchanged.value = true;
        });
    };

    const resetForm = () => {
      isDataUnchanged.value = true;
      updatePatientAllergyFormRef.value.resetFields();
    };

    watch(
      () => formData,
      () => {
        validated.value = null;
        validationMessage.value = null;
        for (let key in formData.value) {
          if (formData.value[key] != allergy.value[key])
            isDataUnchanged.value = false;
        }
      },
      { deep: true }
    );

    watch(
      () => allergy,
      () => {
        resetForm();

        formData.value.name = allergy.value?.name;
        formData.value.severity = allergy.value?.severity;
        formData.value.symptoms = allergy.value?.symptoms;
      },
      { deep: true }
    );

    onMounted(() => {
      isDataUnchanged.value = true;
      parentModal.value = document.getElementById(
        "modal_update_patient_allergy"
      );

      parentModal.value.addEventListener("hidden.bs.modal", function () {
        resetForm();
      });
    });

    return {
      loading,
      updatePatientAllergyFormRef,
      validated,
      validationMessage,
      formData,
      rules,
      updateAllergy,
      closeModal,
      patientAllergyTypes,
      isDataUnchanged,
    };
  },
});
</script>
