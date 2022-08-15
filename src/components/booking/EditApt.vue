<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_edit_apt"
    ref="editAptModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Edit Appointment</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <button
            type="button"
            class="btn btn-lg btn-light-danger me-3 mb-1"
            @click="handleCancel"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-3 my-auto">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
            Cancel
          </button>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
            id="modal_edit_apt_stepper"
            ref="editAptRef"
          >
            <!--begin::Aside-->
            <div
              class="cursor-pointer d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-350px"
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <StepperNavItem
                  @click="gotoPage(1)"
                  dataStepperElement="nav"
                  stepperNumber="1"
                  stepperTitle="Appointment"
                  stepperDescription="Setup Appointment Info"
                />

                <StepperNavItem
                  @click="gotoPage(2)"
                  dataStepperElement="nav"
                  stepperNumber="2"
                  stepperTitle="Patient Info"
                  stepperDescription="Edit Patient Details"
                />

                <StepperNavItem
                  @click="gotoPage(3)"
                  dataStepperElement="nav"
                  stepperNumber="3"
                  stepperTitle="Patient Billing"
                  stepperDescription="Edit Patient Billing Details"
                />

                <StepperNavItem
                  @click="gotoPage(4)"
                  dataStepperElement="nav"
                  stepperNumber="4"
                  stepperTitle="Other Info"
                  stepperDescription="Referral information and Appointment history"
                />

                <!--begin::Appointment Overview-->
                <div
                  class="p-4 mb-4 card border border-dashed border-primary d-flex flex-column gap-2"
                >
                  <InfoSection heading="Appointment Type">{{
                    appointment_name
                  }}</InfoSection>

                  <InfoSection heading="Specialist">{{
                    specialist_name
                  }}</InfoSection>

                  <InfoSection heading="Clinic">{{
                    aptInfoData.clinic_name
                  }}</InfoSection>

                  <InfoSection heading="Time">
                    {{ start_time }}
                    - {{ aptInfoData.time_slot[1] }}
                    <span
                      v-if="aptInfoData.arrival_time"
                      class="text-black fs-5"
                    >
                      (Arrive: {{ aptInfoData.arrival_time }})</span
                    ></InfoSection
                  >
                  <InfoSection heading="Date">{{
                    aptInfoData.date
                  }}</InfoSection>

                  <InfoSection heading="Patient"
                    >{{ patientInfoData.first_name }}
                    {{ patientInfoData.last_name }}</InfoSection
                  >
                </div>
                <!--end::Appointment Overview-->
              </div>

              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <div class="current" data-kt-stepper-element="content">
                <el-form
                  class="w-100"
                  :rules="rules"
                  :model="aptInfoData"
                  ref="formRef_1"
                  @submit.prevent="handleStep_1"
                >
                  <div class="scroll h-500px">
                    <InputWrapper
                      label="Appointment Type"
                      prop="appointment_type_id"
                    >
                      <el-select
                        class="w-100"
                        v-model="cur_appointment_type_id"
                      >
                        <el-option
                          v-for="item in aptTypeList"
                          :value="item.id"
                          :label="item.name"
                          :key="item.id"
                        />
                      </el-select>
                    </InputWrapper>
                    <div class="px-6" v-if="overlapping_cnt >= 1">
                      <AlertBadge
                        text="This appointment will overlap with an
                          upcoming appointment"
                        color="warning"
                        iconPath="media/icons/duotune/arrows/arr015.svg"
                      />
                    </div>
                    <InputWrapper label="Room" prop="room_id">
                      <el-select
                        class="w-100"
                        v-model.number="aptInfoData.room_id"
                      >
                        <el-option
                          v-for="item in rooms"
                          :value="item.id"
                          :label="item.name"
                          :key="item.id"
                        />
                      </el-select>
                    </InputWrapper>

                    <InputWrapper label="Note" prop="note">
                      <el-input
                        type="textarea"
                        v-model="aptInfoData.note"
                        placeholder="Enter appointment notes"
                      />
                    </InputWrapper>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      @click="handleSave"
                    >
                      Save
                    </button>
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary align-self-end"
                    >
                      Continue
                      <span class="svg-icon svg-icon-4 ms-1 me-0">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                    </button>
                  </div>
                </el-form>
              </div>

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="patientInfoData"
                    :rules="rules"
                    ref="formRef_2"
                    @submit.prevent="handleStep_2"
                  >
                    <div class="row scroll h-500px">
                      <InputWrapper
                        required
                        class="col-6"
                        label="First Name"
                        prop="first_name"
                      >
                        <el-input
                          type="text"
                          v-model="patientInfoData.first_name"
                          placeholder="Enter First Name"
                        />
                      </InputWrapper>
                      <InputWrapper
                        required
                        class="col-6"
                        label="Last Name"
                        prop="last_name"
                      >
                        <el-input
                          type="text"
                          v-model="patientInfoData.last_name"
                          placeholder="Enter Last Name"
                        />
                      </InputWrapper>

                      <InputWrapper
                        required
                        class="col-6"
                        label="Date of Birth"
                        prop="date_of_birth"
                      >
                        <el-date-picker
                          editable
                          class="w-100"
                          format="DD-MM-YYYY"
                          v-model="patientInfoData.date_of_birth"
                          placeholder=""
                        />
                      </InputWrapper>
                      <InputWrapper
                        required
                        class="col-6"
                        label="Contact Number"
                        prop="contact_number"
                      >
                        <el-input
                          type="text"
                          v-mask="'0#-####-####'"
                          v-model="patientInfoData.contact_number"
                          placeholder="Enter Contact Number"
                        />
                      </InputWrapper>

                      <InputWrapper label="Address" prop="address">
                        <GMapAutocomplete
                          :value="patientInfoData.address"
                          ref="addressRef"
                          placeholder="Enter the Address"
                          @place_changed="handleAddressChange"
                          :options="{
                            componentRestrictions: {
                              country: 'au',
                            },
                          }"
                        >
                        </GMapAutocomplete>
                      </InputWrapper>

                      <InputWrapper class="col-6" label="Email" prop="email">
                        <el-input
                          type="text"
                          v-model="patientInfoData.email"
                          placeholder="Enter Email"
                        />
                      </InputWrapper>

                      <InputWrapper
                        class="col-6"
                        label="Confirm Method"
                        prop="appointment_confirm_method"
                      >
                        <el-select
                          class="w-100"
                          v-model="patientInfoData.appointment_confirm_method"
                          placeholder="Confirm Method"
                        >
                          <el-option value="sms" label="SMS" />
                          <el-option value="email" label="Email" />
                        </el-select>
                      </InputWrapper>

                      <InputWrapper
                        class="col-6"
                        label="Allergies"
                        prop="allergies"
                      >
                        <el-input
                          type="textarea"
                          v-model="patientInfoData.allergies"
                          placeholder="Enter Allergies"
                        />
                      </InputWrapper>

                      <InputWrapper
                        class="col-6"
                        label="Clinical Alerts"
                        prop="clinical_alerts"
                      >
                        <el-input
                          type="textarea"
                          v-model="patientInfoData.clinical_alerts"
                          placeholder="Enter Clinical Alerts"
                        />
                      </InputWrapper>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        data-kt-stepper-action="previous"
                        @click="previousStep"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Back
                      </button>
                      <div>
                        <button
                          type="button"
                          class="btn btn-lg btn-light-primary me-3"
                          @click="handleSave"
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          class="btn btn-lg btn-primary align-self-end"
                        >
                          Continue
                          <span class="svg-icon svg-icon-4 ms-1 me-0">
                            <inline-svg
                              src="media/icons/duotune/arrows/arr064.svg"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="billingInfoData"
                    :rules="rules"
                    ref="formRef_3"
                    @submit.prevent="handleStep_3"
                  >
                    <div class="row">
                      <div class="row">
                        <InputWrapper
                          class="col-6"
                          label="Appointment Price"
                          prop="procedure_price"
                        >
                          <el-input
                            type="text"
                            v-model.number="billingInfoData.procedure_price"
                            disabled
                          />
                        </InputWrapper>
                        <InputWrapper
                          class="col-6"
                          label="Charge Type"
                          prop="charge_type"
                        >
                          <el-select
                            class="w-100"
                            v-model="billingInfoData.charge_type"
                            placeholder="Select Charge Type"
                          >
                            <el-option
                              v-for="type in chargeTypes"
                              :key="type.value"
                              :value="type.value"
                              :label="type.label"
                            />
                          </el-select>
                        </InputWrapper>

                        <el-divider />

                        <InputWrapper
                          class="col-6"
                          label="Medicare Number"
                          prop="medicare_number"
                        >
                          <el-input
                            type="text"
                            v-model="billingInfoData.medicare_number"
                            placeholder="Enter Medicare Number"
                          />
                        </InputWrapper>
                        <InputWrapper
                          class="col-6"
                          label="Medicare Reference Number"
                          prop="medicare_reference_number"
                        >
                          <el-input
                            type="text"
                            v-model="billingInfoData.medicare_reference_number"
                            placeholder=""
                          />
                        </InputWrapper>
                        <InputWrapper
                          class="col-6"
                          label="Medicare Expiry Date"
                          prop="medicare_expiry_date"
                        >
                          <el-date-picker
                            editable
                            class="w-100"
                            v-model="billingInfoData.medicare_expiry_date"
                            format="MM-YYYY"
                            placeholder="Enter Expiry Date"
                          />
                        </InputWrapper>
                        <el-divider />

                        <div
                          class="row"
                          v-if="
                            billingInfoData.charge_type ===
                              'private-health-excess' ||
                            billingInfoData.charge_type ===
                              'private-health-excess-0'
                          "
                        >
                          <InputWrapper
                            class="col-6"
                            label="Health Fund"
                            prop="health_fund_id"
                          >
                            <el-select
                              class="w-100"
                              v-model="billingInfoData.health_fund_id"
                            >
                              <el-option
                                v-for="item in healthFundsList"
                                :value="item.id"
                                :label="item.code + '-' + item.name"
                                :key="item.id"
                              />
                            </el-select>
                          </InputWrapper>
                          <InputWrapper
                            class="col-6"
                            label="Health Fund Membership Number"
                            prop="health_fund_membership_number"
                          >
                            <el-input
                              type="text"
                              v-model="
                                billingInfoData.health_fund_membership_number
                              "
                              placeholder="12345678"
                            />
                          </InputWrapper>
                          <InputWrapper
                            class="col-6"
                            label="Health Fund Reference Number"
                            prop="health_fund_reference_number"
                          >
                            <el-input
                              type="text"
                              v-model="
                                billingInfoData.health_fund_reference_number
                              "
                              placeholder="00"
                            />
                          </InputWrapper>

                          <InputWrapper
                            class="col-6"
                            label="Health Fund Expiry Date"
                            prop="health_fund_expiry_date"
                          >
                            <el-date-picker
                              editable
                              class="w-100"
                              v-model="billingInfoData.health_fund_expiry_date"
                              format="MM-YYYY"
                            />
                          </InputWrapper>

                          <InputWrapper
                            v-if="
                              billingInfoData.charge_type ===
                              'private-health-excess'
                            "
                            class="col-6"
                            label="Fund Excess"
                            prop="fund_excess"
                          >
                            <el-input
                              type="text"
                              v-model.number="billingInfoData.fund_excess"
                            />
                          </InputWrapper>
                        </div>

                        <InputWrapper
                          v-if="billingInfoData.charge_type === 'pension-card'"
                          class="col-6"
                          label="Pension Card Number"
                          prop="pension_card_number"
                        >
                          <el-input
                            class="w-100"
                            v-model="billingInfoData.pension_card_number"
                          />
                        </InputWrapper>

                        <InputWrapper
                          v-if="
                            billingInfoData.charge_type === 'healthcare-card'
                          "
                          class="col-6"
                          label="Healthcare Card Number"
                          prop="healthcare_card_number"
                        >
                          <el-input
                            class="w-100"
                            v-model="billingInfoData.healthcare_card_number"
                          />
                        </InputWrapper>
                        <InputWrapper
                          v-if="
                            billingInfoData.charge_type === 'healthcare-card' ||
                            billingInfoData.charge_type === 'pension-card'
                          "
                          class="col-6"
                          label="Expiry Date"
                          prop="expiry_date"
                        >
                          <el-input
                            class="w-100"
                            v-model="billingInfoData.healthcare_card_number"
                          />
                        </InputWrapper>

                        <div
                          class="row"
                          v-if="
                            billingInfoData.charge_type === 'department-veteran'
                          "
                        >
                          <InputWrapper
                            class="col-6"
                            label="DVA Number"
                            prop="dva_number"
                          >
                            <el-input
                              class="w-100"
                              v-model="billingInfoData.dva_number"
                            />
                          </InputWrapper>
                          <InputWrapper
                            class="col-6"
                            label="DVA Type"
                            prop="dva_expiry_date"
                          >
                            <el-date-picker
                              editable
                              class="w-100"
                              format="MM-YYYY"
                              v-model="billingInfoData.dva_expiry_date"
                            />
                          </InputWrapper>
                          <InputWrapper
                            class="col-6"
                            label="DVA Expiry Date"
                            prop="dva_type"
                          >
                            <el-select
                              class="w-100"
                              v-model="billingInfoData.dva_type"
                            >
                              <el-option value="white" label="White" />
                              <el-option value="gold" label="Gold" />
                              <el-option value="orange" label="Orange" />
                            </el-select>
                          </InputWrapper>
                        </div>
                        <div
                          class="col-sm-6 d-flex align-items-center justify-content-center"
                        >
                          <!--begin::Input group-->
                          <div class="fv-row">
                            <!--begin::Input-->
                            <el-form-item
                              class="m-0"
                              prop="add_other_account_holder"
                            >
                              <el-checkbox
                                type="checkbox"
                                v-model="
                                  billingInfoData.add_other_account_holder
                                "
                                label="Add other account holder"
                              />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Input group-->
                        </div>
                      </div>
                      <!--end::Body-->

                      <el-divider />
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        data-kt-stepper-action="previous"
                        @click="previousStep"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Back
                      </button>
                      <div>
                        <button
                          type="button"
                          class="btn btn-lg btn-light-primary me-3"
                          @click="handleSave"
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          class="btn btn-lg btn-primary align-self-end"
                        >
                          Continue
                          <span class="svg-icon svg-icon-4 ms-1 me-0">
                            <inline-svg
                              src="media/icons/duotune/arrows/arr064.svg"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
              <!--end::Step 3-->

              <!--begin::Step 4 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="otherInfoData"
                    :rules="rules"
                    ref="formRef_4"
                    @submit.prevent="submit"
                  >
                    <div class="row scroll h-500px">
                      <div v-if="apt_type == 'Procedure'" class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Pre-Procedure Questions
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Input-->
                              <el-form-item prop="anesthetic_questions">
                                <el-checkbox
                                  class="w-100"
                                  v-model="otherInfoData.anesthetic_questions"
                                  label="Anesthetic Questions"
                                  data-bs-toggle="collapse"
                                  href="#toogle_ane_ques"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-12 collapse" id="toogle_ane_ques">
                            <template
                              v-for="(item, idx) in aneQuestions"
                              :key="idx"
                            >
                              <div class="row mb-2">
                                <div class="col-10">{{ item.question }}</div>
                                <div class="col-2">
                                  <el-switch
                                    v-model="aneAnswers[idx]"
                                    :active-value="true"
                                    :inactive-value="false"
                                    @change="handleAneQuestions"
                                    style="
                                      --el-switch-on-color: #13ce66;
                                      --el-switch-off-color: #ff4949;
                                    "
                                    active-text="Y"
                                    inactive-text="N"
                                  />
                                </div>
                              </div>
                            </template>
                          </div>
                          <el-divider />
                        </div>
                      </div>
                      <!--start::Referral Information-->
                      <div class="card-info">
                        <div class="mb-6 d-flex justify-content-between">
                          <span class="fs-3 fw-bold text-muted"
                            >Referral Information</span
                          >
                          <el-checkbox
                            type="checkbox"
                            v-model="otherInfoData.no_referral"
                            label="No Referral"
                          />
                        </div>
                        <div class="row">
                          <template v-if="otherInfoData.no_referral">
                            <InputWrapper
                              class="col-6"
                              label="No Referral Reason"
                              prop="no_referral_reason"
                            >
                              <el-input
                                type="text"
                                v-model="otherInfoData.no_referral_reason"
                                placeholder="Please Enter Reason"
                              />
                            </InputWrapper>
                          </template>
                          <template v-else>
                            <InputWrapper
                              class="col-6"
                              label="Referring Doctor"
                              prop="referring_doctor_id"
                            >
                              <el-autocomplete
                                class="w-100"
                                v-model="otherInfoData.referring_doctor_name"
                                value-key="full_name"
                                :fetch-suggestions="searchReferralDoctor"
                                placeholder="Please input"
                                :trigger-on-focus="false"
                                @select="handleSelectReferringDoctor"
                              >
                                <template #default="{ item }">
                                  <div class="name">
                                    {{ item.title }}
                                    {{ item.first_name }}
                                    {{ item.last_name }}
                                  </div>
                                  <div class="address">
                                    {{ item.address }}
                                  </div>
                                </template>
                              </el-autocomplete>
                            </InputWrapper>
                            <InputWrapper
                              class="col-6"
                              label="Referral Duration"
                              prop="referral_duration"
                            >
                              <el-select
                                class="w-100"
                                v-model="otherInfoData.referral_duration"
                                placeholder="Enter Referral Duration"
                              >
                                <el-option value="0" label="Indefinite" />
                                <el-option value="3" label="3 Months" />
                                <el-option value="12" label="12 Months" />
                              </el-select>
                            </InputWrapper>

                            <InputWrapper
                              class="col-6"
                              label="Referral Date"
                              prop="referral_date"
                            >
                              <el-date-picker
                                editable
                                class="w-100"
                                format="DD-MM-YYYY"
                                v-model="otherInfoData.referral_date"
                              />
                            </InputWrapper>
                          </template>
                        </div>
                      </div>
                      <!--end::Referral Information-->
                      <!--start::Appointment History-->
                      <div class="card-info">
                        <span class="fs-3 fw-bold text-muted mb-4"
                          >Appointment History</span
                        >

                        <AppointmentHistory
                          :pastAppointments="patientAptData.pastAppointments"
                          :futureAppointments="
                            patientAptData.futureAppointments
                          "
                        />
                      </div>
                      <!--end::Appointment History-->
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        data-kt-stepper-action="previous"
                        @click="previousStep"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Back
                      </button>
                      <div>
                        <button
                          type="button"
                          class="btn btn-lg btn-light-primary me-3"
                          @click="handleSave"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
              <!--end::Step 4-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  computed,
  watch,
  reactive,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";
