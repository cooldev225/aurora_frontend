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

            <div class="d-flex gap-2 flex-row">
              <template v-for="alert in patientData.alerts" :key="alert.id">
                <template v-if="!alert.is_dismissed">
                  <PatientAlert :alert="alert" />
                  <ViewPatientAlertModal :alert="alert" />
                </template>
              </template>
            </div>

            <!--begin::Actions-->
            <div class="my-4">
              <div class="d-flex gap-3">
                <UploadDocumentButton :patient="patientData" />
                <AddAlertButton :patient="patientData" />
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
              :to="'/patients/' + patientData.id + '/documents'"
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
              :to="'/patients/' + patientData.id + '/appointments'"
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
              :to="'/patients/' + patientData.id + '/claim-sources'"
              active-class="active"
              v-if="userRole != 'specialist'"
            >
              Claim Sources
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              :to="'/patients/' + patientData.id + '/clinical'"
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
              :to="'/patients/' + patientData.id + '/administration'"
              active-class="active"
            >
              Demographic
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              :to="'/patients/' + patientData.id + '/recalls'"
              active-class="active"
            >
              Recalls
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from "vue";
import ViewPatientAlertModal from "@/views/patients/modals/ViewPatientAlertModal.vue";
import AddAlertButton from "@/components/patients//patientActions/AddAlertButton.vue";
import UploadDocumentButton from "@/components/patients//patientActions/UploadDocumentButton.vue";
import IconText from "@/components/presets/GeneralElements/IconText.vue";
import store from "@/store";
import PatientAlert from "@/components/presets/PatientElements/PatientAlert.vue";

export default defineComponent({
  name: "patients-view",
  components: {
    IconText,
    PatientAlert,
    ViewPatientAlertModal,
    AddAlertButton,
    UploadDocumentButton,
  },
  data: function () {
    return {
      userRole: computed(() => store.getters.userRole),
    };
  },

  setup() {
    const patientData = ref({
      id: "",
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      date_of_birth: "",
      contact_number: "",
      alerts: [],
    });

    watchEffect(() => {
      patientData.value = store.getters.selectedPatient;
    });

    return {
      patientData,
      PatientAlert,

      ViewPatientAlertModal,
    };
  },
});
</script>
