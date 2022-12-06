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

    <!-- <AlertBadge
      v-if="validationMessage != null"
      :text="validationMessage"
      :color="validated ? 'success' : 'warning'"
      icon=""
    />

    <AlertBadge
      v-if="concessionValidationMessage != null"
      :text="concessionValidationMessage"
      :color="concessionValidated ? 'success' : 'warning'"
      icon=""
    /> -->

    <!-- <div
      v-if="Object.keys(updateDetails).length !== 0"
      class="p-3 m-3 card border border-dashed border-primary"
    >
      <p>
        The following patient details can be updated to match Medicare records.
        Please select which details you would like to update.
      </p>
      <p>
        Any previous name(s) will be stored as an alternative name on the
        Demographics page.
      </p>

      <div
        v-for="(item, index) in updateDetails"
        :key="`update-details-item-${index}`"
        class="px-6"
      >
        <el-checkbox
          type="checkbox"
          v-model="item.update"
          :label="`${item.label}: ${item.oldVal} → ${item.newVal}`"
        />
      </div>
    </div> -->

    <div class="d-flex justify-content-end">
      <!-- <button
        v-if="detailsToUpdateExist"
        class="btn btn-lg btn-primary me-2"
        @click="handleUpdateDetails"
      >
        Update Details
      </button> -->

      <!-- <template v-if="enableMedicareValidation">
        <button
          v-if="!validated"
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary me-2"
          :disabled="loading"
          @click="validateSource"
        >
          <span v-if="!loading" class="indicator-label">Validate</span>
          <span v-if="loading" class="indicator-progress">
            Validating...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <button
          v-if="validated && formData.billing_type == 1"
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary me-2"
          :disabled="loading"
          @click="handleCheckConcession"
        >
          <span v-if="!loading" class="indicator-label">Check Concession</span>
          <span v-if="loading" class="indicator-progress">
            Validating...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </template> -->

      <button
        v-if="
          (enableMedicareValidation && validated) || !enableMedicareValidation
        "
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary me-2"
        :disabled="loading"
        @click="updateClaimSource"
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import PatientBillingTypes from "@/core/data/patient-billing-types";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import { isMedicareValidationEnabled } from "@/core/data/billing";

