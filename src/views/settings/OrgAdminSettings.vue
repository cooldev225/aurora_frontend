<template>
  <div class="d-flex flex-sm-row gap-3">
    <div class="card col-sm-6 shadow-sm">
      <div class="card-header">
        <h3 class="card-title">Appointment Settings</h3>
      </div>
      <router-link to="/settings/apt-types" class="btn btn-light-primary m-2">
        Appointment Types
      </router-link>
      <router-link
        to="/settings/time-requirements"
        class="btn btn-light-primary m-2"
      >
        Appointment Time Requirements
      </router-link>
      <router-link
        to="/settings/notification-templates"
        class="btn btn-light-primary m-2"
      >
        Notification Settings
      </router-link>
      <router-link
        to="/settings/report-templates"
        class="btn btn-light-primary m-2"
      >
        Patient Report Templates
      </router-link>
    </div>

    <div class="card col-sm-6 shadow-sm">
      <div class="card-header">
        <h3 class="card-title">Pre-Admission Settings</h3>
      </div>
      <router-link
        to="/settings/anesthetic-questions"
        class="btn btn-light-primary m-2"
      >
        Booking Anesthetic Questions
      </router-link>
      <router-link
        to="/settings/pre-admission-questions"
        class="btn btn-light-primary m-2"
      >
        Pre-Admission Questions
      </router-link>
      <router-link
        to="/settings/pre-admission-consent"
        class="btn btn-light-primary m-2"
      >
        Pre-admission Consent
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "org-admin-settings",

  components: {},

  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("All Settings", ["Settings"]);
    });
  },
});
</script>
