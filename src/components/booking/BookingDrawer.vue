<template>
  <!--begin::Appointment Drawer drawer-->
  <div
    id="booking-drawer"
    class="bg-white"
    data-kt-drawer="true"
    data-kt-drawer-name="booking"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#booking_edit_toggle"
    data-kt-drawer-close="#booing_edit_close"
  >
    <div class="card w-100" id="booking-drawer">
      <!--begin::Card header-->
      <div class="card-header pe-5" id="booking-drawer_header">
        <!--begin::Title-->
        <div class="card-title">
          <!--begin::User-->
          <h3>Appointment</h3>
          <!--end::User-->
        </div>
        <!--end::Title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-icon-primary"
            id="booing_edit_close"
          >
            <span class="svg-icon svg-icon-2x">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->
      <div class="card-body d-flex flex-column justify-content-between">
        <!--begin::Appointment Info-->
        <div>
          <!--begin::Approval Status Badges-->
          <div v-if="displayData.procedure_approval_status != 'NOT_RELEVANT'">
            <div
              v-if="displayData.procedure_approval_status === 'NOT_APPROVED'"
              class="alert bg-light-danger border border-danger d-flex flex-column flex-sm-row w-100 p-5 mb-10"
            >
              <span class="svg-icon svg-icon-2hx svg-icon-danger">
                <inline-svg src="media/icons/duotune/arrows/arr015.svg" />
              </span>
              <h5 class="mx-2 my-auto">This procedure has not been approved</h5>
            </div>

            <div
              v-if="displayData.procedure_approval_status === 'NOT_ACCESSED'"
              class="alert bg-light-warning border border-warning d-flex flex-column flex-sm-row w-100 p-5 mb-10"
            >
              <span class="svg-icon svg-icon-2hx svg-icon-warning">
                <inline-svg src="media/icons/duotune/arrows/arr015.svg" />
              </span>
              <h5 class="mx-2 my-auto">
                This procedure has not yet been accessed
              </h5>
            </div>

            <div
              v-if="displayData.procedure_approval_status === 'APPROVED'"
              class="alert bg-light-success border border-success d-flex flex-column flex-sm-row w-100 p-5 mb-10"
            >
              <span class="svg-icon svg-icon-2hx svg-icon-success">
                <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
              </span>
              <h5 class="mx-2 my-auto">This procedure has been approved</h5>
            </div>
          </div>
          <!--end::Approval Status Badges-->
          <!--begin::Appointment Info-->
          <div class="d-flex flex-column gap-3">
            <label class="fs-3 text-primary"
              >Clinic Name:
              <span class="text-black fs-5">{{
                displayData.clinic_name
              }}</span></label
            >
            <label class="fs-3 text-primary"
              >Time:
              <span class="text-black fs-5"
                >{{ displayData.start_time }} - {{ displayData.end_time }}</span
              >
              <span v-if="true" class="text-black fs-5"
                >(Arrival: {{ displayData.arrival_time }})</span
              ></label
            >
            <label class="fs-3 text-primary"
              >Appointment Type:
              <span class="text-black fs-5">{{
                displayData.appointment_type_name
              }}</span></label
            >
            <label class="fs-3 text-primary"
              >Specialist:
              <span class="text-black fs-5">{{
                displayData.specialist_name
              }}</span></label
            >
          </div>
          <!--end::Appointment Info-->

          <el-divider />
          <div v-if="displayData.notes">
            <label class="fs-3 text-primary"
              >Notes:
              <span class="text-black fs-5">{{
                displayData.notes
              }}</span></label
            >
            <el-divider />
          </div>
        </div>
        <!--end::Appointment Info-->
        <!--begin::Appointment Actions-->
        <div class="d-flex flex-column gap-5 mt-5">
          <!--Check In Button-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'NOT_PRESENT'"
            @click="handleCheckIn"
            :heading="'Check In'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'primary'"
          />

          <!--Check Out Button-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'CHECKED_IN'"
            @click="handleCheckOut"
            :heading="'Check Out'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'primary'"
          />

          <!--Checked Out Label-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'CHECKED_OUT'"
            :heading="'Checked Out'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'grey'"
          />

          <!--View Patient-->
          <BookingDrawerButton
            @click="handleView"
            :heading="'View'"
            :subheading="'Patient'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'primary'"
          />

          <!--Edit Appointment-->
          <BookingDrawerButton
            @click="handleEdit"
            :heading="'Edit'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'success'"
          />
          <!--Move Appointment-->
          <BookingDrawerButton
            @click="handleEdit"
            :heading="'Move'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'success'"
          />

          <!--Cancel Appointment Button-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'CHECKED_OUT'"
            @click="handleCancel"
            :heading="'Cancel'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'danger'"
          />
        </div>
        <!--end::Appointment Actions-->
      </div>
    </div>
  </div>
  <EditModal></EditModal>
  <CheckInModal></CheckInModal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import EditModal from "@/components/booking/EditApt.vue";
