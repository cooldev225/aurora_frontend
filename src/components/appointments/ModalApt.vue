<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    :id="modalId"
    ref="createAptModalRef"
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
          <h2>{{ title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <button
            type="button"
            class="btn btn-lg btn-light-danger me-3 mb-1"
            @click="handleCancel"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-3 my-auto">
              <InlineSVG icon="cross" />
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
            id="modal_create_apt_stepper"
            ref="createAptRef"
          >
            <!--begin::Aside-->
            <div
              class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-350px"
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
                  stepperDescription="Doctor Address information and Appointment history"
                />
                <!--begin::Appointment Overview-->
                <AptOverview
                  :aptInfoData="aptInfoData"
                  :patientInfoData="patientInfoData"
                  :specialist="cur_specialist"
                  :appointmentName="appointment_name"
                  :startTime="start_time"
                />
                <!--end::Appointment Overview-->
              </div>

              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Step 1-->
              <div class="current" data-kt-stepper-element="content">
                <el-form
                  class="w-100"
                  :rules="rules"
                  :model="aptInfoData"
                  ref="formRef_1"
                  @submit.prevent="handleStep_1"
                >
                  <div class="row scroll h-520px">
                    <InputWrapper
                      label="Appointment Type"
                      prop="appointment_type_id"
                    >
                      <el-select
                        class="w-100"
                        v-model="cur_appointment_type_id"
                      >
                        <el-option
                          v-for="item in aptTypeListWithRestriction"
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
                    <el-form-item
                      class="px-6"
                      v-if="modalId === 'modal_create_apt'"
                    >
                      <el-checkbox
                        type="checkbox"
                        v-model="aptInfoData.send_forms"
                        :label="
                          appointmentType === 'procedure'
                            ? 'Send Pre-admission form with appointment confirmation?'
                            : 'Send Patient form with appointment confirmation?'
                        "
                      />
                    </el-form-item>

                    <el-divider />
                    <div
                      class="card-info"
                      v-if="modalId === 'modal_create_apt'"
                    >
                      <div class="d-flex flex-row gap-3">
                        <!--begin::Col-->
                        <div class="fv-row">
                          <!--begin::Option-->
                          <input
                            type="radio"
                            class="btn-check"
                            name="patientType"
                            value="new"
                            checked="checked"
                            id="create-new-patient"
                            v-model="patientStatus"
                          />
                          <label
                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
                            for="create-new-patient"
                          >
                            <span class="svg-icon svg-icon-3x me-5">
                              <inline-svg
                                src="media/icons/duotune/communication/com005.svg"
                              />
                            </span>

                            <!--begin::Info-->
                            <span class="d-block fw-bold text-start">
                              <span
                                class="text-dark fw-bolder d-block fs-4 mb-2"
                              >
                                New Patient
                              </span>
                              <span class="text-gray-400 fw-bold fs-6"
                                >Create New Patient</span
                              >
                            </span>
                            <!--end::Info-->
                          </label>
                          <!--end::Option-->
                        </div>
                        <!--end::Col-->

                        <!--begin::Col-->
                        <div class="fv-row">
                          <!--begin::Option-->
                          <input
                            type="radio"
                            class="btn-check"
                            name="patientType"
                            value="exist"
                            id="select-existing-patient"
                            v-model="patientStatus"
                          />
                          <label
                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                            for="select-existing-patient"
                          >
                            <span class="svg-icon svg-icon-3x me-5">
                              <inline-svg
                                src="media/icons/duotune/finance/fin006.svg"
                              />
                            </span>

                            <!--begin::Info-->
                            <span class="d-block fw-bold text-start">
                              <span
                                class="text-dark fw-bolder d-block fs-4 mb-2"
                                >Existing Patient</span
                              >
                              <span class="text-gray-400 fw-bold fs-6"
                                >Import Existing Patient</span
                              >
                            </span>
                            <!--end::Info-->
                          </label>
                          <!--end::Option-->
                        </div>
                        <!--end::Col-->
                      </div>
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between flex-row-reverse"
                    v-if="modalId == 'modal_create_apt'"
                  >
                    <button
                      type="button"
                      class="btn btn-lg btn-primary align-self-end"
                      @click="handleStep_1"
                    >
                      Continue
                      <span class="svg-icon svg-icon-4 ms-1 me-0">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                    </button>
                  </div>
                  <div class="d-flex justify-content-end" v-else>
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
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    v-if="patientStep === 1"
                    class="w-100"
                    :model="filterPatient"
                    @submit.prevent=""
                  >
                    <div class="d-flex flex-column">
                      <InputWrapper label="First Name" prop="filter_first_name">
                        <el-input
                          type="text"
                          v-model="filterPatient.first_name"
                          placeholder="First Name"
                        />
                      </InputWrapper>
                      <InputWrapper label="Last Name" prop="filter_last_name">
                        <el-input
                          type="text"
                          v-model="filterPatient.last_name"
                          placeholder="Last Name"
                        />
                      </InputWrapper>
                      <InputWrapper label="Date of Birth" prop="filter_date">
                        <el-date-picker
                          editable
                          class="w-100"
                          v-model="filterPatient.date_of_birth"
                          format="DD-MM-YYYY"
                          placeholder="01-01-1990"
                        />
                      </InputWrapper>

                      <div class="d-flex justify-content-between my-auto">
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
                        <button
                          type="button"
                          class="btn btn-lg btn-primary align-self-end"
                          v-if="modalId == 'modal_create_apt'"
                          @click="patientStep_1"
                        >
                          Search
                          <span class="svg-icon svg-icon-4 ms-1 me-0">
                            <inline-svg
                              src="media/icons/duotune/arrows/arr064.svg"
                            />
                          </span>
                        </button>
                      </div>
                      <div v-if="modalId == 'modal_edit_apt'">
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
                    <!--end::Row-->
                    <!--begin::Separator-->
                  </el-form>
                  <el-form
                    v-if="patientStep === 2"
                    class="w-100"
                    @submit.prevent=""
                  >
                    <div class="row scroll h-300px">
                      <Datatable
                        :table-header="patientTableHeader"
                        :table-data="patientTableData"
                        :key="tableKey"
                        :rows-per-page="5"
                        :enable-items-per-page-dropdown="true"
                      >
                        <template v-slot:cell-UR_number="{ row: item }">
                          {{ item.UR_number }}
                        </template>
                        <template v-slot:cell-full_name="{ row: item }">
                          <span
                            class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                          >
                            {{ item.first_name }} {{ item.last_name }}
                          </span>
                        </template>
                        <template v-slot:cell-dob="{ row: item }">
                          <span
                            class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                          >
                            {{ formatDate(item.date_of_birth) }}
                          </span>
                        </template>
                        <template v-slot:cell-contact_number="{ row: item }">
                          <span
                            class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                          >
                            {{ item.contact_number }}
                          </span>
                        </template>
                        <template v-slot:cell-action="{ row: item }">
                          <button
                            @click="selectPatient(item)"
                            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <span class="svg-icon svg-icon-3">
                              <i class="fas fa-check"></i>
                            </span>
                          </button>
                        </template>
                      </Datatable>
                    </div>
                    <span v-if="patientInfoData.is_ok === false">
                      This patient is blacklisted and cannot be booked in.
                      Please speak to your organization manager to resolve.
                    </span>
                    <div class="special-patient-alerts d-flex gap-2 flex-row">
                      <template
                        v-for="alert in patientInfoData.alerts"
                        :key="alert.id"
                      >
                        <template v-if="!alert.is_dismissed">
                          <PatientAlert :alert="alert" />
                          <ViewPatientAlertModal :alert="alert" />
                        </template>
                      </template>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        data-kt-stepper-action="previous"
                        @click="patientPrevStep"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Back
                      </button>
                      <button
                        type="button"
                        v-if="patientInfoData.is_ok"
                        class="btn btn-lg btn-primary align-self-end"
                        @click="afterSelectPatient"
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
                  <el-form
                    v-if="patientStep === 3"
                    class="w-100"
                    :model="patientInfoData"
                    :rules="rules"
                    ref="formRef_2"
                    @submit.prevent=""
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
                          @keyup="matchExistPatientHandle(event)"
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
                          @keyup="matchExistPatientHandle(event)"
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
                          @change="matchExistPatientHandle(event)"
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

                      <div
                        class="exist-message px-7 mt-2 mb-2"
                        v-if="patientInfoData.is_exist"
                      >
                        <label class="mb-2">
                          A patient matching these details already exists
                        </label>
                        <button
                          type="button"
                          class="btn btn-lg btn-primary w-100 mb-5"
                          @click="showMatchPatientsHandle"
                        >
                          Show match patients
                        </button>
                      </div>

                      <InputWrapper label="Address" prop="address">
                        <div class="el-input">
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
                        </div>
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
                        class="col-12"
                        label="Clinical Alerts"
                        prop="clinical_alerts"
                      >
                        <el-input
                          type="textarea"
                          v-model="patientInfoData.clinical_alerts"
                          placeholder="Enter Clinical Alerts"
                        />
                      </InputWrapper>

                      <!-- <InputWrapper
                        class="col-6"
                        label="Allergies"
                        prop="allergies"
                      >
                        <el-input
                          type="textarea"
                          v-model="patientInfoData.allergies"
                          placeholder="Enter Allergies"
                        />
                      </InputWrapper> -->
                      <InputWrapper
                        class="col-12"
                        label="Allergies"
                        prop="allergies"
                      >
                        <el-select
                          class="w-100"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          :reserve-keyword="false"
                          v-model="patientInfoData.allergies"
                        >
                          <el-option
                            v-for="item in allergiesList"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
                          />
                        </el-select>
                      </InputWrapper>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        data-kt-stepper-action="previous"
                        @click="patientPrevStep"
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
                          v-if="modalId == 'modal_edit_apt'"
                          @click="handleSave"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          class="btn btn-lg btn-primary align-self-end"
                          @click="handleStep_2"
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
                    @submit.prevent=""
                  >
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

                      <div>
                        <button
                          type="button"
                          class="btn btn-light btn-icon-primary me-3 mb-3"
                          @click="showAddClaimSourceModal"
                        >
                          Add Claim Source
                        </button>

                        <div
                          v-for="(item, index) in billingInfoData.claim_sources"
                          :key="`new-claim-source-${index}`"
                          class="d-flex flex-row align-items-center justify-content-between p-3 mb-3 card border border-dashed border-primary gap-4"
                        >
                          <div>
                            <label class="fs-5 text-primary">
                              {{ getBillingType(item.billing_type) }}:

                              <span class="text-black fs-5">
                                {{ item.member_number }}
                              </span>
                            </label>

                            <div
                              v-if="item.billing_type != 3"
                              class="d-flex gap-3"
                            >
                              <label class="text-primary">
                                Reference:

                                <span class="text-black">
                                  {{ item.member_ref_number ?? "N/A" }}
                                </span>
                              </label>

                              <label
                                v-if="item.billing_type == 2"
                                class="text-primary"
                              >
                                Fund:

                                <span class="text-black">
                                  {{ getHealthFund(item.health_fund_id) }}
                                </span>
                              </label>
                            </div>
                          </div>

                          <button
                            type="button"
                            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            @click="deleteClaimSource(item)"
                          >
                            <span class="svg-icon svg-icon-3">
                              <InlineSVG icon="bin" />
                            </span>
                          </button>
                        </div>

                        <AddClaimSourceModal
                          :patient="patientInfoData"
                          v-on:addClaimSource="addNewClaimSource"
                          v-on:closeModal="closeAddClaimSourceModal"
                          v-on:updateDetails="updatePatientDetails"
                          shouldEmit
                        />
                      </div>

                      <el-divider />

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
                        v-if="billingInfoData.charge_type === 'healthcare-card'"
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
                              v-model="billingInfoData.add_other_account_holder"
                              label="Add other account holder"
                            />
                          </el-form-item>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                        <!--end::Body-->
                      </div>
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
                          v-if="modalId == 'modal_edit_apt'"
                          @click="handleSave"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          class="btn btn-lg btn-primary align-self-end"
                          @click="handleStep_3"
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
                    @submit.prevent=""
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
                      <!--start::Doctor Address Information-->
                      <div class="card-info">
                        <div class="mb-6 d-flex justify-content-between">
                          <span class="fs-3 fw-bold text-muted"
                            >Doctor Address Information</span
                          >
                          <el-checkbox
                            type="checkbox"
                            v-model="otherInfoData.no_referral"
                            label="No Doctor Address"
                          />
                        </div>
                        <div class="row">
                          <template v-if="otherInfoData.no_referral">
                            <InputWrapper
                              class="col-6"
                              label="No Doctor Reason"
                              prop="no_doctor_reason"
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
                              label="Doctor Address Book"
                              prop="doctor_address_book_id"
                            >
                              <el-autocomplete
                                class="w-100"
                                v-model="otherInfoData.doctor_address_book_name"
                                value-key="full_name"
                                :fetch-suggestions="searchDoctorAddressBook"
                                placeholder="Please input"
                                :trigger-on-focus="false"
                                @select="handleSelectDoctorAddressBook"
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
                      <div class="card-info" v-if="patientStatus === 'exist'">
                        <span class="fs-3 fw-bold text-muted"
                          >Appointment History</span
                        >

                        <div style="color: grey">
                          <span class="me-2"
                            >Total Appointments:
                            {{ patientAptData.appointment_count }}
                          </span>
                          <span class="me-2">
                            <span class="me-2">/</span>Cancelled:
                            {{ patientAptData.cancelled_appointment_count }}
                          </span>
                          <span class="me-2">
                            <span class="me-2">/</span>Missed:
                            {{ patientAptData.missed_appointment_count }}
                          </span>
                        </div>

                        <AppointmentHistory
                          :pastAppointments="patientAptData.pastAppointments"
                          :futureAppointments="
                            patientAptData.futureAppointments
                          "
                        />
                      </div>
                    </div>
                    <!--end::Appointment History-->

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

                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        v-if="modalId == 'modal_edit_apt'"
                        @click="handleSave"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-lg btn-primary align-self-end"
                        @click="submit"
                        v-else
                      >
                        Create Appointment
                        <span class="svg-icon svg-icon-4 ms-1 me-0">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </button>
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

<style lang="scss">
.special-patient-alerts .modal.patient-alert .modal-footer {
  display: none;
}

.exist-message {
  label {
    color: grey;
  }
}
</style>
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
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Actions } from "@/store/enums/StoreEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { hideModal } from "@/core/helpers/dom";
import moment from "moment";
import chargeTypes, { getProcedurePrice } from "@/core/data/charge-types";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useRouter } from "vue-router";
import AptOverview from "@/components/appointments/partials/AppointmentOverview";
import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";
import AppointmentHistory from "@/components/presets/PatientElements/AppointmentHistory.vue";
import StepperNavItem from "@/components/presets/StepperElements/StepperNavItem.vue";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import AlertBadge from "@/components/presets/GeneralElements/AlertBadge.vue";
import PatientAlert from "@/components/presets/PatientElements/PatientAlert.vue";
import ViewPatientAlertModal from "@/views/patients/modals/ViewPatientAlertModal.vue";
import PatientBillingTypes from "@/core/data/patient-billing-types";
import AddClaimSourceModal from "@/views/patients/modals/AddClaimSourceModal.vue";
import { Modal } from "bootstrap";

