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
          <h2 class="fw-bolder">{{ modalTexts.title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
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
                  class="border border-5 border-muted mb-10 p-10"
                  v-for="(reportSection, sectionIndex) in formData.sections"
                  :key="sectionIndex"
                >
                  <el-form-item :prop="'section-' + sectionIndex">
                    <el-input
                      v-model="reportSection.title"
                      class="w-100"
                      type="text"
                      placeholder="Section Title"
                    />
                  </el-form-item>

                  <el-divider />

                  <el-form-item>
                    <el-input
                      type="textarea"
                      v-model="reportSection.free_text_default"
                      placeholder="Write Free Text Default"
                    />
                  </el-form-item>

                  <h3 class="mb-4" style="font-size: 1.5rem">Auto Texts</h3>

                  <div
                    class="report-template-auto-text-wrapper text-nowrap mb-5"
                    v-for="(
                      autoText, autoTextIndex
                    ) in reportSection.auto_texts"
                    :key="autoTextIndex"
                  >
                    <div class="d-flex flex-row col-11">
                      <el-input
                        v-model="autoText.text"
                        class="flex-grow-1 me-2"
                        type="text"
                        placeholder="Enter Auto Text"
                      />
                      <el-select
                        class="w-100"
                        remote
                        filterable
                        v-model="autoText.icd_10_code"
                        :remote-method="searchCodes"
                        :loading="loadingICD"
                      >
                        <el-option
                          v-for="item in codes"
                          :key="item[0]"
                          :label="item[0] + ' - ' + item[1]"
                          :value="item[0]"
                        />
                      </el-select>
                      <div class="ms-2">
                        <button
                          @click="
                            handleDeleteAutoText(sectionIndex, autoTextIndex)
                          "
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                          <span class="svg-icon svg-icon-3">
                            <InlineSVG icon="bin" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <LargeIconButton
                    @click="handleAddAutoText(sectionIndex)"
                    heading="Add AutoText"
                    iconPath="media/icons/duotune/arrows/arr024.svg"
                    :color="'success'"
                    iconSize="1"
                  />

                  <div class="d-flex mt-3 flex-row-reverse">
                    <LargeIconButton
                      @click="handleDeleteSection(sectionIndex)"
                      heading="Delete Section"
                      iconPath="media/icons/duotune/arrows/arr024.svg"
                      :color="'danger'"
                      iconSize="1"
                    />
                  </div>
                </div>

                <LargeIconButton
                  @click="handleAddSection()"
                  :heading="'Add Section'"
                  :iconPath="'media/icons/duotune/arrows/arr024.svg'"
                  :color="'primary'"
                  iconSize="3"
                />
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
                {{ modalTexts.submit }}
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
import { defineComponent, ref, watchEffect, watch, computed } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
export default defineComponent({
  name: "create-report-template-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const createReportTemplateModalRef = ref(null);
    const formData = computed(() => store.getters.getReportTemplateSelected);
    const loading = ref(false);

    let is_create = false;

    // ICD-10 API seach
    const codes = ref();
    const loadingICD = ref(false);

    const modalTexts = ref({});

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
      new_auto_text.icd_10_code = "";

      formData.value.sections[sectionIndex].auto_texts.push(new_auto_text);
    };

    const handleDeleteAutoText = (sectionIndex, autoTextIndex) => {
      formData.value.sections[sectionIndex].auto_texts.splice(autoTextIndex, 1);
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          if (is_create) {
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
      is_create = formData.value.id > 0 ? false : true;

      if (is_create) {
        modalTexts.value = {
          title: "Create Report Template",
          submit: "Create",
        };
      } else {
        modalTexts.value = {
          title: "Edit Report Template",
          submit: "Update",
        };
      }
    });

    const searchCodes = (query) => {
      if (query) {
        loadingICD.value = true;

        store
          .dispatch(CodingActions.SEARCH_DIAGNOSES, query)
          .then((response) => {
            codes.value = response.data[3];
            loadingICD.value = false;
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        codes.value = [];
      }
    };

    return {
      formData,
      modalTexts,
      rules,
      formRef,
      loading,
      createReportTemplateModalRef,
      submit,
      handleAddSection,
      handleDeleteSection,
      handleAddAutoText,
      handleDeleteAutoText,
      searchCodes,
      codes,
      loadingICD,
    };
  },
});
</script>