import CheckInModal from "@/components/booking/CheckInModal.vue";
import { Modal } from "bootstrap";
import BookingDrawerButton from "@/components/presets/BookingDrawer/BookingDrawerButton.vue";

export default defineComponent({
  name: "booing-drawer",
  components: {
    EditModal,
    CheckInModal,
    BookingDrawerButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const aptData = computed(() => store.getters.getAptSelected);
    const searchVal = computed(() => store.getters.getSearchVariable);

    const displayData = reactive({
      reference_number: "",
      clinic_name: "",
      start_time: "",
      end_time: "",
      arrival_time: "",
      appointment_type_name: "",
      specialist_name: "",
      notes: "",
      procedure_approval_status: "",
    });

    const handleView = () => {
      store.dispatch(Actions.PATIENTS.VIEW, aptData.value.patient_id);
      DrawerComponent?.getInstance("booking-drawer")?.hide();
      router.push({ name: "patients-view-administration" });
    };

    const handleEdit = () => {
      store.commit(Mutations.SET_APT.SELECT, aptData.value);
      const modal = new Modal(document.getElementById("modal_edit_apt"));
      modal.show();
      DrawerComponent?.getInstance("booking-drawer")?.hide();
    };

    const handleCancel = () => {
      Swal.fire({
        text: "Are you should you want to cancel?",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          placeholder: "Enter the Reason",
        },
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async (data) => {
          await store
            .dispatch(Actions.APT.CANCELLATION.CREATE, {
              id: aptData.value.appointment_id,
              reason: data,
            })
            .then((res) => {
              store.dispatch(Actions.BOOKING.SEARCH.DATE, searchVal.value);
            });
        },
      }).then((result) => {
        console.log(result);
        if (result.value) {
          console.log("");
        }
      });
    };

    const handleCheckIn = () => {
      const modal = new Modal(document.getElementById("modal_check_in_apt"));
      modal.show();
    };

    const handleCheckOut = async () => {
      await store
        .dispatch(Actions.APT.CHECK_OUT, aptData.value)
        .then(() => {
          store.dispatch(Actions.BOOKING.SEARCH.DATE, searchVal.value);
          Swal.fire({
            text: "Successfully Checked Out!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            DrawerComponent?.getInstance("booking-drawer")?.hide();
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };

    watchEffect(() => {
      displayData.reference_number = aptData.value.reference_number;
      displayData.clinic_name = aptData.value.clinic_name;
      displayData.start_time = aptData.value.start_time;
      displayData.start_time = aptData.value.start_time;
      displayData.end_time = aptData.value.end_time;
      displayData.arrival_time = aptData.value.arrival_time;
      displayData.appointment_type_name = aptData.value.appointment_type_name;
      displayData.specialist_name = aptData.value.specialist_name;
      displayData.notes = aptData.value.note;
      displayData.procedure_approval_status =
        aptData.value.procedure_approval_status;
    });

    return {
      displayData,
      aptData,
      handleEdit,
      handleView,
      handleCancel,
      handleCheckIn,
      handleCheckOut,
    };
  },
});
</script>