export default defineComponent({
  props: {
    modalId: { type: String, required: true },
  },

  name: "Apt-Modal",
  directives: {
    mask,
  },
  components: {
    Datatable,
    AppointmentHistory,
    StepperNavItem,
    InputWrapper,
    AlertBadge,
    AptOverview,
    PatientAlert,
    ViewPatientAlertModal,
    AddClaimSourceModal,
  },

  setup(props) {
    const store = useStore();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const loading = ref(false);
    const tableKey = ref(0);

    const doctorAddressBooks = computed(
      () => store.getters.getDoctorAddressBookList
    );

    const router = useRouter();
    const claimSourceModal = ref(null);

    const aptInfoData = ref({
      clinic_name: "",
      clinic_id: "",
      send_forms: true,
      date: "",
      arrival_time: "",
      time_slot: ["2022-06-20T09:00", "2022-06-20T17:00"],
      appointment_type_id: "",
      specialist_id: "",
      room_id: "",
      note: "",
      patient_id: null,
      start_time: null,
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
      also_known_as: [],
      is_exist: false,
    });

    const billingInfoData = ref({
      charge_type: chargeTypes[0].value,
      claim_sources: [],
      procedure_price: "",
      add_other_account_holder: false,
    });

    const otherInfoData = ref({
      anesthetic_questions: false,
      anesthetic_answers: [],
      doctor_address_book_name: "",
      doctor_address_book_id: "",
      referral_duration: "",
      referral_date: "",
      no_referral: false,
      no_referral_reason: "",
    });

    const rules = ref({
      clinic_id: [
        {
          required: true,
          message: "Clinic Name cannot be blank.",
          trigger: "blur",
        },
      ],
      arrival_time: [
        {
          required: true,
          message: "Arrival time cannot be blank.",
          trigger: "blur",
        },
      ],
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
          message: "Mobile Number cannot be blank.",
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
      procedure_price: [
        {
          type: "number",
          message: "Procedure price must be a number",
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
      SINGLE: 1,
      DOUBLE: 2,
      TRIPLE: 3,
    });
    const appointment_time = ref(30);
    const _stepperObj = ref(null);
    const createAptRef = ref(null);
    const createAptModalRef = ref(null);
    const currentStepIndex = ref(0);

    const editAptRef = ref(null);
    const editAptModalRef = ref(null);
    const cur_specialist_id = ref("");

    const ava_specialist = ref([]);
    const apt_type = ref("");

    const aneAnswers = ref([]);
    const proAnswers = ref([]);
    const anesthetist = ref([]);
    const clinic = ref([]);
    const rooms = ref([]);
    const cur_appointment_type_id = ref("");
    const appointmentType = ref("");
    const cur_specialist = ref("");
    const start_time = ref("");
    const end_time = ref("");
    const appointment_name = ref("");
    const specialist_name = ref("");
    const _appointment_time = ref(30);
    const arrival_time = ref(30);

    const addressRef = ref(null);
    const title = ref(null);
    const refName = ref(null);
    const refCode = ref(null);
    const allergiesList = ref([]);

    const patientTableData = ref([]);
    const patientTableHeader = ref([
      {
        name: "Full Name",
        key: "full_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Date of Birth",
        key: "dob",
        sortable: true,
        searchable: true,
      },
      {
        name: "Contact Number",
        key: "contact_number",
        sortable: true,
        searchable: true,
      },
      {
        name: "",
        key: "action",
      },
    ]);
    const filterPatient = reactive({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      ur_number: "",
    });
    const patientStatus = ref("new");
    const patientStep = ref(3);

    const overlapping_cnt = ref(0);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypesList);
    const aptTypeListWithRestriction = ref();
    const searchVal = computed(() => store.getters.getSearchVariable);
    const patientList = computed(() => store.getters.patientsList);
    const patientAptData = computed(() => store.getters.getPatientAppointments);
    const aptData = computed(() => store.getters.getAptSelected);
    const bookingData = computed(() => store.getters.bookingDatas);
    const referralDoctors = computed(() => store.getters.getReferralDoctorList);

    // Setting modal Heading and Ids
    const setTitle = () => {
      if (props.modalId === "modal_create_apt") {
        title.value = "Create Appointment";
        refName.value = "createAptModalRef";
      } else if (props.modalId === "modal_edit_apt") {
        title.value = "Update Appointment";
        refName.value = "editAptModalRef";
        refCode.value = "editAptRef";
        _stepperObj.value = StepperComponent.createInstance(editAptRef.value);
      }
    };

    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY").toString();
    };

    const getBillingType = (type) => {
      const foundType = PatientBillingTypes.find(
        (billing) => billing.value == type
      );

      return foundType?.label ?? null;
    };

    const getHealthFund = (id) => {
      const foundFund = healthFundsList.value.find((fund) => fund.code == id);

      return foundFund?.name ?? null;
    };

    const showAddClaimSourceModal = () => {
      if (!claimSourceModal.value) {
        claimSourceModal.value = new Modal(
          document.getElementById("modal_add_claim_source")
        );
      }

      claimSourceModal.value.show();
    };

    const closeAddClaimSourceModal = () => {
      claimSourceModal.value.hide();
    };

    const addNewClaimSource = (event) => {
      billingInfoData.value.claim_sources.push(event);
    };

    const deleteClaimSource = (source) => {
      const index = billingInfoData.value.claim_sources.indexOf(source);

      billingInfoData.value.claim_sources.splice(index, 1);

      if (Object.prototype.hasOwnProperty.call(source, "id")) {
        store.dispatch(PatientActions.CLAIM_SOURCE.DELETE, source);
      }
    };

    const updateAptTime = (startTime, endTime) => {
      aptInfoData.value.time_slot = [];
      aptInfoData.value.time_slot.push(
        moment(startTime, "HH:mm").format("HH:mm")
      );
      start_time.value = aptInfoData.value.time_slot[0];
      aptInfoData.value.time_slot.push(
        moment(endTime, "HH:mm").format("HH:mm")
      );
      aptInfoData.value.start_time = moment(startTime, "HH:mm").format("HH:mm");
    };

    const getAptTypeName = (id) => {
      if (id) {
        const _selected = aptTypeList.value.filter(
          (aptType) => aptType.id === id
        )[0];
        if (_selected.name) {
          appointment_name.value = _selected.name;
        }
      }
    };
    // Get Selected APT data when user edit appointments
    watch(aptData, () => {
      if (props.modalId == "modal_edit_apt") {
        for (let key in aptInfoData.value)
          aptInfoData.value[key] = aptData.value[key];
        cur_appointment_type_id.value = aptData.value.appointment_type_id;
        getAptTypeName(aptData.value.appointment_type_id);
        cur_specialist.value = aptData.value.specialist;
        for (let key in patientInfoData.value)
          patientInfoData.value[key] = aptData.value.patient[key];
        /*

         Set Billing options here when user edit
         */
        //for (let key in billingInfoData.value)
        // billingInfoData.value[key] = aptData.value.patient.billing[0][key];
        for (let key in otherInfoData.value)
          otherInfoData.value[key] = aptData.value.referral[key];
        // for (let key in patientInfoData.value)
        aptInfoData.value.clinic_id = aptData.value.clinic_id;
        aptInfoData.value.clinic_name = aptData.value.clinic.name;
        specialist_name.value = aptData.value.specialist.full_name;
        billingInfoData.value.charge_type = aptData.value.charge_type;
        aptInfoData.value.date = moment(aptData.value.date)
          .format("DD-MM-YYYY")
          .toString();
        getAvailableRooms();
        updateAptTime(aptData.value.start_time, aptData.value.end_time);
      }
    });

    watch(cur_appointment_type_id, () => {
      getAptTypeName(cur_appointment_type_id.value);
      if (props.modalId == "modal_create_apt") {
        // setting up selected appointment type
        aptInfoData.value.appointment_type_id = cur_appointment_type_id.value;
        const _selected = aptTypeList.value.filter(
          (aptType) => aptType.id === cur_appointment_type_id.value
        )[0];

        if (typeof _selected === "undefined") {
          appointment_name.value = "";
          _appointment_time.value = Number(appointment_time.value);
          arrival_time.value = 30;

          aptInfoData.value.clinical_code = "";
          aptInfoData.value.mbs_code = "";
          apt_type.value = "";
        } else {
          appointment_name.value = _selected.name;
          appointmentType.value = _selected.type;
          _appointment_time.value = Number(
            appointment_length[_selected.appointment_time] *
              appointment_time.value
          );
          arrival_time.value = Number(_selected.arrival_time);
          aptInfoData.value.clinical_code = _selected.clinical_code;
          aptInfoData.value.mbs_code = _selected.mbs_code;
          apt_type.value = _selected.type;
        }

        end_time.value = moment(start_time.value, "HH:mm")
          .add(_appointment_time.value, "minutes")
          .format("HH:mm")
          .toString();
        updateAptTime(start_time.value, end_time.value);
        aptInfoData.value.arrival_time = moment(start_time.value, "HH:mm")
          .subtract(arrival_time.value, "minutes")
          .format("HH:mm")
          .toString();

        const specialist = store.getters.getSelectedSpecialist;
        if (apt_type.value === "Consultation") {
          otherInfoData.value.anesthetic_questions = false;
        }
        let cnt = 0;
        if (specialist) {
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
        }
        overlapping_cnt.value = cnt;
      }
    });

    // Make sure this watch runs only edit
    // watch(cur_specialist_id, () => {
    //   // aptInfoData.value.specialist_id = cur_specialist_id.value;
    //   const specialist = store.getters.getSelectedSpecialist;
    //   const _selected = specialist.filter(
    //     (item) => item.id === cur_specialist_id.value
    //   )[0];
    //   specialist_name.value = _selected.name;
    //   anesthetist.value = _selected.anesthetist;
    //   aptInfoData.value.anesthetist_id = _selected.anesthetist.id;
    // });

    watch(cur_specialist, () => {
      aptInfoData.value.specialist_id = cur_specialist.value.id;
      specialist_name.value = cur_specialist.value.full_name;
      // anesthetist.value = _selected.anesthetist;
      // aptInfoData.value.anesthetist_id = _selected.anesthetist.id;
    });

    watch(start_time, () => {
      aptInfoData.value.arrival_time = moment(start_time.value, "HH:mm")
        .subtract(arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      end_time.value = moment(start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      if (props.modalId == "modal_create_apt") {
        updateAptTime(start_time.value, end_time.value);
      }
    });

    watch(patientStatus, () => {
      if (patientStatus.value === "new") patientStep.value = 3;
      else {
        patientStep.value = 1;
        filterPatient.first_name = "";
        filterPatient.last_name = "";
        filterPatient.date_of_birth = "";
      }
    });

    const renderTable = () => tableKey.value++;

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

    const matchExistPatientHandle = () => {
      let filtered_patients = patientList.value.filter(
        (p) =>
          p.first_name === patientInfoData.value.first_name &&
          p.last_name === patientInfoData.value.last_name &&
          moment(p.date_of_birth).format("DD/MM/YYYY") ===
            moment(patientInfoData.value.date_of_birth).format("DD/MM/YYYY")
      );
      if (filtered_patients.length) {
        patientInfoData.value.is_exist = true;
      }
    };

    const showMatchPatientsHandle = () => {
      patientStep.value = 1;
      filterPatient.first_name = patientInfoData.value.first_name;
      filterPatient.last_name = patientInfoData.value.last_name;
      filterPatient.date_of_birth = patientInfoData.value.date_of_birth;
      patientStep_1();
      patientInfoData.value.is_exist = false;
    };

    watch(patientList, () => {
      patientTableData.value = patientList;
      renderTable();
    });

    // Setting user selected date
    watch(searchVal, () => {
      aptInfoData.value.date = moment(searchVal.value.date)
        .format("DD-MM-YYYY")
        .toString();
    });

    watchEffect(() => {
      appointment_time.value = 30;
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      let specialistRestriction = bookingData.restriction;
      // Setting appointment types base on apt create or edit
      if (
        specialistRestriction === "NONE" ||
        props.modalId === "modal_edit_apt"
      ) {
        aptTypeListWithRestriction.value = aptTypeList.value;
      } else {
        aptInfoData.value.date = bookingData.date;
        aptTypeListWithRestriction.value = aptTypeList.value.filter(
          (item) => item.type === specialistRestriction
        );
      }

      if (bookingData.time_slot) {
        start_time.value = moment(bookingData.time_slot[0]).format("HH:mm");
        end_time.value = moment(bookingData.time_slot[1]).format("HH:mm");
      }

      if (cur_appointment_type_id.value == "") {
        overlapping_cnt.value = bookingData.overlapping_cnt;
      }
      if (bookingData.selected_specialist) {
        cur_specialist.value = bookingData.selected_specialist;
        if (bookingData.selected_specialist.anesthetist) {
          anesthetist.value = bookingData.selected_specialist.anesthetist;
        }

        if (bookingData.selected_specialist) {
          clinic.value =
            bookingData.selected_specialist.schedule_timeslots[0].clinic;
          if (props.modalId !== "modal_edit_apt") {
            aptInfoData.value.clinic_name = clinic.value.name;
            aptInfoData.value.clinic_id = clinic.value.id;
          }
          if (props.modalId === "modal_create_apt") {
            aptInfoData.value.date = bookingData.date;
          }
          if (bookingData.appointment_type) {
            cur_appointment_type_id.value = bookingData.appointment_type.id;
          }
          getAvailableRooms();
        }
      }

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
      setTitle();
      _stepperObj.value = StepperComponent.createInstance(createAptRef.value);
      if (props.modalId === "modal_create_apt") {
        store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
      }
      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
      store.dispatch(PatientActions.ALLERGIES_LIST).then((data) => {
        allergiesList.value = data;
      });
    });

    const getAvailableRooms = () => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("clinics/" + aptInfoData.value.clinic_id + "/rooms")
          .then(({ data }) => {
            rooms.value = data.data;
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    };

    const handleStep_1 = () => {
      if (!formRef_1.value) {
        return;
      }

      //custom
      if (patientStatus.value === "new") {
        patientStep.value = 3;
      } else {
        patientStep.value = 1;
      }

      if (props.modalId == "modal_create_apt") {
        patientInfoData.value = {
          first_name: "",
          last_name: "",
          date_of_birth: "",
          email: "",
          address: "",
          contact_number: "",
          appointment_confirm_method: "sms",
          allergies: "",
          clinical_alerts: "",
          also_known_as: [],
        };
        if (formRef_2.value) formRef_2.value.resetFields();
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          store.dispatch(PatientActions.LIST);
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
    // Send request to update exiting appointment
    const handleSave = () => {
      loading.value = true;
      aptInfoData.value.appointment_type_id = cur_appointment_type_id.value;
      store
        .dispatch(AppointmentActions.APT.UPDATE, {
          id: aptData.value.id,
          ...aptInfoData.value,
          ...patientInfoData.value,
          ...billingInfoData.value,
          ...otherInfoData.value,
        })
        .then(() => {
          loading.value = false;
          store.dispatch(AppointmentActions.LIST);
          hideModal(createAptModalRef.value);
          resetCreateModal();
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.errors);
        });
    };

    const resetCreateModal = () => {
      currentStepIndex.value = 0;
      _stepperObj.value.goFirst();

      if (props.modalId == "modal_create_apt") {
        formRef_1.value.resetFields();
        formRef_3.value.resetFields();
        formRef_4.value.resetFields();
        if (formRef_2.value) formRef_2.value.resetFields();
        filterPatient.first_name = "";
        filterPatient.last_name = "";
        filterPatient.date_of_birth = "";
        filterPatient.ur_number = "";
        cur_appointment_type_id.value = "";
        for (let key in patientInfoData.value) patientInfoData.value[key] = "";
        for (let key in billingInfoData.value) billingInfoData.value[key] = "";
        billingInfoData.value.claim_sources = [];
        patientInfoData.value.also_known_as = [];
        patientStatus.value = "new";
        patientStep.value = 3;
      } else {
        // Edit modal
        store.dispatch(PatientActions.LIST);
      }
      //
      // cur_appointment_type_id.value = "";
      // patientStatus.value = "new";
      // patientStep.value = 1;
      // patientTableData.value = patientList.value;
    };

    const handleCancel = () => {
      _stepperObj.value = StepperComponent.createInstance(createAptRef.value);
      resetCreateModal();
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
          props.modalId === "modal_create_apt" ? createApt() : updateApt();
          resetCreateModal();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    const createApt = () => {
      const billingInfo = billingInfoData.value;
      const patientInfo = patientInfoData.value;

      billingInfo.claim_sources = billingInfo.claim_sources.filter((source) => {
        return !Object.prototype.hasOwnProperty.call(source, "id");
      });

      patientInfo.also_known_as = patientInfo.also_known_as.filter((source) => {
        return !Object.prototype.hasOwnProperty.call(source, "id");
      });

      store
        .dispatch(AppointmentActions.APT.CREATE, {
          ...aptInfoData.value,
          ...patientInfo,
          ...billingInfo,
          ...otherInfoData.value,
        })
        .then(() => {
          loading.value = false;
          store.dispatch(AppointmentActions.LIST, {
            date: bookingData.value.date,
          });
          handleCancel();
          Swal.fire({
            text: "Successfully Created!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-info",
            },
            showCancelButton: true,
            cancelButtonText: "Deposit",
          }).then((result) => {
            hideModal(createAptModalRef.value);
            resetCreateModal();
            if (result.dismiss === "cancel") {
              router.push({ name: "make-payment-pay" });
            }
          });
        })
        .catch((response) => {
          loading.value = false;
          console.log(response);
        });
    };

    const updateApt = () => {
      const billingInfo = billingInfoData.value;
      const patientInfo = patientInfoData.value;
      aptInfoData.value.appointment_type_id = cur_appointment_type_id.value;

      billingInfo.claim_sources = billingInfo.claim_sources.filter((source) => {
        return !Object.prototype.hasOwnProperty.call(source, "id");
      });

      patientInfo.also_known_as = patientInfo.also_known_as.filter((source) => {
        return !Object.prototype.hasOwnProperty.call(source, "id");
      });

      store
        .dispatch(Actions.APT.UPDATE, {
          id: aptData.value.id,
          ...aptInfoData.value,
          ...patientInfo,
          ...billingInfo,
          ...otherInfoData.value,
        })
        .then(() => {
          loading.value = false;
          store.dispatch(Actions.APT.LIST);
          hideModal(editAptModalRef.value);
        })
        .catch(({ response }) => {
          loading.value = false;
          console.log(response.data.error);
        });
    };

    const patientStep_1 = () => {
      patientTableData.value = [];
      for (let key in patientInfoData.value) patientInfoData.value[key] = "";
      if (filterPatient.date_of_birth != "")
        filterPatient.date_of_birth = moment(
          filterPatient.date_of_birth
        ).format("YYYY-MM-DD");
      store.dispatch(PatientActions.LIST, filterPatient);
      patientStep.value++;
    };

    const selectPatient = (item) => {
      store.dispatch(PatientActions.APPOINTMENTS, item.id);
      store.dispatch(PatientActions.VIEW, item.id);
      //patientInfoData.value = item;
      for (let key in patientInfoData.value)
        patientInfoData.value[key] = item[key];
      patientInfoData.value.alerts = item.alerts;
      aptInfoData.value.patient_id = item.id;

      for (let key in billingInfoData.value) {
        if (
          key === "charge_type" ||
          key === "procedure_price" ||
          key === "claim_sources"
        ) {
          continue;
        }

        billingInfoData.value[key] = item[key];
      }

      billingInfoData.value.claim_sources = item.billing;

      patientInfoData.value.also_known_as = item.also_known_as;

      patientInfoData.value.is_ok = true;
      let blocklist = patientInfoData.value.alerts.filter(
        (a) => a.alert_level == "BLACKLISTED" && !a.is_dismissed
      );
      if (blocklist.length) patientInfoData.value.is_ok = false;
      // patientStep.value++;
    };

    const afterSelectPatient = () => {
      patientStep.value++;
    };

    const gotoPage = (page) => {
      if (props.modalId === "modal_edit_apt") {
        currentStepIndex.value = Number(page - 1);
        _stepperObj.value.goto(page);
      }
    };

    const patientPrevStep = () => {
      if (patientStatus.value === "new") previousStep();
      else patientStep.value--;
    };

    const handleSelectDoctorAddressBook = (item) => {
      otherInfoData.value.doctor_address_book_id = item.id;
    };

    let timeout;
    const searchDoctorAddressBook = (term, cb) => {
      const results = term
        ? doctorAddressBooks.value.filter(createDotorAddressBookFilter(term))
        : doctorAddressBooks.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    };

    const createDotorAddressBookFilter = (term) => {
      const keyword = term.toString();
      return (doctorAddressBook) => {
        const full_name =
          doctorAddressBook.title +
          " " +
          doctorAddressBook.first_name +
          " " +
          doctorAddressBook.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = doctorAddressBook.address
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };

    const timeStr2Number = (time) => {
      return Number(time.split(":")[0] + time.split(":")[1]);
    };

    const updatePatientDetails = (details) => {
      const previousData = {
        first_name: patientInfoData.value.first_name,
        last_name: patientInfoData.value.last_name,
      };

      for (const detailName in details) {
        patientInfoData.value[detailName] = details[detailName];
      }

      patientInfoData.value.also_known_as.push(previousData);
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
      aptTypeListWithRestriction,
      anesthetist,
      apt_type,
      cur_appointment_type_id,
      cur_specialist,
      start_time,
      end_time,
      appointment_name,
      appointmentType,
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
      handleCancel,
      currentStepIndex,
      createAptRef,
      createAptModalRef,
      countryList,
      timeZoneList,
      handleAneQuestions,
      handleProQuestions,
      handleAddressChange,
      addressRef,
      patientStatus,
      patientStep,
      patientStep_1,
      filterPatient,
      patientTableHeader,
      patientTableData,
      selectPatient,
      afterSelectPatient,
      patientPrevStep,
      aptInfoData,
      patientInfoData,
      billingInfoData,
      otherInfoData,
      formatDate,
      patientAptData,
      overlapping_cnt,
      searchDoctorAddressBook,
      handleSelectDoctorAddressBook,
      tableKey,
      gotoPage,
      editAptRef,
      editAptModalRef,
      handleSave,
      aptTypeList,
      title,
      refName,
      matchExistPatientHandle,
      showMatchPatientsHandle,
      PatientBillingTypes,
      showAddClaimSourceModal,
      addNewClaimSource,
      closeAddClaimSourceModal,
      deleteClaimSource,
      getBillingType,
      getHealthFund,
      updatePatientDetails,
      allergiesList,
    };
  },
});
</script>
