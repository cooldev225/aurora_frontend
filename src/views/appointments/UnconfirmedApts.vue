<template>
  <AppointmentList
    :params="{
      confirmation_status: 'PENDING',
    }"
    actionTitle="CONFIRM"
    :action="handleConfirmAppointment"
  >
  </AppointmentList>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AppointmentList from "@/views/appointments/AppointmentList.vue";
export default defineComponent({
  name: "admin-main",
  components: { AppointmentList },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Unconfirmed Appointments", ["Booking"]);
    });

    const handleConfirmAppointment = (appointmentId) => {
      console.log(appointmentId);
    };

    return {
      AppointmentList,
      handleConfirmAppointment,
    };
  },
});
</script>
