<template>
  <CardSection>
    CLINIC SELECT HERE
    <table class="w-100">
      <thead>
        <th>Employee Type</th>
        <th v-for="day in weekdays" :key="day.id">
          {{ day.label }}
        </th>
      </thead>
      <tbody>
        <tr
          class="min-h-100px"
          v-for="template in scheduleTemplates"
          :key="template.id"
        >
          <td
            @click="handleEditTemplate(template)"
            class="d-flex text-hover-primary cursor-pointer background-hover-light-primary flex-column"
          >
            <span class="svg-icon absolute text-white svg-icon-4 me-1">
              <inline-svg src="media/icons/duotune/art/art005.svg" />
            </span>
            <InfoSection heading="Role"> {{ template.role_id }} </InfoSection>
            <InfoSection heading="Default"> John Doe</InfoSection>
          </td>

          <td v-for="day in weekdays" :key="day.id">
            <div
              @click="handleEditTemplateTimeslots(template, day.value)"
              class="d-flex flex-column rounded min-h-100px min-w-100px cursor-pointer bg-hover-light-primary bg-primary p-3"
            >
              <span class="svg-icon absolute text-primary svg-icon-4 me-1">
                <inline-svg src="media/icons/duotune/art/art005.svg" />
              </span>
              <span
                v-for="timeslot in template.timeslots.filter(
                  (x) => x.week_day == day.value
                )"
                :key="timeslot.id"
              >
                {{ moment(timeslot.start_time, "hh:ss").format("hh:ss") }} -
                {{ moment(timeslot.end_time, "hh:ss").format("hh:ss") }}</span
              >
            </div>
          </td>
        </tr>
        <tr>
          <td rowspan="8">
            <LargeIconButton
              :heading="'Add new Schedule'"
              :iconPath="'media/icons/duotune/abstract/abs011.svg'"
              :color="'success'"
              iconSize="3"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </CardSection>
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { HRMActions } from "@/store/enums/StoreHRMEnums";
import weekdays from "@/core/data/weekdays";
import moment from "moment";

export default defineComponent({
  name: "hrm-weekly-schedule-template",
  setup() {
    const store = useStore();
    const scheduleTemplates = computed(() => store.getters.hrmScheduleList);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Weekly Schedule Template", [
        "Human Resource Management",
      ]);
      store.dispatch(HRMActions.SCHEDULE_TEMPLATE.LIST, {
        clinic_id: 1,
      });
    });

    watch(scheduleTemplates, () => {
      console.log(scheduleTemplates.value);
    });

    const handleEditTemplateTimeslots = (schedule, day) => {
      console.log("EDIT schedule id:" + schedule.id + " on " + day);
    };

    const handleEditTemplate = (schedule) => {
      console.log("EDIT schedule id:" + schedule.id);
    };

    return {
      scheduleTemplates,
      weekdays,
      moment,
      handleEditTemplateTimeslots,
      handleEditTemplate,
    };
  },
});
</script>
