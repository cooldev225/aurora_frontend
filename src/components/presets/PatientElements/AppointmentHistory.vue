<template>
  <div class="row">
    <div class="col">
      <span class="fw-bold mb-2">Upcoming Appointments</span>
      <br />
      <span v-for="appointment in futureAppointments" :key="appointment.id">
        {{ appointment.date }}
        {{ appointment.start_time }}
        {{ appointment.specialist_name }}<br />
        {{ appointment.appointment_type.name }}<br />
      </span>
    </div>
    <div class="col">
      <span class="fw-bold mb-2">Previous Appointments</span>
      <br />
      <span v-for="appointment in pastAppointments" :key="appointment.id">
        {{ appointment.date }}
        {{ appointment.start_time }}
        {{ appointment.specialist_name }}<br />
        {{ appointment.appointment_type.name }}<br />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    pastAppointments: { type: Object, required: true },
    futureAppointments: { type: Object, required: true },
  },
};
</script>
