<template>
  <!--begin::Modal - AppointmentList Popup -->
  <div
    class="modal fade"
    id="modal_available_time_slot_popup"
    ref="AppointmentListPopupModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered" style="max-width: 96%">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Next Available Appointments</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="scroll modal-body py-lg-10 px-lg-10 h-500px">
          <h3 class="text-nowrap mb-5">Search Params</h3>
          <div class="search-params d-flex flex-wrap mb-10 gap-4">
            <h4 class="text-nowrap" style="color: var(--el-color-info)">
              Clinic:
              <span class="text-primary">{{ clinic_name }}</span>
            </h4>
            <h4 class="text-nowrap" style="color: var(--el-color-info)">
              Specialist:
              <span class="text-primary">{{ specialist_name }}</span>
            </h4>
            <h4 class="text-nowrap" style="color: var(--el-color-info)">
              Time Requirement:
              <span class="text-primary">{{ time_requirement }}</span>
            </h4>
            <h4 class="text-nowrap" style="color: var(--el-color-info)">
              Time Frame: <span class="text-primary">{{ time_frame }}</span>
            </h4>
            <h4 class="text-nowrap" style="color: var(--el-color-info)">
              Appointment Type:
              <span class="text-primary">{{ appointment_type }}</span>
            </h4>
          </div>
          <template v-if="availableSlotsByDate">
            <div class="pb-15 d-flex flex-row gap-15">
              <div
                class="text-nowrap"
                v-for="(slot_list, apt_date) in availableSlotsByDate"
                :key="apt_date"
              >
                <h3>
                  {{ formattedSlotDate(apt_date) }}
                </h3>
                <template
                  v-for="(slot_item, idx_2) in slot_list.time_slot_list"
                  :key="idx_2"
                >
                  <div
                    class="mt-5 justify-content-center align-items-center mw-250 text-wrap"
                  >
                    <span
                      class="w-100 h-100 fw-bold d-block cursor-pointer fs-3 mb-1"
                      style="color: var(--el-color-primary)"
                      data-kt-drawer-toggle="true"
                      data-kt-drawer-target="#kt_drawer_chat"
                      @click="
                        handleAddApt(
                          slot_item.specialist_ids,
                          apt_date,
                          slot_item.start_time,
                          slot_item.end_time
                        )
                      "
                    >
                      {{ slot_item.start_time }}
                    </span>
                    <p
                      class="mb-1"
                      style="color: var(--el-text-color-secondary)"
                      v-if="clinic_name == 'Any'"
                    >
                      {{
                        clinicNameFromSlot(slot_item.specialist_ids, apt_date)
                      }}
                    </p>
                    <p
                      style="color: var(--el-color-warning)"
                      v-if="specialist_name == 'Any'"
                    >
                      {{ specialistNameFromSlot(slot_item.specialist_ids) }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <p v-else>No Next available Appointments.</p>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "appointment-list-popup",
  props: {
    availableSlotsByDate: { type: Object, required: true },
    allSpecialists: { type: Array, required: true },
    searchNextApts: { type: Object, required: true },
    aptTypeList: { type: Array, required: true },
    clinicList: { type: Array, required: true },
    aptTimeRequireList: { type: Array, required: true },
    xWeeks: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore();

    const clinic_name = computed(() => {
      const clinic = props.clinicList.find(
        ({ id }) => id === props.searchNextApts.clinic_id
      );

      return clinic == undefined ? "Any" : clinic.name;
    });

    const specialist_name = computed(() => {
      const specialist = props.allSpecialists.find(
        ({ id }) => id === props.searchNextApts.specialist_id
      );

      return specialist == undefined ? "Any" : specialist.name;
    });

    const time_requirement = computed(() => {
      const time_requirement = props.aptTimeRequireList.find(
        ({ id }) => id === props.searchNextApts.time_requirement
      );

      return time_requirement == undefined ? "Any" : time_requirement.title;
    });

    const time_frame = computed(() =>
      props.xWeeks[props.searchNextApts.x_weeks] == undefined
        ? "Any"
        : props.xWeeks[props.searchNextApts.x_weeks]
    );

    const appointment_type = computed(() => {
      const appointment_type = props.aptTypeList.find(
        ({ id }) => id === props.searchNextApts.appointment_type_id
      );

      return appointment_type == undefined ? "Any" : appointment_type.name;
    });

    const handleAddApt = (specialist_ids, date, startTime, endTime) => {
      const _date = moment(date).format("YYYY-MM-DD").toString();

      let available_specialists = [];

      for (let specialist of props.allSpecialists) {
        if (Object.values(specialist_ids).includes(specialist.id)) {
          let temp_specialist = specialist;

          temp_specialist.anesthetist = {
            id: temp_specialist.anesthetist_id,
            name: temp_specialist.anesthetist_name,
          };

          let dayOfWeek = moment(date).format("dddd").toString();

          dayOfWeek = dayOfWeek.toLowerCase();

          const work_hours = JSON.parse(temp_specialist.work_hours);

          temp_specialist.work_hours = work_hours[dayOfWeek];

          available_specialists.push(temp_specialist);
        }
      }

      const specialist_id = Object.values(specialist_ids)[0];

      const selected_specialist = props.allSpecialists.find(
        ({ id }) => id == specialist_id
      );

      const item = {
        time_slots: [_date + "T" + startTime, _date + "T" + endTime],
        date: _date,
        ava_specialist: available_specialists,
        selected_specialist: selected_specialist,
      };

      store.commit(Mutations.SET_BOOKING.SELECT, item);

      const modal = new Modal(document.getElementById("modal_create_apt"));
      modal.show();

      const current_modal = Modal.getInstance(
        document.getElementById("modal_available_time_slot_popup")
      );
      current_modal.hide();
    };

    const specialistNameFromSlot = (specialist_ids) => {
      if (specialist_ids == undefined) {
        return "";
      }

      if (props.allSpecialists == undefined) {
        return "";
      }

      const specialist_id = Object.values(specialist_ids)[0];

      const selected_specialist = props.allSpecialists.find(
        ({ id }) => id == specialist_id
      );

      return selected_specialist.name;
    };

    const formattedSlotDate = (date) => {
      return moment(date).format("MMM Do, ddd").toString();
    };

    const clinicNameFromSlot = (specialist_ids, date) => {
      if (specialist_ids == undefined) {
        return "";
      }

      if (props.allSpecialists == undefined) {
        return "";
      }

      const specialist_id = Object.values(specialist_ids)[0];

      const selected_specialist = props.allSpecialists.find(
        ({ id }) => id == specialist_id
      );

      let dayOfWeek = moment(date).format("dddd").toString();

      dayOfWeek = dayOfWeek.toLowerCase();

      let work_hours = JSON.parse(selected_specialist.work_hours);

      work_hours = work_hours[dayOfWeek];

      return work_hours.locations.name;
    };

    return {
      handleAddApt,
      formattedSlotDate,
      clinicNameFromSlot,
      specialistNameFromSlot,
      clinic_name,
      specialist_name,
      time_requirement,
      time_frame,
      appointment_type,
    };
  },
});
</script>
