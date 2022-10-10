<template>
  <CardSection>
    <el-form
      @submit.prevent="validateMedicare()"
      :model="formData"
      :rules="rulesMedicare"
      ref="formRefMedicare"
    >
      <HeadingText text="Medicare Details" />
      <div class="row justify-content-md-center">
        <InputWrapper
          :class="colString"
          label="Medicare Number"
          prop="medicare_number"
        >
          <el-input
            v-model="formData.medicare_number"
            type="text"
            placeholder="Medicare Number"
            :disabled="loading.medicare || validated.medicare"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Medicare Reference Number"
          prop="medicare_reference_number"
        >
          <el-input
            v-model="formData.medicare_reference_number"
            type="text"
            placeholder="Medicare Reference Number"
            :disabled="loading.medicare || validated.medicare"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Medicare Expiry Date"
          prop="medicare_expiry_date"
        >
          <el-date-picker
            class="w-100"
            v-model="formData.medicare_expiry_date"
            placeholder="Medicare Expiry Date"
            :disabled="loading.medicare || validated.medicare"
          />
        </InputWrapper>
        <span class="m-auto" :class="colString">
          <button
            class="btn btn-light-warning m-3"
            type="submit"
            :disabled="loading.medicare || validated.medicare"
            :data-kt-indicator="loading.medicare ? 'on' : 'off'"
          >
            <span class="indicator-label"> Validate Medicare </span>

            <span class="indicator-progress">
              Validating...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>

          Last validated:
          <template v-if="selectedPatient?.billing?.medicare_last_validated_at">
            {{ selectedPatient.billing.medicare_last_validated_at }}
          </template>

          <template v-else>Never</template>
        </span>
        <div v-if="validated.medicare !== null" class="col-12">
          <AlertBadge
            :text="
              validated.medicare
                ? 'Medicare details validated'
                : validationErrors.medicare
            "
            :color="validated.medicare ? 'success' : 'warning'"
            icon=""
          />
        </div>
      </div>
    </el-form>
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <el-divider />
      <HeadingText text="Concession" />

      <div class="row justify-content-md-center">
        <InputWrapper
          :class="colString"
          label="Pension Card Number"
          prop="pension_number"
        >
          <el-input
            v-model="formData.pension_number"
            type="text"
            placeholder="Pension Card Number"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Pension Card Expiry Date"
          prop="pension_expiry_date"
        >
          <el-date-picker
            class="w-100"
            v-model="formData.pension_expiry_date"
            placeholder="Pension Expiry Date"
          />
        </InputWrapper>

        <InputWrapper
          :class="colString"
          label="Healthcare Card Number"
          prop="healthcare_card_number"
        >
          <el-input
            v-model="formData.healthcare_card_number"
            type="text"
            placeholder="Healthcare Card Number"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Healthcare Card Expiry Date"
          prop="healthcare_card_expiry_date"
        >
          <el-date-picker
            class="w-100"
            v-model="formData.healthcare_card_expiry_date"
            placeholder="Healthcare Expiry Date"
          />
        </InputWrapper>
      </div>
      <HeadingText text="Health Fund Details" />
      <div class="row justify-content-md-center">
        <InputWrapper
          :class="colString"
          label="Health Fund"
          prop="health_fund_id"
        >
          <el-select
            class="w-100"
            v-model="formData.health_fund_id"
            placeholder="Health Fund"
          >
            <template v-for="item in healthFundsList" :key="item.id">
              <el-option
                :value="item.id"
                :label="item.code + '-' + item.name"
              />
            </template>
          </el-select>
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Health Fund Membership Number"
          prop="health_fund_membership_number"
        >
          <el-input
            v-model="formData.health_fund_membership_number"
            type="text"
            placeholder="Health Fund Membership Number"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Health Fund Reference Number"
          prop="health_fund_reference_number"
        >
          <el-input
            v-model="formData.health_fund_reference_number"
            type="text"
            placeholder="Health Fund Reference Number"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Health Fund Expiry Date"
          prop="health_fund_expiry_date"
        >
          <el-date-picker
            class="w-100"
            v-model="formData.health_fund_expiry_date"
            placeholder="Health Fund Expiry Date"
          />
        </InputWrapper>

        <div class="d-flex ms-auto justify-content-end p-6">
          <button type="submit" class="btn btn-primary w-25">Save</button>
        </div>
      </div>
    </el-form>

    <MedicareUpdateDetailsModal
      :patientId="selectedPatient?.id"
      :updateDetails="updateDetails.medicare"
    />
  </CardSection>
</template>

