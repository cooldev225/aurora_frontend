<template>
  <AppointmentList
    :params="{
      confirmation_status: 'PENDING',
    }"
    actionConfirmTitle="CONFIRM"
    :actionConfirm="handleConfirmAppointment"
    actionCancelTitle="CANCEL"
    :actionCancel="handleCancelAppointment"
  >
  </AppointmentList>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AppointmentList from "@/views/appointments/AppointmentList.vue";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";

export default defineComponent({
  name: "admin-main",
  components: { AppointmentList },
  setup() {
    const store = useStore();
    onMounted(() => {
      setCurrentPageBreadcrumbs("Unconfirmed Appointments", ["Booking"]);
    });

    const handleConfirmAppointment = async (appointmentId) => {
      console.log(appointmentId);
      await store
        .dispatch(AppointmentActions.CONFIRMATION_STATUS.UPDATE, {
          id: appointmentId,
          confirmed: true,
        })
        .then(() => {
          // store.dispatch(
          //   AppointmentActions.BOOKING.SEARCH.SPECIALISTS,
          //   searchVal.value
          // );
          // DrawerComponent?.getInstance("appointment-drawer")?.hide();
        });
    };

    const handleCancelAppointment = (appointmentId) => {
      console.log(appointmentId);
    };

    return {
      AppointmentList,
      handleConfirmAppointment,
      handleCancelAppointment,
    };
  },
});
</script>
