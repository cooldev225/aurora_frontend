<template>
  <ModalWrapper
    title="Add New Claim Source"
    modalId="add_claim_source"
    modalRef="addClaimSourceRef"
    :static="true"
  >
    <el-form
      @submit.prevent
      :model="formData"
      :rules="rules"
      ref="addClaimSourceFormRef"
    >
      <HeadingText text="Details" />

      <div class="row justify-content-md-center">
        <InputWrapper label="Type" prop="billing_type">
          <el-select
            class="w-100"
            v-model="formData.billing_type"
            placeholder="Select Type"
          >
            <el-option
              v-for="item in PatientBillingTypes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper :label="memberNumberTitle" prop="member_number">
          <el-input
            type="text"
            v-model="formData.member_number"
            :placeholder="memberNumberTitle"
          />
        </InputWrapper>

        <InputWrapper
          v-if="formData.billing_type != 3"
          :label="memberRefNumberTitle"
          prop="member_reference_number"
        >
          <el-input
            type="text"
            v-model="formData.member_reference_number"
            :placeholder="memberRefNumberTitle"
          />
        </InputWrapper>

        <InputWrapper
          v-if="formData.billing_type == 2"
          label="Health Fund"
          prop="health_fund_id"
        >
          <el-select
            class="w-100"
            v-model="formData.health_fund_id"
            placeholder="Select Health Fund"
          >
            <el-option
              v-for="item in healthFundsList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </InputWrapper>
      </div>
    </el-form>

    <AlertBadge
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
    />

    <div class="d-flex justify-content-end">
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

      <button
        v-if="validated"
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary me-2"
        :disabled="loading"
        @click="addNewClaimSource"
      >
        <span v-if="!loading" class="indicator-label">Add Claim Source</span>
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
import { PatientActions } from "@/store/enums/StorePatientEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import PatientBillingTypes from "@/core/data/patient-billing-types";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "add-claim-source-modal",
  props: {
    patient: { required: true },
    claimSource: { type: Object },
    shouldEmit: { type: Boolean, default: false },
  },
  emits: ["addClaimSource", "closeModal"],
  components: {
    AlertBadge,
  },
  setup(props, { emit }) {
    const store = useStore();
    const claimSource = computed(() => props.claimSource);
    const shouldEmit = computed(() => props.shouldEmit);
    const parentModal = ref(null);
    const addClaimSourceFormRef = ref(null);
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const minorId = computed(() => store.getters.latestMinorId);
    const loading = ref(false);
    const patient = computed(() => props.patient);
    const validated = ref(null);
    const validationMessage = ref(null);
    const concessionValidated = ref(null);
    const concessionValidationMessage = ref(null);
    const formData = ref({
      member_number: null,
      member_reference_number: null,
      health_fund_id: null,
      billing_type: null,
    });
    const memberNumberTitle = computed(() => {
      switch (formData.value.billing_type) {
        case 1:
          return "Medicare Card Number";
        case 2:
          return "Health Fund Member Number";
        case 3:
          return "DVA Number";
        default:
          return "Member Number";
      }
    });
    const memberRefNumberTitle = computed(() => {
      switch (formData.value.billing_type) {
        case 1:
          return "Individual Reference Number (IRN)";
        default:
          return "Reference Number";
      }
    });
    const updateDetails = ref({});

    const rules = ref({
      billing_type: [
        {
          required: true,
          message: "Must select claim source type",
          trigger: "change",
        },
      ],
      member_number: [
        {
          required: true,
          message: "Member number cannot be blank",
          trigger: "change",
        },
      ],
      member_ref_number: [
        {
          required: true,
          message: "Member reference number cannot be blank",
          trigger: "change",
        },
      ],
    });

    const doValidation = (endpoint, data, isConcession = false) => {
      loading.value = true;
      updateDetails.value = {};

      store
        .dispatch(endpoint, data)
        .then(() => {
          const validation = store.getters.validationResponse;

          if (validation.data.verified) {
            if (isConcession) {
              concessionValidated.value = true;
              concessionValidationMessage.value = validation.data.message;
            } else {
              validated.value = true;
              validationMessage.value = validation.data.message;
            }
          }

          if (!validation.data.verified) {
            if (isConcession) {
              concessionValidated.value = false;
              concessionValidationMessage.value = validation.data.message;
            } else {
              validated.value = false;
              validationMessage.value = validation.data.message;
            }
          }

          if (
            !Object.prototype.hasOwnProperty.call(
              validation.data,
              "update_details"
            )
          ) {
            for (const detailName in validation.data.update_details) {
              switch (detailName) {
                case "givenName":
                  updateDetails.value.first_name =
                    validation.data.update_details[detailName];
                  break;
                case "familyName":
                  updateDetails.value.last_name =
                    validation.data.update_details[detailName];
                  break;
                case "memberRefNumber":
                  updateDetails.value.member_reference_number =
                    validation.data.update_details[detailName];
                  break;
              }
            }
          }
        })
        .catch((e) => {
          const errors = store.getters.getErrors;
          let message;

          if (
            Object.prototype.hasOwnProperty.call(errors, "errors") &&
            errors.errors.length >= 1
          ) {
            message = errors.errors[0];
          } else {
            message = "Unknown Error. Please try again.";
          }

          validationMessage.value = message;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const validateSource = () => {
      if (minorId.value.minorId == null) {
        Swal.fire({
          text: `No Minor ID could be found. Please ensure all clinics have an assigned Minor ID.`,
          icon: "error",
          buttonsStyling: true,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          loading.value = false;
          closeModal();
          return;
        });
      }

      if (!addClaimSourceFormRef.value) {
        return;
      }

      addClaimSourceFormRef.value.validate((valid) => {
        if (valid) {
          let validationData = {
            first_name: patient.value.first_name,
            last_name: patient.value.last_name,
            date_of_birth: patient.value.date_of_birth,
            sex: patient.value.gender ?? 9, // If provided, use gender. Otherwise, use "unspecified" value: 9
            minor_id: minorId.value.minorId,
          };
          let endpoint;

          switch (formData.value.billing_type) {
            case 1:
              // Medicare card
              validationData.medicare_number = formData.value.member_number;
              validationData.medicare_reference_number =
                formData.value.member_reference_number;
              endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_MEDICARE;
              break;
            case 2: {
              // Health Fund
              const healthFund = healthFundsList.value.find(
                (fund) => fund.id === formData.value.health_fund_id
              );
              validationData.fund_member_number = formData.value.member_number;
              validationData.fund_reference_number =
                formData.value.member_reference_number;
              validationData.fund_organisation_code = healthFund?.code;
              endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_HEALTH_FUND;
              break;
            }
            case 3:
              // DVA
              validationData.veteran_number = formData.value.member_number;
              endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_DVA;
              break;
          }

          doValidation(endpoint, validationData);
        }
      });
    };

    const handleCheckConcession = () => {
      const validationData = {
        first_name: patient.value.first_name,
        last_name: patient.value.last_name,
        date_of_birth: patient.value.date_of_birth,
        medicare_number: formData.value.member_number,
        medicare_reference_number: formData.value.member_reference_number,
        minor_id: minorId.value.minorId,
      };
      const endpoint = PatientActions.CLAIM_SOURCE.VALIDATE_CONCESSION;

      doValidation(endpoint, validationData, true);
    };

    const closeModal = () => {
      emit("closeModal");
    };

    const addNewClaimSource = () => {
      const data = JSON.parse(JSON.stringify(formData));
      const claimSource = data._value;
      claimSource.has_medicare_concession = concessionValidated.value;

      if (shouldEmit.value) {
        emit("addClaimSource", claimSource);
        closeModal();
      } else {
        loading.value = true;
        claimSource.patient_id = patient.value.id;
        store
          .dispatch(PatientActions.CLAIM_SOURCE.ADD, claimSource)
          .then(() => {
            closeModal();
          })
          .finally(() => {
            loading.value = false;
          });
      }
    };

    const resetForm = () => {
      addClaimSourceFormRef.value.resetFields();
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

    onMounted(() => {
      parentModal.value = document.getElementById("modal_add_claim_source");
      parentModal.value.addEventListener("hidden.bs.modal", function () {
        resetForm();
      });
    });

    return {
      loading,
      addClaimSourceFormRef,
      moment,
      validated,
      validationMessage,
      concessionValidated,
      concessionValidationMessage,
      formData,
      PatientBillingTypes,
      memberNumberTitle,
      memberRefNumberTitle,
      healthFundsList,
      validateSource,
      handleCheckConcession,
      rules,
      addNewClaimSource,
    };
  },
});
</script>
