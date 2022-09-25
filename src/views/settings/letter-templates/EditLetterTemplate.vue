<template>
  <div
    class="modal fade"
    id="modal_edit_letter_template"
    tabindex="-1"
    aria-hidden="true"
    ref="editLetterTemplateModalRef"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">{{ formData._title }}</h2>
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
              id="kt_modal_edit_letter_template_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_letter_template_header"
              data-kt-scroll-wrappers="#kt_modal_edit_letter_template_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="report-template-wrapper">
                <div class="fv-row col-12 mb-5">
                  <!--begin::Input-->
                  <el-form-item prop="heading">
                    <el-input
                      v-model="formData.heading"
                      class="w-100"
                      type="text"
                      placeholder="Letter Template Heading"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row col-12 mb-5">
                  <!--begin::Input-->
                  <el-form-item prop="body">
                    <el-input
                      v-model="formData.body"
                      class="w-100"
                      :rows="3"
                      type="textarea"
                      placeholder="Letter Template Body"
                    />
                  </el-form-item>
                  <!--end::Input-->
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
              id="kt_modal_add_report_template_cancel"
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

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "edit-letter-template-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const editLetterTemplateModalRef = ref(null);
    const loading = ref(false);
    const formData = ref({
      id: 0,
      heading: "",
      body: "",
    });

    const rules = ref({
      heading: [
        {
          required: true,
          message: "heading cannot be blank",
          trigger: "change",
        },
      ],
      body: [
        {
          required: true,
          message: "Body cannot be blank",
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
          store
            .dispatch(formData.value._submit, {
              id: formData.value.id,
              heading: formData.value.heading,
              body: formData.value.body,
            })
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.LETTER_TEMPLATE.LIST);
              Swal.fire({
                text: formData.value._submit_text,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(editLetterTemplateModalRef.value);
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
      formData.value = store.getters.getLetterTemplateSelect;
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      editLetterTemplateModalRef,
      submit,
    };
  },
});
</script>
