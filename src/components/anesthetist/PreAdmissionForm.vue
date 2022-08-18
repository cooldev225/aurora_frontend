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
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">View Pre Admission Form</h2>
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
              <div class="fv-row row cener-row">
                <div class="col-6 mt-2">
                  <label class="fs-6 fw-bold">Patient Name : </label>
                  <span
                    class="text-black fw-bold"
                    v-if="preAdmissionData.patient_name"
                    >&nbsp;{{ preAdmissionData.patient_name.full }}
                  </span>
                </div>
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

              <div class="fv-row my-4 pdf_viewer_wrapper">
                <div id="divPDFViewer" class="pdf_viewer"></div>
              </div>

              <!--begin::Input group-->
              <div v-if="isEditable === 'true'" class="fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold">Notes</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="notes">
                  <el-input
                    type="textarea"
                    v-model="preAdmissionData.notes"
                    placeholder="Notes"
                  />
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
            <div v-if="isEditable === 'true'">
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-md btn-primary me-4"
                type="button"
                @click="handleProcedureApproval('APPROVED')"
              >
                <span v-if="!loading" class="indicator-label"> Approved </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-md btn-danger me-4"
                type="button"
                @click="handleProcedureApproval('NOT_APPROVED')"
              >
                <span v-if="!loading" class="indicator-label">
                  Not Approved
                </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>

              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-md btn-success"
                type="button"
                @click="handleProcedureApproval('CONSULT_REQUIRED')"
              >
                <span v-if="!loading" class="indicator-label">
                  Requires Consult
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
    isEditable: { type: String, required: true },
  },
  data: function () {
    return {
      userRole: computed(() => store.getters.userRole),
    };
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const viewPreAdmissionModalRef = ref(null);
    const loading = ref(false);
    const uploadRef = ref(null);
    const uploadDisabled = ref(true);
    const uploadData = new FormData();

    const preAdmissionData = ref({
      notes: "",
    });

    const rules = ref({
      notes: [
        {
          required: false,
          message: "Notes cannot be blank",
          trigger: "change",
        },
      ],
    });

    const selectedPatient = computed(() => store.getters.selectedPatient);

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

    const handleProcedureApproval = (status) => {
      if (!formRef.value) {
        return;
      }

      const updateData = {
        appointment_id: preAdmissionData.value.id,
        notes: preAdmissionData.value.notes,
        procedure_approval_status: status,
      };

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(Actions.PROCEDURE_APPROVAL.UPDATE, updateData)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.PROCEDURE_APPROVAL.LIST);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(viewPreAdmissionModalRef.value);
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

    watchEffect(() => {
      preAdmissionData.value = store.getters.getProcedureApproval;
    });

    watch(preAdmissionData, () => {
      if (preAdmissionData.value.pre_admission_form_url) {
        document.getElementById("divPDFViewer").innerHTML = "";
        pdf.embed(
          preAdmissionData.value.pre_admission_form_url,
          "#divPDFViewer"
        );
      }
    });

    watch(selectedPatient, () => {
      const appointments = selectedPatient.value.appointments;
      const selectedAppointment = appointments.find(
        (element) => element.id === preAdmissionData.value.id
      );

      if (selectedAppointment !== null) {
        preAdmissionData.value = selectedAppointment;
      }
    });

    return {
      preAdmissionData,
      rules,
      formRef,
      loading,
      viewPreAdmissionModalRef,
      uploadRef,
      handleUploadSubmit,
      handleUploadChange,
      handleUploadRemove,
      handleProcedureApproval,
      uploadDisabled,
    };
  },
});
</script>
