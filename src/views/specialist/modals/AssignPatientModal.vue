<template>
  <ModalWrapper
    title="Upload Document"
    modalId="upload_document"
    :modalRef="uploadDocumentRef"
  >
  </ModalWrapper>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import patientDocumentTypes from "@/core/data/patient-document-types";
import moment from "moment";

export default defineComponent({
  name: "assign-patient-modal",
  props: {},
  setup(props) {
    const store = useStore();
    const formRef = ref(null);

    const formData = ref({});

    const rules = ref({
      // document_name: [
      //   {
      //     required: true,
      //     message: "Document name cannot be blank",
      //     trigger: "change",
      //   },
      // ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
    };

    return {};
  },
});
</script>
