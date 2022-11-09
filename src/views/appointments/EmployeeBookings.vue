<template>
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
          <template v-slot:eventContent="event">
            <AppointmentTableData
              :appointment="event.event.extendedProps.appointment"
            />
          </template>
        </FullCalendar>
      </template>
      <!--end::Calendar-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
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

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

import AppointmentTableData from "@/components/appointments/partials/AppointmentTableData.vue";
export default defineComponent({
  name: "employee-bookings-dashboard",
  components: {
    FullCalendar,
    AppointmentTableData,
  },
  setup() {
    const store = useStore();
    const userAptList = computed(() => store.getters.getAptList);
    const refCalendar = ref(null);
    const calendarKey = ref(0);
    const userProfile = computed(() => store.getters.userProfile);
    let appointments = [];
    const currentUser = computed(() => store.getters.currentUser);

    const handleEventClick = (info) => {
      info.jsEvent.preventDefault();
      let appointment = info.event.extendedProps.appointment;
      store.commit(AppointmentMutations.SET_APT.SELECT, appointment);
      DrawerComponent?.getInstance("appointment-drawer")?.toggle();
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

    onMounted(() => {
      setCurrentPageBreadcrumbs("My Bookings", ["Booking Dashboard"]);
    });

    return {
      calendarOptions,
      handleEventClick,
      refCalendar,
      calendarKey,
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
