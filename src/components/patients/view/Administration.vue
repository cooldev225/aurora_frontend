<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_administration_demographic">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Patient Demographic</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div id="patient_view_administration" class="card-body pt-0">
      <!--begin::Option-->
      <div class="py-0">
        <!--begin::Header-->
        <div class="py-5 d-flex flex-stack flex-wrap">
          <!--begin::Toggle-->
          <div
            class="d-flex justify-content-between w-100 align-items-center collapsible rotate collapsed"
            data-bs-toggle="collapse"
            href="#patient_view_administration_account"
            role="button"
            aria-expanded="false"
            aria-controls="patient_view_administration_account"
          >
            <!--begin::Summary-->
            <div class="me-3">
              <div class="d-flex align-items-center">
                <div class="text-gray-800 fw-bolder">Patient Demographic</div>
              </div>
            </div>
            <!--end::Summary-->
            <!--begin::Arrow-->
            <div class="me-3 rotate-90">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/arrows/arr071.svg" />
              </span>
            </div>
            <!--end::Arrow-->
          </div>
          <!--end::Toggle-->
        </div>
        <!--end::Header-->
        <!--begin::Body-->
        <div
          id="patient_view_administration_account"
          class="fs-6 ps-10 collapse"
          data-bs-parent="#patient_view_administration"
        >
          <!--begin::Details-->
          <div class="d-flex flex-wrap py-5">
            <!--begin::Col-->
            <div class="flex-equal me-5">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-250px">
                      Do you identify as Aboriginal or Torres Strait Islander?
                    </td>
                    <td class="text-gray-800">
                      {{ formData.aborginality ? "Yes" : "No" }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Occupation
                    </td>
                    <td class="text-gray-800 text-capitalize">
                      {{
                        formData.occupation
                          ? formData.occupation
                          : "(not applicable)"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Marital Status
                    </td>
                    <td class="text-gray-800">
                      {{
                        formData.marital_status
                          ? formData.marital_status
                          : "(not applicable)"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Gender
                    </td>
                    <td class="text-gray-800">
                      {{
                        formData.gender ? formData.gender : "(not applicable)"
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="flex-equal">
              <table class="table table-flush fw-bold gy-1">
                <tbody>
                  <tr>
                    <td class="text-muted min-w-125px w-125px w-md-200px">
                      Next of Kin Info
                    </td>
                    <td class="text-gray-800">
                      Name:
                      {{
                        formData.kin_name
                          ? formData.kin_name
                          : "(not applicable)"
                      }}
                      <br />
                      Number:
                      {{
                        formData.kin_phone_number
                          ? formData.kin_phone_number
                          : "(not applicable)"
                      }}
                      <br />
                      Relationship:
                      {{
                        formData.kin_relationship
                          ? formData.kin_relationship
                          : "(not applicable)"
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Details-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Option-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-administration",
  components: {},
  setup() {
    const store = useStore();
    const formData = ref({});

    watchEffect(() => {
      formData.value = store.getters.selectedPatient;
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Administration", ["Patients"]);
    });

    return {
      formData,
    };
  },
});
</script>
