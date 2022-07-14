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
    <div class="modal-dialog modal-dialog-centered mw-1000px">
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
          <template v-if="_available_slots_by_date">
            <div class="pb-lg-15 d-flex flex-row gap-5">
              <div
                class="ps-lg-10"
                v-for="(slot_list, apt_date) in _available_slots_by_date"
                :key="apt_date"
              >
                <h3 style="white-space: nowrap">
                  {{ slot_list.formatted_date }}
                </h3>
                <template
                  v-for="(slot_item, idx_2) in slot_list.time_slot_list"
                  :key="idx_2"
                >
                  <div class="mt-5 justify-content-center align-items-center">
                    <span
                      class="text-primary w-100 h-100 fw-bold d-block cursor-pointer fs-5"
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
    available_slots_by_date: { type: Array, required: true },
    allSpecialists: { type: Array, required: true },
  },
  setup(props) {
    const _available_slots_by_date = computed(
      () => props.available_slots_by_date
    );
    const _allSpecialists = computed(() => props.allSpecialists);
    const store = useStore();

    const handleAddApt = (specialist_ids, date, startTime, endTime) => {
      const _date = moment(date).format("YYYY-MM-DD").toString();

      let selected_specialist = null;
      let available_specialists = [];

      for (let specialist of _allSpecialists.value) {
        if (specialist_ids.includes(specialist.id)) {
          selected_specialist = specialist;

          selected_specialist.anesthetist = {
            id: selected_specialist.anesthetist_id,
            name: selected_specialist.anesthetist_name,
          };

          available_specialists.push(selected_specialist);
        }
      }

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

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    return {
      _available_slots_by_date,
      _allSpecialists,
      handleAddApt,
      timeStr2Number,
    };
  },
});
</script>
