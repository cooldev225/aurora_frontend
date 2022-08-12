<template>
  <div
    class="modal fade"
    id="modal_upload_document"
    tabindex="-1"
    aria-hidden="true"
    ref="uploadDocumentRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_upload_document_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Upload Document</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_upload_document_close"
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
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_upload_document_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_upload_document_header"
              data-kt-scroll-wrappers="#kt_modal_upload_document_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Document Type</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="document_type">
                  <el-select
                    class="w-100 mb-5"
                    placeholder="Select Document Type"
                    v-model="formData.document_type"
                  >
                    <el-option value="LETTER" label="LETTER">
                      <inline-svg
                        class="me-5"
                        src="media/icons/duotune/general/gen005.svg"
                      />
                      LETTER
                    </el-option>
                    <el-option value="REPORT" label="REPORT">
                      <inline-svg
                        class="me-5"
                        src="media/icons/duotune/general/gen016.svg"
                      />
                      REPORT
                    </el-option>
                    <el-option value="CLINICAL_NOTE" label="CLINICAL NOTE">
                      <inline-svg
                        class="me-5"
                        src="media/icons/duotune/files/fil003.svg"
                      />
                      CLINICAL NOTE
                    </el-option>
                    <el-option
                      label="PATHOLOGY REPORT"
                      value="PATHOLOGY_REPORT"
                    >
                      <inline-svg
                        class="me-5"
                        src="media/icons/duotune/files/fil004.svg"
                      />
                      PATHOLOGY REPORT
                    </el-option>
                    <el-option value="ALL" label="ALL DOCUMENT TYPE">
                      <inline-svg
                        class="me-5"
                        src="media/icons/duotune/general/gen054.svg"
                      />
                      ALL DOCUMENT TYPE
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Appointment</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="appointment">
                  <el-select
                    v-model="formData.appointment_id"
                    class="w-100"
                    placeholder="Select Appointment"
                  >
                    <el-option
                      v-for="item in aptList.future"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Specialist</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="specialist">
                  <el-select
                    v-model="formData.specialist_id"
                    class="w-100"
                    placeholder="Select Specialist"
                  >
                    <el-option
                      v-for="item in specialistList"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Upload File</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item label="Add File">
                  <el-upload
                    action="#"
                    ref="upload"
                    :class="{ disabled: uploadDisabled }"
                    :limit="1"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    accept="*/*"
                  >
                    <i class="fa fa-plus"></i>
                  </el-upload>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
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
              id="kt_modal_upload_document_cancel"
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
              <span v-if="!loading" class="indicator-label"> Save </span>
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "create-letter-template-modal",
  components: {},
  props: {
    patientId: { type: String, required: true },
  },
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const uploadDocumentRef = ref(null);
    const loading = ref(false);
    const specialistList = computed(() => store.getters.getSpecialistList);
    const aptList = computed(() => store.getters.getAptList);
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();

    const formData = ref({
      document_type: "",
      appointment_id: "",
      specialist_id: "",
    });

    const rules = ref({
      document_type: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      appointment_id: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "blur",
        },
      ],
      specialist_id: [
        {
          required: true,
          message: "This field cannot be blank",
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
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          store
            .dispatch(Actions.PATIENTS.DOCUMENT.CREATE, Data)
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(uploadDocumentRef.value);
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    onMounted(() => {
      store.dispatch(Actions.APT.LIST);
      store.dispatch(Actions.SPECIALIST.LIST);
    });

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("file", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
      Data.delete("file");
    };

    return {
      formData,
      rules,
      formRef,
      loading,
      uploadDocumentRef,
      specialistList,
      aptList,
      submit,
      handleChange,
      handleRemove,
    };
  },
});
</script>
