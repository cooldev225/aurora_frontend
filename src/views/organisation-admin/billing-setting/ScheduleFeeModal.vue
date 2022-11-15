<template>
  <ModalWrapper
    :title="`${isAdd ? 'Add' : 'Edit'} Fee`"
    modalId="schedule_fee"
    modalRef="scheduleFeeModalRef"
    :static="true"
  >
    <!--begin::Form-->
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      :loading="loading"
      ref="formRef"
    >
      <!--begin::Scroll-->
      <div>
        <InputWrapper required class="fill-out" label="Amount" prop="amount">
          <CurrencyInput v-model="formData.amount" placeholder="Amount" />
        </InputWrapper>
      </div>
      <!--end::Scroll-->

      <!--begin::Modal footer-->
      <div class="d-flex justify-content-end">
        <!--begin::Button-->
        <button
          v-if="!isAdd"
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-danger me-3"
          @click.prevent="handleDelete"
        >
          Delete
        </button>
        <!--end::Button-->

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
            {{ isAdd ? "Add" : "Update" }}
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
  </ModalWrapper>
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
    fee: { type: Object },
  },
  setup(props, { emit }) {
    const store = useStore();
    const formRef = ref(null);
    const scheduleFeeModalRef = ref(null);
    const loading = ref(false);
    const scheduleFee = computed(() => props.fee);
    const isAdd = computed(() => scheduleFee.value?.mode === "add");

    const formData = ref({
      amount: 0,
    });

    const rules = ref({
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
          let action = Actions.SCHEDULE_FEE.CREATE;

          const data = {
            health_fund_code: scheduleFee.value.health_fund_code,
            amount: formData.value.amount,
            schedule_item_id: scheduleFee.value.schedule_item_id,
          };

          if (!isAdd.value) {
            data.id = scheduleFee.value.id;
            action = Actions.SCHEDULE_FEE.UPDATE;
          }

          loading.value = true;
          store
            .dispatch(action, data)
            .then(() => {
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
                formRef.value.resetFields();
                emit("closeModal");
              });
            })
            .catch(({ response }) => {
              console.log(response.data.error);
            })
            .finally(() => {
              loading.value = false;
            });
        }
      });
    };

    const handleDelete = () => {
      Swal.fire({
        text: `Are you sure you want to delete this fee?`,
        icon: "question",
        buttonsStyling: false,
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          store
            .dispatch(Actions.SCHEDULE_FEE.DELETE, scheduleFee.value.id)
            .then(() => {
              store.dispatch(Actions.SCHEDULE_ITEM.LIST);
              Swal.fire({
                text: "Successfully Delete!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                formRef.value.resetFields();
                emit("closeModal");
              });
            });
        }
      });
    };

    watch(scheduleFee, () => {
      formData.value.amount = scheduleFee.value.amount;
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      scheduleFeeModalRef,
      scheduleFee,
      isAdd,
      handleDelete,
    };
  },
});
</script>
