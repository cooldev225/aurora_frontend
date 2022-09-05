<template>
  <table>
    <thead>
      <tr>
        <th
          class="appointment-table-header text-center text-white py-3"
          :colSpan="1 + filteredSpecialists.length * 2"
        >
          {{ tableTitle }}
        </th>
      </tr>
      <tr style="background-color: #fff8dd">
        <th></th>
        <template
          v-for="specialist in filteredSpecialists"
          :key="specialist.id"
        >
          <th></th>
          <th class="text-center text-primary py-3">
            Dr. {{ specialist.full_name }} <br />
            {{ specialist.hrm_user_base_schedules[0].clinic_name }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody class="bg-white fw-bold appointment-table-body">
      <tr
        v-for="appointmentTimeslot in appointmentTimesList"
        :key="appointmentTimeslot"
      >
        <td class="p-2 text-center w-70px">
          {{ appointmentTimeslot }}
        </td>
        <template
          v-for="specialist in filteredSpecialists"
          :key="specialist.id"
        >
          <CreateAppointmentTableData
            v-if="specialist"
            :specialist="specialist"
            :date="_apt_date"
            :startTime="appointmentTimeslot"
          />

          <AppointmentTableData
            v-if="getAppointmentAtTime(specialist, appointmentTimeslot)"
            :appointment="getAppointmentAtTime(specialist, appointmentTimeslot)"
            @click="
              handleShowAppointmentDrawer(
                getAppointmentAtTime(specialist, appointmentTimeslot)
              )
            "
          />
          <td
            v-else-if="
              !specialistHasAppointmentInSlot(specialist, appointmentTimeslot)
            "
            style="background: #f1f1f1"
          ></td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import CreateAppointmentTableData from "@/components/presets/AppointmentTable/CreateAppointmentTableData.vue";
import AppointmentTableData from "@/components/presets/AppointmentTable/AppointmentTableData.vue";

export default defineComponent({
  components: { CreateAppointmentTableData, AppointmentTableData },
  props: {
    date: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const tableData = ref({});
    const tableTitle = computed(() =>
      moment(props.date.toString()).format("dddd, MMMM Do YYYY")
    );
    const _apt_date = computed(() => props.date);

    const clinic_list = computed(() => store.getters.clinicsList);

    const format = ref("YYYY-MM-DD");

    const filteredSpecialists = computed(() => store.getters.getFilteredData);
    const appointmentTimesList = ref();
    console.log("APPOINTMENTS");
    console.log(filteredSpecialists.value);
    //  The length of each time slot i.e 30 min = 7:00 - 7:30
    const timeslot_length = ref(30);

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    onMounted(() => {
      store.dispatch(Actions.ORG.LIST);
      appointmentTimesList.value = generateAppointmentTimes();
    });

    const generateAppointmentTimes = () => {
      let start_time = "07:00";
      let time_increment = start_time;
      let end_time = "18:00";
      let appointment_time_list: string[] = [];

      while (timeStr2Number(time_increment) < timeStr2Number(end_time)) {
        appointment_time_list.push(time_increment);
        time_increment = moment(time_increment, "HH:mm")
          .add(timeslot_length.value, "minutes")
          .format("HH:mm")
          .toString();
      }
      return appointment_time_list;
    };

    watchEffect(() => {
      if (
        DrawerComponent?.getInstance(
          "appointment-drawer"
        )?.isBookingDrawerShown() === true
      ) {
        DrawerComponent?.getInstance("appointment-drawer")?.show();
      }
    });

    const isDuringWorkHours = (specialist, timeSlot) => {
      if (
        timeStr2Number(specialist.work_hours.time_slot[0]) <=
          timeStr2Number(timeSlot) &&
        timeStr2Number(specialist.work_hours.time_slot[1]) >
          timeStr2Number(timeSlot)
      ) {
        return true;
      }
      return false;
    };

    const handleShowAppointmentDrawer = (item) => {
      store.commit(Mutations.SET_APT.SELECT, item);
      DrawerComponent?.getInstance("appointment-drawer")?.toggle();
    };

    const getAppointmentAtTime = (specialist, time) => {
      let appointmentsAtTime;
      if (specialist != null) {
        appointmentsAtTime = specialist.appointments.find(
          (x) => x.start_time === time + ":00"
        );
      }

      return appointmentsAtTime;
    };

    const specialistHasAppointmentInSlot = (specialist, time) => {
      let appointments = specialist.appointments;

      let timeSlotBefore = moment(time, "HH:mm")
        .subtract(timeslot_length.value, "minutes")
        .format("HH:mm")
        .toString();
      let appointmentsOneBeforeSlot = appointments.find(
        (x) => x.start_time === timeSlotBefore + ":00"
      );

      let timeSlotDoubleBefore = moment(time, "HH:mm")
        .subtract(timeslot_length.value * 2, "minutes")
        .format("HH:mm")
        .toString();
      let appointmentsTwoBeforeSlot = appointments.find(
        (x) => x.start_time === timeSlotDoubleBefore + ":00"
      );

      if (
        appointmentsTwoBeforeSlot?.appointment_type
          .appointment_length_as_number === 3 ||
        appointmentsOneBeforeSlot?.appointment_type
          .appointment_length_as_number === 2 ||
        appointmentsOneBeforeSlot?.appointment_type
          .appointment_length_as_number === 3
      ) {
        return true;
      }

      return false;
    };

    return {
      format,
      tableData,
      tableTitle,
      specialistHasAppointmentInSlot,
      handleShowAppointmentDrawer,
      getAppointmentAtTime: getAppointmentAtTime,
      isDuringWorkHours,
      appointmentTimesList,
      filteredSpecialists,
      clinic_list,
      _apt_date,
    };
  },
});
</script>

<style>
.appointment-table-body td {
  border: 0.5px dashed gray;
}

.appointment-table-header tr:first-child th:first-child {
  border-radius: 10px 0 0 0;
}

.appointment-table-header {
  border-radius: 10px 10px 0 0;
  background-color: #3e7ba0;
}

.appointment-table-body > tr:hover {
  background: rgb(87, 105, 139);
}

thead {
  position: sticky;
  top: 0;
  z-index: 20;
}
</style>
