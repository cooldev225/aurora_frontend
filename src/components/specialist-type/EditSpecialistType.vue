<template>
  <div
    class="modal fade"
    id="modal-edit-spectype"
    ref="editSpectypeModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="modal_create_spectype_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Create Specialist Type</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="modal_create_spectype_close"
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
              id="modal_create_spectype_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal_create_spectype_header"
              data-kt-scroll-wrappers="#modal_create_spectype_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">{{ dataId }}</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.name"
                    type="text"
                    placeholder="Type Name"
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
              type="button"
              data-bs-dismiss="modal"
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
              <span v-if="!loading" class="indicator-label">
                Create
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
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
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "create-specialistType",
  props: {
    dataId: { type: String, required: true },
  },
  components: {},
  setup(props) {
    const formRef = ref<null | HTMLFormElement>(null);
    const editSpectypeModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const selected = ref(props.dataId);
    const formData = ref({
      name: "",
    });

    watch(selected, () => {
      console.log(selected.value);
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Type Name is required",
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

          if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.post("specialist-types", formData.value)
              .then(({ data }) => {
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
                  hideModal(editSpectypeModalRef.value);
                });
              })
              .catch(({ response }) => {
                loading.value = false;
                console.log(response.data.error);
              });
          } else {
            // this.context.commit(Mutations.PURGE_AUTH);
          }
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      editSpectypeModalRef,
    };
  },
});
</script>
