<template>
  <CardSection>
    <div class="row">
      <div class="col-md-4">
        <!-- DOCUMENT TYPE FILTER SELECT-->
        <el-select
          class="w-100 mb-6"
          placeholder="Select Document Type"
          v-model="documentTypeFilter"
        >
          <el-option value="ALL" label="ALL DOCUMENT TYPES">
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
        <!-- APPOINTMENT FILTER SELECT-->
        <el-select
          v-if="appointments"
          class="filter-appointment w-100 pb-6"
          placeholder="Select Appointment"
          v-model="appointmentFilter"
        >
          <el-option value="ALL" label="ALL APPOINTMENTS">
            ALL Appointments
          </el-option>
          <template v-for="appointment in appointments" :key="appointment.id">
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

        <div
          v-if="documentList?.length === 0"
          class="d-flex justify-content-center align-items-center fs-3"
        >
          No Documents Exist
        </div>
        <div class="d-flex flex-column h-450px scroll">
          <div v-for="document in filteredDocuments" :key="document.id">
            <input
              type="radio"
              class="btn-check"
              :name="document.created_at"
              :value="document"
              :id="document.id"
              v-model="selectedDocument"
            />
            <DocumentLabel :document="document" />
          </div>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="d-flex flex-row" v-if="selectedDocument">
          <!-- DOCUMENT INFO -->
          <div class="d-flex p-6 flex-column" v-if="showDocumentInformation">
            <InfoSection heading="Patient">
              {{ selectedDocument.document_info.patient }}
              <IconButton
                @click="showAssignPatientModal()"
                v-if="!selectedDocument.document_info.patient"
                label="Assign Patient"
              />
            </InfoSection>
            <InfoSection heading="Specialist"
              >{{ selectedDocument.document_info.specialist }}
              <IconButton
                v-if="!selectedDocument.document_info.specialist"
                label="Assign Specialist"
              />
            </InfoSection>
            <InfoSection heading="Appointment"
              >{{ selectedDocument.document_info.appointment }}
              <IconButton
                v-if="!selectedDocument.document_info.appointment"
                label="Assign Appointment"
            /></InfoSection>
          </div>
          <!-- DOCUMENT ACTIONS -->
          <div class="d-flex p-6 flex-column" v-if="showDocumentActions">
            <IconButton
              iconSRC="media/icons/duotune/files/fil005.svg"
              label="Print"
              @click="handlePrint"
            />
            <IconButton
              iconSRC="media/icons/duotune/communication/com011.svg"
              label="Email"
              @click="handleSendEmail"
            />
          </div>
          <!-- DOCUMENT VIEW DIV -->
        </div>
        <div class="h-450px" id="documentField">
          <div class="fv-row pdf_viewer_wrapper">
            <div id="document-view" class="pdf_viewer"></div>
          </div>
        </div>
      </div>
    </div>
  </CardSection>
  <SendDocumentViaEmailModal
    v-if="selectedDocument"
    :document="selectedDocument"
  ></SendDocumentViaEmailModal>
  <AssignPatientModal :document="selectedDocument"></AssignPatientModal>
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
import { defineComponent, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import pdf from "pdfobject";
import patientDocumentTypes from "@/core/data/patient-document-types";
import { DocumentActions } from "@/store/enums/StoreDocumentEnums";
import DocumentLabel from "@/views/patients/documents/DocumentLabel.vue";
import SendDocumentViaEmailModal from "@/views/patients/documents/SendDocumentViaEmailModal.vue";
import { Modal } from "bootstrap";
import AssignPatientModal from "@/views/specialist/modals/AssignPatientModal.vue";

const selectedDocument = ref(null);

export default defineComponent({
  name: "admin-main",

  components: { DocumentLabel, AssignPatientModal },
  props: {
    showDocumentInformation: { default: true },
    showDocumentActions: { default: true },
    appointments: { required: false },
  },
  setup() {
    const store = useStore();
    const documents = computed(() => store.getters.documentsList);
    const filteredDocuments = ref();
    const documentTypeFilter = ref("ALL");
    const appointmentFilter = ref("ALL");
    const tempFile = ref();

    // Filters the documents by appointment and document type.
    watch([documentTypeFilter, appointmentFilter, documents], () => {
      document.getElementById("document-view").innerHTML = "";

      let temp = documents.value;
      if (documentTypeFilter.value !== "ALL") {
        temp = documents.value.filter(
          (item) => item.document_type === documentTypeFilter.value
        );
      }

      if (appointmentFilter.value !== "ALL") {
        temp = temp?.filter(
          (item) => item.appointment_id === appointmentFilter.value
        );
      }
      filteredDocuments.value = temp;
    });

    // Loads the selected document from the server to the view window
    watch(selectedDocument, () => {
      if (selectedDocument.value.file_type === "HTML") {
        document.getElementById("document-view").innerHTML =
          selectedDocument.value.document_body;
      } else {
        store
          .dispatch(DocumentActions.SHOW, {
            path: selectedDocument.value.file_path,
          })
          .then((data) => {
            tempFile.value = data;
            if (selectedDocument.value.file_type === "PDF") {
              document.getElementById("document-view").innerHTML = "";
              let blob = new Blob([data], { type: "application/pdf" });
              let objectUrl = URL.createObjectURL(blob);
              pdf.embed(objectUrl + "#toolbar=0", "#document-view");
            } else if (selectedDocument.value.file_type === "PNG") {
              document.getElementById("document-view").innerHTML =
                "<img src='" + data + "' />";
            }
          })
          .catch(() => {
            console.log("Document Load Error");
          });
      }
    });

    const handleSendEmail = () => {
      const modal = new Modal(document.getElementById("modal_send_email"));
      modal.show();
    };

    const handlePrint = () => {
      if (selectedDocument.value.file_type === "PDF") {
        var blob = new Blob([tempFile.value], { type: "application/pdf" });
        var blobURL = URL.createObjectURL(blob);

        let iframe = document.createElement("iframe");
        document.body.appendChild(iframe);

        iframe.style.display = "none";
        iframe.src = blobURL;
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      }
    };

    const showAssignPatientModal = () => {
      const modal = new Modal(document.getElementById("modal_assign_patient"));
      modal.show();
    };

    return {
      patientDocumentTypes,
      DocumentLabel,
      filteredDocuments,
      documentTypeFilter,
      appointmentFilter,
      selectedDocument,
      handleSendEmail,
      SendDocumentViaEmailModal,
      handlePrint,
      showAssignPatientModal,
    };
  },
});
</script>
