<template>
  <div
    class="modal fade"
    id="modal_schedule_item"
    tabindex="-1"
    aria-hidden="true"
    ref="scheduleItemModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_schedule_item_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add Schedule Item</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
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
          :loading="loading"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_schedule_item_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_schedule_item_header"
              data-kt-scroll-wrappers="#kt_modal_schedule_item_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">MBS Item</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="mbs_item_code">
                  <el-input
                    v-model="formData.mbs_item_code"
                    type="text"
                    placeholder="MBS Item Code"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">Amount</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="amount">
                  <el-input
                    v-model="formData.amount"
                    type="number"
                    placeholder="Amount"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
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
              id="kt_modal_schedule_item_cancel"
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
                {{ scheduleItem._button }}
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

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "schedule-fee-modal",
  components: {},
  props: {
    item: { type: Object },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const scheduleItemModalRef = ref(null);
    const loading = ref(false);
    const scheduleItem = computed(() => props.item);

    const formData = ref({
      mbs_item_code: "",
      health_fund_code: "",
      is_base_amount: 0,
      amount: "",
    });

    const rules = ref({
      mbs_item_code: [
        {
          required: true,
          message: "MBS item code cannnot be blank",
          trigger: "change",
        },
      ],
      amount: [
        {
          required: true,
          message: "Amount cannot be blank",
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
            .dispatch(Actions.SCHEDULE_ITEM.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.SCHEDULE_ITEM.LIST);
              Swal.fire({
                text: "Successfully Saved!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(scheduleItemModalRef.value);
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        }
      });
    };

    watch(scheduleItem, () => {
      console.log(["scheduleItem", scheduleItem.value]);
      formData.value.mbs_item_code = scheduleItem.value.mbs_item_code;
      formData.value.health_fund_code = scheduleItem.value.health_fund_code;
      formData.value.amount = scheduleItem.value.amount;
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      scheduleItemModalRef,
      scheduleItem,
    };
  },
});
</script>
