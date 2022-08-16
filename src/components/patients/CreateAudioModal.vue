<template>
  <div
    class="modal fade"
    id="modal_create_audio"
    tabindex="-1"
    aria-hidden="true"
    ref="createAudioModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_create_audio_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Create Audio</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_create_audio_close"
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
          <div class="modal-body py-10 px-lg-17">
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_create_audio_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_create_audio_header"
              data-kt-scroll-wrappers="#kt_modal_create_audio_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="fv-row">
                <InputWrapper label="Document Title" prop="document_title">
                  <el-input
                    type="text"
                    v-model.number="formData.document_title"
                  />
                </InputWrapper>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <InputWrapper label="Upload File" prop="file">
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
                </InputWrapper>
              </div>
            </div>

            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--begin::Button-->
              <button
                type="reset"
                data-bs-dismiss="modal"
                id="kt_modal_create_audio_cancel"
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
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "create-letter-template-modal",
  components: { InputWrapper },
  props: {
    patientId: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const createAudioModalRef = ref(null);
    const loading = ref(false);
    const specialistList = computed(() => store.getters.getSpecialistList);
    const aptList = computed(() => store.getters.getAptListById);
    const patientId = computed(() => props.patientId);
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();

    const formData = ref({
      document_title: "",
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
            .dispatch(Actions.PATIENTS.DOCUMENT.AUDIO.CREATE, Data)
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(createAudioModalRef.value);
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

    watch(patientId, () => {
      formData.value.patient_id = patientId.value;
      store.dispatch(Actions.APT.LISTBYID, patientId.value);
    });

    watchEffect(() => {
      if (aptList.value && aptList.value.futureAppointments) {
        aptList.value.futureAppointments.forEach((item) => {
          if (
            moment(item.date).format("DD-MM-YYYY") ===
            moment(new Date()).format("DD-MM-YYYY")
          ) {
            formData.value.appointment_id = item.id;
            formData.value.specialist_id = item.specialist_id;
          }
        });
      }
    });

    onMounted(() => {
      store.dispatch(Actions.SPECIALIST.LIST);
    });

    const handleChange = (file, fileList) => {
      debugger;
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
      upload,
      formRef,
      loading,
      createAudioModalRef,
      specialistList,
      aptList,
      moment,
      submit,
      handleChange,
      handleRemove,
      uploadDisabled,
    };
  },
});
</script>
