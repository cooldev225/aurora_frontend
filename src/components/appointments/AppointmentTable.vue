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
  <MoveModal :isDisableAptTypeList="true" />
</template>

<script>
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
import { Modal } from "bootstrap";
import MoveModal from "@/components/appointments/AppointmentMoveModal.vue";
export default defineComponent({
  components: {
    FullCalendar,
    AppointmentTableData,
    MoveModal,
  },
  props: {
    visibleDate: { type: String, required: true },
    visibleSpecialists: { type: Object, required: true },
    organization: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();

    const calendarOptions = ref(null);
    const appointmentCalendarRef = ref(null); //this.$refs.refAppointmentCalendar.getApi();
    const appointmentsRaw = computed(() => store.getters.getAptList);
    const appointments = ref([]);
    const allSpecialists = computed(() => store.getters.getSpecialistList);

    watch(props, () => {
      let date = moment(props.visibleDate.date).format("YYYY-MM-DD");
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
        height: 500,
        slotMinTime: props.organization.start_time,
        slotMaxTime: props.organization.end_time,
        slotDuration: "00:30:00",
        views: {
          timeGridDay: { buttonText: "day" },
        },
        editable: false,
        dayMaxEvents: false,
        events: appointments,
        selectConstraint: "businessHours",
        eventClick: handleShowAppointmentDrawer,
        select: handleCreateAppointment,
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
      info.jsEvent.preventDefault();
      const date = moment(info.date).format("YYYY-MM-DD").toString();
      const time = moment(info.date).format("HH:MM").toString();
      const weekDay = moment(info.date).format("ddd").toUpperCase();
      // filter correct specialist base on info
      const specialists = allSpecialists.value.filter((specialist) => {
        if (specialist.id == info.resource.id) return specialist;
      });
      let restriction = null;
      specialists[0].schedule_timeslots.filter((slot) => {
        //make this more accurate filter this by clinic ID as well
        if (slot.week_day == weekDay) {
          restriction = slot.restriction;
          return slot;
        }
      });
      const item = {
        time_slot: [date + "T" + time],
        date: date,
        selected_specialist: specialists[0],
        restriction: restriction,
      };
      store.commit(AppointmentMutations.SET_BOOKING.SELECT, item);
      store.commit(
        AppointmentMutations.SET_APT.SELECT_SPECIALIST,
        specialists[0]
      );
      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();
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
