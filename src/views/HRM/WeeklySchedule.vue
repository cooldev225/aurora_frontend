<template>
  <div class="hrm-filter-container">
    <div class="filter-selector">
      <p>Clinic</p>
      <el-select placeholder="Select Clinic" v-model="clinicFilter">
        <template v-for="clinic in clinics" :key="clinic.value">
          <el-option :value="clinic.id" :label="clinic.name">
            {{ clinic.name }}
          </el-option>
        </template>
      </el-select>
      <p>Employee Type</p>
      <el-select
        v-model="selectedEmployees"
        multiple
        placeholder="Select Employee"
        style="width: 240px"
      >
        <el-option
          v-for="type in employeeTypeList"
          :key="type.id"
          :label="type.name"
          :value="type.id"
        />
      </el-select>
    </div>
    <div style="padding-left: 10px; display: flex">
      <button @click="setDate(1)">Previous Week</button>
      <span> {{ displayDateRange }} </span>
      <button @click="setDate(2)">Next week</button>
      <button>fill the template</button>
    </div>

    <!--    <div class="filter-selector">-->
    <!--      <p>Display</p>-->
    <!--      <el-select-->
    <!--        v-model="selectedFilters"-->
    <!--        multiple-->
    <!--        placeholder="Select Filters"-->
    <!--        style="width: 240px"-->
    <!--      >-->
    <!--        <el-option-->
    <!--          v-for="item in filterOptions"-->
    <!--          :key="item.value"-->
    <!--          :label="item.label"-->
    <!--          :value="item.value"-->
    <!--        /s>-->
    <!--      </el-select>-->
    <!--    </div>-->
  </div>
  <HRMTimeScheduleTable
    :selectedFilters="selectedFilters"
    :employeeList="employeeList"
    :clinicFilter="clinicFilter"
  />
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import HRMTimeScheduleTable from "@/components/HRM/HRMWeeklyScheduleTable";
import { Discount } from "@element-plus/icons-vue";
import moment from "moment";
import { HRMActions } from "@/store/enums/StoreHRMEnums";

export default defineComponent({
  name: "hrm-weekly-schedule",
  components: {
    HRMTimeScheduleTable,
  },

  setup() {
    const store = useStore();
    const clinicFilter = ref();
    const selectedFilters = ref(["time", "anesthetist", "clinic"]);
    const selectedEmployees = ref([]);
    const filterOptions = ref([
      {
        value: "time",
        label: "Time",
      },
      {
        value: "clinic",
        label: "Clinic",
      },
      {
        value: "anesthetist",
        label: "Anesthetist",
      },
    ]);
    const dateRange = ref({
      startDate: null,
      endDate: null,
    });
    const clinics = computed(() => store.getters.clinicsList);
    const employeeList = computed(() => {
      const allEmployees = store.getters.employeeList;
      let filteredList = [];
      if (selectedEmployees.value.length > 0) {
        allEmployees.filter((employee) => {
          selectedEmployees.value.map((role) => {
            if (employee.role_id === role) {
              filteredList.push(employee);
              return employee;
            }
          });
        });
        return filteredList;
      } else return allEmployees;
    });
    const employeeTypeList = computed(() => {
      const allEmployees = store.getters.employeeList;
      let list = [];
      allEmployees.map((employee) => {
        if (!list.includes(employee)) list.push(employee.role);
      });
      const uniqueArray = list.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          list.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });
      return uniqueArray;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Weekly Schedule Template", ["HRM"]);
      store.dispatch(Actions.CLINICS.LIST);
      setDate(0);
    });

    watch(clinics, () => {
      if (clinics.value.length) {
        clinicFilter.value = clinics.value[0].id;
      }
    });

    const setDate = (x) => {
      switch (x) {
        case 0:
          dateRange.value.startDate = moment().startOf("isoWeek");
          dateRange.value.endDate = moment().endOf("isoWeek");
          break;
        case 1:
          dateRange.value.startDate = moment(dateRange.value.startDate)
            .startOf("isoWeek")
            .subtract("days", 7);
          dateRange.value.endDate = moment(dateRange.value.endDate)
            .endOf("isoWeek")
            .subtract("days", 7);
          break;
        case 2:
          dateRange.value.startDate = moment(dateRange.value.startDate)
            .startOf("isoWeek")
            .add("days", 7);
          dateRange.value.endDate = moment(dateRange.value.endDate)
            .endOf("isoWeek")
            .add("days", 7);
          break;
      }
      store.dispatch(HRMActions.WEEKLY_TEMPLATE.LIST, {
        date: moment(dateRange.value.startDate).format("YYYY-MM-DD"),
      });
      console.log(dateRange.value);
    };

    const displayDateRange = computed(() => {
      let result;
      result = moment(dateRange.value.startDate, "MM")
        .format("DD MMM")
        .toString();
      result += " - ";
      result += moment(dateRange.value.endDate, "MM")
        .format("DD MMM")
        .toString();
      return result;
    });
    return {
      clinics,
      clinicFilter,
      employeeList,
      filterOptions,
      selectedFilters,
      selectedEmployees,
      employeeTypeList,
      displayDateRange,
      setDate,
    };
  },
});
</script>
