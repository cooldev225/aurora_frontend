<template>
  <!--begin::Modal - AppointmentList Popup -->
  <div
    class="modal fade"
    id="modal_appointment_list_popup"
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
        <div class="modal-body py-lg-10 px-lg-10">
          <template v-if="_appointments_by_date">
            <div class="pb-lg-15 d-flex flex-row gap-5">
              <div
                class="ps-lg-10"
                v-for="(
                  appointment_item_for_date, apt_date
                ) in _appointments_by_date"
                :key="apt_date"
              >
                <h3>{{ apt_date }}</h3>
                <template
                  v-for="(appointment_item, idx_2) in appointment_item_for_date"
                  :key="idx_2"
                >
                  <div class="mt-5 justify-content-center align-items-center">
                    <span
                      class="text-primary w-100 h-100 fw-bold d-block cursor-pointer fs-5"
                      data-kt-drawer-toggle="true"
                      data-kt-drawer-target="#kt_drawer_chat"
                      @click="handleShow(appointment_item)"
                    >
                      {{ appointment_item.start_time }}
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
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Modal } from "bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";

export default defineComponent({
  name: "appointment-list-popup",
  props: {
    appointments_by_date: { type: Array, required: true },
  },
  setup(props) {
    const _appointments_by_date = computed(() => props.appointments_by_date);
    const store = useStore();

    const handleShow = (item) => {
      store.commit(Mutations.SET_APT.SELECT, item);
      DrawerComponent?.getInstance("booking-drawer")?.toggle();
    };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    return {
      _appointments_by_date,
      handleShow,
      timeStr2Number,
    };
  },
});
</script>
