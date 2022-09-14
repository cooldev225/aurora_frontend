<template>
  <CardSection>
    <div class="row">
      <div class="col-md-4">
        <el-select
          class="w-100 mb-6"
          placeholder="Select Document Type"
          v-model="documentType"
        >
          <el-option value="ALL" label="ALL DOCUMENT TYPE">
            <inline-svg
              class="me-5"
              src="media/icons/duotune/general/gen054.svg"
            />
            ALL DOCUMENT TYPES
          </el-option>
          <template v-for="type in patientDocumentTypes" :key="type.value">
            <el-option :value="type.value" :label="type.label">
              <inline-svg class="me-5" :src="type.icon" />
              {{ type.label }}
            </el-option>
          </template>
        </el-select>
        <div
          v-if="documentList?.length === 0"
          class="d-flex justify-content-center align-items-center fs-3"
        >
          No Documents Exist
        </div>
        <div class="d-flex flex-column h-450px scroll">
          <div v-for="item in documentList" :key="item.id">
            <input
              type="radio"
              class="btn-check"
              :name="item.created_at"
              :value="item"
              :id="item.id"
              v-model="selectedDocument"
            />
            <DocumentLabel :document="item" />
          </div>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="d-flex justify-content-between">
          <el-select
            class="filter-appointment"
            placeholder="Select Appointment"
            v-model="selectedAppointnment"
          >
            <el-option value="ALL" label="ALL APPOINTMENTS">
              ALL Appointments
            </el-option>
            <template
              v-for="appointment in selectedPatient.appointments"
              :key="appointment.id"
            >
              <el-option
                :value="appointment.id"
                :label="
                  appointment.aus_formatted_date +
                  ' ' +
                  appointment.formatted_appointment_time +
                  ' , ' +
                  appointment.specialist_name
                "
              >
                {{ appointment.aus_formatted_date }}
                {{ appointment.formatted_appointment_time }}
                , {{ appointment.appointment_type_name }} ,
                <span>{{ appointment.specialist_name }}</span>
              </el-option>
            </template>
          </el-select>
          <div>
            <template v-if="selectedDocument">
              <button
                :data-kt-indicator="printLoading ? 'on' : null"
                class="btn btn-sm btn-light btn-icon-primary me-2 mb-2"
                v-print="printObj"
                type="submit"
              >
                <span v-if="!printLoading" class="indicator-label">
                  <span class="svg-icon svg-icon-1">
                    <inline-svg src="media/icons/duotune/general/gen060.svg" />
                  </span>
                  Print
                </span>
                <span v-if="printLoading" class="indicator-progress pb-1">
                  <span
                    class="spinner-border spinner-border-sm svg-icon svg-icon-1"
                  ></span>
                  Processing
                </span>
              </button>
              <IconButton
                iconSRC="media/icons/duotune/communication/com011.svg"
                label="Email"
                @click="handleSendEmail"
              />
            </template>
          </div>
        </div>
        <div class="h-450px border my-4" id="documentField">
          <img v-if="false" :src="selectedDocument.file_path" alt="document" />
          <div class="fv-row pdf_viewer_wrapper">
            <div id="divPDFViewer" class="pdf_viewer"></div>
          </div>
        </div>
      </div>
    </div>
  </CardSection>
  <SendDocumentViaEmailModal
    v-if="selectedDocument"
    :document="selectedDocument"
  ></SendDocumentViaEmailModal>
</template>

<style lang="scss">
.pdf_viewer_wrapper {
  height: 100%;
  > .pdf_viewer {
    height: 100%;
    overflow: auto;
  }
}
.filter-appointment {
  width: calc(100% - 215px);
}
</style>

<script>
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import SendDocumentViaEmailModal from "./documents/SendDocumentViaEmailModal.vue";
import { Modal } from "bootstrap";
import pdf from "pdfobject";
import patientDocumentTypes from "@/core/data/patient-document-types";
import DocumentLabel from "@/views/patients/documents/DocumentLabel.vue";

export default defineComponent({
  name: "patient-documents",
  components: {
    IconButton,
    SendDocumentViaEmailModal,
    DocumentLabel,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const formData = ref({});
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const _documentList = computed(() => store.getters.getPatientDocumentList);
    const documentList = ref(null);
    const selectedDocument = ref(null);
    const documentType = ref("ALL");
    const selectedAppointnment = ref("ALL");
    const appointments = ref();
    const printLoading = ref(false);
    const printObj = ref({
      id: "documentField",
      extraCss:
        "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
      extraHead: '<meta http-equiv="Content-Language" content="en-us"/>',
      beforeOpenCallback() {
        printLoading.value = true;
      },
      openCallback() {
        printLoading.value = false;
      },
    });
    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.PATIENTS.VIEW, id);
      setCurrentPageBreadcrumbs("Documents", ["Patients"]);
    });

    watch(selectedPatient, () => {
      console.log(["selectedPatient=", selectedPatient]);
      store.dispatch(
        PatientActions.PATIENTS.DOCUMENTS.LIST,
        selectedPatient.value.id
      );
    });

    watch(_documentList, () => {
      documentList.value = _documentList.value.reverse();
    });

    watch([documentType, selectedAppointnment], () => {
      document.getElementById("divPDFViewer").innerHTML = "";
      let temp = _documentList.value;
      if (documentType.value !== "ALL") {
        temp = _documentList.value.filter(
          (item) => item.document_type === documentType.value
        );
      }
      console.log(["selected appointment = ", selectedAppointnment.value]);
      if (selectedAppointnment.value !== "ALL") {
        temp = temp?.filter(
          (item) => item.appointment_id === selectedAppointnment.value
        );
      }
      documentList.value = temp;
    });

    watch(selectedDocument, () => {
      store
        .dispatch(PatientActions.PATIENTS.DOCUMENTS.VIEW, {
          path: selectedDocument.value.file_path,
        })
        .then((data) => {
          if (selectedDocument.value.file_type === "PDF") {
            document.getElementById("divPDFViewer").innerHTML = "";
            let blob = new Blob([data], { type: "application/pdf" });
            let objectUrl = URL.createObjectURL(blob);
            pdf.embed(objectUrl, "#divPDFViewer");
          } else if (selectedDocument.value.file_type === "PNG") {
            document.getElementById("divPDFViewer").innerHTML =
              "<img src='" + data + "' />";
          }
        })
        .catch(() => {
          console.log("Document Load Error");
        });
    });

    const handleSendEmail = () => {
      const modal = new Modal(document.getElementById("modal_send_email"));
      modal.show();
    };

    return {
      formData,
      documentList,
      selectedDocument,
      documentType,
      printObj,
      printLoading,
      handleSendEmail,
      patientDocumentTypes,
      DocumentLabel,
      selectedPatient,
      selectedAppointnment,
    };
  },
});
</script>
