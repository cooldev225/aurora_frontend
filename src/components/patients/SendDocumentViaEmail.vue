<template>
  <div
    class="modal fade"
    id="modal_send_email"
    tabindex="-1"
    aria-hidden="true"
    ref="sendEmailModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_send_email_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Send via Email</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_send_email_close"
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
              id="kt_modal_send_email_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_send_email_header"
              data-kt-scroll-wrappers="#kt_modal_send_email_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-select
                    class="mt-10 w-100"
                    placeholder="Enter the emails"
                    v-model="formData.to_user_ids"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in referralDoctors"
                      :value="item.id"
                      :label="
                        item.first_name +
                        ' ' +
                        item.last_name +
                        ' <' +
                        item.email +
                        '>'
                      "
                      :key="item.id"
                    />
                  </el-select>
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
              id="kt_modal_send_email_cancel"
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
              <span v-if="!loading" class="indicator-label"> Send </span>
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
    document: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const sendEmailModalRef = ref(null);
    const loading = ref(false);
    const letter_template = ref("");
    const documentId = computed(() => props.document.id);
    // const patientId = computed(() => props.patientId);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);
    // const sendableUsers = computed(() => store.getters.getUserList);

    const formData = ref({
      document_id: documentId,
      to_user_ids: [],
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
            .dispatch(Actions.PATIENTS.DOCUMENT.SEND_VIA_EMAIL, formData.value)
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Sent!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(sendEmailModalRef.value);
              });
            })
            .catch(() => {
              loading.value = false;
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    onMounted(() => {
      store.dispatch(Actions.USER_LIST);
      store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      // sendableUsers,
      referralDoctors,
      sendEmailModalRef,
      letter_template,
      submit,
    };
  },
});
</script>
