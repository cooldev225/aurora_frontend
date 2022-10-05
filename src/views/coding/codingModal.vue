<template>
  <div
    class="modal fade"
    id="modal_coding"
    tabindex="-1"
    aria-hidden="true"
    ref="codingModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_coding_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Coding Update</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_coding_close"
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
              id="kt_modal_coding_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_coding_header"
              data-kt-scroll-wrappers="#kt_modal_coding_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row appointment-data-view">
                <div class="col-4">
                  <p>Patient Name: {{ formData.patient_name?.full }}</p>
                  <p>
                    Patient Date of Birth:
                    {{ formData.patient_details?.date_of_birth }}
                  </p>
                  <p>Patient gender: {{ formData.patient?.gender }}</p>
                </div>
                <div class="col-6">
                  <p>
                    Appointment date and time: {{ formData.date }}
                    {{ formData.formatted_appointment_time }}
                  </p>
                  <p>Specialsit name: {{ formData.specialist_name }}</p>
                  <p>Appointment type: {{ formData.appointment_type_name }}</p>
                  <p>clinic: {{ formData.clinic_details?.name }}</p>
                </div>
              </div>
              <div class="row mt-10">
                <div class="col-6 mb-7">
                  <label class="required fs-6 fw-bold mb-2"
                    >Procedures Undertaken</label
                  >
                  <el-form-item prop="undertaken">
                    <el-input
                      v-model="formData.first_name"
                      type="text"
                      placeholder="Undertaken"
                    />
                  </el-form-item>
                </div>
                <div class="col-6 mb-7">
                  <label class="required fs-6 fw-bold mb-2"
                    >Extra Items Used</label
                  >
                  <el-form-item prop="extraitems">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      placeholder="Extra Items"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-6 mb-7">
                  <label class="required fs-6 fw-bold mb-2">Indications</label>
                  <el-form-item prop="indications">
                    <el-input
                      v-model="formData.first_name"
                      type="text"
                      placeholder="Indications"
                    />
                  </el-form-item>
                </div>
                <div class="col-6 mb-7">
                  <label class="required fs-6 fw-bold mb-2">Diagnosis</label>
                  <el-form-item prop="diagnosis">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      placeholder="Diagnosis"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="row mt-10">
                <button class="col-6 btn btn-lg btn-primary" type="submit">
                  <span class="indicator-label"> MARK COMPLETE AND CLOSE </span>
                </button>
                <button class="col-6 btn btn-lg btn-primary" type="submit">
                  <span class="indicator-label"> MARK COMPLETE AND NEXT </span>
                </button>
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
<style lang="scss">
.appointment-data-view {
  font-size: 12px;
  p {
    margin-bottom: 0.5rem;
  }
}
</style>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "coding-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const codingModalRef = ref(null);
    const loading = ref(false);
    const formData = computed(() => store.getters.getCodingAptSelect);

    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Username cannot be blank",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email cannot be blank",
          trigger: "change",
        },
        {
          type: "email",
          message: "Please input correct email address",
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
            .dispatch(Actions.ADMIN.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.ADMIN.LIST);
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(codingModalRef.value);
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
      submit,
      formRef,
      loading,
      codingModalRef,
    };
  },
});
</script>
