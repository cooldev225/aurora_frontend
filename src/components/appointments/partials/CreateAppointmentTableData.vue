<template>
  <td class="bg-white text-center p-2">
    <a
      v-if="specialistAvailable()"
      class="cursor-pointer"
      @click="handleCreateAppointment('info')"
    >
      <i :class="'fa fa-plus ' + setColor()"></i>
    </a>
  </td>
</template>
<script lang="ts">
import { Modal } from "bootstrap";
import { useStore } from "vuex";
import moment from "moment";
import { Mutations } from "@/store/enums/StoreEnums";
import { AppointmentMutations } from "@/store/enums/StoreAppointmentEnums";
export default {
  props: {
    date: { required: true },
    startTime: { required: true },
    specialist: { required: true },
  },
  setup(props) {
    const store = useStore();

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const setColor = () => {
      let restriction = props.specialist.schedule_timeslots[0].restriction;
      if (restriction == "PROCEDURE") return "text-danger";
      if (restriction == "CONSULTATION") return "text-primary";
      if (restriction == "NONE") return "text-success";
    };

    const handleCreateAppointment = () => {
      const date = moment(props.date.value).format("YYYY-MM-DD").toString();

      const item = {
        time_slot: [date + "T" + props.startTime],
        date: date,
        selected_specialist: props.specialist,
        restriction: props.specialist.schedule_timeslots[0].restriction,
      };

      store.commit(AppointmentMutations.SET_BOOKING.SELECT, item);
      store.commit(
        AppointmentMutations.SET_APT.SELECT_SPECIALIST,
        props.specialist
      );

      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();
    };

    const specialistAvailable = () => {
      if (!props.specialist.schedule_timeslots) return false;
      let startTime = timeStr2Number(
        props.specialist.schedule_timeslots[0].start_time
      );
      let endTime = timeStr2Number(
        props.specialist.schedule_timeslots[0].end_time
      );
      let appointmentTime = timeStr2Number(props.startTime);
      if (startTime <= appointmentTime && appointmentTime < endTime) {
        return true;
      }

      return true;
    };

    return {
      handleCreateAppointment,
      specialistAvailable,
      setColor,
    };
  },
};
</script>
