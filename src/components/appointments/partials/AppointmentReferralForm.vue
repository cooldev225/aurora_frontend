<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <HeadingText text="Appointment Referral" />

    <div class="row justify-content-md-center mt-4">
      <el-checkbox
        v-model="formData.is_no_referral"
        label="No referral required"
      />

      <template v-if="!formData.is_no_referral">
        <InputWrapper
          required
          label="Referring Doctor"
          prop="doctor_address_book_id"
        >
          <el-select
            class="w-100"
            v-model="formData.doctor_address_book_id"
            placeholder="Select Referring Doctor"
          >
            <el-option
              v-for="item in doctorAddressBookList"
              :key="item.id"
              :value="item.id"
              :label="item.full_name"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper required label="Referral Date" prop="referral_date">
          <el-date-picker
            editable
            class="w-100"
            format="DD-MM-YYYY"
            v-model="formData.referral_date"
          />
        </InputWrapper>

        <div class="d-flex align-items-center ms-n6">
          <InputWrapper
            required
            label="Referral Duration"
            prop="referral_duration"
            class="flex-grow-1 fill-out"
          >
            <el-input
              v-model="formData.referral_duration"
              type="number"
              min="0"
              max="24"
              placeholder="Enter Referral Duration"
            />
          </InputWrapper>

          <p class="flex-grow-0 mb-0 fs-6">Months</p>
        </div>
      </template>

      <div class="modal-footer flex-end">
        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary m-6"
          type="submit"
        >
          <span v-if="!loading" class="indicator-label">
            {{ buttonText }}
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
    </div>
  </el-form>
</template>
<script lang="ts">
import IAppointment from "@/store/interfaces/IAppointment";
import {
  PropType,
  ref,
  defineComponent,
  onMounted,
  computed,
  watch,
} from "vue";
import { validatePhone } from "@/helpers/helpers";
import store from "@/store";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { mask } from "vue-the-mask";
import { Actions } from "@/store/enums/StoreEnums";
import IAppointmentReferral from "@/store/interfaces/IAppointmentReferral";

export default defineComponent({
  props: {
    onSubmitExtras: { required: false, type: Function },
    appointment: { required: true, type: Object as PropType<IAppointment> },
    buttonText: { required: false, type: String, default: "Update" },
  },
  directives: {
    mask,
  },
  setup(props) {
    const formRef = ref<HTMLFormElement>();
    const loading = ref<boolean>(false);
    const doctorAddressBookList = computed(
      () => store.getters.getDoctorAddressBookList
    );
    const formData = ref(
      props.appointment?.referral ?? ({} as IAppointmentReferral)
    );

    const rules = ref({
      collecting_person_name: [
        {
          required: true,
          message: "Name can not be blank",
          trigger: "change",
        },
      ],
      collecting_person_phone: [
        {
          required: true,
          message: "Phone can not be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      collecting_person_alternate_contact: [
        {
          required: true,
          message: "Alternate contact can not be blank",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (formRef.value) {
        formRef.value.validate((valid) => {
          if (valid) {
            const updateData = {
              appointment_id: props.appointment.id,
              submitData: {
                ...formData.value,
              },
            };

            loading.value = true;
            store
              .dispatch(AppointmentActions.REFERRAL.UPDATE, updateData)
              .then(() => {
                if (props.onSubmitExtras) {
                  props.onSubmitExtras();
                }
              })
              .finally(() => {
                loading.value = false;
              });
            if (formRef.value != undefined) {
              formRef.value.resetFields();
            }
          }
        });
      }
    };

    watch(props, () => {
      formData.value =
        props.appointment?.referral ?? ({} as IAppointmentReferral);
    });

    onMounted(() => {
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      doctorAddressBookList,
    };
  },
});
</script>
