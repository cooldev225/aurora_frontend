<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-3 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <span
              class="my-auto text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
            >
              {{ patientData.first_name }} {{ patientData.last_name }}
            </span>

            <!--begin::Actions-->
            <div class="my-4">
              <div class="d-flex">
                <IconButton
                  v-if="userRole != 'specialist'"
                  label="Print Label"
                />
                <IconButton
                  v-if="userRole != 'specialist'"
                  label="Upload Document"
                  @click="handleUploadDocument"
                />
                <IconButton
                  @click="handleRecallReminder"
                  label="Add Recall Reminder"
                />
                <!-- SPECIALIST ONLY ACTIONS-->

                <IconButton
                  v-if="userRole == 'specialist'"
                  iconSRC="media/icons/duotune/arrows/arr009.svg"
                  @click="handleReport"
                  label="Report"
                />
                <IconButton
                  v-if="userRole == 'specialist'"
                  iconSRC="media/icons/duotune/arrows/arr009.svg"
                  @click="handleReport"
                  label="Clinical Note"
                />
                <IconButton
                  v-if="userRole == 'specialist'"
                  iconSRC="media/icons/duotune/arrows/arr009.svg"
                  @click="handleLetter"
                  label="Letter"
                />
                <IconButton
                  v-if="userRole == 'specialist'"
                  iconSRC="media/icons/duotune/arrows/arr009.svg"
                  @click="handleAudio"
                  label="Audio"
                />
                <!--END SPECIALIST ONLY ACTIONS-->
              </div>
            </div>
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->
      <!--begin::Info-->
      <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
        <IconText iconSRC="media/icons/duotune/communication/com011.svg">
          {{ patientData.email }}
        </IconText>

        <IconText iconSRC="media/icons/duotune/general/gen018.svg">
          {{ patientData.address }}
        </IconText>

        <IconText iconSRC="media/icons/duotune/files/fil002.svg">
          {{ new Date(patientData.date_of_birth).toLocaleDateString("en-AU") }}
        </IconText>

        <IconText iconSRC="media/icons/duotune/electronics/elc002.svg">
          {{ patientData.contact_number }}
        </IconText>
      </div>
      <!--end::Info-->
      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/patients/view/documents"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Documents
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/appointments"
              active-class="active"
            >
              Appointments
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/billing"
              active-class="active"
            >
              Billing
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/clinical"
              active-class="active"
            >
              Clinical Information
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/administration"
              active-class="active"
            >
              Demographic
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <RecallReminderModal></RecallReminderModal>
  <ReportModal></ReportModal>
  <LetterModal :patientId="patientData.id"></LetterModal>
  <CreateAudioModal :patientId="patientData.id"></CreateAudioModal>
  <UploadDocumentModal :patientId="patientData.id"></UploadDocumentModal>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import { Actions } from "@/store/enums/StoreEnums";
import RecallReminderModal from "@/components/patients/modals/RecallReminderModal.vue";
import ReportModal from "@/components/patients/ReportTemplateModal.vue";
import LetterModal from "@/components/patients/LetterModal.vue";
import CreateAudioModal from "@/components/patients/CreateAudioModal.vue";
import UploadDocumentModal from "@/components/patients/modals/UploadDocumentModal.vue";
import IconText from "@/components/presets/GeneralElements/IconText.vue";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import store from "@/store";

export default defineComponent({
  name: "patients-view",
  components: {
    RecallReminderModal,
    ReportModal,
    LetterModal,
    CreateAudioModal,
    UploadDocumentModal,
    IconText,
    IconButton,
  },
  data: function () {
    return {
      userRole: computed(() => store.getters.userRole),
    };
  },

  setup() {
    const store = useStore();
    const patientData = ref({
      id: "",
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      date_of_birth: "",
      contact_number: "",
    });
    const handleRecallReminder = () => {
      const modal = new Modal(
        document.getElementById("modal_patient_recall_reminder")
      );
      modal.show();
    };

    const handleReport = () => {
      store.dispatch(Actions.REPORT_TEMPLATES.LIST);
      const modal = new Modal(document.getElementById("modal_report"));
      modal.show();
    };

    const handleLetter = () => {
      const modal = new Modal(document.getElementById("modal_letter"));
      modal.show();
    };

    const handleAudio = () => {
      const modal = new Modal(document.getElementById("modal_create_audio"));
      modal.show();
    };

    watchEffect(() => {
      patientData.value = store.getters.selectedPatient;
    });

    const handleUploadDocument = () => {
      const modal = new Modal(document.getElementById("modal_upload_document"));
      modal.show();
    };

    return {
      patientData,
      handleRecallReminder,
      handleReport,
      handleLetter,
      handleAudio,
      handleUploadDocument,
    };
  },
});
</script>
