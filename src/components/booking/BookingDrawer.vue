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
              >Service Reference Number:
              <span class="text-black fs-5">{{
                displayData.reference_number
              }}</span></label
            >
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
          <a @click="handleEdit">
            <label
              class="btn btn-light-success border border-success shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen056.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  Edit
                </span>
                <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
          <a>
            <label
              class="btn btn-light-success border border-success shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen056.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  MOVE
                </span>
                <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
          <a @click="handleView">
            <label
              class="btn btn-light-danger border border-danger shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen055.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  VIEW
                </span>
                <span class="text-gray-400 fw-bold fs-6">PATIENT</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
          <a>
            <label
              class="btn btn-light-success border border-success shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen027.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  MAKE PAYMENT
                </span>
                <span class="text-gray-400 fw-bold fs-6">BILLING</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
          <a>
            <label
              class="btn btn-light-danger border border-danger shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen027.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  CHECK IN / CHECK OUT
                </span>
                <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
          <a @click="handleCancel">
            <label
              class="btn btn-light-success border border-success shadow p-5 d-flex align-items-center"
              for="kt_create_account_form_account_type_personal"
            >
              <span class="svg-icon svg-icon-3x me-5">
                <inline-svg src="media/icons/duotune/general/gen027.svg" />
              </span>

              <!--begin::Info-->
              <span class="d-block fw-bold text-start">
                <span class="text-dark fw-bolder d-block fs-4 mb-2">
                  CANCEL
                </span>
                <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
              </span>
              <!--end::Info-->
            </label>
          </a>
        </div>
        <!--end::Appointment Actions-->
      </div>
    </div>
  </div>
  <EditModal></EditModal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";
import EditModal from "@/components/booking/EditApt.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "booing-drawer",
  components: {
    EditModal,
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
      console.log(aptData.value);
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

    watchEffect(() => {
      console.log(aptData.value);
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
      handleEdit,
      handleView,
      handleCancel,
    };
  },
});
</script>
