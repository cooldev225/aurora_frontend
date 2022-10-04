<template>
  <div
    class="modal fade"
    id="modal_edit_header_footer_template"
    tabindex="-1"
    aria-hidden="true"
    ref="editHeaderFooterTemplateModalRef"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_header_footer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">{{ formData._title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_header_footer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
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
              id="kt_modal_edit_header_footer_template_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_header_footer_template_header"
              data-kt-scroll-wrappers="#kt_modal_edit_header_footer_template_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="header-footer-wrapper">
                <div class="fv-row col-12 mb-5">
                  <!--begin::Input-->
                  <el-form-item prop="title">
                    <el-input
                      v-model="formData.title"
                      class="w-100"
                      type="text"
                      placeholder="Letter Template Title"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="row mt-10 me-5 ms-5">
                  <InputWrapper
                    required
                    class="col-6"
                    label="Document Header"
                    prop="document_header"
                  >
                    <el-upload
                      action="#"
                      ref="headerRef"
                      class="avatar-uploader"
                      list-type="picture-card"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-change="
                        (uploadFile) => {
                          handleAvatarSuccess(uploadFile, 'header');
                        }
                      "
                    >
                      <img
                        v-if="formData.header"
                        :src="formData.header"
                        class="avatar"
                      />
                      <i
                        v-if="!formData.header"
                        class="el-icon avatar-uploader-icon"
                      >
                        <svg
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                          ></path>
                        </svg>
                      </i>
                    </el-upload>
                  </InputWrapper>
                  <InputWrapper
                    required
                    class="col-4"
                    label="Document Footer"
                    prop="document_footer"
                  >
                    <el-upload
                      action="#"
                      ref="footerRef"
                      class="avatar-uploader"
                      list-type="picture-card"
                      :auto-upload="false"
                      :show-file-list="false"
                      :on-change="
                        (uploadFile) => {
                          handleAvatarSuccess(uploadFile, 'footer');
                        }
                      "
                    >
                      <img
                        v-if="formData.footer"
                        :src="formData.footer"
                        class="avatar"
                      />
                      <i
                        v-if="!formData.footer"
                        class="el-icon avatar-uploader-icon"
                      >
                        <svg
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                          ></path>
                        </svg>
                      </i>
                    </el-upload>
                  </InputWrapper>
                </div>
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
              data-bs-dismiss="modal"
              id="kt_modal_add_header_footer_template_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                {{ formData._button }}
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
<style lang="scss">
.header-footer-wrapper {
  .avatar-uploader {
    img.avatar {
      width: 100%;
    }
  }
}
</style>
<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "edit-header-footer-template-modal",
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const editHeaderFooterTemplateModalRef = ref(null);
    const loading = ref(false);
    const formData = ref({
      id: 0,
      title: "",
      header: null,
      footer: null,
      header_file: null,
      footer_file: null,
    });

    const rules = ref({
      title: [
        {
          required: true,
          message: "title cannot be blank",
          trigger: "change",
        },
      ],
    });

    const handleAvatarSuccess = (uploadFile, flag) => {
      formData.value[flag] = URL.createObjectURL(uploadFile.raw);
      formData.value[flag + "_file"] = uploadFile;
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(formData.value._submit, {
              id: formData.value.id,
              title: formData.value.title,
              subject: formData.value.subject,
              body: formData.value.body,
            })
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.HEADER_FOOTER_TEMPLATE.LIST);
              Swal.fire({
                text: formData.value._submit_text,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(editHeaderFooterTemplateModalRef.value);
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        }
      });
    };

    watchEffect(() => {
      formData.value = store.getters.getHeaderFooterTemplateSelect;
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      editHeaderFooterTemplateModalRef,
      submit,
      ClassicEditor,
      handleAvatarSuccess,
    };
  },
});
</script>
