<template>
  <div>
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
          <template v-if="_specialists">
            <th
              :colspan="_specialists.length * 2 - 1"
              class="text-xl-left border-0 fw-bold fs-4"
            >
              {{ tableTitle }}
            </th>
          </template>
        </tr>
        <template v-if="_specialists">
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
        </template>
      </thead>
    </table>
    <template v-if="_specialists">
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
                      <template
                        v-if="
                          timeStr2Number(item_2.start_time) <= item.number &&
                          timeStr2Number(item_2.end_time) > item.number
                        "
                      >
                        <div
                          class="d-flex justify-content-center align-items-center"
                        >
                          <span
                            class="text-primary w-100 h-100 fw-bold d-block cursor-pointer fs-5"
                            data-kt-drawer-toggle="true"
                            data-kt-drawer-target="#kt_drawer_chat"
                            @click="handleEdit(item_2, item_1)"
                          >
                            {{ item_2.first_name }} {{ item_2.last_name }} ({{
                              item_2.contact_number
                            }})
                          </span>
                        </div>
                      </template>
                    </template>
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { aptTimeList } from "@/core/data/apt-time";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";

export default defineComponent({
  name: "bookings-dashboard",
  props: {
    SPTData: { type: Array, required: true },
    ava_SPTData: { type: Array, required: true },
    Title: { type: String, required: true },
    date: { type: String, required: true },
  },
  setup(props) {
    const _specialists = computed(() => props.SPTData);
    const tableTitle = computed(() => props.Title);
    const _ava_specialists = computed(() => props.ava_SPTData);
    const _apt_date = computed(() => props.date);
    const store = useStore();
    const format = ref("YYYY-MM-DD");

    const handleAddApt = (specialist, startTime, endTime) => {
      const _date = moment(_apt_date.value).format("YYYY-MM-DD").toString();
      const item = {
        time_slots: [_date + "T" + startTime, _date + "T" + endTime],
        date: _date,
        ava_specialist: _ava_specialists,
        selected_specialist: specialist,
      };
      store.commit(Mutations.SET_BOOKING.SELECT, item);
      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();
    };

    const handleEdit = (item, specialist) => {
      // const data = {
      //   ava_specialist: _ava_specialists,
      //   selected_specialist: specialist,
      // };
      // store.commit(Mutations.SET_BOOKING.SELECT, specialist);
      // const modal = new Modal(document.getElementById("modal_edit_apt"));
      // modal.show();
      store.commit(Mutations.SET_APT.SELECT, item);
      DrawerComponent?.getInstance("booking-drawer")?.toggle();
    };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    return {
      format,
      _specialists,
      tableTitle,
      handleAddApt,
      handleEdit,
      timeStr2Number,
      aptTimeList,
    };
  },
});
</script>
