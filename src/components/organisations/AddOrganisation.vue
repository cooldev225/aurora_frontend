<template>
  <!--begin::Stepper-->
  <div class="card">
    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <CardSection heading="Organisation Information">
          <InputWrapper label="Organisation Name" prop="name">
            <el-input
              v-model="formData.name"
              type="text"
              placeholder="Organisation Name"
            />
          </InputWrapper>

          <InputWrapper label="Max Clinics" prop="max_clinics">
            <el-input
              type="number"
              v-model="formData.max_clinics"
              placeholder="Max Clinics"
            />
          </InputWrapper>
          <InputWrapper label="Max Employees" prop="max_employees">
            <el-input
              type="number"
              v-model="formData.max_employees"
              placeholder="Max Employee"
            />
          </InputWrapper>
        </CardSection>

        <CardSection heading="Primary Contact Details">
          <InputWrapper label="First Name" prop="first_name">
            <el-input
              v-model="formData.first_name"
              type="text"
              placeholder="First Name"
            />
          </InputWrapper>
          <InputWrapper label="Last Name" prop="last_name">
            <el-input
              v-model="formData.last_name"
              type="text"
              placeholder="Last Name"
            />
          </InputWrapper>
          <InputWrapper label="Email" prop="email">
            <el-input
              type="email"
              v-model="formData.email"
              placeholder="admin@gmail.com"
            />
          </InputWrapper>
          <InputWrapper label="Mobile Number" prop="mobile_number">
            <el-input
              type="text"
              v-mask="'0#-####-####'"
              v-model="formData.mobile_number"
              placeholder=""
            />
          </InputWrapper>
        </CardSection>

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <router-link
            type="reset"
            to="/organisations"
            id="kt_modal_add_customer_cancel"
            class="btn btn-light me-3"
          >
            Cancel
          </router-link>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label">
              Submit
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
      </el-form>
    </div>
  </div>
  <!--end::Stepper-->
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "add-org",
  components: {},
  directives: {
    mask,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const loading = ref(false);
    const formData = ref({
      first_name: "",
      last_name: "",
      name: "",
      email: "",
      mobile_number: "",
      start_time: "07:00",
      end_time: "16:00",
      appointment_length: "30",
      max_clinics: "",
      max_employees: "",
    });
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (formData.value.password_confirmation !== "") {
          formRef.value.validateField("checkPass", () => null);
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== formData.value.password) {
        callback(new Error("Password doesn't match!"));
      } else {
        callback();
      }
    };

    const rules = ref({
      name: [
        {
          required: true,
          message: "Organization Name cannot be blank.",
          trigger: "change",
        },
      ],
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank.",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannot be blank.",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Username cannot be blank.",
          trigger: "change",
        },
      ],
      mobile_number: [
        {
          required: true,
          message: "Mobile Number cannot be blank.",
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
      password: [
        { validator: validatePass, trigger: "blur" },
        {
          required: true,
          message: "Password cannot be blank",
          trigger: "change",
        },
        { min: 6, message: "The password must be at least 6 characters" },
      ],
      password_confirmation: [
        { validator: validatePass2, trigger: "blur" },
        {
          required: true,
          message: "Confirm Password cannot be blank.",
          trigger: "change",
        },
        { min: 6, message: "The password must be at least 6 characters" },
      ],
    });

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("logo", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
      Data.delete("logo");
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Create Organisation", ["Organisation"]);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          store
            .dispatch(Actions.ORG.CREATE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.ORG.LIST);
              Swal.fire({
                text: "New Organisation Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "organisations" });
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
      upload,
      handleChange,
      handleRemove,
      handlePreview,
      dialogVisible,
      dialogImageUrl,
      uploadDisabled,
    };
  },
});
</script>

<style>
.el-dialog {
  width: fit-content;
}
</style>
