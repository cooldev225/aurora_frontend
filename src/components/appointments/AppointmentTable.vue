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
import moment from "moment";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
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
    organization: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();

    const calendarOptions = ref(null);
    const appointmentCalendarRef = ref(null); //this.$refs.refAppointmentCalendar.getApi();
    const appointmentsRaw = computed(() => store.getters.getAptList);
    const appointments = ref([]);

    watch(props, () => {
      let date = moment(props.visibleDate.date).format("YYYY-MM-DD");
      let specialists = props.visibleSpecialists;
      store.dispatch(AppointmentActions.LIST, { date: date });
    });

    onMounted(() => {
      store.dispatch(AppointmentActions.LIST, { date: props.visibleDate.date });
    });
    watch(appointments, () => {
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
          right: "",
        },
        resources: props.visibleSpecialists,
        nowIndicator: true,
        slotEventOverlap: false,
        initialView: "resourceTimeGridDay",
        navLinks: false, // can click day/week names to navigate views
        selectable: true,
        selectMirror: false,
        allDaySlot: false,
        slotMinTime: props.organization.start_time,
        slotMaxTime: props.organization.end_time,
        slotDuration: "00:15:00",
        views: {
          timeGridDay: { buttonText: "day" },
        },
        editable: false,
        dayMaxEvents: false,
        events: appointments,
        eventClick: handleShowAppointmentDrawer,
        dateClick: handleCreateAppointment,
      };

      if (appointmentCalendarRef.value) {
        appointmentCalendarRef.value
          .getApi()
          .gotoDate(moment(props.visibleDate.date).format("YYYY-MM-DD"));
      }
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

    watchEffect(() => {
      if (
        DrawerComponent?.getInstance(
          "appointment-drawer"
        )?.isBookingDrawerShown() === true
      ) {
        DrawerComponent?.getInstance("appointment-drawer")?.show();
      }
    });

    const handleShowAppointmentDrawer = (info) => {
      info.jsEvent.preventDefault();
      let appointment = info.event.extendedProps.appointment;
      store.commit(AppointmentMutations.SET_APT.SELECT, appointment);
      DrawerComponent?.getInstance("appointment-drawer")?.toggle();
    };

    const handleCreateAppointment = (info) => {
      console.log(info);
      /*
      let timeSlot = getTimeSlot();
      const date = moment(_apt_date.value).format("YYYY-MM-DD").toString();
      const item = {
        time_slot: [date + "T" + props.startTime],
        date: date,
        selected_specialist: props.specialist,
        restriction: timeSlot.restriction,
      };
      store.commit(AppointmentMutations.SET_BOOKING.SELECT, item);
      store.commit(
        AppointmentMutations.SET_APT.SELECT_SPECIALIST,
        props.specialist
      );

      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();*/
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
