<template>
  <SignatureAlert></SignatureAlert>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Calendar-->
      <template v-if="calendarOptions">
        <FullCalendar
          ref="refCalendar"
          class="demo-app-calendar"
          :key="calendarKey"
          :options="calendarOptions"
        >
          <template v-slot:eventContent="arg">
            <div
              v-if="arg.event.extendedProps.attendance_status == 'CHECKED_IN'"
            >
              <span class="badge badge-success"> CHECKED IN </span>
              <br />
            </div>
            {{ arg.event.title }}<br />
            {{ arg.event.extendedProps.start_time }} -
            {{ arg.event.extendedProps.end_time }}
          </template>
        </FullCalendar>
      </template>
      <!--end::Calendar-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <AppointmentDrawer />
</template>

<script>
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import AppointmentDrawer from "@/components/specialist/AppointmentDrawer.vue";
import SignatureAlert from "@/components/specialist/SignatureAlert.vue";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "employee-bookings-dashboard",
  components: {
    FullCalendar,
    AppointmentDrawer,
    SignatureAlert,
  },
  setup() {
    const store = useStore();
    const userAptList = computed(() => store.getters.getAptList);
    const refCalendar = ref(null);
    const isNoSignature = ref(false);
    const calendarKey = ref(0);
    const userProfile = computed(() => store.getters.userProfile);
    let appointments = [];
    const currentUser = computed(() => store.getters.currentUser);
    const handleEventClick = (e) => {
      const appointment_id = e.event.extendedProps.appointment_id;
      const aptSelected = userAptList.value.find(
        ({ id }) => id === appointment_id
      );

      if (aptSelected) {
        store.commit(AppointmentMutations.SET_APT.USER_APT.SELECT, aptSelected);
      }

      DrawerComponent?.getInstance("appointment-drawer")?.toggle();
      console.log();
    };

    const calendarOptions = ref(null);

    watch(userProfile, () => {
      let specialist_id =
        userProfile.value.role_id === 5 ? userProfile.value.id : null;
      let anesthetist_id =
        userProfile.value.role_id === 9 ? userProfile.value.id : null;

      store.dispatch(AppointmentActions.LIST, {
        specialist_id: specialist_id,
        anesthetist_id: anesthetist_id,
      });

      calendarOptions.value = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        },
        initialView: "timeGridWeek",
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: false,
        allDaySlot: false,
        slotMinTime: currentUser.value.organization.start_time,
        slotMaxTime: currentUser.value.organization.end_time,
        views: {
          timeGridWeek: { buttonText: "week" },
          timeGridDay: { buttonText: "day" },
        },

        editable: false,
        dayMaxEvents: false, // allow "more" link when too many events
        events: appointments,
        eventClick: handleEventClick,
      };
    });

    watch(userAptList, () => {
      appointments = [];
      for (let i = 0; i < userAptList.value.length; i++) {
        const appointment = userAptList.value[i];
        const title = appointment.patient_name.full;
        const start_date_time = appointment.date + "T" + appointment.start_time;
        const end_date_time = appointment.date + "T" + appointment.end_time;

        const start_time = moment(appointment.start_time, "h:mm A")
          .format("h:mm A")
          .toString();
        const end_time = moment(appointment.end_time, "h:mm A")
          .format("h:mm A")
          .toString();

        appointments.push({
          appointment_id: appointment.id,
          title: title,
          start: start_date_time,
          end: end_date_time,
          start_time: start_time,
          end_time: end_time,
          className: "fc-event-success",
          attendance_status: appointment.attendance_status,
        });
      }

      refCalendar.value.$props.options.events = appointments;
      calendarKey.value++;
    });

    watch(currentUser, () => {
      if (!currentUser.value) {
        store.dispatch(Actions.VERIFY_AUTH, {
          api_token: JwtService.getToken(),
        });
      } else {
        const role_id = currentUser.value.profile.role_id;
        const signature = currentUser.value.profile.signature;
        if (role_id === 5 && !signature) isNoSignature.value = true;
        else isNoSignature.value = false;
      }
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("My Bookings", ["Booking Dashboard"]);
    });

    return {
      calendarOptions,
      handleEventClick,
      refCalendar,
      calendarKey,
      isNoSignature,
    };
  },
});
</script>

<style lang="scss">
.fc-timegrid-slot {
  height: 70px !important;
}

.fc-timegrid-event {
  cursor: pointer;
}
</style>