<script>
import {
  defineComponent,
  ref,
  watchEffect,
  onMounted,
  computed,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import MedicareUpdateDetailsModal from "@/views/patients/modals/MedicareUpdateDetailsModal.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "patient-billing",
  components: {
    AlertBadge,
    MedicareUpdateDetailsModal,
  },
  data: function () {
    return {
      colString: "col-12 col-sm-6 ",
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const formRefMedicare = ref(null);
    const formRef = ref(null);
    const formData = ref({
      medicare_number: "",
      medicare_reference_number: "",
      medicare_expiry_date: "",
      pension_number: "",
      pension_expiry_date: "",
      healthcare_card_number: "",
      healthcare_card_expiry_date: "",
      health_fund_id: "",
      health_fund_membership_number: "",
      health_fund_reference_number: "",
      health_fund_expiry_date: "",
      patient_id: route.params.id,
      //
      concession_number: "",
      concession_expiry_date: "2022-09-09",
      account_holder_type: "",
      account_holder_id: "",
      fund_excess: "",
      //
      id: route.params.id,
    });
    const rulesMedicare = ref({
      medicare_number: [
        {
          required: true,
          message: "Medicare Number cannot be blank",
          trigger: "change",
        },
      ],
      medicare_reference_number: [
        {
          required: true,
          message: "Medicare Reference Number cannot be blank",
          trigger: "change",
        },
      ],
      medicare_expiry_date: [
        {
          required: false,
          message: "Medicare Expiry Date cannot be blank",
          trigger: "change",
        },
      ],
    });
    const rules = ref({
      pension_number: [
        {
          required: true,
          message: "Pension Card Number cannot be blank",
          trigger: "change",
        },
      ],
      pension_expiry_date: [
        {
          required: true,
          message: "Pension Card Expiry Date cannot be blank",
          trigger: "change",
        },
      ],
      healthcare_card_number: [
        {
          required: true,
          message: "Healthcare Card Number cannot be blank",
          trigger: "change",
        },
      ],
      healthcare_card_expiry_date: [
        {
          required: true,
          message: "Healthcare Card Expiry Date cannot be blank",
          trigger: "change",
        },
      ],
      health_fund_id: [
        {
          required: true,
          message: "Health Fund cannot be blank",
          trigger: "change",
        },
      ],
      health_fund_membership_number: [
        {
          required: true,
          message: "Health Fund Membership Number cannot be blank",
          trigger: "change",
        },
      ],
      health_fund_reference_number: [
        {
          required: true,
          message: "Health Fund Reference Number cannot be blank",
          trigger: "change",
        },
      ],
      health_fund_expiry_date: [
        {
          required: true,
          message: "Health Fund Expiry Date cannot be blank",
          trigger: "change",
        },
      ],
    });
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const loading = ref({
      medicare: false,
      form: false,
    });
    const validated = ref({
      medicare: null,
    });
    const validationErrors = ref({
      medicare: null,
    });
    const updateDetails = ref({
      medicare: {},
    });
    const patientId = ref(null);

    const validateMedicare = () => {
      if (!formRefMedicare.value) {
        return;
      }

      formRefMedicare.value.validate((valid) => {
        if (valid) {
          const data = formData.value;

          loading.value.medicare = true;
          store
            .dispatch(PatientActions.BILLING.VALIDATE_MEDICARE, {
              first_name: selectedPatient.value.first_name,
              last_name: selectedPatient.value.last_name,
              date_of_birth: selectedPatient.value.date_of_birth,
              sex: 9,
              medicare_number: data.medicare_number,
              medicare_reference_number: data.medicare_reference_number,
              minor_id: "AUA00000",
            })
            .then(() => {
              const validation = store.getters.medicareValidationResponse;
              if (validation.data.verified) {
                validated.value.medicare = true;
              }

              if (!validation.data.verified) {
                validated.value.medicare = false;
                validationErrors.value.medicare = validation.data.message;
              }

              if (
                !Object.prototype.hasOwnProperty.call(
                  validation.data.update_details
                )
              ) {
                for (const detail in validation.data.update_details) {
                  switch (detail) {
                    case "givenName":
                      updateDetails.value.medicare.firstName = {
                        old: selectedPatient.value.firstName,
                        new: validation.data.update_details.givenName,
                        name: "First Name",
                      };
                      break;
                    case "familyName":
                      updateDetails.value.medicare.lastName = {
                        old: selectedPatient.value.lastName,
                        new: validation.data.update_details.familyName,
                        name: "Last Name",
                      };
                      break;
                    case "memberRefNumber":
                      updateDetails.value.medicare.referenceNumber = {
                        old: data.medicare_reference_number,
                        new: validation.data.update_details.memberRefNumber,
                        name: "Medicare Reference Number",
                      };
                      break;
                  }
                }

                const modal = new Modal(
                  document.getElementById("modal_update_patient_details")
                );
                modal.show();
              }
            })
            .catch((e) => {
              const errors = store.getters.getErrors;
              console.log(e);
              validated.value.medicare = false;
              if (
                Object.prototype.hasOwnProperty.call(errors, "errors") &&
                errors.errors.length >= 1
              ) {
                validationErrors.value.medicare = errors.errors[0];
              } else {
                validationErrors.value.medicare =
                  "Unknown Error. Please try again.";
              }
            })
            .finally(() => {
              loading.value.medicare = false;
            });
        }
      });
    };
    const submit = () => {
      if (!formRef.value || !formRefMedicare.value) {
        return;
      }
      formRefMedicare.value.validate((valid) => {
        if (valid) {
          formRef.value.validate((valid) => {
            if (valid) {
              console.log(selectedPatient.value);
              store
                .dispatch(PatientActions.BILLING.UPDATE, formData.value)
                .then(() => {
                  loading.value.form = false;
                })
                .catch(({ response }) => {
                  loading.value.form = false;
                  console.log(response.data.error);
                });
            }
          });
        }
      });
    };

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.VIEW, id);
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);
    });

    return {
      formRef,
      formRefMedicare,
      formData,
      healthFundsList,
      validateMedicare,
      submit,
      rules,
      rulesMedicare,
      loading,
      validated,
      validationErrors,
      updateDetails,
      selectedPatient,
    };
  },
});
</script>
