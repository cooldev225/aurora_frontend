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
              <VueCtkDateTimePicker
                :format="format"
                v-model="date_search.date"
                inline
                color="#3E7BA0"
                noKeyboard
                onlyDate
                noButton
              />

              <div class="d-flex flex-row justify-content-around">
                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(6)"
                >
                  1Y>
                </button>
                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(5)"
                >
                  6M>
                </button>
                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(4)"
                >
                  3M>
                </button>

                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(3)"
                >
                  1M>
                </button>
                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(2)"
                >
                  2W>
                </button>
                <button
                  class="btn btn-light-primary btn-sm"
                  @click="changeDate(1)"
                >
                  1W>
                </button>
                <button class="btn btn-primary btn-sm" @click="changeDate(0)">
                  Now
                </button>
              </div>
            </div>
            <div class="col mb-2">
              <div class="card border border-dashed border-primary">
                <div class="card-header">
                  <div class="card-title">
                    <span>SPECIALISTS</span>
                  </div>
                </div>
                <div
                  class="card-body card-scroll h-350px d-flex flex-column justify-content-between"
                >
                  <div class="d-flex flex-column">
                    <el-checkbox
                      v-model="isShowAllSpecialist"
                      label="Show All Specialists"
                      size="large"
                    />
                    <el-select
                      v-model="specialistsData"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Please type a specialist name"
                      remote-show-suffix
                      :remote-method="remoteMethodSpecalist"
                      :loading="loading"
                      :disabled="isShowAllSpecialist"
                      @change="filterSpecialists"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div class="d-flex flex-column">
                    <el-checkbox
                      v-model="isShowAllClinics"
                      label="Show All Clinics"
                      size="large"
                    />
                    <el-select
                      v-model="clinicsData"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="Please type a clinc name"
                      remote-show-suffix
                      :remote-method="remoteMethodClinic"
                      :loading="loading"
                      :disabled="isShowAllClinics"
                      @change="filterSpecialists"
                    >
                      <el-option
                        v-for="item in clinicOptions"
                        :value="item.id"
                        :label="item.name"
                        :key="item.id"
                      />
                    </el-select>
                  </div>
                  <button
                    class="btn btn-light-primary w-100 mt-2"
                    @click="handleReset"
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              </div>
            </div>
            <div class="col mb-2">
              <div class="card border border-dashed border-primary">
                <div class="card-header">
                  <div class="card-title">
                    <span>SEARCH NEXT AVAILABLE APPOINTMENT</span>
                  </div>
                </div>
                <div class="card-body card-scroll h-350px">
                  <div class="card-info">
                    <el-form
                      ref="searchAppointmentFormRef"
                      :model="searchAppointmentForm"
                      :rules="searchAppointmentRules"
                    >
                      <el-form-item prop="appointment_type_id">
                        <el-select
                          class="w-100"
                          placeholder="Select Appointment Type"
                          v-model="searchAppointmentForm.appointment_type_id"
                        >
                          <el-option
                            v-for="item in aptTypelist"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
                          />
                        </el-select>
                      </el-form-item>
                      <el-divider />
                      <div>
                        <el-select
                          class="w-50 p-2"
                          placeholder="Select Clinic"
                          v-model="searchAppointmentForm.clinic_id"
                        >
                          <el-option value="" label="Any Clinic" />
                          <el-option
                            v-for="item in clinic_list"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
                          />
                        </el-select>
                        <el-select
                          class="w-50 p-2"
                          placeholder="Select Specialist"
                          v-model="searchAppointmentForm.specialist_id"
                          filterable
                        >
                          <el-option value="" label="Any Specialist" />
                          <el-option
                            v-for="specialist in allSpecialists"
                            :value="specialist.id"
                            :label="specialist.full_name"
                            :key="specialist.id"
                          />
                        </el-select>
                      </div>
                      <el-divider />
                      <div>
                        <el-select
                          class="w-50 p-2"
                          placeholder="Select Appointment Time Requirement"
                          v-model="searchAppointmentForm.time_requirement"
                        >
                          <el-option :value="0" label="Any time" :key="0" />
                          <el-option
                            v-for="item in aptTimeRequireList"
                            :value="item.id"
                            :label="item.title"
                            :key="item.id"
                          />
                        </el-select>
                        <el-select
                          class="w-50 p-2"
                          placeholder="Select Time frame"
                          v-model="searchAppointmentForm.x_weeks"
                        >
                          <el-option
                            v-for="(item, index) in aptWeeksList"
                            :value="index"
                            :label="item"
                            :key="item.id"
                          />
                        </el-select>
                      </div>
                      <button
                        class="btn btn-primary mt-3 w-100"
                        @click.prevent="handleSearch"
                      >
                        SEARCH
                      </button>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'col-8': toggleLayout }">
      <AppointmentTable
        :organization="organization"
        :visibleDate="visibleDate"
        :visibleSpecialists="visibleSpecialists"
      />
    </div>
  </div>

  <AptModal modalId="modal_create_apt" />
  <AppointmentListPopup
    :all-specialists="allSpecialists"
    :search-next-apts="search_next_apts"
    :apt-type-list="aptTypelist"
    :clinic-list="clinic_list"
    :apt-time-require-list="aptTimeRequireList"
    :x-weeks="aptWeeksList"
    v-if="visibleSpecialists"
  />
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
import AppointmentListPopup from "@/components/appointments/AppointmentListPopup.vue";
import AptModal from "@/components/appointments/ModalApt.vue";
import AppointmentTable from "@/components/appointments/AppointmentTable.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
import { aptTimeList } from "@/core/data/apt-time";
import { Actions } from "@/store/enums/StoreEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { Modal } from "bootstrap";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import aptWeeksList from "@/core/data/apt-weeks";
import $ from "jquery";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
    AptModal,
    AppointmentTable,
    AppointmentListPopup,
  },
  data: function () {
    return {
      toggleKey: false,
      toggleRestrictionKey: false,
    };
  },
  setup: function () {
    const store = useStore();
    const format = ref("YYYY-MM-DD");
    const organization = computed(() => store.getters.userOrganization);
    // Data calender is showing
    const date_search = reactive({
      date: new Date(),
    });
    const visibleDate = ref(date_search);

    // The specialist that will be show in calender
    const visibleSpecialists = ref();

    const isShowAllSpecialist = ref(true);
    const toggleLayout = ref(false);

    const validateAppointmentTypeId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please select appointment type"));
      } else {
        callback();
      }
    };

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
    const searchAppointmentFormRef = ref(null);
    const searchAppointmentRules = ref({
      appointment_type_id: [
        {
          required: true,
          validator: validateAppointmentTypeId,
          trigger: "blur",
        },
      ],
    });

    var search_next_apts = reactive({
      appointment_type_id: "",
      specialist_id: "",
      time_requirement: 0,
      date: moment(),
      clinic_id: "",
      x_weeks: 0,
    });

    const specialists_search = reactive({
      specialist_ids: [],
    });

    const tableTitle = ref("");

    const specialistsList = ref([]);
    const options = ref([]);
    const specialistsData = ref([]);
    const loading = ref(false);
    const isShowAllClinics = ref(true);
    const clinicOptions = ref([]);
    const clinicsData = ref([]);

    const monthAvailabilities = computed(
      () => store.getters.getMonthAvailabilities
    );

    const specialists = computed(() => store.getters.getSpecialistList);

    const available_slots_by_date = computed(
      () => store.getters.getAvailableAppointmentList
    );
    const aptTypelist = computed(() => store.getters.getAptTypesList);
    const allSpecialists = computed(() => store.getters.getSpecialistList);
    const aptTimeRequireList = computed(
      () => store.getters.getAptTimeRequireList
    );
    const clinic_list = computed(() => store.getters.clinicsList);

    watch(monthAvailabilities, () => {
      console.log(monthAvailabilities.value);

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
      store.dispatch(Actions.SPECIALIST.LIST, formattedDate);
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.EMPLOYEE.LIST);
      store.dispatch(AppointmentActions.LIST, { date: formattedDate });

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

    const selectedClinicIds = computed(() => {
      let newArray = [];
      if (isShowAllClinics.value) {
        newArray = clinic_list.value.map((item) => {
          return item.id;
        });
      } else {
        newArray = clinicsData.value.map((item) => {
          return item;
        });
      }
      return newArray;
    });

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const handleSearch = async () => {
      searchAppointmentFormRef.value.validate(async (valid) => {
        if (valid) {
          search_next_apts.appointment_type_id =
            searchAppointmentForm.value.appointment_type_id;
          search_next_apts.specialist_id =
            searchAppointmentForm.value.specialist_id;
          search_next_apts.time_requirement =
            searchAppointmentForm.value.time_requirement;
          search_next_apts.date = moment(moment())
            .add(searchAppointmentForm.value.x_weeks, "weeks")
            .format("DD/MM/YYYY");
          search_next_apts.x_weeks = searchAppointmentForm.value.x_weeks;
          search_next_apts.clinic_id = searchAppointmentForm.value.clinic_id;
          const modal = new Modal(
            document.getElementById("modal_available_time_slot_popup")
          );

          modal.show();
        }
      });
    };

    const handleReset = () => {
      specialists_search.specialist_ids = [];
      date_search.date = new Date();

      searchAppointmentForm.value.appointment_type_id = "";
      searchAppointmentForm.value.x_weeks = "0";
      searchAppointmentForm.value.clinic_id = "";
      searchAppointmentForm.value.specialist_id = "";
      searchAppointmentForm.value.time_requirement = 0;
      isShowAllClinics.value = true;
      isShowAllSpecialist.value = true;
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
      getFilterSpecialists();
      filterSpecialists();

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

    watch(specialists, () => {
      getFilterSpecialists();
      filterSpecialists();
    });

    const filterSpecialists = () => {
      specialistsList.value = [];
      specialists.value.map((specialist) => {
        let i = true;
        specialist.schedule_timeslots.map((slot) => {
          if (
            slot.week_day ===
              moment(date_search.date).format("ddd").toUpperCase() &&
            i
          ) {
            i = false;
            specialistsList.value.push({
              value: specialist.id,
              label: `Dr.${specialist.first_name} ${specialist.last_name}`,
              id: specialist.id,
              title: `Dr.${specialist.first_name} ${specialist.last_name}`,
              businessHours: getBusinessHours(specialist.schedule_timeslots),
            });
          }
        });
      });
      // check user's selected specialist or show all specialist
      if (!isShowAllSpecialist.value) {
        specialistsList.value = specialistsList.value.filter((specialist) => {
          if (specialistsData.value.includes(specialist.id)) return specialist;
        });
      }
      // Check user's selected clinics or show all clinics
      if (!isShowAllClinics.value) {
        const result = [];
        specialists.value.map((specialist) => {
          specialist.schedule_timeslots.map((slot) => {
            clinicsData.value.map((clinic) => {
              if (
                clinic == slot.clinic_id &&
                !result.includes(specialist.id) &&
                slot.week_day ==
                  moment(date_search.date).format("ddd").toUpperCase()
              ) {
                result.push(specialist.id);
              }
            });
          });
        });
        specialistsList.value = specialistsList.value.filter((specialist) => {
          if (result.includes(specialist.id)) return specialist;
        });
      }
      visibleSpecialists.value = specialistsList.value;
    };
    const getBusinessHours = (data) => {
      const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
      let businessHours = [];
      data.forEach((slot) => {
        let daysOfWork = [];
        daysOfWork.push(weekDays.indexOf(slot.week_day) + 1);
        businessHours.push({
          startTime: slot.start_time,
          endTime: slot.end_time,
          daysOfWeek: daysOfWork,
        });
      });
      return businessHours;
    };
    watch(clinic_list, () => {
      getSelectedClinics();
    });
    const changeDate = (mode) => {
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
      }
    };

    watch(specialistsData, () => {
      let newArray = [];
      specialistsData.value.forEach(function (data) {
        newArray.push(data);
      });
      localStorage.setItem("selectedSpecialist", JSON.stringify(newArray));
      getFilterSpecialists();
    });

    watch(clinicsData, () => {
      let newArray = [];
      clinicsData.value.forEach(function (data) {
        if (data.value) {
          newArray.push(parseInt(data.value));
        } else {
          newArray.push(data);
        }
      });
      localStorage.setItem("selectedClinics", JSON.stringify(newArray));
    });

    watch([isShowAllSpecialist, isShowAllClinics], () => {
      filterSpecialists();
    });

    const remoteMethodSpecalist = (query) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          options.value = specialists.value.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        options.value = specialists.value.filter((item) => {
          return item;
        });
      }
    };

    const remoteMethodClinic = (query) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          clinicOptions.value = clinic_list.value.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        clinicOptions.value = clinic_list.value.filter((item) => {
          return item.name.toLowerCase();
        });
      }
    };

    const checkSpecialistSelectected = (id) => {
      let isSpecialistSelected = false;
      specialistsData.value.forEach(function (val) {
        if (val.value == id) isSpecialistSelected = true;
        if (val === parseInt(id)) isSpecialistSelected = true;
      });
      return isSpecialistSelected;
    };

    //Getting selected specialists from localstorage
    const getFilterSpecialists = () => {
      let localSpecialistCodes = null;
      if (localStorage.getItem("selectedSpecialist") !== null) {
        localSpecialistCodes = localStorage.getItem("selectedSpecialist");
        const savedSpecialists = JSON.parse(localSpecialistCodes);
        if (savedSpecialists.length > 0) {
          options.value = [];
          specialists.value.forEach(function (specialist) {
            options.value.push({
              value: specialist.id,
              label: `Dr. ${specialist.first_name} ${specialist.last_name}`,
            });
            savedSpecialists.forEach(function (e) {
              if (e == specialist.id) {
                specialist.checked = true;
                if (!checkSpecialistSelectected(e)) {
                  specialistsData.value.push(specialist.id);
                }
              }
            });
          });
        } else {
          isShowAllSpecialist.value = true;
        }
      } else {
        isShowAllSpecialist.value = true;
      }
    };
    //Getting selected clinics from localstorage
    const getSelectedClinics = () => {
      let localClinicCodes = null;
      if (localStorage.getItem("selectedClinics") !== null) {
        localClinicCodes = JSON.parse(localStorage.getItem("selectedClinics"));
        if (localClinicCodes.length > 0) {
          clinicsData.value = [];
          remoteMethodClinic();
          localClinicCodes.forEach(function (code) {
            clinicsData.value.push(code);
          });
        } else {
          isShowAllClinics.value = true;
        }
      } else {
        isShowAllClinics.value = true;
      }
    };
    return {
      format,
      date_search,
      specialists_search,
      specialists,
      available_slots_by_date,
      aptTypelist,
      allSpecialists,
      aptTimeRequireList,
      searchAppointmentFormRef,
      searchAppointmentForm,
      searchAppointmentRules,
      search_next_apts,
      aptWeeksList,
      clinic_list,
      aptTimeList,
      moment,
      handleSearch,
      handleReset,
      timeStr2Number,
      changeDate,
      toggleLayout,
      setToggleLayout,
      isShowAllSpecialist,
      remoteMethodSpecalist,
      specialistsData,
      loading,
      options,
      filterSpecialists,
      isShowAllClinics,
      remoteMethodClinic,
      clinicOptions,
      clinicsData,
      selectedClinicIds,
      organization,
      visibleSpecialists, // FOR APPOINTMENT TABLE
      visibleDate, // FOR APPOINTMENT TABLE
    };
  },
});
</script>
