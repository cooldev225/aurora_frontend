<template>
  <div
    class="modal fade"
    id="modal_view_pre_admission"
    tabindex="-1"
    aria-hidden="true"
    ref="viewPreAdmissionModalRef"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <el-form :model="preAdmissionData" ref="formRef">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_customer_header">
            <!--begin::Modal title-->
            <h2 class="fw-bolder">
              Procedure Assessment: {{ appointmentData?.patient_name?.full }}
            </h2>
            <!--end::Modal title-->
            <template v-if="appointmentData?.userRole != 'anesthetist'">
              <div class="modal-body py-2 px-lg-5">
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
                  <div class="fv-row row center-row">
                    <div class="col-6 text-end">
                      <el-upload
                        action="#"
                        ref="uploadRef"
                        :limit="2"
                        :on-change="handleUploadChange"
                        :on-remove="handleUploadRemove"
                        v-model:file-list="preAdmissionData.file"
                        :auto-upload="false"
                        accept="pdf/*"
                      >
                        <el-button class="btn btn-sm btn-info" type="primary">
                          <span class="indicator-label">
                            Upload New Pre Admission
                          </span>
                        </el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <!--end::Scroll-->
              </div>
            </template>
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
          <!--begin::Modal body-->
          <div class="fv-row m-6 pdf_viewer_wrapper">
            <div id="preAdmissiondivPDFViewer" class="pdf_viewer">
              No Pre-Admission uploaded
            </div>
          </div>
          <!--end::Modal body-->
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Cancel Button-->
            <button
              type="reset"
              data-bs-dismiss="modal"
              id="kt_modal_collecting_person_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <!--end::Button-->

            <!--begin::Submit Button-->
            <el-button
              v-if="!uploadDisabled"
              class="btn btn-sm btn-info ms-3"
              type="submit"
              @click="submit"
            >
              <span class="indicator-label">Upload</span>
            </el-button>
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
.pdf_viewer_wrapper {
  height: 300px;
  > .pdf_viewer {
    height: 100%;
  }
}
</style>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import pdf from "pdfobject";
import { mask } from "vue-the-mask";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "view-pre-admission-form-modal",
  directives: {
    mask,
  },
  components: {},
  props: {
    selectedApt: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const viewPreAdmissionModalRef = ref(null);
    const loading = ref(false);
    const uploadRef = ref(null);
    const uploadDisabled = ref(true);
    const pdfType = "application/pdf";
    const uploadData = new FormData();

    const appointmentData = computed(() => props.selectedApt);
    const preAdmissionData = ref({
      id: -1,
      patient_id: -1,
      patient_name: { full: "" },
      userRole: "",
      file: [],
    });

    watch(appointmentData, () => {
      if (appointmentData.value.pre_admission?.pre_admission_file) {
        store
          .dispatch(Actions.APPOINTMENT.PRE_ADMISSION.VIEW, {
            path: appointmentData.value.pre_admission.pre_admission_file,
          })
          .then((data) => {
            const blob = new Blob([data], { type: pdfType });
            const objectUrl = URL.createObjectURL(blob);
            document.getElementById("preAdmissiondivPDFViewer").innerHTML = "";
            pdf.embed(objectUrl, "#preAdmissiondivPDFViewer", {
              pdfOpenParams: { pagemode: "none" },
            });
            let file = {
              name: appointmentData.value.pre_admission?.pre_admission_file,
              raw: data,
              size: data.size,
              status: "ready",
              uid: new Date(),
            };
            preAdmissionData.value.file = [file];
          })
          .catch(() => {
            console.log("pdf error");
          });
      } else {
        preAdmissionData.value.file = [];
        document.getElementById("preAdmissiondivPDFViewer").innerHTML =
          "No Pre-Admission uploaded";
      }
    });

    const submit = () => {
      if (
        !preAdmissionData.value.file?.length ||
        preAdmissionData.value.file[0] === null ||
        preAdmissionData.value.file[0] === undefined
      ) {
        ElMessage.error("Please upload Pre-Admission");
        return;
      }
      loading.value = true;
      uploadData.append("file", preAdmissionData.value.file[0]?.raw);
      store
        .dispatch(Actions.PROCEDURE_APPROVAL.UPLOAD, {
          appointment_id: appointmentData.value.id,
          uploadData: uploadData,
        })
        .then(() => {
          loading.value = false;
          Swal.fire({
            text: "Successfully Updated Pre-Admission",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            uploadDisabled.value = true;
            if (props.isEditable === "true") {
              store.dispatch(Actions.PROCEDURE_APPROVAL.LIST);
            } else {
              store.dispatch(
                Actions.PATIENTS.VIEW,
                appointmentData.value.patient_id
              );
            }
            document.getElementById("preAdmissiondivPDFViewer").innerHTML =
              "No Pre-Admission uploaded";
            hideModal(viewPreAdmissionModalRef.value);
          });
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
    };

    const handleUploadChange = (file) => {
      if (file.raw?.type?.toString().toLowerCase() !== pdfType) {
        preAdmissionData.value.file = [];
        document.getElementById("preAdmissiondivPDFViewer").innerHTML =
          "Pre-Admission must be PDF format!";
        return;
      }
      uploadDisabled.value = false;
      preAdmissionData.value.file = [file];
      if (preAdmissionData.value.file?.length) {
        const blob = new Blob([file.raw], { type: pdfType });
        const url = window.URL.createObjectURL(blob);
        document.getElementById("preAdmissiondivPDFViewer").innerHTML = "";
        pdf.embed(url, "#preAdmissiondivPDFViewer", {
          pdfOpenParams: { pagemode: "none" },
        });
      }
    };

    const handleUploadRemove = () => {
      uploadDisabled.value = true;
      preAdmissionData.value.file = [];
      document.getElementById("preAdmissiondivPDFViewer").innerHTML =
        "No Pre-Admission uploaded";
      return;
    };

    return {
      loading,
      preAdmissionData,
      viewPreAdmissionModalRef,
      uploadRef,
      submit,
      handleUploadChange,
      handleUploadRemove,
      uploadDisabled,
      appointmentData,
    };
  },
});
</script>
