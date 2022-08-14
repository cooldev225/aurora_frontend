<template>
  <!--begin::Content-->
  <div class="d-flex flex-row-fluid flex-center bg-white rounded">
    <!--begin::Form-->
    <!--begin::Step 1-->
    <div class="current" data-kt-stepper-element="content">
      <div class="w-100 py-20 px-9">
        <el-form
          class="w-100 w-xl-700px w-xxl-800px"
          :rules="rules"
          :model="formData"
          ref="formRef"
        >
          <div class="container py-6">
            <div class="row justify-content-md-center">
              <InputWrapper :class="colString" label="Clinic Name" prop="name">
                <el-input
                  required
                  v-model="formData.name"
                  type="text"
                  placeholder="Clinic Name"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="Reception Email"
                prop="email"
              >
                <el-input
                  v-model="formData.email"
                  type="text"
                  placeholder="Email"
                />
              </InputWrapper>

              <InputWrapper
                required:class="colString"
                label="Address"
                prop="address"
              >
                <GMapAutocomplete
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
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="Reception number"
                prop="phone_number"
              >
                <el-input
                  type="text"
                  v-mask="'0#-####-####'"
                  v-model="formData.phone_number"
                  placeholder="Phone Number"
                />
              </InputWrapper>

              <InputWrapper
                :class="colString"
                label="Reception Fax"
                prop="fax_number"
              >
                <el-input
                  type="text"
                  v-mask="'0#-####-####'"
                  v-model="formData.fax_number"
                  placeholder="Fax Number"
                />
              </InputWrapper>

              <span :class="colString"></span>
            </div>
            <el-divider />
          </div>
          <div class="container py-6">
            <div class="row justify-content-md-center">
              <InputWrapper
                :class="colString"
                label="Provider Number"
                prop="hospital_provider_number"
              >
                <el-input
                  required
                  v-model="formData.hospital_provider_number"
                  type="text"
                  placeholder="Provider Number"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="VAED number"
                prop="VAED_number"
              >
                <el-input
                  v-model="formData.VAED_number"
                  type="text"
                  placeholder="VAED number"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="LSPN id"
                prop="lspn_id"
              >
                <el-input
                  v-model="formData.lspn_id"
                  type="text"
                  placeholder="LSPN id"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="Specimen Collection Point"
                prop="specimen_collection_point_number"
              >
                <el-input
                  v-model="formData.specimen_collection_point_number"
                  type="text"
                  placeholder="Specimen Collection Point"
                />
              </InputWrapper>
            </div>
            <el-divider />
            <button
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              @click="submit()"
            >
              <span class="indicator-label"> Create Clinic </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
        </el-form>
      </div>
    </div>
    <!--end::Step 1 -->
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import { countryList, timeZoneList } from "@/core/data/country";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "create-clinic",
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
    const router = useRouter();
    const formRef = ref(null);

    const loading = ref(false);
    const formData = ref({
      name: "",
      email: "",
      phone_number: "",
      fax_number: "",
      VAED_number: "",
      hospital_provider_number: "",
      address: "",
      lspn_id: "",
      specimen_collection_point_number: "",
    });
    const rules = ref({
      name: [
        {
          required: true,
          message: "Clinic Name cannot be blank.",
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
      phone_number: [
        {
          required: true,
          message: "Phone Number cannot be blank.",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      hospital_provider_number: [
        {
          required: true,
          message: "Provider Number cannot be blank",
          trigger: "change",
        },
        {
          min: 8,
          message: "Provider Number must be at least 8 characters",
          trigger: "blur",
        },
      ],
      address: [
        {
          required: true,
          message: "Address cannot be blank",
          trigger: "change",
        },
      ],
    });

    const createClinicsRef = ref(null);
    const currentStepIndex = ref(0);
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Create Clinic", ["Clinics"]);
    });

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("footnote_signature", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };

    const handleAddressChange = (e) => {
      formData.value.address = e.formatted_address;
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      console.log("submit");

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          store
            .dispatch(Actions.CLINICS.CREATE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.CLINICS.LIST);
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "clinics" });
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

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      createClinicsRef,
      currentStepIndex,
      countryList,
      timeZoneList,
      upload,
      handleChange,
      handleRemove,
      handlePreview,
      dialogVisible,
      dialogImageUrl,
      handleAddressChange,
    };
  },
});
</script>
