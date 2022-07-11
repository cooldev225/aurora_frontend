<template>
  <!--begin::Chat drawer-->
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
    <!--begin::Messenger-->
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

      <!--begin::Card body-->
      <div class="card-body">
        <div class="card-info">
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
          <el-divider />
          <div class="d-flex flex-column gap-5 mt-5">
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
            <a>
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
                    CANCEL
                  </span>
                  <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
                </span>
                <!--end::Info-->
              </label>
            </a>
          </div>
        </div>
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Messenger-->
  </div>
  <!--end::Chat drawer-->
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  watch,
  onMounted,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "booing-drawer",
  components: {},
  setup() {
    const store = useStore();
    const aptData = computed(() => store.getters.getAptSelected);
    const displayData = reactive({
      reference_number: "",
      clinic_name: "",
      start_time: "",
      end_time: "",
      arrival_time: "",
      appointment_type_name: "",
      specialist_name: "",
    });

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
    });

    return {
      displayData,
    };
  },
});
</script>
