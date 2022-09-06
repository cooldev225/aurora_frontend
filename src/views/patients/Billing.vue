<template>
  <CardSection>
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
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
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Medicare Expiry Date"
          prop="medicare_expiry_date"
        >
          <el-input
            v-model="formData.medicare_expiry_date"
            type="text"
            placeholder="Medicare Expiry Date"
          />
        </InputWrapper>
        <span class="m-auto" :class="colString"
          ><button class="btn btn-light-warning m-3">Validate Medicare</button
          >Last validated on: xx/xxx/xxxx</span
        >
      </div>

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
  </CardSection>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "patient-billing",
  components: {},
  data: function () {
    return {
      colString: "col-12 col-sm-6 ",
    };
  },
  setup() {
    const store = useStore();
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
    });
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const loading = ref(false);

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      store
        .dispatch(PatientActions.PATIENTS.UPDATE, formData.value)
        .then(() => {
          loading.value = false;
          store.dispatch(PatientActions.PATIENTS.LIST);
          Swal.fire({
            text: "Successfully Updated!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);
    });

    return {
      formRef,
      formData,
      healthFundsList,
      submit,
    };
  },
});
</script>
