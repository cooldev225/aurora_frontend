<template>
  <div
    class="modal fade"
    id="modal_employee_password"
    tabindex="-1"
    aria-hidden="true"
    ref="employeePasswordModalRef"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_provider_header">
          <h2 class="fw-bolder">Employee Password Update</h2>
          <div
            id="kt_modal_provider_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
        </div>
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <div class="modal-body py-10 px-lg-17">
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_provider_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_provider_header"
              data-kt-scroll-wrappers="#kt_modal_provider_scroll"
              data-kt-scroll-offset="300px"
            >
              <InputWrapper
                required
                :class="colString"
                label="Current your password"
                prop="current_password"
              >
                <el-input
                  v-model="formData.current_password"
                  type="text"
                  placeholder="Enter current your password"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="New employee password"
                prop="new_employee_password"
              >
                <el-input
                  v-model="formData.new_employee_password"
                  type="text"
                  placeholder="Enter new employee password"
                />
              </InputWrapper>

              <InputWrapper
                required
                :class="colString"
                label="Repeat employee password"
                prop="repeat_employee_password"
              >
                <el-input
                  v-model="formData.repeat_employee_password"
                  type="text"
                  placeholder="Repeat employee password"
                />
              </InputWrapper>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <button
              type="reset"
              data-bs-dismiss="modal"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary m-6"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label"> Save </span>
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

export default defineComponent({
  name: "update-employee-password-modal",
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const employeePasswordModalRef = ref(null);
    const loading = ref(false);
    const employee = computed(() => store.getters.employeeSelected);

    const formData = ref([
      {
        current_password: null,
        new_employee_password: null,
        repeat_employee_password: null,
      },
    ]);

    const rules = ref({
      current_password: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: ["blur", "change"],
        },
      ],
      new_employee_password: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: ["blur", "change"],
        },
      ],
      repeat_employee_password: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: ["blur", "change"],
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
            .dispatch(Actions.EMPLOYEE.UPDATE_PASSWORD, {
              ...employee.value,
              current_password: formData.value.current_password,
              new_employee_password: formData.value.new_employee_password,
              repeat_employee_password: formData.value.repeat_employee_password,
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
                hideModal(employeePasswordModalRef.value);
              });
            })
            .catch(() => {
              //
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    // watch(employee, () => {});

    onMounted(() => {
      store.dispatch(Actions.CLINICS.LIST);
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      employeePasswordModalRef,
      submit,
    };
  },
});
</script>
