<template>
  <div
    class="modal fade"
    id="modal_check_in_apt"
    tabindex="-1"
    aria-hidden="true"
    ref="checkInAptModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">
            Check In {{ aptData.first_name }} {{ aptData.last_name }}
          </h2>
          <!--end::Modal title-->
          <div>
            <div class="btn btn-lg btn-light-danger me-3 mb-1">
              Print Hospital Cerificate
            </div>
            <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Close-->
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <!--begin::Scroll-->
          <div
            class="scroll-y me-n7 pe-7"
            id="kt_modal_add_customer_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_add_customer_header"
            data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
            data-kt-scroll-offset="300px"
          >
            <!--begin::Input group-->
            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">
                Referral Information
              </div>
              <div class="row">
                <!--begin::Label-->
                <label class="col-md-6 fs-4 fw-bold mb-2"
                  >Referral Doctor: {{ aptData.referring_doctor_name }} AAAA
                </label>
                <label class="col-md-6 fs-4 fw-bold mb-2"
                  >Referral Date: {{ aptData.referral_date }} 2022-07-07
                </label>
                <label class="col-md-6 fs-4 fw-bold mb-2"
                  >Referral Duration: {{ aptData.referral_duration }} 3 Months
                </label>
                <label class="col-md-6 fs-4 fw-bold mb-2">
                  Expiry Date: {{ aptData.referral_expiry_date }} 3 Months
                </label>
                <!--end::Label-->
              </div>
            </div>
            <el-divider />
            <div class="card-info">
              <div class="fs-3 fw-bold text-muted mb-6">Colleting Person</div>
              <div class="row">
                <!--begin::Label-->
                <label class="col-md-6 fs-4 fw-bold mb-2">
                  Name: {{ aptData.collecting_person_name }}
                </label>
                <label class="col-md-6 fs-4 fw-bold mb-2">
                  Phone Number: {{ aptData.collecting_person_phone }}
                </label>
                <label class="fv-row fs-4 fw-bold mb-2">
                  Contact: {{ aptData.collecting_person_alternate_contact }}
                </label>
                <!--end::Label-->
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button data-bs-dismiss="modal" class="btn btn-light me-3">
            Make Payment
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            @click="handleCheckIn"
          >
            <span v-if="!loading" class="indicator-label"> Check In </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, watch } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";

export default defineComponent({
  name: "create-apt-modal",
  components: {},
  setup() {
    const store = useStore();
    const aptData = computed(() => store.getters.getAptSelected);

    const handleCheckIn = () => {
      store.dispatch(Actions.APT.CHECK_IN, aptData.value.id);
    };

    const handleCheckOut = () => {
      store.dispatch(Actions.APT.CHECK_IN, aptData.value.id);
    };

    return {
      aptData,
      handleCheckIn,
    };
  },
});
</script>
