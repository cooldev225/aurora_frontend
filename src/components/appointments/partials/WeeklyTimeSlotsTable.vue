<template>
  <div class="timeslot-table mt-5 d-flex" v-loading="loading">
    <div class="arrow left d-flex align-items-center">
      <InlineSVG v-if="tableData.cur_week" icon="left" @click="moveDate(-1)" />
    </div>
    <!-- <div class="table-content d-flex flex-column">
      <div class="table-header d-flex justify-content-between">
        <div
          class="text-center d-flex flex-column"
          v-for="(cell, index) in tableData?.header"
          :key="index"
        >
          <span class="header-cell fw-bold">{{ cell.label }}</span>
          <span class="header-cell fw-bold">{{ cell.date }}</span>
        </div>
      </div>
      <div class="table-body d-flex justify-content-between">
        <div
          class="text-center d-flex flex-column"
          v-for="(cell, index) in tableData?.header"
          :key="index"
        >
          <div class="mt-5 table-cell" v-if="availableSlotsByDate">
            <span>{{ "08:00" }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="table-content scroll h-500px">
      <template v-if="availableSlotsByDate">
        <div class="row justify-content-center">
          <div
            :class="getClass(date)"
            v-for="date in availableSlotsByDate"
            :key="date"
          >
            <h3
              class="py-3 position-fixed border-bottom border-bottom-dashed border-bottom-primary"
              style="
                background: white;
                border-bottom: solid black 2px;
                padding-right: 50px;
                text-align: center;
              "
            >
              {{ date.day }} <br />{{ moment(date.date).format("DD/MM") }}
            </h3>
            <div class="mt-20">
              <template
                v-for="time_slot in date.available_timeslots"
                :key="time_slot"
              >
                <div
                  class="mt-3 justify-content-center align-items-center mw-250 text-wrap"
                >
                  <span
                    class="w-100 h-100 fw-bold d-block cursor-pointer fs-3 mb-1"
                    style="color: var(--el-color-primary)"
                    data-kt-drawer-toggle="true"
                    data-kt-drawer-target="#kt_drawer_chat"
                    @click="
                      handleAddApt(
                        time_slot.specialist_id,
                        date.date,
                        time_slot.time
                      )
                    "
                  >
                    {{ time_slot.time }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="arrow right d-flex align-items-center">
      <InlineSVG
        v-if="tableData.cur_week < props.search.x_weeks"
        icon="right"
        @click="moveDate(1)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.timeslot-table {
  font-size: 16px;
  width: 100%;
  .table-content {
    overflow-x: hidden;
    width: calc(100%);
    background-color: aliceblue;
    .table-header {
      background-color: white;
      padding-bottom: 10px;
    }
    .table-body {
      .table-cell {
        color: blue;
      }
    }
  }
  .arrow {
    width: 25px;
    svg {
      cursor: pointer;
    }
  }
}
</style>

<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";

export default defineComponent({
  name: "weekly-timeslots-apt-table",
  components: {},
  props: {
    search: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();
    const loading = ref(false);
    const search_params = ref(false);
    const availableSlotsByDate = computed(
      () => store.getters.getAvailableAppointmentList
    );
    const tableData = ref({
      weeks: 1,
      cur_week: 0,
      cur_date: new Date(),
      end_date: moment().add(props.weeks, "weeks"),
      header: [],
    });
    var weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    //   watch(aptData, () => {
    //     //
    //   });
    watch(props.search, () => {
      //
    });

    onMounted(() => {
      search_params.value = props.search;
      moveDate(0);
    });

    const moveDate = async (dir) => {
      loading.value = true;
      tableData.value.cur_week += dir;
      tableData.value.cur_date = new Date(
        moment().add(tableData.value.cur_week, "weeks")
      );
      let header = [];
      for (var i = 0; i < 7; i++) {
        let date = new Date(moment(tableData.value.cur_date).add(i, "days"));
        let data = {
          label: weeks[date.getDay()],
          date: moment(date).format("DD/MM"),
        };
        header.push(data);
      }
      tableData.value.header = header;

      console.log(search_params.value);
      search_params.value.date = "12/10/2022"; //moment(tableData.value.cur_date).format(
      //     "DD/MM/YYYY"
      //   );
      await store
        .dispatch(AppointmentActions.BOOKING.SEARCH.NEXT_APT, {
          ...search_params.value,
        })
        .finally(() => {
          setTimeout(() => {
            loading.value = false;
          }, 1000);
        });
    };

    const getClass = (date) => {
      var flag = moment(date.date, "YYYY-MM-DD").diff(
        moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")
      );
      if (flag >= 0) return "col";
      else return "col bg-light bg-gradient";
    };

    const handleAddApt = (specialist_ids, date, startTime) => {
      let apt = {
        //
      };
      store.commit(AppointmentMutations.SET_APT.SELECT, apt);
    };

    return {
      props,
      loading,
      tableData,
      moveDate,
      availableSlotsByDate,
      getClass,
      moment,
      handleAddApt,
    };
  },
});
</script>
