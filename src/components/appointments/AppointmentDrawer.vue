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
              <InlineSVG icon="cross" />
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
            v-if="displayData.procedure_approval_status === 'NOT_ASSESSED'"
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

            <InfoSection :heading="'Anaesthetist'">
              <span v-if="displayData.anesthetist_name !== ''">
                {{ displayData.anesthetist_name }}</span
              ><span> No Anaesthetist Assigned </span>
            </InfoSection>

            <InfoSection :heading="'Estimated Price'">{{
              convertToCurrency(displayData.estimated_price / 100)
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
            <div>
              <label class="fs-5 text-danger"
                >Allergies:
                <template
                  v-for="allergie in displayData.allergies"
                  :key="allergie.id"
                >
                  <span class="text-black fs-5">{{ allergie.name + " " }}</span>
                </template>
              </label>
            </div>
            <el-divider />
          </div>
        </div>
        <!--end::Appointment Info-->
        <!--begin::Appointment Actions-->
        <div class="d-flex flex-column gap-3 mt-5">
          <!--Check In Button-->
          <LargeIconButton
            v-if="
              aptData.attendance_status === 'NOT_PRESENT' &&
              userRole !== 'specialist' &&
              userRole !== 'anesthetist'
            "
            @click="handleCheckIn"
            :heading="'Check In'"
            :iconPath="'media/icons/duotune/arrows/arr024.svg'"
            :color="'primary'"
            justify="start"
            iconSize="3"
          />

          <!--Check Out Button-->
          <LargeIconButton
            v-if="
              aptData.attendance_status === 'CHECKED_IN' &&
              userRole !== 'specialist' &&
              userRole !== 'anesthetist'
            "
            @click="handleCheckOut"
            :heading="'Check Out'"
            :iconPath="'media/icons/duotune/arrows/arr021.svg'"
            :color="'primary'"
            justify="start"
            iconSize="3"
          />
          <!--Checked Out Label-->
          <LargeIconButton
            v-if="
              aptData.attendance_status === 'CHECKED_OUT' &&
              userRole !== 'specialist' &&
              userRole !== 'anesthetist'
            "
            :heading="'Checked Out'"
            :iconPath="'media/icons/duotune/arrows/arr021.svg'"
            :color="'grey'"
            justify="start"
            iconSize="3"
          />

          <!--View Patient-->
          <LargeIconButton
            @click="handleView"
            :heading="'View'"
            :iconPath="'media/icons/duotune/medicine/med001.svg'"
            :color="'primary'"
            justify="start"
            iconSize="3"
          />

          <!--Edit Appointment-->
          <LargeIconButton
            v-if="userRole !== 'specialist' && userRole !== 'anesthetist'"
            @click="handleEdit"
            :heading="'Edit'"
            :iconPath="'media/icons/duotune/general/gen055.svg'"
            :color="'success'"
            justify="start"
            iconSize="3"
          />

          <div class="d-flex flex-row w-full">
            <!--Move Appointment-->
            <div class="col-6">
              <LargeIconButton
                class="me-1"
                v-if="userRole !== 'specialist' && userRole !== 'anesthetist'"
                @click="handleMove"
                :heading="'Move'"
                :iconPath="'media/icons/duotune/arrows/arr035.svg'"
                :color="'success'"
                justify="start"
                iconSize="3"
              />
            </div>
            <div class="col-6">
              <!--Move Appointment-->
              <LargeIconButton
                class="ms-1"
                v-if="userRole !== 'specialist' && userRole !== 'anesthetist'"
                @click="handleCopy"
                :heading="'Copy'"
                :iconPath="'media/icons/duotune/arrows/arr058.svg'"
                :color="'success'"
                justify="start"
                iconSize="3"
              />
            </div>
          </div>

          <!--Cancel Appointment Button-->
          <LargeIconButton
            v-if="userRole !== 'specialist' && userRole !== 'anesthetist'"
            @click="handleCancel"
            :heading="'Cancel'"
            :iconPath="'media/icons/duotune/arrows/arr011.svg'"
            :color="'danger'"
            justify="start"
            iconSize="3"
          />
        </div>
        <!--end::Appointment Actions-->
      </div>
    </div>
  </div>
  <CheckInModal></CheckInModal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from "vue";
import {
  AppointmentActions,
  AppointmentMutations,
} from "@/store/enums/StoreAppointmentEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import CheckInModal from "@/components/appointments/CheckInModal.vue";
import { Modal } from "bootstrap";
import LargeIconButton from "@/components/presets/GeneralElements/LargeIconButton.vue";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import { convertToCurrency } from "@/core/data/billing";

export default defineComponent({
  name: "booing-drawer",
  components: {
    CheckInModal,
    LargeIconButton,
    AlertBadge,
    InfoSection,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const aptData = computed(() => store.getters.getAptSelected);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const userRole = computed(() => store.getters.userRole);

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
      anesthetist_name: "",
      estimated_price: 0,
    });

    const handleView = () => {
      store.dispatch(PatientActions.VIEW, aptData.value.patient_id);
      DrawerComponent?.getInstance("appointment-drawer")?.hide();
      router.push({
        name: "patients-view-administration",
        params: { id: aptData.value.patient_id },
      });
    };

    const handleEdit = () => {
      store.dispatch(PatientActions.APPOINTMENTS, aptData.value.patient_id);
      store.commit(AppointmentMutations.SET_APT.SELECT, aptData.value);
      const modal = new Modal(document.getElementById("modal_edit_apt"));
      modal.show();
      DrawerComponent?.getInstance("appointment-drawer")?.hide();
    };

    const handleMove = async () => {
      aptData.value.step = 0;
      aptData.value.action = "move";
      store.commit(AppointmentMutations.SET_APT.SELECT, aptData.value);
      const modal = new Modal(document.getElementById("modal_move_apt"));
      modal.show();
      DrawerComponent?.getInstance("appointment-drawer")?.hide();
    };

    const handleCopy = async () => {
      aptData.value.step = 0;
      aptData.value.action = "copy";
      store.commit(AppointmentMutations.SET_APT.SELECT, aptData.value);
      const modal = new Modal(document.getElementById("modal_move_apt"));
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
            .dispatch(AppointmentActions.CONFIRMATION_STATUS.UPDATE, {
              id: aptData.value.id,
              missed: missed,
              reason: data,
            })
            .then(() => {
              store
                .dispatch(AppointmentActions.LIST, {
                  date: searchVal.value.date,
                })
                .then(() => {
                  store.dispatch(
                    AppointmentActions.BOOKING.SEARCH.SPECIALISTS,
                    searchVal.value
                  );
                  DrawerComponent?.getInstance("appointment-drawer")?.hide();
                });
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
        .dispatch(AppointmentActions.APT.CHECK_OUT, aptData.value)
        .then(() => {
          store.dispatch(
            AppointmentActions.BOOKING.SEARCH.SPECIALISTS,
            searchVal.value
          );
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
      console.log(aptData.value);
      displayData.clinic_name = aptData.value.clinic_details?.name;
      displayData.appointment_type_name = aptData.value.appointment_type?.name;
      displayData.specialist_name = aptData.value.specialist_name;
      displayData.allergies = aptData.value.patient?.allergies;
      displayData.patient_name = aptData.value.patient_name?.full;
      displayData.patient_number =
        aptData.value.patient_details?.contact_number;
      displayData.time = aptData.value.formatted_appointment_time;
      displayData.arrival_time = aptData.value.arrival_time;
      displayData.specialist_name = aptData.value.specialist_name;
      displayData.notes = aptData.value.note;
      displayData.procedure_approval_status =
        aptData.value.procedure_approval_status;
      displayData.anesthetist_name = aptData.value.anesthetist
        ? aptData.value.anesthetist.name
        : "";
      displayData.estimated_price =
        aptData.value.appointment_type?.default_items_quote;
    });

    return {
      displayData,
      aptData,
      handleEdit,
      handleView,
      handleCancel,
      handleCheckIn,
      handleCheckOut,
      handleMove,
      handleCopy,
      userRole,
      convertToCurrency,
    };
  },
});
</script>
