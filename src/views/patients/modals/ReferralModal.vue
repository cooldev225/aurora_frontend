<template>
  <div
    class="modal fade"
    id="modal_referral"
    tabindex="-1"
    aria-hidden="true"
    ref="referralModalRef"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">Create Referral</h2>
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
        </div>
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <div class="modal-body py-2 px-lg-5">
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_referral_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_referral_header"
              data-kt-scroll-wrappers="#kt_modal_referral_scroll"
              data-kt-scroll-offset="300px"
            >
              <InputWrapper label="Referral Doctor" prop="referral_doctor">
                <el-autocomplete
                  class="w-100"
                  v-model="formData.referring_doctor_name"
                  value-key="full_name"
                  :fetch-suggestions="searchReferralDoctor"
                  placeholder="Enter Doctor Name"
                  :trigger-on-focus="false"
                  @select="handleSelect"
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
              <InputWrapper label="Include:" prop="include">
                <div class="d-flex">
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.patient_demographic"
                    :checked="false"
                  >
                    Patient Demographic
                  </el-checkbox>
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.current_medications"
                    :checked="false"
                  >
                    Current Medications
                  </el-checkbox>
                </div>
                <div class="d-flex">
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.patient_alergies"
                    :checked="false"
                  >
                    Patient Alergies
                  </el-checkbox>
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.past_medical_history"
                    :checked="false"
                  >
                    Past Medical history
                  </el-checkbox>
                </div>
              </InputWrapper>
              <InputWrapper label="Message" prop="message">
                <ckeditor :editor="ClassicEditor" v-model="formData.message" />
              </InputWrapper>
              <InputWrapper label="Investigation" prop="investigation">
                <LargeIconButton
                  @click="handleInvest"
                  :subheading="'Patient'"
                  :iconPath="'media/icons/duotune/arrows/arr009.svg'"
                  :color="'primary'"
                />
              </InputWrapper>
            </div>
          </div>
          <div class="modal-footer flex-end">
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary m-6 justify-content-end"
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
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LargeIconButton from "@/components/presets/GeneralElements/LargeIconButton.vue";

export default defineComponent({
  name: "create-referral-modal",
  components: {
    ckeditor: CKEditor.component,
    LargeIconButton,
  },
  props: {
    patientId: { required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const referralModalRef = ref(null);
    const loading = ref(false);
    const patientId = computed(() => props.patientId);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);

    const formData = ref({
      referral_doctor_name: "",
      referral_doctor_id: null,
      patient_id: patientId.value,
      patient_demographic: null,
      patient_alergies: null,
      current_medications: null,
      past_medical_history: null,
      message: "",
    });

    const rules = ref({
      referral_doctor_name: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      message: [
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
          //loading.value = true;
          //save process
          //formRef.value.resetFields();
        }
      });
    };

    let timeout;
    const searchReferralDoctor = (term, cb) => {
      const results = term
        ? referralDoctors.value.filter(createFilter(term))
        : referralDoctors.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
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

    const handleSelect = (item) => {
      formData.value.referring_doctor_id = item.id;
    };

    const handleInvest = () => {
      //
    };

    onMounted(() => {
      store.dispatch(Actions.LETTER_TEMPLATE.LIST);
      store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      ClassicEditor,
      referralDoctors,
      referralModalRef,
      submit,
      handleSelect,
      searchReferralDoctor,
      handleInvest,
    };
  },
});
</script>
