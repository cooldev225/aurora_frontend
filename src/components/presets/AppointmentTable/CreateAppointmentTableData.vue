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
      let restriction =
        props.specialist.hrm_user_base_schedules[0]
          .appointment_type_restriction;
      if (restriction == "PROCEDURES") return "text-danger";
      if (restriction == "CONSULTATION") return "text-primary";
      if (restriction == "NONE") return "text-success";
    };

    const handleCreateAppointment = () => {
      const date = moment(props.date.value).format("YYYY-MM-DD").toString();

      const item = {
        time_slot: [date + "T" + props.startTime],
        date: date,
        selected_specialist: props.specialist,
      };

      store.commit(Mutations.SET_BOOKING.SELECT, item);
      store.commit(Mutations.SET_APT.SELECT_SPECIALIST, props.specialist);

      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();
    };

    const specialistAvailable = () => {
      let startTime = timeStr2Number(
        props.specialist.hrm_user_base_schedules[0].start_time
      );
      let endTime = timeStr2Number(
        props.specialist.hrm_user_base_schedules[0].end_time
      );
      let appointmentTime = timeStr2Number(props.startTime);
      if (startTime <= appointmentTime && appointmentTime < endTime) {
        return true;
      }

      return false;
    };

    return {
      handleCreateAppointment,
      specialistAvailable,
      setColor,
    };
  },
};
</script>
