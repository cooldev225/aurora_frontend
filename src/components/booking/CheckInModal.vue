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
            <el-form>
              <!--begin::Input group-->
              <div class="card-info">
                <div class="fs-3 fw-bold text-muted mb-6">
                  Referral Information
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Referral Doctor</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="referral_doctor">
                        <el-autocomplete
                          class="w-100"
                          v-model="aptData.referral_doctor"
                          :fetch-suggestions="searchReferralDoctor"
                          placeholder="Please input"
                          @select="handleSelect"
                        >
                          <template #default="{ item }">
                            <div class="name">
                              {{ item.first_name }} {{ item.last_name }}
                            </div>
                            <div class="address">{{ item.address }}</div>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>

                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Referral</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="referral_file">
                        <el-upload
                          action="#"
                          ref="upload"
                          :limit="1"
                          :auto-upload="false"
                        >
                          <el-button type="primary">Choose File</el-button>
                        </el-upload>
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>

                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Referral Date</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="referral_date">
                        <el-date-picker
                          class="w-100"
                          v-model="aptData.referral_date"
                          format="YYYY-MM-DD"
                          placeholder="Enter Referral Date"
                        />
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>

                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Referral Duration</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <el-form-item prop="c">
                        <el-input
                          type="number"
                          class="w-50 text-center col mr-4"
                          :min="0"
                          :max="24"
                          v-model="aptData.referral_duration"
                        />
                        Months
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
              </div>
              <el-divider />
              <div class="card-info">
                <div class="fs-3 fw-bold text-muted mb-6">Colleting Person</div>
                <div class="row">
                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Name</label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <el-form-item prop="collecting_person_name">
                        <el-input
                          type="text"
                          v-model="aptData.collecting_person_name"
                          placeholder="Enter Name"
                        />
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>

                  <div class="col-sm-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Phone Number</label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <el-form-item prop="collecting_person_phone">
                        <el-input
                          type="text"
                          v-model="aptData.collecting_person_phone"
                          placeholder="Enter Phone Number"
                        />
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>

                  <div class="col-sm-12">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-bold mb-2">Contact</label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <el-form-item prop="collecting_person_alternate_contact">
                        <el-input
                          type="text"
                          v-model="aptData.collecting_person_alternate_contact"
                          placeholder="Enter Phone Number"
                        />
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
              </div>
              <!--end::Input group-->
            </el-form>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
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
import { defineComponent, computed, ref, onMounted } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DrawerComponent } from "@/assets/ts/components/_DrawerComponent";

export default defineComponent({
  name: "create-apt-modal",
  components: {},
  setup() {
    const store = useStore();
    const aptData = computed(() => store.getters.getAptSelected);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);
    const checkInAptModalRef = ref(null);

    const handleSelect = (item) => {
      console.log(item);
    };

    let timeout;
    const searchReferralDoctor = (term, cb) => {
      const results = term
        ? referralDoctors.value.filter(createFilter(term))
        : referralDoctors.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    };

    const createFilter = (term) => {
      return (referralDoctor) => {
        const full_name =
          referralDoctor.first_name + " " + referralDoctor.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(term.toLowerCase());
        const address_pos = referralDoctor.address
          .toLowerCase()
          .indexOf(term.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };

    const handleCheckIn = async () => {
      await store
        .dispatch(Actions.APT.CHECK_IN, aptData.value)
        .then(() => {
          store.dispatch(Actions.BOOKING.SEARCH.DATE, searchVal.value);
          Swal.fire({
            text: "Successfully Checked In!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            hideModal(checkInAptModalRef.value);
            DrawerComponent?.getInstance("booking-drawer")?.hide();
          });
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };

    onMounted(() => {
      store.dispatch(Actions.REFERRAL_DOCTOR.LIST);
    });

    return {
      aptData,
      handleCheckIn,
      searchReferralDoctor,
      handleSelect,
      checkInAptModalRef,
    };
  },
});
</script>
