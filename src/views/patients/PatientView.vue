<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <!-- <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="media/avatars/blank.png" alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div> -->
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <span
                  class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                >
                  {{ formData.first_name }} {{ formData.last_name }}
                </span>
                <span
                  class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3"
                  >{{ formData.UR_number }}</span
                >
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="media/icons/duotune/communication/com011.svg"
                    />
                  </span>
                  {{ formData.email }}
                </a>
                <span
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="media/icons/duotune/general/gen018.svg" />
                  </span>
                  {{ formData.address }}
                </span>
                <span
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="media/icons/duotune/general/gen014.svg" />
                  </span>
                  {{ formData.date_of_birth }}
                </span>
              </div>
              <!--end::Info-->

              <!--begin::Stats-->
              <div class="d-flex flex-wrap flex-stack">
                <!--begin::Progress-->
                <span
                  v-if="formData.upcoming_appointment"
                  class="badge"
                  :style="`width: fit-content; background-color: ${formData.upcoming_appointment.color}`"
                  >{{
                    formData.upcoming_appointment.date +
                    " " +
                    formData.upcoming_appointment.start_time +
                    "(" +
                    formData.upcoming_appointment.procedure_name +
                    ")"
                  }}</span
                >
                <!--end::Progress-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::User-->

            <!--begin::Actions-->
            <div class="my-4">
              <div class="d-flex mb-3">
                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-printer fs-3"></i>
                  Labels
                </a>

                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-printer fs-3"></i>
                  Details
                </a>

                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-printer fs-3"></i>
                  Hospital Certificate
                </a>
              </div>
              <div class="d-flex">
                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-file-plus fs-3"></i>
                  Document
                </a>

                <a
                  class="btn btn-sm btn-light me-2"
                  id="kt_user_follow_button"
                  @click="handleRecallReminder"
                >
                  <i class="bi bi-file-plus fs-3"></i>
                  Recall Reminder
                </a>

                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-send fs-3"></i>
                  Fax
                </a>

                <a class="btn btn-sm btn-light me-2" id="kt_user_follow_button">
                  <i class="bi bi-send fs-3"></i>
                  Referral
                </a>
              </div>
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/patients/view/documents"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Documents
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/appointments"
              active-class="active"
            >
              Appointments
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/billing"
              active-class="active"
            >
              Billing
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/clinical"
              active-class="active"
            >
              Clinical Information
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/patients/view/administration"
              active-class="active"
            >
              Administration
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <RecallReminderModal></RecallReminderModal>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import RecallReminderModal from "@/components/patients/RecallReminderModal.vue";

export default defineComponent({
  name: "patients-view",
  components: {
    RecallReminderModal,
  },

  setup() {
    const store = useStore();
    const formData = ref({});

    const handleRecallReminder = () => {
      console.log("123");
      const modal = new Modal(
        document.getElementById("modal_patient_recall_reminder")
      );
      modal.show();
    };

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    return {
      formData,
      handleRecallReminder,
    };
  },
});
</script>
