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
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">
            Procedure Assessment: {{ preAdmissionData?.patient_name?.full }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <el-form
            @submit.prevent="submit()"
            :model="preAdmissionData"
            :rules="rules"
            ref="formRef"
          >
            <!--begin::Modal body-->
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
                      :limit="1"
                      :on-change="handleUploadChange"
                      :on-remove="handleUploadRemove"
                      :auto-upload="false"
                      accept="pdf/*"
                    >
                      <template v-if="userRole != 'anesthetist'" #trigger>
                        <el-button class="btn btn-sm btn-info" type="primary">
                          <span class="indicator-label">
                            Upload New Pre Admission
                          </span>
                        </el-button>
                      </template>

                      <el-button
                        v-if="!uploadDisabled"
                        class="btn btn-sm btn-info ms-3"
                        type="success"
                        @click="handleUploadSubmit"
                      >
                        <span class="indicator-label">Upload</span>
                      </el-button>
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
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

        <div class="fv-row m-6 pdf_viewer_wrapper">
          <div id="divPDFViewer" class="pdf_viewer"></div>
        </div>
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
import { defineComponent, watchEffect, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store";
import pdf from "pdfobject";

export default defineComponent({
  name: "view-pre-admission-form-modal",
  components: {},
  props: {
    selectedApt: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const viewPreAdmissionModalRef = ref(null);
    const loading = ref(false);
    const uploadRef = ref(null);
    const uploadDisabled = ref(true);
    const uploadData = new FormData();

    const appointmentData = computed(() => props.selectedApt);
    const preAdmissionData = ref({
      notes: "",
    });

    const handleUploadSubmit = () => {
      const appendedUploadData = {
        uploadData: uploadData,
        appointment_id: preAdmissionData.value.id,
      };
      store
        .dispatch(Actions.PROCEDURE_APPROVAL.UPLOAD, appendedUploadData)
        .then(() => {
          loading.value = false;
          Swal.fire({
            text: "Successfully Uploaded!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            uploadRef.value.clearFiles("ready");
            uploadDisabled.value = true;

            if (props.isEditable === "true") {
              store.dispatch(Actions.PROCEDURE_APPROVAL.LIST);
            } else {
              store.dispatch(
                Actions.PATIENTS.VIEW,
                preAdmissionData.value.patient_id
              );
            }
            // hideModal(viewPreAdmissionModalRef.value);
          });
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
    };

    const handleUploadChange = (file) => {
      uploadDisabled.value = false;
      uploadData.append("file", file.raw);
    };

    const handleUploadRemove = () => {
      uploadDisabled.value = true;
    };

    watch(appointmentData, () => {
      console.log(appointmentData);
      if (appointmentData.value.pre_admission.pre_admission_file) {
        store
          .dispatch(Actions.APPOINTMENT.PRE_ADMISSION.VIEW, {
            path: appointmentData.value.pre_admission.pre_admission_file,
          })
          .then((data) => {
            const blob = new Blob([data], { type: "application/pdf" });
            const objectUrl = URL.createObjectURL(blob);
            document.getElementById("divPDFViewer").innerHTML = "";
            pdf.embed(objectUrl, "#divPDFViewer", {
              pdfOpenParams: { pagemode: "none" },
            });
          })
          .catch(() => {
            console.log("pdf error");
          });
      }
    });

    return {
      formRef,
      loading,
      viewPreAdmissionModalRef,
      uploadRef,
      handleUploadSubmit,
      handleUploadChange,
      handleUploadRemove,
      uploadDisabled,
    };
  },
});
</script>
