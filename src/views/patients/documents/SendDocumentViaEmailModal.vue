<template>
  <ModalWrapper
    title="Send Via Email"
    modalId="send_email"
    modalRef="letterModalRef"
  >
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
      <InputWrapper prop="email">
        <el-select
          class="w-100"
          placeholder="Enter emails"
          v-model="formData.to_user_ids"
          filterable
          multiple
        >
          <el-option
            v-for="doctorAddressBook in doctorAddressBooks"
            :value="doctorAddressBook.id"
            :label="
              doctorAddressBook.first_name +
              ' ' +
              doctorAddressBook.last_name +
              ' <' +
              doctorAddressBook.email +
              '>'
            "
            :key="doctorAddressBook.id"
          />
        </el-select>
      </InputWrapper>

      <button
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary"
        type="submit"
      >
        <span v-if="!loading" class="indicator-label"> Send </span>
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "create-letter-template-modal",
  components: {},
  props: {
    document: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const sendEmailModalRef = ref(null);
    const loading = ref(false);
    const letter_template = ref("");
    const documentId = computed(() => props.document.id);
    // const patientId = computed(() => props.patientId);
    const doctorAddressBooks = computed(
      () => store.getters.getDoctorAddressBookList
    );
    // const sendableUsers = computed(() => store.getters.getUserList);

    const formData = ref({
      document_id: documentId,
      to_user_ids: [],
    });

    const rules = ref({
      letter_template: [
        {
          required: true,
          message: "This field cannot be blank",
          trigger: "change",
        },
      ],
      doctor_address_book: [
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
            .dispatch(Actions.DOCUMENT.SEND_VIA_EMAIL, formData.value)
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Sent!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(sendEmailModalRef.value);
              });
            })
            .catch(() => {
              loading.value = false;
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    onMounted(() => {
      store.dispatch(Actions.USER_LIST);
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
    });

    return {
      formData,
      rules,
      formRef,
      loading,
      // sendableUsers,
      doctorAddressBooks,
      sendEmailModalRef,
      letter_template,
      submit,
    };
  },
});
</script>
