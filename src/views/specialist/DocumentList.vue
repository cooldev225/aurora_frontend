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
        <div
          v-if="allowAppointmentFilter"
          class="d-flex mb-6 justify-content-between"
        >
          <el-select
            class="filter-appointment"
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
        </div>
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
        <div class="h-450px" id="documentField">
          <div
            class="d-flex p-6 flex-column"
            v-if="showDocumentInformation && selectedDocument"
          >
            <InfoSection heading="Patient">{{
              selectedDocument.document_info.patient
            }}</InfoSection>
            <InfoSection heading="Specialist">{{
              selectedDocument.document_info.specialist
            }}</InfoSection>
            <InfoSection heading="Appointment">{{
              selectedDocument.document_info.appointment
            }}</InfoSection>
          </div>
          <div class="fv-row pdf_viewer_wrapper">
            <div id="divPDFViewer" class="pdf_viewer"></div>
          </div>
        </div>
      </div>
    </div>
  </CardSection>
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
const selectedDocument = ref(null);

export default defineComponent({
  name: "admin-main",

  components: { DocumentLabel },
  props: {
    showDocumentInformation: { default: true },
    allowAppointmentFilter: { default: false },
    appointments: { required: false },
  },
  setup() {
    const store = useStore();
    const documents = computed(() => store.getters.documentsList);
    const filteredDocuments = ref();
    const documentTypeFilter = ref("ALL");
    const appointmentFilter = ref("ALL");

    // Filters the documents by appointment and document type.
    watch([documentTypeFilter, appointmentFilter, documents], () => {
      document.getElementById("divPDFViewer").innerHTML = "";

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
      store
        .dispatch(DocumentActions.SHOW, {
          path: selectedDocument.value.file_path,
        })
        .then((data) => {
          if (selectedDocument.value.file_type === "PDF") {
            document.getElementById("divPDFViewer").innerHTML = "";
            let blob = new Blob([data], { type: "application/pdf" });
            let objectUrl = URL.createObjectURL(blob);
            pdf.embed(objectUrl + "#toolbar=0", "#divPDFViewer");
          } else if (selectedDocument.value.file_type === "PNG") {
            document.getElementById("divPDFViewer").innerHTML =
              "<img src='" + data + "' />";
          }
        })
        .catch(() => {
          console.log("Document Load Error");
        });
    });

    return {
      patientDocumentTypes,
      DocumentLabel,
      filteredDocuments,
      documentTypeFilter,
      appointmentFilter,
      selectedDocument,
    };
  },
});
</script>
