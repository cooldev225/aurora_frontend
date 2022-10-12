<template>
  <CardSection>
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <HeadingText text="Patient Details" />

      <div class="row justify-content-md-center">
        <InputWrapper :class="colString" label="Title" prop="title">
          <el-select
            class="w-100"
            v-model="formData.title"
            placeholder="Select Title"
          >
            <el-option
              v-for="item in titles"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper :class="colString" label="First Name" prop="first_name">
          <el-input
            type="text"
            v-model="formData.first_name"
            placeholder="First Name"
          />
        </InputWrapper>

        <InputWrapper :class="colString" label="Last Name" prop="last_name">
          <el-input
            type="text"
            v-model="formData.last_name"
            placeholder="Last Name"
          />
        </InputWrapper>

        <InputWrapper
          :class="colString"
          label="Date Of Birth"
          prop="date_of_birth"
        >
          <el-date-picker
            class="w-100"
            v-model="formData.date_of_birth"
            format="YYYY-MM-DD"
            placeholder="1990-01-01"
          />
        </InputWrapper>

        <InputWrapper
          :class="colString"
          label="Contact Number"
          prop="contact_number"
        >
          <el-input
            type="text"
            v-mask="'0#-####-####'"
            v-model="formData.contact_number"
            placeholder="Contact Number"
          />
        </InputWrapper>

        <InputWrapper :class="colString" label="Email" prop="email">
          <el-input type="email" v-model="formData.email" placeholder="Email" />
        </InputWrapper>

        <InputWrapper :class="colString" label="Address" prop="address">
          <el-input
            type="text"
            v-model="formData.address"
            placeholder="Address"
          />
        </InputWrapper>

        <InputWrapper :class="colString" label="Gender" prop="gender">
          <el-select
            class="w-100"
            v-model="formData.gender"
            placeholder="Select Gender"
          >
            <el-option
              v-for="item in genders"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Marital Status"
          prop="marital_status"
        >
          <el-select
            class="w-100"
            v-model="formData.marital_status"
            placeholder="Marital Status"
          >
            <el-option
              v-for="status in maritalStatus"
              :key="status.value"
              :value="status.value"
              :label="status.label"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper :class="colString" label="Occupation" prop="occupation">
          <el-input
            type="text"
            v-model="formData.occupation"
            placeholder="Occupation"
          />
        </InputWrapper>

        <InputWrapper
          :class="colString"
          label="Aboriginal or Torres Strait Islander?"
          prop="aborginality"
        >
          <el-select
            class="w-100"
            v-model="formData.aborginality"
            placeholder="Aborginality"
          >
            <el-option :value="0" label="No" />
            <el-option :value="1" label="Yes" />
          </el-select>
        </InputWrapper>
        <span :class="colString"></span>
      </div>

      <el-divider />
      <div class="d-flex">
        <HeadingText class="me-5" text="Next Of Kin" />
        <span style="color: grey"
          >would you like your next of kin to receive copies of correspondence?
        </span>
      </div>
      <div class="row justify-content-md-center">
        <InputWrapper :class="colString" label="Name" prop="kin_name">
          <el-input
            type="text"
            v-model="formData.kin_name"
            placeholder="Kin First Name"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Phone Number"
          prop="kin_phone_number"
        >
          <el-input
            type="text"
            v-mask="'0#-####-####'"
            v-model="formData.kin_phone_number"
            placeholder="Kin Phone Number"
          />
        </InputWrapper>
        <InputWrapper
          :class="colString"
          label="Kin Relationship"
          prop="kin_relationship"
        >
          <el-input
            type="text"
            v-model="formData.kin_relationship"
            placeholder="Kin Relationship"
          />
        </InputWrapper>
      </div>
      <div class="row justify-content-md-left">
        <InputWrapper :class="colString" label="Email" prop="kin_email">
          <el-input
            type="email"
            v-model="formData.kin_email"
            placeholder="Kin Email"
          />
        </InputWrapper>
        <span :class="colString"></span>
      </div>

      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary w-25 m-3">Save</button>
      </div>
    </el-form>
  </CardSection>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import maritalStatus from "@/core/data/marital-status";
import titles from "@/core/data/titles";
import genders from "@/core/data/genders";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "patient-administration",
  directives: {
    mask,
  },
  components: { InputWrapper },
  data: function () {
    return {
      colString: "col-12 col-sm-6 col-lg-4 ",
    };
  },
  setup() {
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      title: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      contact_number: "",
      email: "",
      address: "",
      gender: "",
      aborginality: "",
      occupation: "",
      marital_status: "",
      kin_name: "",
      kin_phone_number: "",
      kin_relationship: "",
      kin_email: "",
    });

    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
      contact_number: [
        {
          required: true,
          message: "Contact Number cannot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      email: [
        {
          required: true,
          message: "Email cannot be blank",
          trigger: "change",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
      address: [
        {
          required: true,
          message: "Address cannot be blank",
          trigger: "change",
        },
      ],
      kin_name: [
        {
          required: true,
          message: "Kin Name cannot be blank",
          trigger: "change",
        },
      ],
      kin_phone_number: [
        {
          required: true,
          message: "Kin Number cannot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      kin_relationship: [
        {
          required: true,
          message: "Kin Relationship cannot be blank",
          trigger: "change",
        },
      ],
      kin_email: [
        {
          required: true,
          message: "Kin Email cannot be blank",
          trigger: "change",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
    });
    const loading = ref(false);

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(PatientActions.UPDATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(PatientActions.LIST);
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
        }
      });
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Demographic", ["Patients"]);
    });

    return {
      formData,
      formRef,
      rules,
      titles,
      genders,
      maritalStatus,
      submit,
    };
  },
});
</script>
