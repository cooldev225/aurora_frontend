<template>
  <div class="timeslot-table mt-5 d-flex">
    <div class="arrow left d-flex align-items-center">
      <InlineSVG v-if="tableData.cur_week" icon="left" @click="moveDate(-1)" />
    </div>
    <div class="table-content d-flex flex-column">
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
          <div class="mt-5 table-cell">
            <span>{{ "08:00" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow right d-flex align-items-center">
      <InlineSVG
        v-if="tableData.cur_week < props.weeks"
        icon="right"
        @click="moveDate(1)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.timeslot-table {
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  .table-content {
    width: calc(100% - 50px);
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

export default defineComponent({
  name: "weekly-timeslots-apt-table",
  components: {},
  props: {
    weeks: { type: Number },
  },
  setup(props) {
    const loading = ref(false);
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
    onMounted(() => {
      moveDate(0);
    });

    const moveDate = (dir) => {
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
    };

    return {
      props,
      loading,
      tableData,
      moveDate,
    };
  },
});
</script>
