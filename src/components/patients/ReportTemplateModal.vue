<template>
  <div
    class="modal fade"
    id="modal_report"
    tabindex="-1"
    aria-hidden="true"
    ref="reportModal"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Select Report Template</h2>
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
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
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
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"
                  >Report Template</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="time_frame">
                  <el-select
                    class="w-100"
                    v-model="reportTemplate"
                    placeholder="Select Report Template"
                  >
                    <el-option
                      v-for="option in reportTemplatesData"
                      :key="option.id"
                      :value="option.id"
                      :label="option.title"
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
              id="kt_modal_add_customer_cancel"
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
              <span v-if="!loading" class="indicator-label"> Select </span>
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
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Mutations } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "report-modal",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const list = computed(() => store.getters.getReportTemplateList);
    const loading = ref(false);
    const reportTemplate = ref();
    const reportTemplatesData = ref([]);
    const reportModal = ref(null);

    watchEffect(() => {
      reportTemplatesData.value = list.value;
      console.log(reportTemplatesData.value);
    });

    const submit = () => {
      store.commit(
        Mutations.SET_REPORT_TEMPLATES.SELECT,
        reportTemplatesData.value[reportTemplate.value - 1]
      );
      Swal.fire({
        text: "Successfully Selected!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Okay, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        hideModal(reportModal.value);
        router.push({ name: "patients-report" });
      });
    };

    return {
      loading,
      reportModal,
      reportTemplate,
      reportTemplatesData,
      submit,
    };
  },
});
</script>
