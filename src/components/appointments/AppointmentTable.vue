<template>
  <CardSection class="mt-2">
    <template v-if="calendarOptions">
      <FullCalendar
        ref="appointmentCalendarRef"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="event">
          <AppointmentTableData
            :appointment="event.event.extendedProps.appointment"
          />
        </template>
      </FullCalendar>
    </template>
  </CardSection>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  watch,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import AppointmentTableData from "./partials/AppointmentTableData.vue";

export default defineComponent({
  components: {
    FullCalendar,
    AppointmentTableData,
  },
  props: {
    visibleDate: { type: String, required: true },
    visibleSpecialists: { type: Object, required: true },
    filteredClinics: { type: Array, required: true },
  },
  setup(props) {
    const store = useStore();

    const currentUser = computed(() => store.getters.currentUser);
    const calendarOptions = ref(null);
    const appointmentCalendarRef = ref(null); //this.$refs.refAppointmentCalendar.getApi();
    const appointmentsRaw = computed(() => store.getters.getAptList);
    const appointments = ref([]);
    watch(props, () => {
      let date = props.visibleDate.date;
      let specialists = props.visibleSpecialists;

      //Change Calender View to correct date
      let calendarApi = appointmentCalendarRef.value.getApi();
      calendarApi.gotoDate = date;
      store.dispatch(AppointmentActions.LIST, { date: date });
    });

    onMounted(() => {
      store.dispatch(AppointmentActions.LIST, { date: props.visibleDate.date });
    });

    watch(appointmentsRaw, () => {
      appointments.value = [];
      appointmentsRaw.value.forEach((appointment) => {
        appointments.value.push({
          id: appointment.id,
          resourceId: appointment.specialist_id,
          start: appointment.date + "T" + appointment.start_time,
          end: appointment.date + "T" + appointment.end_time,
          appointment: appointment,
        });
      });
    });
    watch(currentUser, () => {
      calendarOptions.value = {
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          resourceTimeGridPlugin,
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        },
        nowIndicator: true,
        slotEventOverlap: false,
        initialView: "resourceTimeGridDay",
        resources: props.visibleSpecialists,
        navLinks: false, // can click day/week names to navigate views
        selectable: true,
        selectMirror: false,
        allDaySlot: false,
        slotMinTime: currentUser.value.organization.start_time,
        slotMaxTime: currentUser.value.organization.end_time,
        views: {
          timeGridDay: { buttonText: "day" },
        },

        editable: false,
        dayMaxEvents: false,
        events: appointments,
        eventClick: handleShowAppointmentDrawer,
      };
    });

    watchEffect(() => {
      if (
        DrawerComponent?.getInstance(
          "appointment-drawer"
        )?.isBookingDrawerShown() === true
      ) {
        DrawerComponent?.getInstance("appointment-drawer")?.show();
      }
    });

    const handleShowAppointmentDrawer = (item) => {
      console.log("SHOW APT DRAWER");
      //store.commit(AppointmentMutations.SET_APT.SELECT, item);
      //DrawerComponent?.getInstance("appointment-drawer")?.toggle();
    };

    //Check specialist clinic is selected one in filter or not
    const filterClinics = (id) => {
      return props.filteredClinics.includes(id, 0);
    };
    return {
      handleShowAppointmentDrawer,
      filterClinics,
      calendarOptions,
      appointments,
      appointmentCalendarRef,
      AppointmentTableData,
    };
  },
});
</script>

<style lang="scss">
@import "../../assets/sass/components/booking/appointmentTable.scss";
</style>
