<template>
  <!--begin::Stepper-->
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <!--begin::Search-->
        <span>Create Organization</span>
        <!--end::Search-->
      </div>
    </div>
    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <!--begin::Scroll-->
          <div class="scroll-y me-n7 pe-7 row">
            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">Details</div>

              <div class="row">
                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2">Username</label>

                  <el-form-item prop="username">
                    <el-input
                      v-model="formData.username"
                      type="text"
                      placeholder="Username"
                    />
                  </el-form-item>
                </div>

                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2">Password</label>

                  <el-form-item prop="password">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      placeholder="Password"
                    />
                  </el-form-item>
                </div>

                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2"
                    >Confirm Password</label
                  >

                  <el-form-item prop="password_confirmation">
                    <el-input
                      v-model="formData.password_confirmation"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="separator separator-dashed mb-8 mt-2"></div>

            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">Primary Details</div>

              <div class="row">
                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2">First Name</label>

                  <el-form-item prop="first_name">
                    <el-input
                      v-model="formData.first_name"
                      type="text"
                      placeholder="First Name"
                    />
                  </el-form-item>
                </div>

                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2">Last Name</label>

                  <el-form-item prop="last_name">
                    <el-input
                      v-model="formData.last_name"
                      type="text"
                      placeholder="Last Name"
                    />
                  </el-form-item>
                </div>
                <div class="col-sm-4">
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Email</span>
                  </label>

                  <el-form-item prop="email">
                    <el-input
                      type="email"
                      v-model="formData.email"
                      placeholder="admin@gmail.com"
                    />
                  </el-form-item>
                </div>

                <div class="col-sm-4">
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Mobile Number</span>
                  </label>

                  <el-form-item prop="mobile_number">
                    <el-input
                      type="tel"
                      v-model="formData.mobile_number"
                      placeholder=""
                    />
                  </el-form-item>
                </div>

                <div class="col-sm-4">
                  <label class="required fs-6 fw-bold mb-2"
                    >Organization Name</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.name"
                      type="text"
                      placeholder="Organization Name"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="separator separator-dashed mb-8 mt-2"></div>

            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">Images</div>

              <div class="row">
                <el-form-item label="Logo">
                  <el-upload
                    action="a"
                    ref="upload"
                    :class="{ disabled: uploadDisabled }"
                    list-type="picture-card"
                    :limit="1"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    accept="image/*"
                  >
                    <i class="fa fa-plus"></i>
                  </el-upload>
                </el-form-item>
              </div>
            </div>

            <div class="separator separator-dashed mb-8 mt-2"></div>

            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">Extra information</div>

              <div class="row">
                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Max Clinics</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="max_clinics">
                    <el-input
                      type="number"
                      v-model="formData.max_clinics"
                      placeholder="Max Clinics"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required">Max Employee</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="max_employees">
                    <el-input
                      type="number"
                      v-model="formData.max_employees"
                      placeholder="Max Employee"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">Device Name</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="device_name">
                    <el-input
                      type="text"
                      v-model="formData.device_name"
                      placeholder="Enter Device Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">OTAC</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="otac">
                    <el-input
                      type="text"
                      v-model="formData.otac"
                      placeholder="Enter OTAC"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">Expire day of key</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="key_expiry">
                    <el-date-picker
                      type="text"
                      class="w-100"
                      v-model="formData.key_expiry"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-sm-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="">Expire day of device</span>
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="device_expiry">
                    <el-date-picker
                      type="text"
                      class="w-100"
                      v-model="formData.device_expiry"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
            </div>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <router-link
            type="reset"
            to="/organizations"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "organizations-create",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const loading = ref(false);
    let formData = ref({
      first_name: "",
      last_name: "",
      username: "",
      name: "",
      email: "",
      mobile_number: "",
      password: "",
      password_confirmation: "",
      device_name: "",
      otac: "",
      key_expiry: "",
      device_expiry: "",
      max_clinics: "",
      max_employees: "",
    });
    const rules = ref({
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
      email: [
        {
          required: true,
          message: "Email cannot be blank.",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Password cannot be blank.",
          trigger: "change",
        },
      ],
      password_confirmation: [
        {
          required: true,
          message: "Confirm Password cannot be blank.",
          trigger: "change",
        },
      ],
    });
    const uploadDisabled = ref(false);
    const upload = ref(null);

    const handleChange = (file, fileList) => {
      // upload.value.clearFiles();
      // uploadDisabled.value = false;
      uploadDisabled.value = fileList.length >= 1;
      formData.value["logo"] = file.raw;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Create Organization", ["Organization"]);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          console.log(formData.value);
          store
            .dispatch(Actions.CREATE_ORG, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.LIST_ORG);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "organizations" });
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
    };
  },
});
</script>
