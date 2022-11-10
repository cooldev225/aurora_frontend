<template>
  <div
    class="modal fade"
    id="modal_referral"
    tabindex="-1"
    aria-hidden="true"
    ref="doctorAddressBookModalRef"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">Create Referral</h2>
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
        </div>
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <div class="modal-body py-2 px-lg-5">
            <div
              class="scroll-y me-n7 pe-7 w-100"
              id="kt_modal_referral_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_referral_header"
              data-kt-scroll-wrappers="#kt_modal_referral_scroll"
              data-kt-scroll-offset="300px"
            >
              <InputWrapper prop="toggle">
                <div class="d-flex">
                  <LargeIconButton
                    :class="
                      'col-6 me-2' +
                      (!formData.toggleLetterReferral ? ' active' : '')
                    "
                    heading="LETTER"
                    @click="toggleLetterRferralHandle(0)"
                  />
                  <LargeIconButton
                    :class="
                      'col-6' + (formData.toggleLetterReferral ? ' active' : '')
                    "
                    heading="REFERRAL"
                    @click="toggleLetterRferralHandle(1)"
                  />
                </div>
              </InputWrapper>
              <InputWrapper
                label="Appointment"
                prop="appointment"
                v-if="!formData.toggleLetterReferral"
              >
                <el-select
                  class="w-100"
                  v-model.number="formData.appointment_id"
                  @change="aptChangeHandle"
                >
                  <el-option
                    v-for="item in appointments"
                    :value="item.id"
                    :label="
                      item.aus_formatted_date +
                      ' ' +
                      item.formatted_appointment_time +
                      '@' +
                      item.clinic_details.name +
                      ' ' +
                      item.appointment_type.name +
                      ' ' +
                      item.specialist_name
                    "
                    :key="item.id"
                  />
                </el-select>
              </InputWrapper>
              <InputWrapper
                label="Doctor Address Book"
                prop="doctor_address_book"
              >
                <el-autocomplete
                  class="w-100"
                  v-model="formData.doctor_address_book_name"
                  value-key="full_name"
                  :fetch-suggestions="searchDoctorAddressBook"
                  placeholder="Enter Doctor Name"
                  :trigger-on-focus="true"
                  @select="handleSelect"
                >
                  <template #default="{ item }">
                    <div class="name">
                      {{ item.title }}
                      {{ item.first_name }} {{ item.last_name }}
                    </div>
                    <div class="address">{{ item.address }}</div>
                  </template>
                </el-autocomplete>
              </InputWrapper>
              <InputWrapper label="Include:" prop="include">
                <div class="d-flex">
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.patient_demographic"
                    :checked="false"
                  >
                    Patient Demographic
                  </el-checkbox>
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.current_medications"
                    :checked="false"
                  >
                    Current Medications
                  </el-checkbox>
                </div>
                <div class="d-flex">
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.patient_alergies"
                    :checked="false"
                  >
                    Patient Alergies
                  </el-checkbox>
                  <el-checkbox
                    size="large"
                    class="col-6"
                    v-model="formData.past_medical_history"
                    :checked="false"
                  >
                    Past Medical history
                  </el-checkbox>
                </div>
              </InputWrapper>
              <InputWrapper label="Message" prop="message">
                <ckeditor :editor="ClassicEditor" v-model="formData.message" />
              </InputWrapper>
              <InputWrapper label="Investigation" prop="investigation">
                <LargeIconButton
                  @click="handleInvest"
                  :subheading="'Patient'"
                  :iconPath="'media/icons/duotune/arrows/arr009.svg'"
                  :color="'primary'"
                />
              </InputWrapper>
            </div>
          </div>
          <div class="modal-footer flex-end">
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary m-6 justify-content-end"
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
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LargeIconButton from "@/components/presets/GeneralElements/LargeIconButton.vue";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";

export default defineComponent({
  name: "create-referral-modal",
  components: {
    ckeditor: CKEditor.component,
    LargeIconButton,
  },
  props: {
    patientId: { required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const doctorAddressBookModalRef = ref(null);
    const loading = ref(false);
    const patientId = computed(() => props.patientId);
    const doctorAddressBooks = computed(
      () => store.getters.getDoctorAddressBookList
    );
    const appointments = computed(() => store.getters.getAptList);

    const formData = ref({
      doctor_address_book_name: "",
      doctor_address_book_id: null,
      patient_id: patientId.value,
      patient_demographic: null,
      patient_alergies: null,
      current_medications: null,
      past_medical_history: null,
      message: "",
      appointment_id: null,
      toggleLetterReferral: 0,
    });

    const rules = ref({
      doctor_address_book_name: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      message: [
        {
          required: true,
          message: "This field cannot be blank",
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
          //loading.value = true;
          //save process
          //formRef.value.resetFields();
        }
      });
    };

    let timeout;
    const searchDoctorAddressBook = (term, cb) => {
      const results = term
        ? doctorAddressBooks.value.filter(createFilter(term))
        : doctorAddressBooks.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    };

    const createFilter = (term) => {
      const keyword = term.toString();
      return (doctorAddressBook) => {
        const full_name =
          doctorAddressBook.title +
          " " +
          doctorAddressBook.first_name +
          " " +
          doctorAddressBook.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = doctorAddressBook.address
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };

    const handleSelect = (item) => {
      formData.value.doctor_address_book_id = item.id;
    };

    const handleInvest = () => {
      //
    };

    const toggleLetterRferralHandle = (toggle) => {
      formData.value.toggleLetterReferral = toggle;
    };

    const aptChangeHandle = () => {
      let apt = appointments.value.filter(
        (a) => a.id == formData.value.appointment_id
      );
      if (apt.length) {
        formData.value.doctor_address_book_id =
          apt[0].referral.doctor_address_book.id;
        formData.value.doctor_address_book_name =
          apt[0].referral.doctor_address_book.full_name;
      }
    };

    onMounted(() => {
      store.dispatch(Actions.LETTER_TEMPLATE.LIST);
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
      store
        .dispatch(AppointmentActions.LIST, {
          //patient_id: patientId.value,
        })
        .then(() => {
          console.log(["appointments", appointments.value]);
        });
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      ClassicEditor,
      doctorAddressBooks,
      doctorAddressBookModalRef,
      submit,
      handleSelect,
      searchDoctorAddressBook,
      handleInvest,
      appointments,
      toggleLetterRferralHandle,
      aptChangeHandle,
    };
  },
});
</script>
