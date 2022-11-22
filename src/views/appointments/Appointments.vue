<template>
  <div class="card w-100 d-flex align-items-end mb-2 px-5">
    <!--begin::Booking Toolbar-->
    <div class="d-flex flex-row align-items-center gap-2">
      <div class="d-inline-block mb-2 p-2">
        <div class="d-flex">
          <span
            @mouseover="toggleRestrictionKey = true"
            @mouseout="toggleRestrictionKey = false"
            class="svg-icon-primary svg-icon svg-icon-2x btn m-0 p-0"
          >
            <inline-svg src="media/icons/duotune/arrows/arr009.svg" />
          </span>
        </div>
        <div
          v-if="toggleRestrictionKey"
          style="background-color: #ffffff; z-index: 100"
          class="position-absolute mt-2 d-flex flex-column m-2 p-2"
        >
          <div>
            <i :class="'fa fa-plus text-primary'"></i> Consultations Only
          </div>
          <div><i :class="'fa fa-plus text-danger'"></i> Procedures Only</div>
          <div><i :class="'fa fa-plus text-success'"></i> No Restrictions</div>
        </div>
      </div>
      <span class="h-30px border-gray-200 border-start mx-2"></span>
      <div class="d-inline-block mb-2 p-2">
        <div class="d-flex">
          <span
            @mouseover="toggleKey = true"
            @mouseout="toggleKey = false"
            class="svg-icon-primary svg-icon svg-icon-2x btn m-0 p-0"
          >
            <inline-svg src="media/icons/duotune/coding/cod005.svg" />
          </span>
        </div>
        <div
          v-if="toggleKey"
          style="background-color: #ffffff; z-index: 100; right: 0px"
          class="position-absolute mt-2 d-flex flex-column m-2"
        >
          <span
            v-for="item in aptTypelist"
            :value="item.id"
            :label="item.name"
            :key="item.id"
            class="badge mt-1"
            :style="{ 'background-color': item.color }"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <!--begin::Appointment Type Key-->
      <span class="h-30px border-gray-200 border-start mx-2"></span>
      <!--end::Appointment Type Key-->
      <!--begin::Layout Toggle-->
      <div class="d-inline-block mb-2 p-2">
        <div class="d-flex flex-row">
          <span
            @click="setToggleLayout(true)"
            :class="{ 'svg-icon-primary': toggleLayout }"
            class="svg-icon svg-icon-2x btn m-0 p-0"
          >
            <inline-svg src="media/icons/duotune/layouts/lay004.svg" />
          </span>
          <span
            @click="setToggleLayout(false)"
            :class="{ 'svg-icon-primary': !toggleLayout }"
            class="svg-icon svg-icon-2x btn m-0 p-0"
          >
            <inline-svg
              style="transform: rotate(-270deg)"
              src="media/icons/duotune/layouts/lay004.svg"
            />
          </span>
        </div>
      </div>
      <!--end::Layout Toggle-->
    </div>
  </div>
  <!--end::Booking Toolbar-->
  <div :class="{ row: toggleLayout }">
    <div :class="{ 'col-4': toggleLayout }">
      <div class="card card-flush">
        <div class="card-body">
          <div :class="{ row: !toggleLayout }">
            <div class="col mb-2">
              <Apt-date-picker :date_="date_search" @changeDate="changeDate" />
            </div>
            <div class="col mb-2">
              <apt-filter
                :date_search="date_search"
                @selectedSpecialists="updateSpecialists"
                @clearData="handleReset"
              />
            </div>
            <div class="col mb-2"><apt-search /></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'col-8': toggleLayout }">
      <AppointmentTable
        v-if="organization && visibleSpecialists"
        :organization="organization"
        :visibleDate="visibleDate"
        :visibleSpecialists="visibleSpecialists"
      />
    </div>
  </div>

  <AptModal modalId="modal_create_apt" />
