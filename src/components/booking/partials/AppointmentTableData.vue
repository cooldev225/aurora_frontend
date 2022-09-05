<template>
  <td
    class="py-2 px-4 cursor-pointer"
    :style="{
      'background-color':
        appointment.confirmation_status == 'MISSED' ||
        appointment.attendance_status == 'CHECKED_OUT'
          ? '#cccccc'
          : appointment.appointment_type.color,
    }"
    :rowSpan="appointment.appointment_type.appointment_length_as_number"
  >
    <div
      class="fw-bold d-flex flex-column justify-content-center align-items-center"
    >
      <span class="">
        {{ appointment.patient.first_name }}
        {{ appointment.patient.last_name }} <br />
        ({{ appointment.patient.contact_number }})
      </span>
      <span>
        <span
          v-if="appointment.patient.allergies"
          class="badge badge-light-danger opacity-50 mx-2"
        >
          ALLERGY
        </span>
        <span
          v-if="appointment.confirmation_status == 'MISSED'"
          class="badge badge-warning opacity-50 mx-2"
        >
          MISSED
        </span>
        <span
          v-if="appointment.attendance_status == 'CHECKED_IN'"
          class="badge badge-success"
        >
          CHECKED IN
        </span>
        <span
          v-if="appointment.attendance_status == 'CHECKED_OUT'"
          class="opacity-50 badge badge-light-dark disabled"
        >
          CHECKED OUT
        </span>
      </span>
    </div>
  </td>
</template>
<script lang="ts">
export default {
  props: {
    appointment: { required: true, type: Object },
  },
};
</script>
