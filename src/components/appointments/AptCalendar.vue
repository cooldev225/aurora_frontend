<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Calendar-->
      <FullCalendar
        class="demo-app-calendar"
        :options="calendarOptions"
      ></FullCalendar>
      <!--end::Calendar-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default defineComponent({
  name: "appointments-calendar",
  components: {
    FullCalendar,
  },
  setup() {
    const handleDateClick = () => {
      return false;
    };

    const handleEventClick = () => {
      //
    };

    const calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      initialView: "timeGridWeek",
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,

      views: {
        timeGridWeek: { buttonText: "week" },
        timeGridDay: { buttonText: "day" },
      },

      editable: false,
      dayMaxEvents: false, // allow "more" link when too many events
      dateClick: handleDateClick,
      eventClick: handleEventClick,
    };

    return {
      calendarOptions,
      handleDateClick,
      handleEventClick,
    };
  },
});
</script>

<style lang="scss">
.fc .fc-button {
  padding: 0.75rem 1.25rem;
  box-shadow: none !important;
  border: 0 !important;
  border-radius: 0.475rem;
  vertical-align: middle;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
