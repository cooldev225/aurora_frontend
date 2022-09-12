<template>
  <ModalWrapper
    title="Update Collecting Person"
    modalId="collecting_person"
    modalRef="collectingPersonModalRef"
  >
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <InputWrapper label="Name" prop="collecting_person_name">
        <el-input
          v-model="formData.collecting_person_name"
          type="text"
          placeholder="Enter Name"
        />
      </InputWrapper>
      <InputWrapper label="Phone" prop="collecting_person_phone">
        <el-input
          type="text"
          v-mask="'0#-####-####'"
          v-model="formData.collecting_person_phone"
          placeholder="Enter Phone"
        />
      </InputWrapper>
      <InputWrapper
        label="Alternate Contact"
        prop="collecting_person_alternate_contact"
      >
        <el-input
          v-model="formData.collecting_person_alternate_contact"
          type="text"
          placeholder="Enter Alternate Contact"
        />
      </InputWrapper>
      <div class="modal-footer flex-center">
        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary m-6"
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
      </div>
    </el-form>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "update-collecting-person-modal",
  directives: {
    mask,
  },
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
        { validator: validatePhone, trigger: "blur" },
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
            .dispatch(AppointmentActions.APPOINTMENT.COLLECTING_PERSON.UPDATE, {
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
                store.dispatch(
                  PatientActions.PATIENTS.VIEW,
                  aptData.value.patient_id
                );
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
