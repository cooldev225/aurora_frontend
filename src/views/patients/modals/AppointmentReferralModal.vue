<template>
  <div
    class="modal fade"
    id="modal_appointment_referral"
    tabindex="-1"
    aria-hidden="true"
    ref="referralModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_collecting_person_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Update Referral</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_collecting_person_close"
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
          <div class="row m-6">
            <InputWrapper
              required
              class="col-6"
              label="Referring Doctor"
              prop="referring_doctor"
            >
              <el-autocomplete
                class="w-100"
                v-model="formData.referring_doctor_name"
                value-key="full_name"
                :fetch-suggestions="searchReferringDoctor"
                placeholder="Please input"
                :trigger-on-focus="false"
                @select="handleReferringDoctorSelect"
              >
                <template #default="{ item }">
                  <div class="name">
                    {{ item.title }}
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="address">{{ item.address }}</div>
                </template>
              </el-autocomplete>
            </InputWrapper>

            <InputWrapper
              class="col-6"
              required
              label="Date"
              prop="referral_date"
            >
              <el-date-picker
                class="w-100"
                v-model="formData.referral_date"
                format="YYYY-MM-DD"
                placeholder="Enter Referral Date"
              />
            </InputWrapper>

            <InputWrapper
              class="col-6"
              required
              label="Date"
              prop="referral_duration"
            >
              <el-select
                class="w-100"
                v-model="formData.referral_duration"
                placeholder="Enter Referral Duration"
              >
                <el-option value="0" label="Indefinite" />
                <el-option value="3" label="3 Months" />
                <el-option value="12" label="12 Months" />
              </el-select>
            </InputWrapper>

            <InputWrapper
              required
              class="col-6"
              label="Referral"
              prop="referral_file"
            >
              <el-space wrap>
                <el-upload
                  action="#"
                  ref="uploadRef"
                  class="mr-20"
                  :limit="2"
                  :auto-upload="false"
                  :on-change="handleUploadChange"
                  :on-remove="handleUploadRemove"
                  v-model:file-list="formData.file"
                >
                  <el-button type="primary" class="btn btn-primary"
                    >Upload Referral
                  </el-button>
                </el-upload>
              </el-space></InputWrapper
            >
          </div>
          <div class="fv-row m-6 pdf_viewer_wrapper">
            <div id="divPDFViewer" class="pdf_viewer"></div>
          </div>
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Cancel Button-->
            <button
              type="button"
              data-bs-dismiss="modal"
              id="kt_modal_collecting_person_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <!--end::Button-->

            <!--begin::Submit Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label"> Update </span>
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
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ElMessage } from "element-plus";

import { mask } from "vue-the-mask";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import pdf from "pdfobject";

export default defineComponent({
  name: "update-appointment-referral-modal",
  directives: {
    mask,
  },
  components: { InputWrapper },
  props: {
    selectedApt: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const referralModalRef = ref(null);
    const loading = ref(false);

    const uploadDisabled = ref(true);
    const pdfType = "application/pdf";

    const appointmentData = computed(() => props.selectedApt);
    const referringDoctors = computed(
      () => store.getters.getReferralDoctorList
    );

    const formData = ref({
      referring_doctor_name: "",
      referring_doctor_id: "2",
      referral_date: "",
      referral_duration: "",
      file: [],
    });

    const rules = ref({
      referring_doctor_id: [
        {
          required: true,
          message: "Referring doctor cannot be blank",
          trigger: "change",
        },
      ],
      referral_date: [
        {
          required: true,
          message: "Referral date cannot be blank",
          trigger: "change",
        },
      ],
      referral_duration: [
        {
          required: true,
          message: "Referral duration cannot be blank",
          trigger: "change",
        },
      ],
    });

    watch(appointmentData, () => {
      if (appointmentData.value.referral?.referral_file) {
        store
          .dispatch(AppointmentActions.REFERRAL.VIEW, {
            path: appointmentData.value.referral.referral_file,
          })
          .then((data) => {
            const blob = new Blob([data], { type: "application/pdf" });
            const objectUrl = URL.createObjectURL(blob);
            document.getElementById("divPDFViewer").innerHTML = "";
            pdf.embed(objectUrl, "#divPDFViewer");
            let file = {
              name: appointmentData.value.referral?.referral_file,
              raw: data,
              size: data.size,
              status: "ready",
              uid: new Date(),
            };
            formData.value.file = [file];
          })
          .catch(() => {
            console.log("pdf error");
          });
      }
      formData.value.referring_doctor_id =
        appointmentData.value.referral.referring_doctor_id;
      formData.value.referring_doctor_name =
        appointmentData.value.referral.referring_doctor_name;
      formData.value.referral_duration =
        appointmentData.value.referral.referral_duration;
      formData.value.referral_date =
        appointmentData.value.referral.referral_date;
      if (
        !appointmentData.value.referral?.referral_file ||
        !appointmentData.value.referral?.referral_file?.length
      ) {
        formData.value.file = [];
        document.getElementById("divPDFViewer").innerHTML =
          "No referral uploaded";
      }
    });

    const submit = () => {
      formRef.value.validate((valid) => {
        if (
          !formData.value.file?.length ||
          formData.value.file[0] === null ||
          formData.value.file[0] === undefined
        ) {
          ElMessage.error("Please upload referral");
          valid = false;
        }
        if (valid) {
          loading.value = true;

          let submitData = new FormData();

          submitData.append("file", formData.value.file[0]?.raw);
          submitData.append(
            "referring_doctor_id",
            formData.value.referring_doctor_id
          );
          submitData.append("referral_date", formData.value.referral_date);
          submitData.append(
            "referral_duration",
            formData.value.referral_duration
          );

          store
            .dispatch(AppointmentActions.REFERRAL.UPDATE, {
              appointment_id: appointmentData.value.id,
              submitData: submitData,
            })
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Updated Referral",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                document.getElementById("divPDFViewer").innerHTML =
                  "No referral uploaded";
                hideModal(referralModalRef.value);
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

    const handleReferringDoctorSelect = (item) => {
      appointmentData.value.referring_doctor_id = item.id;
      formData.value.referring_doctor_id = item.id;
    };

    let timeout;
    const searchReferringDoctor = (term, cb) => {
      const results = term
        ? referringDoctors.value.filter(createFilter(term))
        : referringDoctors.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 50);
    };

    const createFilter = (term) => {
      const keyword = term.toString();
      return (referralDoctor) => {
        const full_name =
          referralDoctor.title +
          " " +
          referralDoctor.first_name +
          " " +
          referralDoctor.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = referralDoctor.address
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };

    const handleUploadChange = (file) => {
      if (file.raw?.type?.toString().toLowerCase() !== pdfType) {
        formData.value.file = [];
        document.getElementById("divPDFViewer").innerHTML =
          "Referral must be PDF format!";
        return;
      }
      uploadDisabled.value = false;
      formData.value.file = [file];
      if (formData.value.file?.length) {
        const blob = new Blob([file.raw], { type: pdfType });
        const url = window.URL.createObjectURL(blob);
        document.getElementById("divPDFViewer").innerHTML = "";
        pdf.embed(url, "#divPDFViewer");
      }
    };

    const handleUploadRemove = () => {
      uploadDisabled.value = true;
    };

    return {
      handleUploadChange,
      handleUploadRemove,
      handleReferringDoctorSelect,
      searchReferringDoctor,
      formData,
      rules,
      submit,
      formRef,
      loading,
      referralModalRef,
    };
  },
});
</script>