import { hideModal } from "@/core/helpers/dom";
import moment from "moment";
import chargeTypes, { getProcedurePrice } from "@/core/data/charge-types";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import AppointmentHistory from "@/components/presets/PatientElements/AppointmentHistory.vue";
import StepperNavItem from "@/components/presets/StepperElements/StepperNavItem.vue";
import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";

export default defineComponent({
  name: "create-apt-modal",
  directives: {
    mask,
  },
  components: {
    AppointmentHistory,
    StepperNavItem,
    InfoSection,
    InputWrapper,
    AlertBadge,
  },
  setup() {
    const store = useStore();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const loading = ref(false);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);

    const aptInfoData = ref({
      clinic_name: "",
      clinic_id: "",
      date: new Date(),
      arrival_time: "",
      time_slot: ["2022-06-20T09:00", "2022-06-20T17:00"],
      appointment_type_id: "",
      specialist_id: "",
      room_id: "",
      note: "",
    });

    const patientInfoData = ref({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      address: "",
      contact_number: "",
      appointment_confirm_method: "",
      allergies: "",
      clinical_alerts: "",
    });

    const billingInfoData = ref({
      charge_type: "",
      medicare_number: "",
      medicare_reference_number: "",
      medicare_expiry_date: "",
      health_fund_id: "",
      health_fund_membership_number: "",
      health_fund_reference_number: "",
      health_fund_expiry_date: "",
      fund_excess: "",
      pension_card_number: "",
      healthcare_card_number: "",
      expiry_date: "",
      dva_number: "",
      dva_expiry: "",
      dva_type: "",
      procedure_price: "",
      add_other_account_holder: false,
    });

    const otherInfoData = ref({
      anesthetic_questions: false,
      anesthetic_answers: [],
      procedure_questions: false,
      procedure_answers: [],
      referring_doctor_name: "",
      referring_doctor_id: "",
      referral_duration: "",
      referral_date: "",
      no_referral: false,
      no_referral_reason: "",
    });

    const rules = ref({
      appointment_type_id: [
        {
          required: true,
          message: "Please select an appointment type.",
          trigger: "blur",
        },
      ],
      first_name: [
        {
          required: true,
          message: "First name cannot be blank.",
          trigger: "blur",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last name cannot be blank.",
          trigger: "blur",
        },
      ],
      date_of_birth: [
        {
          required: true,
          message: "Date of birth cannot be blank.",
          trigger: "blur",
        },
      ],
      email: [
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur"],
        },
      ],
      contact_number: [
        {
          required: true,
          message: "Contact Number cannot be blank.",
          trigger: "blur",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      charge_type: [
        {
          required: true,
          message: "Charge Type cannot be blank.",
          trigger: "blur",
        },
      ],
      fund_excess: [
        {
          message: "Fund excess must be a number",
        },
      ],
      medicare_number: [
        {
          required: false,
          message: "Medicare number must be a number",
          trigger: "blur",
        },
      ],
      medicare_reference_number: [
        {
          required: false,
          message: "Medicare reference number must be a number",
          trigger: "blur",
        },
      ],
      medicare_expiry_date: [
        {
          required: false,
          message: "Medicare expiry date cannot be blank.",
          trigger: "blur",
        },
      ],
      appointment_confirm_method: [
        {
          required: false,
          message: "Appointment confirm cannot be blank.",
          trigger: "blur",
        },
      ],
    });
    const appointment_length = reactive({
      single: 1,
      double: 2,
      triple: 3,
    });

    const appointment_time = ref(30);

    const _stepperObj = ref(null);
    const editAptRef = ref(null);
    const editAptModalRef = ref(null);
    const currentStepIndex = ref(0);

    const ava_specialist = ref([]);
    const apt_type = ref("");

    const aneAnswers = ref([]);
    const proAnswers = ref([]);
    const anesthetist = ref([]);
    const clinic = ref([]);
    const rooms = ref([]);
    const cur_appointment_type_id = ref("");
    const _specialist = ref("");
    const start_time = ref("");
    const end_time = ref("");
    const appointment_name = ref("");
    const specialist_name = ref("");
    const _appointment_time = ref(30);
    const arrival_time = ref(30);
    const overlapping_cnt = ref(0);

    const addressRef = ref(null);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypesList);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const organisation = computed(() => store.getters.orgList);
    const aptData = computed(() => store.getters.getAptSelected);
    const patientAptData = computed(() => store.getters.getPatientAppointments);

    watch(aptData, () => {
      for (let key in aptInfoData.value)
        aptInfoData.value[key] = aptData.value[key];
      aptInfoData.value.time_slot = [];
      aptInfoData.value.time_slot.push(aptData.value.start_time);
      aptInfoData.value.time_slot.push(aptData.value.end_time);
      cur_appointment_type_id.value = aptData.value.appointment_type_id;
      for (let key in patientInfoData.value)
        patientInfoData.value[key] = aptData.value[key];
      for (let key in billingInfoData.value)
        billingInfoData.value[key] = aptData.value[key];
      for (let key in otherInfoData.value)
        otherInfoData.value[key] = aptData.value[key];
    });

    watch(cur_appointment_type_id, () => {
      aptInfoData.value.appointment_type_id = cur_appointment_type_id.value;
      const _selected = aptTypeList.value.filter(
        (aptType) => aptType.id === cur_appointment_type_id.value
      )[0];
      appointment_name.value = _selected.name;
      _appointment_time.value = Number(
        appointment_length[_selected.appointment_time] * appointment_time.value
      );

      start_time.value = aptInfoData.value.time_slot[0];
      end_time.value = moment(start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      aptInfoData.value.time_slot[1] = end_time.value;
      arrival_time.value = Number(_selected.arrival_time);
      aptInfoData.value.arrival_time = moment(start_time.value, "HH:mm")
        .subtract(arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();

      aptInfoData.value.clinical_code = _selected.clinical_code;
      aptInfoData.value.mbs_code = _selected.mbs_code;
      apt_type.value = _selected.type;
      if (apt_type.value === "Consultation") {
        otherInfoData.value.anesthetic_questions = false;
        otherInfoData.value.procedure_questions = false;
      }

      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("clinics/" + aptInfoData.value.clinic_id + "/rooms")
          .then(({ data }) => {
            rooms.value = data.data;
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            // this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }

      const specialist = store.getters.getSelectedSpecialist;

      let cnt = 0;
      for (let i in specialist.appointments) {
        let _apt_temp = specialist.appointments[i];
        if (
          (timeStr2Number(start_time.value) <=
            timeStr2Number(_apt_temp.start_time) &&
            timeStr2Number(_apt_temp.start_time) <
              timeStr2Number(end_time.value)) ||
          (timeStr2Number(_apt_temp.start_time) <=
            timeStr2Number(start_time.value) &&
            timeStr2Number(start_time.value) <
              timeStr2Number(_apt_temp.end_time))
        ) {
          cnt++;
        }
      }
      overlapping_cnt.value = cnt;
    });

    watch(_specialist, () => {
      aptInfoData.value.specialist_id = _specialist.value;
      const _selected = ava_specialist.value.filter(
        (item) => item.id === _specialist.value
      )[0];
      specialist_name.value = _selected.name;
      anesthetist.value = _selected.anesthetist;
      aptInfoData.value.anesthetist_id = _selected.anesthetist.id;
    });

    watch(start_time, () => {
      aptInfoData.value.time_slot[0] = start_time.value;
      aptInfoData.value.arrival_time = moment(start_time.value, "HH:mm")
        .subtract(arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      end_time.value = moment(start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      aptInfoData.value.time_slot[1] = end_time.value;
    });

    const handleAneQuestions = () => {
      let temp = [];
      for (let i in aneAnswers.value) {
        if (aneAnswers.value[i] === true) {
          temp.push(aneQuestions.value[i].id);
        }
      }
      otherInfoData.value.anesthetic_answers = temp;
    };

    const handleProQuestions = () => {
      let temp = [];
      for (let i in proAnswers.value) {
        if (proAnswers.value[i] === true) {
          temp.push(proQuestions.value[i].id);
        }
      }
      otherInfoData.value.procedure_answers = temp;
    };

    watchEffect(() => {
      if (organisation.value.appointment_length)
        appointment_time.value = organisation.value.appointment_length;

      if (cur_appointment_type_id.value && billingInfoData.value.charge_type) {
        const filteredApt = aptTypeList.value.filter(
          (item) => item.id === cur_appointment_type_id.value
        )[0];
        billingInfoData.value.procedure_price = getProcedurePrice(
          filteredApt,
          billingInfoData.value.charge_type
        );
      }
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInstance(editAptRef.value);

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(Actions.PROCEDURE_QUES.ACTIVE_LIST);
      store.dispatch(Actions.APT.TYPES.LIST);
      store.dispatch(Actions.ORG.LIST);
    });

    const handleStep_1 = () => {
      if (!formRef_1.value) {
        return;
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
        }
      });
    };

    const handleStep_2 = () => {
      if (!formRef_2.value) {
        return;
      }

      formRef_2.value.validate((valid) => {
        if (valid) {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
        }
      });
    };

    const handleStep_3 = () => {
      if (!formRef_3.value) {
        return;
      }

      formRef_3.value.validate((valid) => {
        if (valid) {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
        }
      });
    };

    const handleSave = () => {
      loading.value = true;
      store
        .dispatch(Actions.APT.UPDATE, {
          id: aptData.value.id,
          ...aptInfoData.value,
          ...patientInfoData.value,
          ...billingInfoData.value,
          ...otherInfoData.value,
        })
        .then(() => {
          loading.value = false;
          store.dispatch(Actions.APT.LIST);
          hideModal(editAptModalRef.value);
          if (searchVal.value.date) {
            store.dispatch(Actions.BOOKING.SEARCH.DATE, {
              ...searchVal.value,
            });
            store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
              ...searchVal.value,
            });
          } else {
            store.dispatch(Actions.BOOKING.SEARCH.NEXT_APT, {
              ...searchVal.value,
            });
          }
          resetEditModal();
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
    };

    const resetEditModal = () => {
      currentStepIndex.value = 0;
      _stepperObj.value.goFirst();
      formRef_1.value.resetFields();
      formRef_2.value.resetFields();
      formRef_3.value.resetFields();
      formRef_4.value.resetFields();
      store.dispatch(Actions.PATIENTS.LIST);
    };

    const handleCancel = () => {
      resetEditModal();
    };

    const handleAddressChange = (e) => {
      patientInfoData.value.address = e.formatted_address;
    };

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }
      currentStepIndex.value--;
      _stepperObj.value.goPrev();
    };

    const submit = () => {
      if (!formRef_4.value) {
        return;
      }
      formRef_4.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(Actions.APT.UPDATE, {
              id: aptData.value.id,
              ...aptInfoData.value,
              ...patientInfoData.value,
              ...billingInfoData.value,
              ...otherInfoData.value,
            })
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.APT.LIST);
              hideModal(editAptModalRef.value);
              if (searchVal.value.date) {
                store.dispatch(Actions.BOOKING.SEARCH.DATE, {
                  ...searchVal.value,
                });
                store.dispatch(Actions.BOOKING.SEARCH.SPECIALISTS, {
                  ...searchVal.value,
                });
              } else {
                store.dispatch(Actions.BOOKING.SEARCH.NEXT_APT, {
                  ...searchVal.value,
                });
              }
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    const gotoPage = (page) => {
      currentStepIndex.value = Number(page - 1);
      _stepperObj.value.goto(page);
    };

    const handleSelectReferringDoctor = (item) => {
      otherInfoData.value.referring_doctor_id = item.id;
    };

    let timeout;
    const searchReferralDoctor = (term, cb) => {
      const results = term
        ? referralDoctors.value.filter(createReferringDotorFilter(term))
        : referralDoctors.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    };

    const createReferringDotorFilter = (term) => {
      const keyword = term.toString();
      return (referralDoctor) => {
        const full_name =
          referralDoctor.title +
          " " +
          referralDoctor.first_name +
          " " +
          referralDoctor.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = referralDoctor.address
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    return {
      chargeTypes,
      rules,
      clinic,
      rooms,
      ava_specialist,
      healthFundsList,
      aneQuestions,
      proQuestions,
      aneAnswers,
      proAnswers,
      aptTypeList,
      anesthetist,
      apt_type,
      cur_appointment_type_id,
      _specialist,
      start_time,
      end_time,
      appointment_name,
      specialist_name,
      submit,
      formRef_1,
      formRef_2,
      formRef_3,
      formRef_4,
      loading,
      previousStep,
      handleStep_1,
      handleStep_2,
      handleStep_3,
      handleSave,
      handleCancel,
      currentStepIndex,
      editAptRef,
      editAptModalRef,
      countryList,
      timeZoneList,
      handleAneQuestions,
      handleProQuestions,
      handleAddressChange,
      addressRef,
      aptInfoData,
      patientInfoData,
      billingInfoData,
      otherInfoData,
      patientAptData,
      gotoPage,
      overlapping_cnt,
      searchReferralDoctor,
      handleSelectReferringDoctor,
    };
  },
});
</script>
