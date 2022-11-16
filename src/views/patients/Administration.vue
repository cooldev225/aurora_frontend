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
          <div class="el-input">
            <GMapAutocomplete
              :value="formData.address"
              ref="addressRef"
              placeholder="Enter the Address"
              @place_changed="handleAddressChange"
              :options="{
                componentRestrictions: {
                  country: 'au',
                },
              }"
            >
            </GMapAutocomplete>
          </div>
        </InputWrapper>

        <InputWrapper :class="colString" label="Post Code" prop="postcode">
          <el-input
            disabled
            type="text"
            v-model="formData.postcode"
            placeholder="Post Code"
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

        <InputWrapper :class="colString" label="Race" prop="race">
          <el-select class="w-100" v-model="formData.race" placeholder="Race">
            <el-option
              v-for="item in race"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper
          :class="colString"
          label="Country Of Birth"
          prop="country_of_birth"
        >
          <el-select
            class="w-100"
            v-model="formData.country_of_birth"
            placeholder="Country Of Birth"
          >
            <el-option
              v-for="item in country_of_birth"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </InputWrapper>
        <span :class="colString"></span>
        <span :class="colString"></span>
      </div>

      <el-divider />
      <div
        class="d-flex flex-row mb-5 align-items-center justify-content-between"
      >
        <HeadingText class="align-items-center" text="Next Of Kin" />

        <el-checkbox
          prop="kin_receive_correspondence"
          type="checkbox"
          class="pb-5"
          v-model="formData.kin_receive_correspondence"
          label="NOK to receive copies of correspondence"
        />
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
  <CardSection>
    <HeadingText text="Patient also known as" />
    <div class="d-flex justify-content-end">
      <el-button
        type="primary"
        class="btn btn-primary m-3"
        @click="addNewKnowAs()"
        ><el-icon class="fs-5"><Plus /></el-icon
      ></el-button>
    </div>
    <el-form
      @submit.prevent="submit2()"
      :model="formAlsoKnowAsData"
      ref="formAlsoKnowAsRef"
    >
      <div
        class="row justify-content-md-left"
        v-for="(item, index) in formAlsoKnowAsData"
        :key="item.id"
      >
        <template v-if="!item.is_delete">
          <div class="action-width d-flex align-items-center">
            <el-avatar> {{ (index + 1).toString() }} </el-avatar>
          </div>
          <InputWrapper
            :class="colString"
            label="First Name"
            :prop="index + '.first_name'"
            required="true"
            :rule="knowRules.first_name"
          >
            <el-input
              type="text"
              v-model="item.first_name"
              placeholder="First Name"
            />
          </InputWrapper>
          <InputWrapper
            :class="colString"
            label="Last Name"
            :prop="index + '.last_name'"
            required="true"
            :rule="knowRules.last_name"
          >
            <el-input
              type="text"
              v-model="item.last_name"
              placeholder="Last Name"
            />
          </InputWrapper>
          <div class="action-width d-flex align-items-center">
            <button type="button" class="btn" @click="removeKnowAs(index)">
              Delete
            </button>
          </div>
        </template>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary w-25 m-3">Save</button>
      </div>
    </el-form>
  </CardSection>
</template>
<style lang="scss">
.action-width {
  width: 60px;
}
</style>
<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import maritalStatus from "@/core/data/marital-status";
import titles from "@/core/data/titles";
import genders from "@/core/data/genders";
import race from "@/core/data/race";
import country_of_birth from "@/core/data/patient-birth-country";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { Plus } from "@element-plus/icons-vue";
import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "patient-administration",
  directives: {
    mask,
  },
  components: { InputWrapper, Plus },
  data: function () {
    return {
      colString: "col-12 col-sm-6 col-lg-4 ",
      colActionString: "col-1 col-sm-1 col-lg-1 ",
    };
  },
  setup() {
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
    const formAlsoKnowAsRef = ref<null | HTMLFormElement>(null);

    const formData = ref({
      title: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      country_of_birth: "0000",
      contact_number: "",
      email: "",
      address: "",
      postcode: "",
      gender: "",
      race: "",
      occupation: "",
      marital_status: "",
      kin_name: "",
      kin_phone_number: "",
      kin_relationship: "",
      kin_email: "",
      kin_receive_correspondence: false,
    });
    const formAlsoKnowAsData = ref<
      {
        id: number;
        first_name: string;
        last_name: string;
      }[]
    >([]);
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
          message: "Last Name cannot be blank",
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
    const knowRules = ref({
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
          message: "Last Name cannot be blank",
          trigger: "change",
        },
      ],
    });
    const loading = ref(false);

    const handleAddressChange = (e) => {
      formData.value.address = e.formatted_address;
      const postCodeData = e.address_components.filter((data) => {
        return data.types.some((type) => type === "postal_code");
      });
      if (postCodeData && postCodeData.length > 0) {
        formData.value.postcode = postCodeData[0].short_name;
      } else {
        formData.value.postcode = "";
      }
    };

    const addNewKnowAs = () => {
      console.log();
      const temp = formAlsoKnowAsData.value;
      const newItem = {
        id: 0,
        first_name: "",
        last_name: "",
      };
      temp.push(newItem);
      formAlsoKnowAsData.value = temp;
    };

    const removeKnowAs = (index) => {
      const temp = formAlsoKnowAsData.value;
      if (temp[index].id === 0) {
        temp.splice(index, 1);
      } else {
        temp[index]["is_delete"] = 1;
      }
      formAlsoKnowAsData.value = temp;
    };

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
    const submit2 = () => {
      if (!formAlsoKnowAsRef.value) {
        return;
      }

      formAlsoKnowAsRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          console.log(formAlsoKnowAsData.value);
          const data = formAlsoKnowAsData.value.filter(
            (item) => item.first_name || item.last_name
          );
          console.log(data);
          store
            .dispatch(PatientActions.ALSO_KNOWN_AS.BULK, {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              id: (formData.value as any).id,
              data: data,
            })
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
      formAlsoKnowAsData.value = store.getters.selectedPatient
        ? store.getters.selectedPatient.also_known_as
        : [];
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Demographic", ["Patients"]);
    });

    return {
      formData,
      formAlsoKnowAsData,
      formRef,
      formAlsoKnowAsRef,
      rules,
      knowRules,
      titles,
      genders,
      race,
      country_of_birth,
      maritalStatus,
      handleAddressChange,
      addNewKnowAs,
      removeKnowAs,
      submit,
      submit2,
    };
  },
});
</script>
