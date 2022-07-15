<template>
  <div
    class="modal fade"
    id="modal_add_apt_type"
    tabindex="-1"
    aria-hidden="true"
    ref="createAptTypeModalRef"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Create Appointment Type</h2>
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
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.name"
                      class="w-100"
                      type="text"
                      placeholder="Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Type</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="type">
                    <el-select v-model="formData.type" class="w-100">
                      <el-option value="Consultation" label="Consultation" />
                      <el-option value="Procedure" label="Procedure" />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Invoice By</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="invoice_by">
                    <el-select v-model="formData.invoice_by" class="w-100">
                      <el-option value="Clinic" label="Clinic" />
                      <el-option value="Specialist" label="Specialist" />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Input-->
                  <el-form-item prop="anesthetist_required">
                    <el-checkbox
                      type="checkbox"
                      v-model="formData.anesthetist_required"
                      label="Anesthetist Required"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">MBS Code</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="mbs_code">
                    <el-input
                      v-model="formData.mbs_code"
                      class="w-100"
                      type="number"
                      placeholder="MBS Code"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Clinical Code</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="clinical_code">
                    <el-input
                      v-model="formData.clinical_code"
                      class="w-100"
                      type="number"
                      placeholder="Clinical Code"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Arrival Time</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="arrival_time">
                    <el-input
                      v-model="formData.arrival_time"
                      class="w-100"
                      type="number"
                      placeholder="Arrival Time"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-6 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Appointment Time</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="appointment_time ">
                    <el-select
                      v-model="formData.appointment_time"
                      class="w-100"
                    >
                      <el-option value="single" label="Single" />
                      <el-option value="double" label="Double" />
                      <el-option value="triple" label="Triple" />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 1 (Self-insured) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_1">
                    <el-input
                      v-model="formData.payment_tier_1"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier1"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 2 (Private health insurance with excess)
                    $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_2">
                    <el-input
                      v-model="formData.payment_tier_2"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier2"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 3 (Private health insurance with $0 excess)
                    $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_3">
                    <el-input
                      v-model="formData.payment_tier_3"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier3"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 4 (Private Health Insurance +
                    Pension/Healthcare Card) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_4">
                    <el-input
                      v-model="formData.payment_tier_4"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier4"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 5 (Pension Card) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_5">
                    <el-input
                      v-model="formData.payment_tier_5"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier5"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 6 (Healthcare Card) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_6">
                    <el-input
                      v-model="formData.payment_tier_6"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier6"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 7 (Department of Veteran Affairs) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_7">
                    <el-input
                      v-model="formData.payment_tier_7"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier7"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 8 (Work Cover) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_8">
                    <el-input
                      v-model="formData.payment_tier_8"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier8"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 9 (Transport Accident Commission) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_9">
                    <el-input
                      v-model="formData.payment_tier_9"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier9"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="fv-row col-12 mb-5">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Payment Tier 10 (AMA) $</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="payment_tier_10">
                    <el-input
                      v-model="formData.payment_tier_10"
                      class="w-100"
                      type="number"
                      placeholder="Payment Tier10"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
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
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "create-apt-type-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const createAptTypeModalRef = ref(null);
    const loading = ref(false);

    const formData = ref({
      name: "",
      type: "Consultation",
      anesthetist_required: 0,
      mbs_code: 0,
      clinical_code: 0,
      invoice_by: "Clinic",
      arrival_time: 0,
      appointment_time: "single",
      payment_tier_1: 0,
      payment_tier_2: 0,
      payment_tier_3: 0,
      payment_tier_4: 0,
      payment_tier_5: 0,
      payment_tier_6: 0,
      payment_tier_7: 0,
      payment_tier_8: 0,
      payment_tier_9: 0,
      payment_tier_10: 0,
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Name cannot be blank",
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
            .dispatch(Actions.APT.TYPES.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.APT.TYPES.LIST);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(createAptTypeModalRef.value);
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

    return {
      formData,
      rules,
      formRef,
      loading,
      createAptTypeModalRef,
      submit,
    };
  },
});
</script>
