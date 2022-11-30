<template>
  <ModalWrapper
    title="Upload Document"
    modalId="upload_document"
    :modalRef="uploadDocumentRef"
  >
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <div class="row">
        <InputWrapper
          required
          class="col-6"
          label="Document Title"
          prop="document_name"
        >
          <el-input type="text" v-model.number="formData.document_name" />
        </InputWrapper>
        <InputWrapper
          required
          class="col-6"
          label="Document Type"
          prop="document_type"
        >
          <el-select
            class="w-100 mb-5"
            placeholder="Select Document Type"
            v-model="formData.document_type"
          >
            <template
              v-for="docType in patientDocumentTypes"
              :key="docType.value"
            >
              <el-option :value="docType.value" :label="docType.label">
                <inline-svg class="me-5" :src="docType.icon" />
                {{ docType.label }}
              </el-option>
            </template>
          </el-select>
        </InputWrapper>

        <InputWrapper
          required
          class="col-6 f-row row"
          label="Attach document to:"
          v-if="attachmentType"
        >
          <el-radio-group
            v-if="attachmentType"
            v-model="attachmentType"
            size="large"
          >
            <el-radio-button label="Appointment" />
            <el-radio-button label="Specialist" />
          </el-radio-group>
        </InputWrapper>
        <InputWrapper
          v-if="attachmentType.toLocaleLowerCase() === 'appointment'"
          class="col-6"
          label="Appointment"
          prop="appointment"
        >
          <el-select
            v-model="formData.appointment_id"
            class="w-100"
            placeholder="Select Appointment"
          >
            <el-option
              v-for="item in aptList"
              :label="
                moment(item.date).format('DD-MM-YYYY') +
                ' ' +
                item.appointment_type.name
              "
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </InputWrapper>
        <InputWrapper
          class="col-6"
          label="Specialist"
          prop="specialist"
          v-if="attachmentType.toLocaleLowerCase() !== 'appointment'"
        >
          <el-select
            v-model="formData.specialist_id"
            class="w-100"
            placeholder="Select Specialist"
            :disabled="
              attachmentType.toLocaleLowerCase() == 'appointment' ? true : false
            "
          >
            <el-option
              v-for="item in specialistList"
              :label="item.full_name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </InputWrapper>
      </div>
      <InputWrapper label="Upload File" prop="specialist">
        <el-upload
          action="#"
          ref="upload"
          :class="{ disabled: uploadDisabled }"
          :limit="1"
          :file-list="fileList"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          accept="*/*"
        >
          <i class="fa fa-plus"></i> </el-upload
      ></InputWrapper>

      <!--begin::Modal footer-->
      <div class="modal-footer flex-reverse">
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
          <span v-if="!loading" class="indicator-label"> Upload </span>
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
  </ModalWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import patientDocumentTypes from "@/core/data/patient-document-types";
import moment from "moment";
import IPatient from "@/store/interfaces/IPatient";
export default defineComponent({
  name: "create-letter-template-modal",
  props: {
    patient: { type: Object as PropType<IPatient>, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref();
    const uploadDocumentRef = ref();

    const specialistList = computed(() => store.getters.getSpecialistList);
    const aptList = computed(() => store.getters.getAptList);
    const uploadDisabled = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const upload = ref();
    const attachmentType = ref("Appointment");
    let Data = new FormData();
    const fileList = ref([]);

    const formData = ref({
      patient_id: props.patient.id,
      specialist_id: "",
      document_type: "",
      appointment_id: "",
      document_name: "",
    });

    const rules = ref({
      document_name: [
        {
          required: true,
          message: "Document name cannot be blank",
          trigger: "change",
        },
      ],
      document_type: [
        {
          required: true,
          message: "Document type cannot be blank",
          trigger: "change",
        },
      ],
      appointment_id: [
        {
          required: true,
          message: "Appointment cannot be blank",
          trigger: "blur",
        },
      ],
      specialist_id: [
        {
          required: true,
          message: "Specialists cannot be blank",
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
          console.log(formData.value);
          loading.value = true;
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          store
            .dispatch(PatientActions.DOCUMENTS.CREATE, Data)
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Uploaded!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok",
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
          upload.value.clearFiles();
          fileList.value = [];
        }
      });
    };

    onMounted(() => {
      store.dispatch(Actions.SPECIALIST.LIST);
    });

    const handleChange = (file) => {
      Data = new FormData();
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("file", file.raw);
    };

    const handleRemove = () => {
      fileList.value = [];
      Data.delete("file");
    };

    return {
      formData,
      rules,
      upload,
      formRef,
      loading,
      uploadDocumentRef,
      specialistList,
      aptList,
      moment,
      submit,
      patientDocumentTypes,
      handleChange,
      handleRemove,
      uploadDisabled,
      fileList,
      attachmentType,
    };
  },
});
</script>
