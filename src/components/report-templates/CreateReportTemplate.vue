<template>
  <div
    class="modal fade"
    id="modal_add_report_template"
    tabindex="-1"
    aria-hidden="true"
    ref="createReportTemplateModalRef"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Create Report Template</h2>
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
              <div class="report-template-wrapper">
                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Input-->
                  <el-form-item prop="title">
                    <el-input
                      v-model="formData.title"
                      class="w-100"
                      type="text"
                      placeholder="Report Template Title"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <div
                  class="report-template-section-wrapper mb-10"
                  v-for="(reportSection, sectionIndex) in formData.sections"
                  :key="sectionIndex"
                >
                  <el-form-item prop="reportSection.title">
                    <el-input
                      v-model="reportSection.title"
                      class="w-100"
                      type="text"
                      placeholder="Section Title"
                    />
                  </el-form-item>

                  <div
                    class="report-template-auto-text-wrapper"
                    v-for="(
                      autoText, autoTextIndex
                    ) in reportSection.auto_texts"
                    :key="autoTextIndex"
                  >
                    <el-form-item prop="autoText.text">
                      <el-input
                        v-model="autoText.text"
                        class="w-100"
                        type="text"
                        placeholder="Enter Auto Text"
                      />

                      <button
                        @click="
                          handleDeleteAutoText(sectionIndex, autoTextIndex)
                        "
                        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5"
                      >
                        <span class="svg-icon svg-icon-3">
                          <inline-svg
                            src="media/icons/duotune/general/gen027.svg"
                          />
                        </span>
                      </button>
                    </el-form-item>
                  </div>

                  <div class="col-12 col-sm-2">
                    <button
                      type="button"
                      class="btn btn-light-primary ms-auto"
                      @click="handleAddAutoText()"
                    >
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr075.svg"
                        />
                      </span>
                      Add Auto Text
                    </button>
                  </div>
                  <button
                    @click="handleDeleteSection(sectionIndex)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5"
                  >
                    - Delete Section
                  </button>
                </div>
                <div
                  class="cursor-pointer text-center col-sm-12 report-template-section-wrapper"
                  style="font-size: 2rem; color: #d0ff76"
                  @click="handleAddSection()"
                >
                  <span><span>+</span> Add Section</span>
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
              <span v-if="!loading" class="indicator-label"> Create </span>
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
  name: "create-report-template-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const createReportTemplateModalRef = ref(null);
    const loading = ref(false);

    const formData = ref({
      id: 0,
      title: "",
      sections: [],
    });

    const rules = ref({
      title: [
        {
          required: true,
          message: "Title cannot be blank",
          trigger: "change",
        },
      ],
    });

    const handleAddSection = () => {
      let new_section = {};

      new_section.title = "";
      new_section.free_text_default = "";
      new_section.auto_texts = [];

      formData.value.sections.push(new_section);
    };

    const handleDeleteSection = (sectionIndex) => {
      formData.value.sections.splice(sectionIndex, 1);
    };

    const handleAddAutoText = (sectionIndex) => {
      let new_auto_text = {};

      new_auto_text.text = "";

      formData.value.sections[sectionIndex].push(new_auto_text);
    };

    const handleDeleteAutoText = (sectionIndex, autoTextIndex) => {
      formData.value.sections[sectionIndex].splice(autoTextIndex, 1);
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          const is_update = formData.value.id > 0 ? true : false;

          if (is_update) {
            store
              .dispatch(Actions.REPORT_TEMPLATES.CREATE, formData.value)
              .then(() => {
                loading.value = false;
                store.dispatch(Actions.REPORT_TEMPLATES.LIST);
                Swal.fire({
                  text: "Successfully Created!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                }).then(() => {
                  hideModal(createReportTemplateModalRef.value);
                });
              })
              .catch(({ response }) => {
                loading.value = false;
                console.log(response.data.error);
              });
          } else {
            store
              .dispatch(Actions.REPORT_TEMPLATES.UPDATE, formData.value)
              .then(() => {
                loading.value = false;
                store.dispatch(Actions.REPORT_TEMPLATES.LIST);
                Swal.fire({
                  text: "Successfully Updated!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                }).then(() => {
                  hideModal(createReportTemplateModalRef.value);
                });
              })
              .catch(({ response }) => {
                loading.value = false;
                console.log(response.data.error);
              });
          }

          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    watchEffect(() => {
      formData.value = store.getters.getReportTemplateSelected;
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      createReportTemplateModalRef,
      submit,
      handleAddSection,
      handleDeleteSection,
      handleAddAutoText,
      handleDeleteAutoText,
    };
  },
});
</script>
