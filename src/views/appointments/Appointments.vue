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
            @click="toggleLayout = true"
            :class="{ 'svg-icon-primary': toggleLayout }"
            class="svg-icon svg-icon-2x btn m-0 p-0"
          >
            <inline-svg src="media/icons/duotune/layouts/lay004.svg" />
          </span>
          <span
            @click="toggleLayout = false"
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
    <div :class="{ 'col-2': toggleLayout }">
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
                    <el-checkbox-group
                      v-model="specialists_search.specialist_ids"
                      class="d-flex flex-column"
                    >
                      <template
                        v-for="(specialist, index) in ava_specialists"
                        :key="index"
                      >
                        <el-checkbox
                          size="large"
                          :label="specialist.id"
                          :checked="true"
                          >Dr. {{ specialist.first_name }}
                          {{ specialist.last_name }}</el-checkbox
                        >
                      </template>
                    </el-checkbox-group>
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
                            v-for="(item, index) in x_weeks_list"
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
    <div :class="{ 'col-10': toggleLayout }">
      <div class="card-body">
        <div class="scroll" :class="{ 'h-500px': !toggleLayout }">
          <div class="d-flex flex-column">
            <AppointmentTable
              :date="moment(date_search.date.toString()).format('MM-DD-YYYY')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <AptModal modalId="modal_create_apt" />
  <AppointmentListPopup
    :all-specialists="allSpecialists"
    :search-next-apts="search_next_apts"
    :apt-type-list="aptTypelist"
    :clinic-list="clinic_list"
    :apt-time-require-list="aptTimeRequireList"
    :x-weeks="x_weeks_list"
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
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
import { Modal } from "bootstrap";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";

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
      toggleLayout: false,
      toggleKey: false,
      toggleRestrictionKey: false,
    };
  },
  setup() {
    const store = useStore();
    const format = ref("YYYY-MM-DD");
    const date_search = reactive({
      date: new Date(),
    });

    const validateAppointmentTypeId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please select appointment type"));
      } else {
        callback();
      }
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
    const x_weeks_list = ref({
      0: "This week",
      1: "Next Week",
      2: "In 2 weeks",
      4: "In 4 weeks",
      6: "In 6 weeks",
      8: "In 2 months",
      12: "In 3 months",
      24: "In 6 months",
    });

    const ava_specialists = computed(() => store.getters.getAvailableSPTData);
    const specialists = computed(() => store.getters.getFilteredData);

    const available_slots_by_date = computed(
      () => store.getters.getAvailableAppointmentList
    );
    const aptTypelist = computed(() => store.getters.getAptTypesList);
    const allSpecialists = computed(() => store.getters.getSpecialistList);
    const aptTimeRequireList = computed(
      () => store.getters.getAptTimeRequireList
    );
    const clinic_list = computed(() => store.getters.clinicsList);

    onMounted(() => {
      store.dispatch(AppointmentActions.BOOKING.SEARCH.DATE, {
        ...date_search,
        ...specialists_search,
      });
      store.dispatch(AppointmentActions.BOOKING.SEARCH.SPECIALISTS, {
        ...date_search,
        ...specialists_search,
      });

      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
      store.dispatch(Actions.SPECIALIST.LIST);
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
      store.dispatch(Actions.CLINICS.LIST);

      setCurrentPageBreadcrumbs("Dashboard", ["Bookings"]);
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

          // await store.dispatch(AppointmentActions.BOOKING.SEARCH.NEXT_APT, {
          //   ...search_next_apts,
          // });

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
      store.dispatch(AppointmentActions.BOOKING.SEARCH.DATE, {
        ...date_search,
        specialists: [],
      });
      store.dispatch(AppointmentActions.BOOKING.SEARCH.SPECIALISTS, {
        ...date_search,
        ...specialists_search,
      });
    });

    watch(ava_specialists, () => {
      let temp = [];

      ava_specialists.value.forEach((item) => {
        specialists_search.specialist_ids.forEach((selected) => {
          if (item.id === selected) temp.push(item);
        });
      });
      if (temp.length === 0) temp = ava_specialists.value;
      const data = ref({});
      //const data_key = moment(date_search.date).format("YYYY-MM-DD").toString();
      data.value = temp; //[data_key]
      store.commit(
        AppointmentMutations.SET_BOOKING.SEARCH.SPECIALISTS,
        data.value
      );
      store.dispatch(AppointmentActions.BOOKING.SEARCH.SPECIALISTS, {
        ...date_search,
        ...specialists_search,
      });
    });

    watch(specialists_search, () => {
      let temp = [];
      ava_specialists.value.forEach((item) => {
        specialists_search.specialist_ids.forEach((selected) => {
          if (item.id === selected) temp.push(item);
        });
      });
      if (specialists_search.specialist_ids.length === 0)
        temp = ava_specialists.value;
      const data = ref({});
      //const data_key = moment(date_search.date).format("YYYY-MM-DD").toString();
      data.value = temp; //[data_key]
      store.commit(
        AppointmentMutations.SET_BOOKING.SEARCH.SPECIALISTS,
        data.value
      );
      // store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
      // store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
      //   ...date_search,
      //   ...specialists_search,
      // });
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

    return {
      format,
      date_search,
      specialists_search,
      ava_specialists,
      specialists,
      available_slots_by_date,
      aptTypelist,
      allSpecialists,
      aptTimeRequireList,
      searchAppointmentFormRef,
      searchAppointmentForm,
      searchAppointmentRules,
      search_next_apts,
      x_weeks_list,
      clinic_list,
      tableTitle,
      aptTimeList,
      moment,
      handleSearch,
      handleReset,
      timeStr2Number,
      changeDate,
    };
  },
});
</script>
