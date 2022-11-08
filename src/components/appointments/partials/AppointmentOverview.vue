<template>
  <div
    class="p-4 mb-4 card border border-dashed border-primary d-flex flex-column gap-2"
  >
    <InfoSection heading="Appointment Type">{{ appointmentName }}</InfoSection>

    <InfoSection heading="Specialist">{{ specialist.full_name }}</InfoSection>
    <InfoSection heading="Anesthetist" v-if="anesthetistName"
      >{{ anesthetistName }}
    </InfoSection>

    <InfoSection heading="Clinic">{{ aptInfoData.clinic_name }}</InfoSection>

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
import { defineProps, ref, watch } from "vue";

const anesthetistName = ref(null);
const props = defineProps({
  appointmentName: {
    required: true,
    type: String,
  },
  specialist: {
    required: true,
    type: Object,
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
const getAnesthetistName = () => {
  anesthetistName.value = null;
  if (props.specialist.hrm_weekly_schedule) {
    props.specialist.hrm_weekly_schedule.map((slot) => {
      if (
        slot.anesthetist_id &&
        slot.clinic_id === props.aptInfoData.clinic_id &&
        props.startTime >= slot.start_time &&
        props.aptInfoData.time_slot[1] < slot.end_time
      ) {
        anesthetistName.value = slot.anesthetist.full_name;
      }
    });
  }
};
watch(
  () => props.appointmentName,
  () => {
    getAnesthetistName();
  }
);
watch(
  () => props.specialist,
  () => {
    getAnesthetistName();
  }
);
</script>
