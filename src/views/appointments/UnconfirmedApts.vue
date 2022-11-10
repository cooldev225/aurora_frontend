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
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "admin-main",
  components: { AppointmentList },
  setup() {
    const store = useStore();
    onMounted(() => {
      setCurrentPageBreadcrumbs("Unconfirmed Appointments", ["Booking"]);
    });

    const handleConfirmAppointment = async (appointmentId) => {
      const html =
        "<h3>Are you sure you would like to confirm this appointment?</h3><br/>";
      Swal.fire({
        html: html,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async (data) => {
          await store
            .dispatch(AppointmentActions.CONFIRMATION_STATUS.UPDATE, {
              id: appointmentId,
              confirmed: true,
            })
            .then(() => {
              store.dispatch(AppointmentActions.LIST, {
                confirmation_status: "PENDING",
              });
            });
        },
      });
    };

    const handleCancelAppointment = (appointmentId) => {
      const html =
        "<h3>Are you sure you want to cancel?</h3><br/>" +
        '<h4><input type="checkbox" id="chkMissed"> ' +
        '<label for="chkMissed">Mark as Missed</label></h4>';
      Swal.fire({
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          placeholder: "Enter the Reason",
        },
        html: html,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async (data) => {
          var missed = Swal.getPopup().querySelector("#chkMissed").checked;

          await store
            .dispatch(AppointmentActions.CONFIRMATION_STATUS.UPDATE, {
              id: appointmentId,
              missed: missed,
              reason: data,
            })
            .then(() => {
              store.dispatch(AppointmentActions.LIST, {
                confirmation_status: "PENDING",
              });
            });
        },
      });
    };

    return {
      AppointmentList,
      handleConfirmAppointment,
      handleCancelAppointment,
    };
  },
});
</script>
