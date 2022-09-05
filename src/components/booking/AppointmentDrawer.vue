<template>
  <!--begin::Appointment Drawer drawer-->
  <div
    id="appointment-drawer"
    class="bg-white"
    data-kt-drawer="true"
    data-kt-drawer-name="appointment-drawer"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-close="#booing_edit_close"
  >
    <div class="card w-100" id="appointment-drawer">
      <!--begin::Card header-->
      <div class="card-header pe-5" id="appointment-drawer_header">
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

          <AlertBadge
            v-if="displayData.procedure_approval_status === 'NOT_APPROVED'"
            :text="'This procedure has not been approved'"
            :color="'danger'"
            :iconPath="'media/icons/duotune/arrows/arr015.svg'"
          />

          <AlertBadge
            v-if="displayData.procedure_approval_status === 'NOT_ACCESSED'"
            :text="'This procedure has not yet been accessed'"
            :color="'warning'"
            :iconPath="'media/icons/duotune/arrows/arr015.svg'"
          />

          <AlertBadge
            v-if="displayData.procedure_approval_status === 'APPROVED'"
            :text="'This procedure has been approved'"
            :color="'success'"
            :iconPath="'media/icons/duotune/arrows/arr016.svg'"
          />

          <AlertBadge
            v-if="displayData.procedure_approval_status === 'CONSULT_REQUIRED'"
            :text="'This procedure requires a consult prior'"
            :color="'danger'"
            :iconPath="'media/icons/duotune/arrows/arr015.svg'"
          />

          <!--end::Approval Status Badges-->

          <!--begin::Appointment Info-->
          <div class="d-flex flex-column gap-3">
            <InfoSection :heading="'Patient'"
              >{{ displayData.patient_name }} ({{ displayData.patient_number }})
            </InfoSection>
            <InfoSection :heading="'Clinic'">{{
              displayData.clinic_name
            }}</InfoSection>

            <InfoSection :heading="'Time'">
              {{ displayData.time }}
            </InfoSection>

            <InfoSection :heading="'Type'">{{
              displayData.appointment_type_name
            }}</InfoSection>

            <InfoSection :heading="'Specialist'">{{
              displayData.specialist_name
            }}</InfoSection>
          </div>
          <!--end::Appointment Info-->
          <el-divider />
          <div v-if="displayData.notes">
            <label class="fs-5 text-primary"
              >Notes:
              <span class="text-black fs-5">{{
                displayData.notes
              }}</span></label
            >
            <el-divider v-if="displayData.allergies" />
            <div v-if="displayData.allergies">
              <label class="fs-5 text-danger"
                >Allergies:
                <span class="text-black fs-5">{{
                  displayData.allergies
                }}</span></label
              >
            </div>
            <el-divider />
          </div>
        </div>
        <!--end::Appointment Info-->
        <!--begin::Appointment Actions-->
        <div class="d-flex flex-column gap-3 mt-5">
          <!--Check In Button-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'NOT_PRESENT'"
            @click="handleCheckIn"
            :heading="'Check In'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/arrows/arr024.svg'"
            :color="'primary'"
          />

          <!--Check Out Button-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'CHECKED_IN'"
            @click="handleCheckOut"
            :heading="'Check Out'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/arrows/arr021.svg'"
            :color="'primary'"
          />

          <!--Checked Out Label-->
          <BookingDrawerButton
            v-if="aptData.attendance_status === 'CHECKED_OUT'"
            :heading="'Checked Out'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/arrows/arr021.svg'"
            :color="'grey'"
          />

          <!--View Patient-->
          <BookingDrawerButton
            @click="handleView"
            :heading="'View'"
            :subheading="'Patient'"
            :iconPath="'media/icons/duotune/medicine/med001.svg'"
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
            :heading="'Move'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/arrows/arr035.svg'"
            :color="'success'"
          />

          <!--Cancel Appointment Button-->
          <BookingDrawerButton
            @click="handleCancel"
            :heading="'Cancel'"
            :subheading="'Appointment'"
            :iconPath="'media/icons/duotune/arrows/arr011.svg'"
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
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";

export default defineComponent({
  name: "booing-drawer",
  components: {
    EditModal,
    CheckInModal,
    BookingDrawerButton,
    AlertBadge,
    InfoSection,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const aptData = computed(() => store.getters.getAptSelected);
    const searchVal = computed(() => store.getters.getSearchVariable);

    const displayData = reactive({
      clinic_name: "",
      time: "",
      arrival_time: "",
      appointment_type_name: "",
      specialist_name: "",
      notes: "",
      allergies: "",
      patient_name: "",
      patient_number: "",
      procedure_approval_status: "",
    });

    const handleView = () => {
      store.dispatch(Actions.PATIENTS.VIEW, aptData.value.patient_id);
      DrawerComponent?.getInstance("appointment-drawer")?.hide();
      router.push({ name: "patients-view-administration" });
    };

    const handleEdit = () => {
      store.dispatch(Actions.PATIENTS.APPOINTMENTS, aptData.value.patient_id);
      store.commit(Mutations.SET_APT.SELECT, aptData.value);
      const modal = new Modal(document.getElementById("modal_edit_apt"));
      modal.show();
      DrawerComponent?.getInstance("appointment-drawer")?.hide();
    };

    const handleCancel = () => {
      const html =
        "<h3>Are you sure you want to cancel?</h3><br/>" +
        '<h4><input type="checkbox" id="chkMissed"> ' +
        '<label for="chkMissed">Mark as Missed</label></h4>';
      Swal.fire({
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          placeholder: "Enter the Reason",
        },
        html: html,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light-primary",
        },
        preConfirm: async (data) => {
          var missed = Swal.getPopup().querySelector("#chkMissed").checked;

          await store
            .dispatch(Actions.APT.CANCELLATION.CREATE, {
              id: aptData.value.appointment_id,
              missed: missed,
              reason: data,
            })
            .then(() => {
              store.dispatch(Actions.BOOKING.SEARCH.DATE, searchVal.value);
              store.dispatch(
                Actions.BOOKING.SEARCH.SPECIALISTS,
                searchVal.value
              );

              DrawerComponent?.getInstance("appointment-drawer")?.hide();
            });
        },
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
            DrawerComponent?.getInstance("appointment-drawer")?.hide();
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };

    watchEffect(() => {
      if (aptData.value.first_name != null) {
        displayData.patient_name =
          aptData.value.first_name + " " + aptData.value.last_name;
        displayData.clinic_name = aptData.value.clinic_name;
        displayData.allergies = aptData.value.allergies;
        displayData.appointment_type_name = aptData.value.appointment_type_name;
        displayData.patient_number = aptData.value.contact_number;
        displayData.time =
          aptData.value.start_time.slice(0, -3) +
          " - " +
          aptData.value.end_time.slice(0, -3);
      } else {
        displayData.clinic_name = aptData.value.clinic_details?.name;
        displayData.appointment_type_name =
          aptData.value.appointment_type?.name;
        displayData.specialist_name = aptData.value.specialist_name;

        displayData.allergies = aptData.value.patient_details?.allergies;
        displayData.patient_name = aptData.value.patient_name?.full;
        displayData.patient_number =
          aptData.value.patient_details?.contact_number;
        displayData.time = aptData.value.formatted_appointment_time;
        displayData.arrival_time = aptData.value.arrival_time;
      }

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
