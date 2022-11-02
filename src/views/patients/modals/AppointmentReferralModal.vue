<template>
  <div
    class="modal fade"
    id="modal_appointment_referral"
    tabindex="-1"
    aria-hidden="true"
    ref="doctorAddressBookModalRef"
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
              label="Doctor Address Book"
              prop="doctor_address_book"
            >
              <el-autocomplete
                class="w-100"
                v-model="formData.doctor_address_book_name"
                value-key="full_name"
                :fetch-suggestions="searchDoctorAddressBook"
                placeholder="Please input"
                :trigger-on-focus="false"
                @select="handledoctorAddressBookselect"
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
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ElMessage } from "element-plus";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { mask } from "vue-the-mask";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import pdf from "pdfobject";
import moment from "moment";

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
    const doctorAddressBookModalRef = ref(null);
    const loading = ref(false);

    const uploadDisabled = ref(true);
    const pdfType = "application/pdf";

    const appointmentData = computed(() => props.selectedApt);
    const doctorAddressBooks = computed(
      () => store.getters.getDoctorAddressBookList
    );

    const formData = ref({
      doctor_address_book_name: "",
      doctor_address_book_id: "2",
      referral_date: "",
      referral_duration: "",
      file: [],
    });

    const rules = ref({
      doctor_address_book_id: [
        {
          required: true,
          message: "Doctor address book cannot be blank",
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

    const afterChangedData = () => {
      if (appointmentData.value.referral?.referral_file) {
        store
          .dispatch(Actions.FILE.VIEW, {
            path: appointmentData.value.referral.referral_file,
            type: "REFERRAL",
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
      formData.value.doctor_address_book_id =
        appointmentData.value.referral.doctor_address_book_id;
      formData.value.doctor_address_book_name =
        appointmentData.value.referral.doctor_address_book_name;
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
    };
    watch(appointmentData, () => {
      afterChangedData();
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
            "doctor_address_book_id",
            formData.value.doctor_address_book_id
          );
          submitData.append(
            "referral_date",
            moment(formData.value.referral_date).format("YYYY-MM-DD")
          );
          submitData.append(
            "referral_duration",
            formData.value.referral_duration
          );

          store
            .dispatch(AppointmentActions.REFERRAL.UPDATE, {
              appointment_id: appointmentData.value.id,
              submitData: submitData,
            })
            .then((data) => {
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
                store.dispatch(
                  PatientActions.VIEW,
                  data.data.appointment.patient_id
                );
                hideModal(doctorAddressBookModalRef.value);
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

    const handledoctorAddressBookselect = (item) => {
      appointmentData.value.doctor_address_book_id = item.id;
      formData.value.doctor_address_book_id = item.id;
    };

    let timeout;
    const searchDoctorAddressBook = (term, cb) => {
      const results = term
        ? doctorAddressBooks.value.filter(createFilter(term))
        : doctorAddressBooks.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 50);
    };

    const createFilter = (term) => {
      const keyword = term.toString();
      return (doctorAddressBook) => {
        const full_name =
          doctorAddressBook.title +
          " " +
          doctorAddressBook.first_name +
          " " +
          doctorAddressBook.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = doctorAddressBook.address
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
      handledoctorAddressBookselect,
      searchDoctorAddressBook,
      formData,
      rules,
      submit,
      formRef,
      loading,
      doctorAddressBookModalRef,
    };
  },
});
</script>
