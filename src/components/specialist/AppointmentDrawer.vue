<template>
  <!--begin::Appointment Drawer drawer-->
  <div
    id="appointment-drawer"
    class="bg-white"
    data-kt-drawer="true"
    data-kt-drawer-name="appointment"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#booking_edit_toggle"
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
              {{ displayData.start_time }} -
              {{ displayData.end_time }} (Arrival:
              {{ displayData.arrival_time }})
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
          <!--View Patient-->
          <LargeIconButton
            @click="handleView"
            :heading="'View'"
            :subheading="'Patient'"
            :iconPath="'media/icons/duotune/medicine/med001.svg'"
            :color="'primary'"
          />
        </div>
        <!--end::Appointment Actions-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from "vue";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LargeIconButton from "@/components/presets/GeneralElements/LargeIconButton.vue";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";

export default defineComponent({
  name: "appointment-drawer",
  components: {
    LargeIconButton,
    AlertBadge,
    InfoSection,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const aptData = computed(() => store.getters.getAptUserSelected);

    const displayData = reactive({
      clinic_name: "",
      start_time: "",
      end_time: "",
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
      store.dispatch(PatientActions.VIEW, aptData.value.patient_id);
      router.push({
        name: "patients-view-appointments",
        params: { id: aptData.value.patient_id },
      });
    };

    watchEffect(() => {
      displayData.clinic_name = aptData.value.clinic_details?.name;
      displayData.start_time = aptData.value.start_time;
      displayData.end_time = aptData.value.end_time;
      displayData.arrival_time = aptData.value.arrival_time;
      displayData.appointment_type_name = aptData.value.appointment_type?.name;
      displayData.specialist_name = aptData.value.specialist_name;
      displayData.notes = aptData.value.note;

      displayData.allergies = aptData.value.patient_details?.allergies;
      displayData.patient_name = aptData.value.patient_name?.full;
      displayData.patient_number =
        aptData.value.patient_details?.contact_number;

      displayData.procedure_approval_status =
        aptData.value.procedure_approval_status;
    });

    return {
      displayData,
      aptData,
      handleView,
    };
  },
});
</script>
