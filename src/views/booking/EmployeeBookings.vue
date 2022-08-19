<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Calendar-->
      <FullCalendar
        ref="refCalendar"
        class="demo-app-calendar"
        :key="calendarKey"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          {{ arg.event.title }}
        </template>
      </FullCalendar>
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
import { Actions } from "@/store/enums/StoreEnums";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { TODAY } from "@/core/data/events";

export default defineComponent({
  name: "employee-bookings-dashboard",
  components: {
    FullCalendar,
  },
  setup() {
    const store = useStore();
    const userAptList = computed(() => store.getters.getUserAptList);
    const refCalendar = ref(null);
    const calendarKey = ref(0);

    let appointments = [];

    const handleDateClick = () => {
      return false;
    };

    const handleEventClick = () => {
      // console.log(event);
      console.log(this);
    };

    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      initialView: "timeGridWeek",
      initialDate: TODAY,
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,

      views: {
        timeGridWeek: { buttonText: "week" },
        timeGridDay: { buttonText: "day" },
      },

      editable: false,
      dayMaxEvents: false, // allow "more" link when too many events
      events: appointments,
      dateClick: handleDateClick,
      eventClick: handleEventClick,
    };

    watch(userAptList, () => {
      appointments = [];
      for (let i = 0; i < userAptList.value.length; i++) {
        const appointment = userAptList.value[i];
        const title = appointment.patient_name.full;
        const start_time = appointment.date + "T" + appointment.start_time;
        const end_time = appointment.date + "T" + appointment.end_time;

        appointments.push({
          title: title,
          start: start_time,
          end: end_time,
          className: "fc-event-success",
        });
      }

      refCalendar.value.$props.options.events = appointments;
      calendarKey.value++;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("My Bookings", ["Booking Dashboard"]);
      store.dispatch(Actions.APT.USER_APT.LIST);
    });

    return {
      calendarOptions,
      handleDateClick,
      handleEventClick,
      refCalendar,
      calendarKey,
    };
  },
});
</script>
