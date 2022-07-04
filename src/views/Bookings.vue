<template>
  <div class="row">
    <div class="card card-flush">
      <div class="card-header">
        <div class="card-title">
          <span>SEARCH NEXT AVAILABLE APPOINTMENT</span>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-2">
          <el-select
            class="col-4"
            v-model="procedure"
            placeholder="Select Procedure Type/Consultation"
          ></el-select>
        </div>
        <div class="row">
          <div class="col-md-4">
            <VueCtkDateTimePicker
              :format="format"
              v-model="_date_search.date"
              inline="false"
              noKeyboard
              onlyDate
            />
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>AVAILABLE SPECAILIST</span>
                </div>
              </div>
              <div class="card-body card-scroll h-300px">
                <div class="d-flex flex-column">
                  <el-checkbox-group
                    v-model="_specialists_search.specialists"
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
            <button class="btn btn-primary w-100 mt-2" @click="handleSearch">
              SEARCH
            </button>
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>SPECAILIST REQUIREMENTS</span>
                </div>
              </div>
              <div class="card-body card-scroll h-300px">
                <div class="d-flex flex-column">
                  <el-checkbox size="large" label="DR AARON THORNTON" />
                  <el-checkbox size="large" label="DR ANTONY JACOB" />
                </div>
              </div>
            </div>
            <button class="btn btn-light-primary w-100 mt-2">
              CLEAR FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-5">
    <div class="card-body">
      <div style="overflow-x: scroll">
        <table class="table align-middle gs-0 gy-4 my-0 booking-table-header">
          <thead>
            <tr
              class="fw-bolder center-row text-white"
              style="background: #1e90ff"
            >
              <th
                class="cell-120px border-0"
                style="position: relative; left: 0px"
              ></th>
              <th class="cell-35px border-0"></th>
              <th
                :colspan="_specialists.length * 2 - 1"
                class="text-xxl-center text-xl-left border-0"
              >
                Casey Day Procedure & Specialist Centre (Mon, Jun 27)
              </th>
            </tr>
            <tr class="bg-light-warning doctor-row text-center text-primary">
              <th class="cell-120px" style="position: relative; left: 0px"></th>
              <th class="cell-35px"></th>
              <template v-for="(item, index) in _specialists" :key="index">
                <th
                  :colspan="index === 0 ? 1 : 2"
                  class="fw-bolder"
                  :style="index === 0 ? 'min-width: 441px' : 'min-width: 476px'"
                >
                  <span class="fs-5 d-block">{{ item.name }}</span>
                  <span class="fs-8">{{ item.work_hours.locations.name }}</span>
                </th>
              </template>
            </tr>
          </thead>
        </table>
        <div
          style="
            max-height: 400px;
            overflow: scroll visible;
            width: max-content;
            min-width: 100%;
          "
        >
          <table
            class="booking-table-body table align-middle gs-0 gy-4 my-0 bg-light"
          >
            <tbody>
              <template v-for="(item, index) in aptTimeList" :key="index">
                <tr class="text-center">
                  <td
                    class="cell-120px bg-white"
                    style="position: relative; left: 0px"
                  >
                    {{ item.value }}
                  </td>
                  <template
                    v-for="(item_1, index_1) in _specialists"
                    :key="index_1"
                  >
                    <td class="cell-35px bg-white">
                      <a
                        class="cursor-pointer"
                        v-if="
                          timeStr2Number(item_1.work_hours.time_slot[0]) <=
                            item.number &&
                          timeStr2Number(item_1.work_hours.time_slot[1]) >
                            item.number
                        "
                        @click="
                          handleAddApt(
                            item_1,
                            item.value,
                            aptTimeList[index + 1].value
                          )
                        "
                      >
                        <i class="fa fa-plus text-primary"></i>
                      </a>
                    </td>
                    <td style="min-width: 441px">
                      <template
                        v-for="(item_2, idx_2) in item_1.appointments"
                        :key="idx_2"
                      >
                        <span
                          v-if="
                            timeStr2Number(item_2.start_time) <= item.number &&
                            timeStr2Number(item_2.end_time) > item.number
                          "
                          class="text-primary fw-bold d-block cursor-pointer"
                          @click="handleEdit(item_2, item_1)"
                          >{{ item_2.first_name }} {{ item_2.last_name }}
                          {{ item_2.mobile_number }}</span
                        >
                      </template>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
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
import { defineComponent, ref, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CreateModal from "@/components/booking/CreateApt.vue";
import EditModal from "@/components/booking/EditApt.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { aptTimeList } from "@/core/data/apt-time";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
    CreateModal,
    EditModal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const format = ref("YYYY-MM-DD");
    const _date_search = reactive({
      date: new Date(),
    });
    const _specialists_search = reactive({
      specialists: [],
    });
    const _ava_specialists = ref([]);
    const _specialists = ref([]);

    onMounted(() => {
      getAvaSpecialist();
      handleSearch();
    });

    const handleAddApt = (specialist, startTime, endTime) => {
      const item = {
        time_slots: [
          _date_search.date.toISOString().slice(0, 10) + "T" + startTime,
          _date_search.date.toISOString().slice(0, 10) + "T" + endTime,
        ],
        ava_specialist: _ava_specialists,
        selected_specialist: specialist,
      };
      store.commit(Mutations.SET_BOOKING.SELECT, item);
      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();
    };

    const handleEdit = (item, specialist) => {
      const data = {
        ava_specialist: _ava_specialists,
        selected_specialist: specialist,
      };
      store.commit(Mutations.SET_BOOKING.SELECT, data);
      store.commit(Mutations.SET_APT.SELECT, item);
      const modal = new Modal(document.getElementById("modal_edit_apt"));
      modal.show();
    };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const handleSearch = () => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.query("work-hours", {
          params: { ..._date_search, ..._specialists_search },
        })
          .then(({ data }) => {
            _specialists.value = data.data;
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            // this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    };

    const getAvaSpecialist = () => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.query("work-hours", { params: _date_search })
          .then(({ data }) => {
            _ava_specialists.value = data.data;
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            // this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    };

    watch(_date_search, () => {
      getAvaSpecialist();
    });

    return {
      format,
      _date_search,
      _specialists_search,
      _ava_specialists,
      _specialists,
      handleSearch,
      handleAddApt,
      handleEdit,
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
  border: 1px dashed gray;
}

.booking-table-header tr:first-child th:first-child {
  border-radius: 50px 0 0 0;
}

.booking-table-header tr:first-child th:last-child {
  border-radius: 0 50px 0 0;
}
</style>
