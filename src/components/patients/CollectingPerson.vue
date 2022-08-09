<template>
  <div
    class="modal fade"
    id="modal_collecting_person"
    tabindex="-1"
    aria-hidden="true"
    ref="collectingPersonModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_collecting_person_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Update Collecting Person</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_collecting_person_close"
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
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_collecting_person_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_collecting_person_header"
              data-kt-scroll-wrappers="#kt_modal_collecting_person_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Name</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="collecting_person_name">
                  <el-input
                    v-model="formData.collecting_person_name"
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
                <label class="required fs-6 fw-bold mb-2">Phone</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="collecting_person_phone">
                  <el-input
                    v-model="formData.collecting_person_phone"
                    type="text"
                    placeholder="Enter Phone"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >Alternate Contact</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="collecting_person_alternate_contact">
                  <el-input
                    v-model="formData.collecting_person_alternate_contact"
                    type="text"
                    placeholder="Enter Alternate Contact"
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
            <button
              type="reset"
              data-bs-dismiss="modal"
              id="kt_modal_collecting_person_cancel"
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
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "update-collecting-person-modal",
  components: {},
  props: {
    selectedApt: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const collectingPersonModalRef = ref(null);
    const loading = ref(false);
    const aptData = computed(() => props.selectedApt);

    const formData = ref({
      collecting_person_name: "",
      collecting_person_phone: "",
      collecting_person_alternate_contact: "",
    });

    const rules = ref({
      collecting_person_name: [
        {
          required: true,
          message: "Name cannot be blank",
          trigger: "change",
        },
      ],
      collecting_person_phone: [
        {
          required: true,
          message: "Phone cannnot be blank",
          trigger: "change",
        },
      ],
      collecting_person_alternate_contact: [
        {
          required: true,
          message: "Alternate contact cannot be blank",
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
            .dispatch(Actions.APT.UPDATE, {
              id: aptData.value.id,
              ...formData.value,
            })
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                store.dispatch(Actions.PATIENTS.VIEW, aptData.value.patient_id);
                hideModal(collectingPersonModalRef.value);
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

    watch(aptData, () => {
      for (let key in formData.value) formData.value[key] = aptData.value[key];
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      collectingPersonModalRef,
    };
  },
});
</script>