</template>
<script>
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  computed,
  watchEffect,
  onUpdated,
} from "vue";
import { useStore } from "vuex";
import AptModal from "@/components/appointments/ModalApt.vue";
import AppointmentTable from "@/components/appointments/AppointmentTable.vue";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
import { Actions } from "@/store/enums/StoreEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import $ from "jquery";
import AptDatePicker from "@/components/appointments/DateTimePicker.vue";
import AptSearch from "@/components/appointments/AppointmentSearch.vue";
import AptFilter from "@/components/appointments/AppointmentFilter.vue";
export default defineComponent({
  name: "bookings-dashboard",
  components: {
    AptModal,
    AppointmentTable,
    AptDatePicker,
    AptSearch,
    AptFilter,
  },
  data: function () {
    return {
      toggleKey: false,
      toggleRestrictionKey: false,
    };
  },
  setup: function () {
    const store = useStore();

    const organization = computed(() => store.getters.userOrganization);
    // Data calender is showing
    const date_search = reactive({
      date: new Date(),
    });
    const visibleDate = ref(date_search);

    // The specialist that will be show in calender
    const visibleSpecialists = ref();

    const toggleLayout = ref(false);

    const setToggleLayout = (value) => {
      toggleLayout.value = value;
      localStorage.setItem("toggleBookingLayout", toggleLayout.value);
    };

    const searchAppointmentForm = ref({
      appointment_type_id: "",
      specialist_id: "",
      time_requirement: 0,
      x_weeks: "0",
      clinic_id: "",
    });

    const specialists_search = reactive({
      specialist_ids: [],
    });
    const loading = ref(false);
    const isShowAllClinics = ref(true);

    const monthAvailabilities = computed(
      () => store.getters.getMonthAvailabilities
    );

    const aptTypelist = computed(() => store.getters.getAptTypesList);

    watch(monthAvailabilities, () => {
      $(".datepicker-days")
        .children()
        .each(function () {
          const calenderDate = $(this).children("span").last().text();

          const appointments_availability = monthAvailabilities.value.find(
            (date) => date.date == calenderDate
          )?.appointments_availability;

          let color = "#cccccc";
          if (appointments_availability == "AVAILABLE_APPOINTMENTS") {
            color = "#EDF6D5";
          } else if (appointments_availability == "ALMOST_FULLY_BOOKED") {
            color = "#f5f1e3";
          } else if (appointments_availability == "FULLY_BOOKED") {
            color = "#F5E8E3";
          }

          if (color != undefined) {
            $(this).attr("style", "background-color: " + color + " !important");
          }
        });
    });

    onMounted(() => {
      toggleLayout.value =
        localStorage.getItem("toggleBookingLayout") === "true" ? true : false;
      const formattedDate = moment().format("YYYY-MM-DD").toString();
      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
      store.dispatch(Actions.SPECIALIST.LIST, { date: formattedDate });
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.EMPLOYEE.LIST);
      store.dispatch(AppointmentActions.LIST, { date: formattedDate });

      window.setInterval(() => {
        store.dispatch(AppointmentActions.LIST, {
          date: moment(date_search.date).format("YYYY-MM-DD").toString(),
        });
      }, 8000);

      const month = $(
        ".datepicker-container-label>span:first-child>button>span:nth-child(2)"
      ).text();
      const year = $(
        ".datepicker-container-label>span:nth-child(2)>button>span:nth-child(2)"
      ).text();

      store.dispatch(AppointmentActions.MONTH_AVAILABILITIES, {
        month_string: month,
        year_string: year,
      });
    });

    onUpdated(() => {
      $(".fc-next-button")
        .off()
        .on("click", () => {
          visibleDate.value.date = moment(visibleDate.value.date).add(
            "days",
            1
          );
        });
      $(".fc-prev-button")
        .off()
        .on("click", () => {
          visibleDate.value.date = moment(visibleDate.value.date).subtract(
            "days",
            1
          );
        });

      $(".fc-today-button")
        .off()
        .on("click", () => {
          visibleDate.value.date = moment();
        });
    });

    const handleReset = () => {
      date_search.date = new Date();
    };

    watchEffect(() => {
      if (
        DrawerComponent?.getInstance(
          "appointment-drawer"
        )?.isBookingDrawerShown() === true
      ) {
        setTimeout(() => {
          DrawerComponent?.getInstance("appointment-drawer")?.show();
        }, 200);
      }
    });

    watch(date_search, () => {
      visibleDate.value = date_search;
      const formattedDate = moment(date_search.date)
        .format("YYYY-MM-DD")
        .toString();
      store.dispatch(Actions.SPECIALIST.LIST, formattedDate);
      store.dispatch(AppointmentActions.LIST, { date: formattedDate });

      // Potentially add a check to only update this if the month has changed
      const month = $(
        ".datepicker-container-label>span:first-child>button>span:nth-child(2)"
      ).text();
      const year = $(
        ".datepicker-container-label>span:nth-child(2)>button>span:nth-child(2)"
      ).text();

      store.dispatch(AppointmentActions.MONTH_AVAILABILITIES, {
        month_string: month,
        year_string: year,
      });
    });

    const changeDate = (mode, date) => {
      switch (mode) {
        case 0:
          date_search.date = new Date();
          break;
        case 1:
          date_search.date = moment(date_search.date).add(1, "weeks");
          break;
        case 2:
          date_search.date = moment(date_search.date).add(2, "weeks");
          break;
        case 3:
          date_search.date = moment(date_search.date).add(1, "months");
          break;
        case 4:
          date_search.date = moment(date_search.date).add(3, "months");
          break;
        case 5:
          date_search.date = moment(date_search.date).add(6, "months");
          break;
        case 6:
          date_search.date = moment(date_search.date).add(1, "years");
          break;
        case 7:
          date_search.date = date;
          break;
      }
    };
    const updateSpecialists = (data) => {
      visibleSpecialists.value = data;
    };
    return {
      date_search,
      aptTypelist,
      handleReset,
      changeDate,
      toggleLayout,
      setToggleLayout,
      loading,
      organization,
      visibleSpecialists, // FOR APPOINTMENT TABLE
      visibleDate, // FOR APPOINTMENT TABLE
      updateSpecialists,
    };
  },
});
</script>
