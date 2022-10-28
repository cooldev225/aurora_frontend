<template>
  <ModalWrapper
    title="Create Letter"
    modalId="letter"
    modalRef="letterModalRef"
  >
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
      <div
        class="scroll-y me-n7 pe-7"
        id="kt_modal_letter_scroll"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies="#kt_modal_letter_header"
        data-kt-scroll-wrappers="#kt_modal_letter_scroll"
        data-kt-scroll-offset="300px"
      >
        <InputWrapper label="Letter Template" prop="letter_template">
          <el-select v-model="letter_template" fit-input-width class="w-100">
            <el-option
              v-for="item in letterTemplates"
              :key="item.id"
              :label="item.heading"
              :value="item.id"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper label="Referral Doctor" prop="referral_doctor">
          <el-autocomplete
            class="w-100"
            v-model="formData.referring_doctor_name"
            value-key="full_name"
            :fetch-suggestions="searchDoctorAddressBook"
            placeholder="Enter Doctor Name"
            :trigger-on-focus="false"
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

        <InputWrapper label="Title" prop="title">
          <el-input
            v-model="formData.title"
            type="text"
            placeholder="Enter title"
          />
        </InputWrapper>

        <InputWrapper label="Body" prop="body">
          <ckeditor :editor="ClassicEditor" v-model="formData.body" />
        </InputWrapper>
      </div>

      <button
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary m-6"
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
    </el-form>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "create-letter-template-modal",
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    patientId: { required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const letterModalRef = ref(null);
    const loading = ref(false);
    const letter_template = ref("");
    const patientId = computed(() => props.patientId);
    const doctorAddressBooks = computed(
      () => store.getters.getReferralDoctorList
    );
    const letterTemplates = computed(() => store.getters.getLetterTemplateList);

    const formData = ref({
      from: 1,
      to: 1,
      document_type: "LETTER",
      patient_id: patientId.value,
      referring_doctor_name: "",
      doctor_address_book_id: "",
      letter: "",
      title: "",
      body: "",
    });

    const rules = ref({
      letter_template: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      referral_doctor: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "blur",
        },
      ],
      title: [
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
          loading.value = true;
          store
            .dispatch(Actions.LETTER.CREATE, {
              ...formData.value,
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
                hideModal(letterModalRef.value);
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

    onMounted(() => {
      store.dispatch(Actions.LETTER_TEMPLATE.LIST);
      store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
    });

    watch(letter_template, () => {
      let selected = letterTemplates.value.filter(
        (item) => item.id === letter_template.value
      )[0];
      formData.value.title = selected.heading;
      formData.value.body = selected.body;
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      ClassicEditor,
      letterTemplates,
      letterModalRef,
      letter_template,
      submit,
      handleSelect,
      searchDoctorAddressBook,
    };
  },
});
</script>
