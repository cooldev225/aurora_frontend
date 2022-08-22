<template>
  <div
    class="modal fade"
    id="modal_letter"
    tabindex="-1"
    aria-hidden="true"
    ref="letterModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_letter_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Create Letter</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_letter_close"
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
              id="kt_modal_letter_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_letter_header"
              data-kt-scroll-wrappers="#kt_modal_letter_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >Letter Template</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="letter_template">
                  <el-select
                    v-model="letter_template"
                    fit-input-width
                    class="w-100"
                  >
                    <el-option
                      v-for="item in letterTemplates"
                      :key="item.id"
                      :label="item.heading"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">Referral Doctor</label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="referral_doctor">
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
                </el-form-item>
                <!--end::Input-->
              </div>

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Title</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="title">
                  <el-input
                    v-model="formData.title"
                    type="text"
                    placeholder="Enter Name"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Body</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="body">
                  <ckeditor :editor="ClassicEditor" v-model="formData.body" />
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
              id="kt_modal_letter_cancel"
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
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
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

export default defineComponent({
  name: "create-letter-template-modal",
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    patientId: { required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const letterModalRef = ref(null);
    const loading = ref(false);
    const letter_template = ref("");
    const patientId = computed(() => props.patientId);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);
    const letterTemplates = computed(() => store.getters.getLetterTemplateList);

    const formData = ref({
      from: 1,
      to: 1,
      document_type: "LETTER",
      patient_id: patientId.value,
      referring_doctor_name: "",
      referring_doctor_id: "",
      letter: "",
      title: "",
      body: "",
    });

    const rules = ref({
      letter_template: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      referral_doctor: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "blur",
        },
      ],
      title: [
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
          store
            .dispatch(Actions.LETTER.CREATE, {
              ...formData.value,
            })
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
                hideModal(letterModalRef.value);
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

    onMounted(() => {
      store.dispatch(Actions.LETTER_TEMPLATE.LIST);
      store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
    });

    watch(letter_template, () => {
      let selected = letterTemplates.value.filter(
        (item) => item.id === letter_template.value
      )[0];
      formData.value.title = selected.heading;
      formData.value.body = selected.body;
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      ClassicEditor,
      letterTemplates,
      letterModalRef,
      letter_template,
      submit,
      handleSelect,
      searchReferralDoctor,
    };
  },
});
</script>
