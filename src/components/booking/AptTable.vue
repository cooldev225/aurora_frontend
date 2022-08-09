<template>
  <table
    class="table align-middle gs-0 gy-4 my-0 booking-table-header position-sticky top-0 left-0"
    style="z-index: 2"
  >
    <thead>
      <tr class="fw-bolder center-row text-white bg-primary">
        <th
          class="cell-120px border-0"
          style="position: relative; left: 0px"
        ></th>
        <th class="cell-35px border-0"></th>
        <template v-if="_tableData">
          <th
            :colspan="_tableData.length * 4 - 1"
            class="text-xl-left border-0 fw-bold fs-4"
          >
            {{ tableTitle }}
          </th>
        </template>
      </tr>
      <template v-if="_tableData">
        <tr class="bg-light-warning doctor-row text-center text-primary">
          <th class="cell-120px" style="position: relative; left: 0px"></th>
          <th class="cell-35px"></th>
          <template v-for="(item, index) in _tableData" :key="index">
            <th
              :colspan="index === 0 ? 3 : 4"
              class="fw-bolder"
              :style="index === 0 ? 'min-width: 441px' : 'min-width: 476px'"
            >
              <span class="fs-5 d-block">{{ item.name }}</span>
              <span class="fs-8">{{ item.work_hours.locations.name }}</span>
            </th>
          </template>
        </tr>
      </template>
    </thead>
  </table>
  <template v-if="_tableData">
    <div
      style="
        /* max-height: 400px; */
        /* overflow: scroll visible; */
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
                {{ item }}
              </td>
              <template
                v-for="(item_1, index_1) in appointment[item]"
                :key="index_1"
              >
                <td class="cell-35px bg-white">
                  <a
                    class="cursor-pointer"
                    v-if="
                      timeStr2Number(
                        item_1.specialist.work_hours.time_slot[0]
                      ) <= timeStr2Number(item) &&
                      timeStr2Number(
                        item_1.specialist.work_hours.time_slot[1]
                      ) > timeStr2Number(item)
                    "
                    @click="
                      handleAddApt(
                        item_1.specialist,
                        item,
                        aptTimeList[index + 1]
                      )
                    "
                  >
                    <i class="fa fa-plus text-primary"></i>
                  </a>
                </td>
                <template
                  v-for="(item_2, index_2) in item_1.appointment"
                  :key="index_2"
                >
                  <template v-if="item_2.time_length === 4">
                    <td
                      :style="{
                        'min-width':
                          item_1.appointment.length === 2 ? '220px' : '441px',
                      }"
                      :colspan="item_1.appointment.length === 2 ? 1 : 2"
                    ></td>
                  </template>
                  <template v-else-if="item_2.time_length === 0"></template>
                  <template v-else>
                    <td
                      @click="handleEdit(item_2.appointment)"
                      :rowspan="item_2.time_length"
                      :style="{
                        'min-width': '220px',
                        'background-color': item_2.appointment.color,
                      }"
                      :colspan="item_1.appointment.length === 2 ? 1 : 2"
                    >
                      <div
                        class="fw-bold d-flex flex-column justify-content-center align-items-center"
                      >
                        <span class="">
                          {{ item_2.appointment.first_name }}
                          {{ item_2.appointment.last_name }} ({{
                            item_2.appointment.contact_number
                          }})
                        </span>
                        <span>
                          <span
                            v-if="item_2.appointment.allergies"
                            class="badge badge-light-danger opacity-50 mx-2"
                          >
                            ALLERGY
                          </span>
                          <span
                            v-if="
                              item_2.appointment.confirmation_status == 'MISSED'
                            "
                            class="badge badge-warning opacity-50 mx-2"
                          >
                            MISSED
                          </span>
                          <span
                            v-if="
                              item_2.appointment.attendance_status ==
                              'CHECKED_IN'
                            "
                            class="badge badge-success"
                          >
                            CHECKED IN
                          </span>
                          <span
                            v-if="
                              item_2.appointment.attendance_status ==
                              'CHECKED_OUT'
                            "
                            class="opacity-50 badge badge-light-dark disabled"
                          >
                            CHECKED OUT
                          </span>
                        </span>
                      </div>
                    </td>
                  </template>
                </template>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script>
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
import { Modal } from "bootstrap";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "bookings-dashboard",
  props: {
    SPTData: { type: Array, required: true },
    ava_SPTData: { type: Array, required: true },
    Title: { type: String, required: true },
    date: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const _temp_specialists = computed(() => store.getters.getFilteredData);
    const _tableData = ref({});
    const tableTitle = computed(() => props.Title);
    const _ava_specialists = computed(() => props.ava_SPTData);
    const _apt_date = computed(() => props.date);
    const organisation = computed(() => store.getters.orgList);

    const format = ref("YYYY-MM-DD");
    const aptTimeList = ref([]);

    const appointment_length = ref(30);

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const appointment = ref();

    onMounted(() => {
      store.dispatch(Actions.ORG.LIST);
    });

    watch(_tableData, () => {
      let _val = "07:00";
      let _appointment = {};
      aptTimeList.value = [];
      while (timeStr2Number(_val) < timeStr2Number("18:00")) {
        _appointment[_val.toString()] = [];
        if (_tableData.value) {
          for (let i in _tableData.value) {
            let specialist = _tableData.value[i];
            let _temp = [];
            while (_temp.length < 2) {
              let temp = { specialist: specialist, time_length: 4 };
              _temp.push(temp);
            }
            let _data = {
              specialist: specialist,
              appointment: _temp,
            };
            _appointment[_val.toString()].push(_data);
          }
        }
        aptTimeList.value.push(_val);
        _val = moment(_val, "HH:mm")
          .add(appointment_length.value, "minutes")
          .format("HH:mm")
          .toString();
      }
      for (let key in _appointment) {
        if (_tableData.value) {
          for (let i in _tableData.value) {
            let specialist = _tableData.value[i];
            for (let j in specialist.appointments) {
              let _apt = specialist.appointments[j];
              if (timeStr2Number(_apt.start_time) === timeStr2Number(key)) {
                let temp = {
                  appointment: _apt,
                  time_length:
                    _apt.appointment_time === "triple"
                      ? 3
                      : _apt.appointment_time === "double"
                      ? 2
                      : 1,
                };
                let flag = true;
                for (let k in specialist.appointments) {
                  let _apt_temp = specialist.appointments[k];
                  if (
                    (timeStr2Number(_apt_temp.start_time) <=
                      timeStr2Number(_apt.start_time) &&
                      timeStr2Number(_apt_temp.end_time) >
                        timeStr2Number(_apt.start_time)) ||
                    (timeStr2Number(_apt_temp.start_time) <
                      timeStr2Number(_apt.end_time) &&
                      timeStr2Number(_apt_temp.end_time) >
                        timeStr2Number(_apt.end_time))
                  ) {
                    if (_apt_temp.id !== _apt.id) flag = false;
                  }
                }
                if (flag == true) {
                  _appointment[key][i].appointment = [temp];
                } else {
                  if (_appointment[key][i].appointment[0].time_length === 4) {
                    _appointment[key][i].appointment[0] = temp;
                  } else {
                    _appointment[key][i].appointment[1] = temp;
                  }
                }
              } else if (
                timeStr2Number(_apt.start_time) < timeStr2Number(key) &&
                timeStr2Number(_apt.end_time) > timeStr2Number(key)
              ) {
                let temp = {
                  time_length: 0,
                };
                let flag = true;
                for (let k in specialist.appointments) {
                  let _apt_temp = specialist.appointments[k];
                  if (
                    (timeStr2Number(_apt_temp.start_time) <=
                      timeStr2Number(_apt.start_time) &&
                      timeStr2Number(_apt_temp.end_time) >
                        timeStr2Number(_apt.start_time)) ||
                    (timeStr2Number(_apt_temp.start_time) <
                      timeStr2Number(_apt.end_time) &&
                      timeStr2Number(_apt_temp.end_time) >
                        timeStr2Number(_apt.end_time))
                  ) {
                    if (_apt_temp.id !== _apt.id) flag = false;
                  }
                }
                if (flag == true) {
                  _appointment[key][i].appointment = [temp];
                } else {
                  if (_appointment[key][i].appointment[0].time_length === 4) {
                    _appointment[key][i].appointment[0] = temp;
                  } else {
                    _appointment[key][i].appointment[1] = temp;
                  }
                }
              }
            }
          }
        }
      }
      for (let key in _appointment) {
        for (let i in _tableData.value) {
          if (
            _appointment[key][i].appointment[0].time_length === 4 &&
            _appointment[key][i].appointment[1].time_length === 4
          ) {
            _appointment[key][i].appointment.splice(1, 2);
          }
        }
      }
      appointment.value = _appointment;
    });

    watchEffect(() => {
      if (organisation.value.appointment_length)
        appointment_length.value = organisation.value.appointment_length;
      if (_temp_specialists.value) {
        _tableData.value =
          _temp_specialists.value[Object.keys(_temp_specialists.value)[0]];
      }

      if (
        DrawerComponent?.getInstance(
          "booking-drawer"
        )?.isBookingDrawerShown() === true
      ) {
        DrawerComponent?.getInstance("booking-drawer")?.show();
      }
    });

    const handleAddApt = (specialist, startTime, endTime) => {
      const _date = moment(_apt_date.value).format("YYYY-MM-DD").toString();
      const item = {
        time_slot: [_date + "T" + startTime, _date + "T" + endTime],
        date: _date,
        ava_specialist: _ava_specialists,
        selected_specialist: specialist,
      };
      store.commit(Mutations.SET_BOOKING.SELECT, item);
      let cnt = 0;
      for (let i in specialist.appointments) {
        let _apt_temp = specialist.appointments[i];
        if (
          timeStr2Number(_apt_temp.start_time) <= timeStr2Number(startTime) &&
          timeStr2Number(_apt_temp.end_time) > timeStr2Number(startTime)
        )
          cnt++;
      }
      if (cnt >= 1) {
        Swal.fire({
          text: "Are you sure you want to double book this time slot?",
          icon: "info",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.value) {
            const modal = new Modal(
              document.getElementById("modal_create_apt")
            );
            modal.show();
          }
        });
      } else {
        const modal = new Modal(document.getElementById("modal_create_apt"));
        modal.show();
      }
    };

    const handleEdit = (item) => {
      store.commit(Mutations.SET_APT.SELECT, item);
      DrawerComponent?.getInstance("booking-drawer")?.toggle();
    };

    return {
      format,
      _tableData,
      tableTitle,
      handleAddApt,
      handleEdit,
      timeStr2Number,
      aptTimeList,
      appointment,
    };
  },
});
</script>
