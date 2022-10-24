<template ref="appointmentTableRef">
  <table
    id="appointment_filteredspecialists_table"
    v-if="filteredSpecialists.length !== 0"
  >
    <thead>
      <tr>
        <th
          class="appointment-table-header text-center text-white py-3"
          :colSpan="
            filteredSpecialists.length ? 1 + filteredSpecialists.length * 2 : 3
          "
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
          <template
            v-if="
              specialist.checked &&
              filterClinics(specialist.schedule_timeslots[0].clinic_id)
            "
          >
            <th style="height: 60px; width: 40px"></th>
            <th class="text-center text-primary py-3">
              {{
                filteredSpecialists.length > 0
                  ? "Dr. " + specialist.full_name
                  : ""
              }}
              <br />
              {{
                specialist.schedule_timeslots
                  ? specialist.schedule_timeslots[0].clinic_name
                  : ""
              }}
            </th>
          </template>
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
          <template
            v-if="
              specialist.checked &&
              filterClinics(specialist.schedule_timeslots[0].clinic_id)
            "
          >
            <CreateAppointmentTableData
              v-if="specialist"
              :specialist="specialist"
              :date="_apt_date"
              :startTime="appointmentTimeslot"
            />
            <AppointmentTableData
              v-if="getAppointmentAtTime(specialist, appointmentTimeslot)"
              :appointment="
                getAppointmentAtTime(specialist, appointmentTimeslot)
              "
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
        </template>
      </tr>
    </tbody>
  </table>
  <MoveModal :isDisableAptTypeList="true" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import CreateAppointmentTableData from "@/components/appointments/partials/CreateAppointmentTableData.vue";
import AppointmentTableData from "@/components/appointments/partials/AppointmentTableData.vue";
import {
  AppointmentMutations,
  AppointmentActions,
} from "@/store/enums/StoreAppointmentEnums";
import MoveModal from "@/components/appointments/AppointmentMoveModal.vue";

export default defineComponent({
  components: { CreateAppointmentTableData, AppointmentTableData, MoveModal },
  props: {
    date: { type: String, required: true },
    filteredClinics: { type: Array, required: true },
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
    //  The length of each time slot i.e 30 min = 7:00 - 7:30
    const timeslot_length = ref(30);

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    onMounted(() => {
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
      store.commit(AppointmentMutations.SET_APT.SELECT, item);
      DrawerComponent?.getInstance("appointment-drawer")?.toggle();
    };

    const getAppointmentAtTime = (specialist, time) => {
      let appointmentsAtTime;
      if (
        specialist != null &&
        specialist.appointments &&
        specialist.appointments !== undefined
      ) {
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
      let appointmentsOneBeforeSlot = appointments?.find(
        (x) => x.start_time === timeSlotBefore + ":00"
      );

      let timeSlotDoubleBefore = moment(time, "HH:mm")
        .subtract(timeslot_length.value * 2, "minutes")
        .format("HH:mm")
        .toString();
      let appointmentsTwoBeforeSlot = appointments?.find(
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

    //Check specialist clinic is selected one in filter or not
    const filterClinics = (id) => {
      return props.filteredClinics.includes(id, 0);
    };
    return {
      format,
      tableData,
      tableTitle,
      specialistHasAppointmentInSlot,
      handleShowAppointmentDrawer,
      getAppointmentAtTime,
      isDuringWorkHours,
      appointmentTimesList,
      filteredSpecialists,
      clinic_list,
      _apt_date,
      filterClinics,
    };
  },
});
</script>

<style lang="scss">
@import "../../assets/sass/components/booking/appointmentTable.scss";
</style>
