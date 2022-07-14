<template>
  <div class="row">
    <div class="card card-flush">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <VueCtkDateTimePicker
              :format="format"
              v-model="_date_search.date"
              inline="false"
              color="#3E7BA0"
              noKeyboard
              onlyDate
            />
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>SPECIALISTS</span>
                </div>
              </div>
              <div class="card-body card-scroll h-350px">
                <div class="d-flex flex-column">
                  <el-checkbox-group
                    v-model="_specialists_search.specialist_ids"
                    class="d-flex flex-column"
                  >
                    <template
                      v-for="(item, index) in _ava_specialists"
                      :key="index"
                    >
                      <el-checkbox size="large" :label="item.id">{{
                        item.name
                      }}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>SEARCH NEXT AVAILABLE APPOINTMENT</span>
                </div>
              </div>
              <div class="card-body card-scroll h-300px">
                <div class="card-info">
                  <el-select
                    class="w-100"
                    placeholder="Select Appointment Type"
                    v-model="_search_next_apts.appointment_type_id"
                  >
                    <el-option
                      v-for="item in _aptTypelist"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </el-select>
                  <el-divider />
                  <div>
                    <el-select
                      class="w-50 p-2"
                      placeholder="Select Clinic"
                      v-model="_search_next_apts.clinic_id"
                    >
                      <el-option value="" label="Any Clinic" />
                      <el-option
                        v-for="item in _clinic_list"
                        :value="item.id"
                        :label="item.name"
                        :key="item.id"
                      />
                    </el-select>
                    <el-select
                      class="w-50 p-2"
                      placeholder="Select Specialist"
                      v-model="_search_next_apts.specialist_id"
                      filterable
                    >
                      <el-option value="" label="Any Specialist" />
                      <el-option
                        v-for="item in _allSpecialists"
                        :value="item.id"
                        :label="item.name"
                        :key="item.id"
                      />
                    </el-select>
                  </div>
                  <el-divider />
                  <div>
                    <el-select
                      class="w-50 p-2"
                      placeholder="Select Appointment Time Requirement"
                      v-model="_search_next_apts.time_requirement"
                    >
                      <el-option
                        v-for="item in _aptTimeRequireList"
                        :value="item.id"
                        :label="item.title"
                        :key="item.id"
                      />
                    </el-select>
                    <el-select
                      class="w-50 p-2"
                      placeholder="Select Time frame"
                      v-model="_search_next_apts.x_weeks"
                    >
                      <el-option
                        v-for="item in _x_weeks"
                        :value="index"
                        :label="item"
                        :key="item.id"
                      />
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-md-between gap-2">
              <button class="btn btn-primary mt-2 w-100" @click="handleSearch">
                SEARCH
              </button>
              <button
                class="btn btn-light-primary w-100 mt-2"
                @click="handleReset"
              >
                CLEAR FILTERS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-5">
    <div class="card-body">
      <div class="scroll h-500px">
        <div class="d-flex flex-column">
          <template v-for="(item, key) in _specialists" :key="key">
            <AptTable
              :ava_SPTData="item"
              :date="moment(key.toString()).format('YYYY-MM-DD')"
              :SPTData="item"
              :Title="moment(key.toString()).format('dddd, MMMM Do YYYY')"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <CreateModal></CreateModal>
  <AppointmentListPopup
    :available_slots_by_date="_available_slots_by_date"
    :allSpecialists="_allSpecialists"
  />
  <!-- <EditModal></EditModal> -->
