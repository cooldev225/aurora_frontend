<template>
  <div
    class="modal fade"
    id="modal_view_admin"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">View Admin</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">First Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="firstname">
                  <el-input
                    v-model="formData.firstname"
                    type="text"
                    placeholder="First Name"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Last Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="lastname">
                  <el-input
                    v-model="formData.lastname"
                    type="text"
                    placeholder="Last Name"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Username</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="username">
                  <el-input
                    v-model="formData.username"
                    type="text"
                    placeholder="Username"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Email</span>
                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Email address must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input v-model="formData.email" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Password</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="password">
                  <el-input
                    v-model="formData.password"
                    type="password"
                    placeholder="Password"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >Confirm Password</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="repasword">
                  <el-input
                    v-model="formData.repassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
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
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "add-admin-modal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addAdminModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      repassword: "",
    });

    const rules = ref({
      firstname: [
        {
          required: true,
          message: "First Name is required",
          trigger: "change",
        },
      ],
      lastname: [
        {
          required: true,
          message: "Last Name is required",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Username is required",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email is required",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: "change",
        },
      ],
      repassword: [
        {
          required: true,
          message: "Confirm Password is required",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          setTimeout(() => {
            loading.value = false;

            Swal.fire({
              text: "Form has been successfully submitted!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              hideModal(addAdminModalRef.value);
            });
          }, 2000);
        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addAdminModalRef,
    };
  },
});
</script>