export default defineComponent({
  name: "update-patient-allergy-modal",
  props: {
    patient: { required: true },
    allergy: { type: Object },
  },
  emits: ["addClaimSource", "closeModal", "updateDetails"],
  components: {
    // AlertBadge,
  },
  setup(props, { emit }) {
    const store = useStore();
    const allergy = computed(() => props.allergy);
    const parentModal = ref(null);
    const updatePatientAllergyFormRef = ref(null);
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const minorId = computed(() => store.getters.latestMinorId);
    const loading = ref(false);
    const patient = computed(() => props.patient);
    const validated = ref(null);
    const validationMessage = ref(null);
    const concessionValidated = ref(null);
    const concessionValidationMessage = ref(null);
    const enableMedicareValidation = computed(() =>
      isMedicareValidationEnabled()
    );
    const formData = ref({
      name: null,
      severity: null,
      symptoms: null,
    });
    // const memberNumberTitle = computed(() => {
    //   switch (formData.value.billing_type) {
    //     case 1:
    //       return "Medicare Card Number";
    //     case 2:
    //       return "Health Fund Member Number";
    //     case 3:
    //       return "DVA Number";
    //     default:
    //       return "Member Number";
    //   }
    // });
    // const memberRefNumberTitle = computed(() => {
    //   switch (formData.value.billing_type) {
    //     case 1:
    //       return "Individual Reference Number (IRN)";
    //     default:
    //       return "Reference Number";
    //   }
    // });
    // const updateDetails = ref({});
    console.log(formData.value);

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
          required: false,
          message: "Symptoms cannot be blank",
          trigger: "change",
        },
      ],
    });

    // const detailsToUpdateExist = computed(() => {
    //   for (const detailName in updateDetails.value) {
    //     if (updateDetails.value[detailName].update) {
    //       return true;
    //     }
    //   }

    //   return false;
    // });

    // const handleUpdateDetails = () => {
    //   let detailsToEmit = {};
    //   let shouldEmit = false;

    //   for (const detailName in updateDetails.value) {
    //     switch (detailName) {
    //       case "first_name":
    //         detailsToEmit.first_name = updateDetails.value[detailName].newVal;
    //         shouldEmit = true;
    //         break;
    //       case "last_name":
    //         detailsToEmit.last_name = updateDetails.value[detailName].newVal;
    //         shouldEmit = true;
    //         break;
    //       case "member_reference_number":
    //         formData.value.member_reference_number =
    //           updateDetails.value[detailName].newVal;
    //         break;
    //     }
    //   }

    //   if (shouldEmit) {
    //     emit("updateDetails", detailsToEmit);
    //   }

    //   updateDetails.value = {};
    // };

    // const doValidation = (endpoint, data, isConcession = false) => {
    //   loading.value = true;
    //   updateDetails.value = {};

    //   store
    //     .dispatch(endpoint, data)
    //     .then(() => {
    //       const validation = store.getters.validationResponse;

    //       if (validation.data.verified) {
    //         if (isConcession) {
    //           concessionValidated.value = true;
    //           concessionValidationMessage.value = validation.data.message;
    //         } else {
    //           validated.value = true;
    //           validationMessage.value = validation.data.message;
    //         }
    //       }

    //       if (!validation.data.verified) {
    //         if (isConcession) {
    //           concessionValidated.value = false;
    //           concessionValidationMessage.value = validation.data.message;
    //         } else {
    //           validated.value = false;
    //           validationMessage.value = validation.data.message;
    //         }
    //       }

    //       if (
    //         !Object.prototype.hasOwnProperty.call(
    //           validation.data,
    //           "update_details"
    //         )
    //       ) {
    //         for (const detailName in validation.data.update_details) {
    //           switch (detailName) {
    //             case "givenName":
    //               updateDetails.value.first_name = {
    //                 label: "First Name",
    //                 oldVal: patient.value.first_name,
    //                 newVal: validation.data.update_details[detailName],
    //                 update: false,
    //               };
    //               break;
    //             case "familyName":
    //               updateDetails.value.last_name = {
    //                 label: "Last Name",
    //                 oldVal: patient.value.last_name,
    //                 newVal: validation.data.update_details[detailName],
    //                 update: false,
    //               };
    //               break;
    //             case "memberRefNumber":
    //               updateDetails.value.member_reference_number = {
    //                 label: "Reference Number",
    //                 oldVal: formData.value.member_reference_number,
    //                 newVal: validation.data.update_details[detailName],
    //                 update: false,
    //               };
    //               break;
    //           }
    //         }
    //       }
    //     })
    //     .catch(() => {
    //       const errors = store.getters.getErrors;
    //       let message;

    //       if (
    //         Object.prototype.hasOwnProperty.call(errors, "errors") &&
    //         errors.errors.length >= 1
    //       ) {
    //         message = errors.errors[0];
    //       } else {
    //         message = "Unknown Error. Please try again.";
    //       }

    //       validationMessage.value = message;
    //     })
    //     .finally(() => {
    //       loading.value = false;
    //     });
    // };

    const closeModal = () => {
      emit("closeModal");
    };

    // const validateSource = () => {
    //   if (minorId.value.minorId == null) {
    //     Swal.fire({
    //       text: `No Minor ID could be found. Please ensure all clinics have an assigned Minor ID.`,
    //       icon: "error",
    //       buttonsStyling: true,
    //       confirmButtonText: "Okay",
    //       customClass: {
    //         confirmButton: "btn btn-primary",
    //       },
    //     }).then(() => {
    //       return;
    //     });
    //   }

    //   let validationData = {
    //     first_name: patient.value.first_name,
    //     last_name: patient.value.last_name,
    //     date_of_birth: patient.value.date_of_birth,
    //     sex: patient.value.gender,
    //     minor_id: minorId.value.minorId,
    //   };
    //   let endpoint;

    //   switch (formData.value.billing_type) {
    //     case 1:
    //       // Medicare card
    //       validationData.medicare_number = formData.value.member_number;
    //       validationData.medicare_reference_number =
    //         formData.value.member_reference_number;
    //       endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_MEDICARE;
    //       break;
    //     case 2: {
    //       // Health Fund
    //       validationData.fund_member_number = formData.value.member_number;
    //       validationData.fund_reference_number =
    //         formData.value.member_reference_number;
    //       validationData.fund_organisation_code = formData.value.health_fund_id;
    //       endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_HEALTH_FUND;
    //       break;
    //     }
    //     case 3:
    //       // DVA
    //       validationData.veteran_number = formData.value.member_number;
    //       endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_DVA;
    //       break;
    //   }

    //   doValidation(endpoint, validationData);
    // };

    // const handleCheckConcession = () => {
    //   const validationData = {
    //     first_name: patient.value.first_name,
    //     last_name: patient.value.last_name,
    //     date_of_birth: patient.value.date_of_birth,
    //     medicare_number: formData.value.member_number,
    //     medicare_reference_number: formData.value.member_reference_number,
    //     minor_id: minorId.value.minorId,
    //   };
    //   const endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_CONCESSION;

    //   doValidation(endpoint, validationData, true);
    // };

    // const updateClaimSource = () => {
    //   loading.value = true;
    //   const data = {
    //     id: allergy.value.id,
    //     is_valid: true,
    //     patient_id: patient.value.id,
    //     ...formData.value,
    //   };

    //   store
    //     .dispatch(PatientActions.CLAIM_SOURCE.UPDATE, data)
    //     .then(() => {
    //       closeModal();
    //     })
    //     .finally(() => {
    //       loading.value = false;
    //     });
    // };

    const resetForm = () => {
      updatePatientAllergyFormRef.value.resetFields();
    };

    watch(
      () => formData,
      () => {
        validated.value = null;
        concessionValidated.value = null;
        validationMessage.value = null;
        concessionValidationMessage.value = null;
      },
      { deep: true }
    );

    watch(
      () => allergy,
      () => {
        resetForm();

        // formData.value.billing_type = allergy.value?.billing_type;
        // formData.value.member_number = allergy.value?.member_number;
        // formData.value.member_reference_number =
        //   allergy.value?.member_reference_number;
        // formData.value.health_fund_id = allergy.value?.health_fund_id;
      },
      { deep: true }
    );

    onMounted(() => {
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
      moment,
      validated,
      validationMessage,
      concessionValidated,
      concessionValidationMessage,
      formData,
      PatientBillingTypes,
      healthFundsList,
      // validateSource,
      // handleCheckConcession,
      rules,
      // updateClaimSource,
      // updateDetails,
      // detailsToUpdateExist,
      // handleUpdateDetails,
      enableMedicareValidation,
      closeModal,
    };
  },
});
</script>