</template>
<script>
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppointmentListPopup from "@/components/booking/AppointmentListPopup.vue";
import CreateModal from "@/components/booking/CreateApt.vue";
// import EditModal from "@/components/booking/EditApt.vue";
import AptTable from "@/components/booking/AptTable.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { aptTimeList } from "@/core/data/apt-time";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
    CreateModal,
    // EditModal,
    AptTable,
    AppointmentListPopup,
  },
  setup() {
    const store = useStore();
    const format = ref("YYYY-MM-DD");
    const _date_search = reactive({
      date: new Date(),
    });
    const _specialists_search = reactive({
      specialist_ids: [],
    });
    const _search_next_apts = reactive({
      appointment_type_id: "",
      specialist_id: "",
      time_requirement: "",
      x_weeks: "",
      clinic_id: "",
    });
    const _ava_specialists = computed(() => store.getters.getAvailableSPTData);
    const _specialists = computed(() => store.getters.getFilteredData);
    const _x_weeks = ref({
      0: "this week",
      1: "After a week",
      2: "After 2 weeks",
      3: "After 3 weeks",
      4: "After 4 weeks",
      5: "After 5 weeks",
      6: "After 6 weeks",
      7: "After 7 weeks",
    });
    const _available_slots_by_date = computed(
      () => store.getters.getAvailableAppointmentList
    );
    const _aptTypelist = computed(() => store.getters.getAptTypesList);
    const _allSpecialists = computed(() => store.getters.getSpecialistList);
    const _aptTimeRequireList = computed(
      () => store.getters.getAptTimeRequireList
    );
    const _clinic_list = computed(() => store.getters.clinicsList);
    const tableTitle = ref("");

    onMounted(() => {
      store.dispatch(Actions.BOOKING.SEARCH.DATE, {
        ..._date_search,
        ..._specialists_search,
      });
      store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
        ..._date_search,
        ..._specialists_search,
      });
      setCurrentPageBreadcrumbs("Dashboard", ["Bookings"]);
      store.dispatch(Actions.APT.TYPES.LIST);
      store.dispatch(Actions.SPECIALIST.LIST);
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
      store.dispatch(Actions.CLINICS.LIST);
      tableTitle.value = moment(_date_search.date).format("dddd, MMMM Do YYYY");
    });

    // const handleAddApt = (specialist, startTime, endTime) => {
    //   const item = {
    //     time_slots: [
    //       moment(_date_search.date).format("YYYY-MM-DD") + "T" + startTime,
    //       moment(_date_search.date).format("YYYY-MM-DD") + "T" + endTime,
    //     ],
    //     date: moment(_date_search.date).format("YYYY-MM-DD"),
    //     ava_specialist: _ava_specialists,
    //     selected_specialist: specialist,
    //   };
    //   store.commit(Mutations.SET_BOOKING.SELECT, item);
    //   const modal = new Modal(document.getElementById("modal_create_apt"));
    //   modal.show();
    // };

    // const handleEdit = (item, specialist) => {
    //   const data = {
    //     ava_specialist: _ava_specialists,
    //     selected_specialist: specialist,
    //   };
    //   store.commit(Mutations.SET_BOOKING.SELECT, data);
    //   store.commit(Mutations.SET_APT.SELECT, item);
    //   const modal = new Modal(document.getElementById("modal_edit_apt"));
    //   modal.show();
    // };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const handleSearch = async () => {
      await store.dispatch(Actions.BOOKING.SEARCH.NEXT_APT, {
        ..._search_next_apts,
      });

      const modal = new Modal(
        document.getElementById("modal_available_time_slot_popup")
      );

      modal.show();
    };

    const handleReset = () => {
      _specialists_search.specialist_ids = [];
      _date_search.date = new Date();

      _search_next_apts.appointment_type_id = "";
      _search_next_apts.x_weeks = "";
      _search_next_apts.clinic_id = "";
      _search_next_apts.specialist_id = "";
      _search_next_apts.time_requirement = "";
    };

    watch(_date_search, () => {
      store.dispatch(Actions.BOOKING.SEARCH.DATE, {
        ..._date_search,
        specialists: [],
      });
      // _specialists_search.specialist_ids = [];
      tableTitle.value = moment(_date_search.date).format("dddd, MMMM Do YYYY");
    });

    watch(_ava_specialists, () => {
      let temp = [];
      _ava_specialists.value.forEach((item) => {
        _specialists_search.specialist_ids.forEach((selected) => {
          if (item.id === selected) temp.push(item);
        });
      });
      if (temp.length === 0) temp = _ava_specialists.value;
      const data = ref({});
      const data_key = moment(_date_search.date)
        .format("YYYY-MM-DD")
        .toString();
      data.value[data_key] = temp;
      store.commit(Mutations.SET_BOOKING.SEARCH.SPECIALISTS, data.value);
    });

    watch(_specialists_search, () => {
      let temp = [];
      console.log(_ava_specialists.value);
      _ava_specialists.value.forEach((item) => {
        _specialists_search.specialist_ids.forEach((selected) => {
          if (item.id === selected) temp.push(item);
        });
      });
      if (_specialists_search.specialist_ids.length === 0)
        temp = _ava_specialists.value;
      const data = ref({});
      const data_key = moment(_date_search.date)
        .format("YYYY-MM-DD")
        .toString();
      data.value[data_key] = temp;
      store.commit(Mutations.SET_BOOKING.SEARCH.SPECIALISTS, data.value);
      // store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
      // store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
      //   ..._date_search,
      //   ..._specialists_search,
      // });
    });

    return {
      format,
      _date_search,
      _specialists_search,
      _ava_specialists,
      _specialists,
      _available_slots_by_date,
      _aptTypelist,
      _allSpecialists,
      _aptTimeRequireList,
      _search_next_apts,
      _x_weeks,
      _clinic_list,
      tableTitle,
      handleSearch,
      handleReset,
      moment,
      timeStr2Number,
      aptTimeList,
    };
  },
});
</script>

<style>
.cell-35px {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
}

.cell-120px {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
}

.booking-table-body td,
.booking-table-body th {
  border: 0.5px dashed gray;
}

.booking-table-header tr:first-child th:first-child {
  border-radius: 10px 0 0 0;
}

.booking-table-header tr:first-child th:last-child {
  border-radius: 0 10px 0 0;
}
</style>
