<template>
  <div
    class="modal fade"
    id="modal_schedule_fee"
    tabindex="-1"
    aria-hidden="true"
    ref="scheduleFeeModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-100">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_schedule_fee_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">
            {{ scheduleFee._title }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_schedule_fee_close"
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
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_schedule_fee_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_schedule_fee_header"
              data-kt-scroll-wrappers="#kt_modal_schedule_fee_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="d-flex flex-row">
                <InputWrapper label="MBS Item" prop="mbs_item" class="col-12">
                  <el-input
                    type="text"
                    v-model="formData.mbs_item_code"
                    placeholder="MBS Item Code"
                  />
                </InputWrapper>
                <InputWrapper label="Amount" prop="amount" class="col-12">
                  <el-input
                    type="text"
                    v-model="formData.amount"
                    placeholder="Last Name"
                  />
                </InputWrapper>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import { Actions } from "@/store/enums/StoreEnums";
import pdf from "pdfobject";

export default defineComponent({
  name: "schedule-fee-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const scheduleFeeModalRef = ref(null);
    const scheduleFee = computed(
      () => store.getters.getScheduleFeeSelectedList
    );

    const formData = ref({
      mbs_item_code: "",
      amount: 0,
    });

    const rules = ref({
      mbs_item_code: [
        {
          required: false,
          message: "MBS item name cannot be blank",
          trigger: "change",
        },
      ],
      amount: [
        {
          required: false,
          message: "Amount cannot be blank",
          trigger: "change",
        },
      ],
    });

    const submit = (f) => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          const Data = {
            id: formData.value.id,
            patient_id: formData.value.patient_id,
            clinic_id: formData.value.clinic_id,
            appointment_type_id: formData.value.appointment_type_id,
            appointment_id: formData.value.appointment_id,
            undertaken: formData.value.undertaken,
            extraitems: formData.value.extraitems,
            indications: formData.value.indications,
            diagnosis: formData.value.diagnosis,
          };
          loading.value = true;
          store
            .dispatch(CodingActions.COMPLETE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(CodingActions.LIST).then(() => {
                if (!f) hideModal(codingModalRef.value);
                else {
                  aptList.value.map((a, i) => {
                    if (formData.value.id == a.id) {
                      store.commit(
                        CodingMutations.SET_SELECT,
                        aptList.value[i + 1]
                      );
                      return;
                    }
                  });
                }
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
      scheduleFee,
      scheduleFeeModalRef,
      formData,
      rules,
      submit,
    };
  },
});
</script>
