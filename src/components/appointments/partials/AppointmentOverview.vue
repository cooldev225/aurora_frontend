<template>
  <div
    class="p-4 mb-4 card border border-dashed border-primary d-flex flex-column gap-2"
  >
    <InfoSection heading="Appointment Type">{{ appointmentName }} </InfoSection>

    <InfoSection heading="Specialist">{{ specialistName }} </InfoSection>

    <InfoSection heading="Clinic">{{ aptInfoData.clinic_name }} </InfoSection>

    <InfoSection heading="Time">
      {{ startTime }}
      - {{ aptInfoData.time_slot[1] }}
      <span v-if="aptInfoData.arrival_time" class="text-black fs-5">
        (Arrive: {{ aptInfoData.arrival_time }})</span
      ></InfoSection
    >
    <InfoSection heading="Date">
      {{ aptInfoData.date }}
    </InfoSection>

    <InfoSection heading="Patient"
      >{{ patientInfoData.first_name }}
      {{ patientInfoData.last_name }}
    </InfoSection>
  </div>
</template>
<script setup>
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import { defineProps } from "vue";
defineProps({
  appointmentName: {
    required: true,
    type: String,
  },
  specialistName: {
    required: true,
    type: String,
  },
  startTime: {
    required: true,
    type: String,
  },
  aptInfoData: {
    required: true,
    type: Object,
  },
  patientInfoData: {
    required: true,
    type: Object,
  },
});
</script>
