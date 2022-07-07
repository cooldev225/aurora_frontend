<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />
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
                    placeholder="Select Appintment Type"
                    v-model="_search_next_apts.appointment_type_id"
                  >
                    <template v-for="(item, idx) in _aptTypelist" :key="idx">
                      <el-option :value="item.id" :label="item.name" />
                    </template>
                  </el-select>
                  <el-divider />
                  <el-select
                    class="w-100"
                    placeholder="Select Specialist"
                    v-model="_search_next_apts.specialist_ids"
                    multiple
                    filterable
                  >
                    <template
                      v-for="(item, index) in _allSpecialists"
                      :key="index"
                    >
                      <el-option :value="item.id" :label="item.name" />
                    </template>
                  </el-select>
                  <el-divider />
                  <el-select
                    class="w-100"
                    placeholder="Select Appintment Time Requirement"
                    v-model="_search_next_apts.time_requirement"
                  >
                    <template
                      v-for="(item, idx) in _aptTimeRequireList"
                      :key="idx"
                    >
                      <el-option :value="item.id" :label="item.title" />
                    </template>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-md-between gap-2">
              <button class="btn btn-primary mt-2 w-100" @click="handleSearch">
                SEARCH
              </button>
              <button class="btn btn-light-primary w-100 mt-2">
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
        <div class="d-flex flex-row" style="width: min-content">
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
  <div
    class="d-flex justify-content-xxl-evenly justify-content-xl-between mt-5"
  >
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen056.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> BOOK </span>
          <span class="text-gray-400 fw-bold fs-6">ANAESTHETIST</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-success border border-success shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen055.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> EDIT </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen027.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> CANCEL </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
  </div>
  <CreateModal></CreateModal>
  <EditModal></EditModal>
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
import CreateModal from "@/components/booking/CreateApt.vue";
import EditModal from "@/components/booking/EditApt.vue";
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
import KTLoader from "@/components/Loader.vue";
import { loaderEnabled, loaderLogo } from "@/core/helpers/config";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
    CreateModal,
    EditModal,
    AptTable,
    KTLoader,
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
      specialist_ids: "",
      time_requirement: "",
    });
    const _ava_specialists = computed(() => store.getters.getAvailableSPTData);
    const _specialists = computed(() => store.getters.getFilteredData);
    // const _specialists = ref({});
    const _aptTypelist = computed(() => store.getters.getAptTypeList);
    const _allSpecialists = computed(() => store.getters.getSpecialistList);
    const _aptTimeRequireList = computed(
      () => store.getters.getAptTimeRequireList
    );
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
      store.dispatch(Actions.APT.TYPE_LIST);
      store.dispatch(Actions.SPECIALIST.LIST);
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
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
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
      await store.dispatch(Actions.BOOKING.SEARCH.NEXT_APT, {
        ..._search_next_apts,
      });
    };

    watch(_date_search, () => {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
      store.dispatch(Actions.BOOKING.SEARCH.DATE, {
        ..._date_search,
        specialists: [],
      });
      _specialists_search.specialist_ids = [];
      tableTitle.value = moment(_date_search.date).format("dddd, MMMM Do YYYY");
      setTimeout(() => {
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      }, 700);
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
      console.log(data.value);
      store.commit(Mutations.SET_BOOKING.SEARCH.SPECIALISTS, data.value);
      // store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
      // store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
      //   ..._date_search,
      //   ..._specialists_search,
      // });
    });

    watch(_specialists, () => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
    });

    return {
      format,
      _date_search,
      _specialists_search,
      _ava_specialists,
      _specialists,
      _aptTypelist,
      _allSpecialists,
      _aptTimeRequireList,
      _search_next_apts,
      tableTitle,
      handleSearch,
      moment,
      loaderLogo,
      loaderEnabled,
      // handleAddApt,
      // handleEdit,
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
