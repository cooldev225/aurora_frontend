<template>
  <el-select
    class="w-100 mb-6"
    placeholder="Select Clinic"
    v-model="clinicFilter"
  >
    <template v-for="clinic in clinics" :key="clinic.value">
      <el-option :value="clinic.id" :label="clinic.name">
        {{ clinic.name }}
      </el-option>
    </template>
  </el-select>
  <CardSection>
    <table class="w-100">
      <thead>
        <th>Employee Type</th>
        <th v-for="day in weekdays" :key="day.value">
          {{ day.label }}
        </th>
      </thead>
      <tbody>
        <tr
          class="min-h-100px"
          v-for="employee in employeeList"
          :key="employee"
        >
          <td
            @click="handleEditTemplate(employee)"
            class="d-flex text-hover-primary cursor-pointer background-hover-light-primary flex-column"
          >
            <span class="svg-icon absolute text-white svg-icon-4 me-1">
              <InlineSVG icon="pencil" />
            </span>
            {{ employee.full_name }}<br />
            ({{
              employeeRoles.filter((x) => x.value == employee.role_id)[0].label
            }})
          </td>

          <td v-for="day in weekdays" :key="day.id">
            <div
              @click="handleEditTemplateTimeslots(employee, day)"
              class="d-flex flex-column rounded min-h-150px min-w-100px cursor-pointer bg-hover-primary bg-light-primary p-3"
            >
              <span
                class="svg-icon absolute text-light-primary svg-icon-4 me-1"
              >
                <InlineSVG icon="pencil" />
              </span>
              <template
                v-for="timeslot in employee.schedule_timeslots.filter(
                  (x) => x.week_day == day.value
                )"
                :key="timeslot.id"
              >
                <span
                  class="p-2"
                  :class="
                    clinicFilter == timeslot.clinic_id
                      ? 'bg-primary text-light'
                      : ''
                  "
                >
                  {{ moment(timeslot.start_time, "hh:ss").format("hh:ss") }} -
                  {{ moment(timeslot.end_time, "hh:ss").format("hh:ss") }}
                  <span> ({{ timeslotClinicName(timeslot) }})</span></span
                >
              </template>
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="8">
            <LargeIconButton
              :heading="'Add new Schedule'"
              :iconPath="'media/icons/duotune/abstract/abs011.svg'"
              :color="'success'"
              @click="handleAddTemplate()"
              iconSize="3"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </CardSection>
  <EditModal></EditModal>
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import { Actions } from "@/store/enums/StoreEnums";
import weekdays from "@/core/data/weekdays";
import employeeRoles from "@/core/data/employee-roles";
import moment from "moment";
import { Modal } from "bootstrap";
import EditModal from "@/views/HRM/EditWeeklyScheduleModal.vue";

export default defineComponent({
  name: "hrm-weekly-schedule-template",
  components: {
    EditModal,
  },
  setup() {
    const store = useStore();
    const scheduleTemplates = computed(() => store.getters.hrmScheduleList);
    const employeeList = computed(() => store.getters.employeeList);
    const clinics = computed(() => store.getters.clinicsList);
    const clinicFilter = ref();
    const tableData = ref();
    onMounted(() => {
      setCurrentPageBreadcrumbs("Weekly Schedule Template", ["HRM"]);
      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.EMPLOYEE.LIST);
    });

    watch(clinics, () => {
      if (clinics.value.length) {
        clinicFilter.value = clinics.value[0].id;
      }
    });

    watch(scheduleTemplates, () => {
      //let add_data = tableData.value?.filter((t) => t.id == -1);
      tableData.value = scheduleTemplates.value;
      //if (add_data?.length) tableData.value.push(add_data);
    });

    const handleEditTemplateTimeslots = (schedule, day) => {
      schedule._title = "Edit Time Slot - " + day.label;
      schedule._action = "edit_weekly_time";
      schedule._submit = HRMActions.SCHEDULE_TEMPLATE.CREATE;
      schedule.clinic_id = clinicFilter.value;
      if (schedule.id) schedule._submit = HRMActions.SCHEDULE_TEMPLATE.UPDATE;
      schedule._day = day.value;

      store.commit(HRMMutations.SCHEDULE_TEMPLATE.SET_SELECT, schedule);
      let timeslots = schedule.schedule_timeslots.filter(
        (t) => t.week_day == schedule._day
      );
      if (!timeslots.length) {
        timeslots = [];
      }
      store.commit(HRMMutations.SCHEDULE_TEMPLATE.SET_TIMESLOT, timeslots);
      const modal = new Modal(document.getElementById("modal_edit_schedule"));
      modal.show();
    };

    const handleEditTemplate = (schedule) => {
      schedule._title = "Edit Employee Type";
      schedule._action = "edit_employee_type";
      schedule._submit = HRMActions.SCHEDULE_TEMPLATE.CREATE;
      if (schedule.id) schedule._submit = HRMActions.SCHEDULE_TEMPLATE.UPDATE;
      store.commit(HRMMutations.SCHEDULE_TEMPLATE.SET_SELECT, schedule);
      const modal = new Modal(document.getElementById("modal_edit_schedule"));
      modal.show();
    };

    const handleAddTemplate = () => {
      let schedule = {
        clinic_id: clinicFilter.value,
        role_id: "",
        user_id: null,
        timeslots: [],
      };
      /*schedule._title = "Add Schedule";
      schedule._action = "add_schedule";
      schedule._submit = HRMActions.SCHEDULE_TEMPLATE.CREATE;
      store.commit(HRMMutations.SCHEDULE_TEMPLATE.SET_SELECT, schedule);
      const modal = new Modal(document.getElementById("modal_edit_schedule"));
      modal.show();*/
      tableData.value.push(schedule);
    };

    const timeslotClinicName = (timeslot) => {
      let clinicName = null;
      if (timeslot) {
        clinicName = clinics.value
          .filter((x) => x.id == timeslot.clinic_id)[0]
          .name.split(" ")[0];
      }
      return clinicName;
    };

    return {
      scheduleTemplates,
      weekdays,
      moment,
      handleEditTemplateTimeslots,
      handleEditTemplate,
      handleAddTemplate,
      clinics,
      clinicFilter,
      employeeRoles,
      tableData,
      employeeList,
      timeslotClinicName,
    };
  },
});
</script>
