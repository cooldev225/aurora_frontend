<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <div
      class="card mb-5 mb-xl-10 m-auto"
      id="patient_view_administration_patient"
    >
      <div class="container py-6">
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
              v-model="formData.contact_number"
              placeholder="Contact Number"
            />
          </InputWrapper>

          <InputWrapper :class="colString" label="Email" prop="email">
            <el-input
              type="email"
              v-model="formData.email"
              placeholder="Email"
            />
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
              <el-option value="male" label="Male" />
              <el-option value="female" label="Female" />
              <el-option value="other" label="Other" />
              <el-option
                value="undisclosed"
                label="Not Stated / Inadequately Described"
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
        <div class="separator separator-dashed"></div>
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
          <span :class="colString"></span>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary w-25">Save</button>
          <button type="reset" class="btn btn-light-primary w-25 ms-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import maritalStatus from "@/core/data/marital-status";
import titles from "@/core/data/titles";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "patient-administration",
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
          message: "Kin Number cannnot be blank",
          trigger: "change",
        },
      ],
      kin_relationship: [
        {
          required: true,
          message: "Kin Relationship cannot be blank",
          trigger: "change",
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
            .dispatch(Actions.PATIENTS.UPDATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.PATIENTS.LIST);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                console.log("Updated");
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Administration", ["Patients"]);
    });

    return {
      formData,
      formRef,
      rules,
      titles,
      maritalStatus,
      submit,
    };
  },
});
</script>
