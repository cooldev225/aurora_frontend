<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_create_apt"
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
          <h2>Create Appointment</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            @click="handleCancel"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
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
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Appointment</h3>

                    <div class="stepper-desc">Setup Appointment Info</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Personal Info</h3>

                    <div class="stepper-desc">Setup Personal Details</div>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Billing Info</h3>

                    <div class="stepper-desc">Select Billing Details</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Other Info</h3>

                    <div class="stepper-desc">Setup Other Details</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4-->
                <div class="d-flex flex-column gap-2">
                  <h3>Appointment Information</h3>
                  <label class="fs-5 text-primary"
                    >Service Reference Number:
                    <span class="text-black fs-5">{{
                      formData.reference_number
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Clinic Name:
                    <span class="text-black fs-5">{{
                      formData.clinic_name
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Time:
                    <span class="text-black fs-5"
                      >{{ _start_time }} - {{ _end_time }}</span
                    >
                    <span v-if="formData.arrival_time" class="text-black fs-5"
                      >(Arrival: {{ formData.arrival_time }})</span
                    ></label
                  >
                  <label class="fs-5 text-primary"
                    >Appointment Type:
                    <span class="text-black fs-5">{{
                      _appointment_name
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Specialist:
                    <span class="text-black fs-5">{{
                      _specialist_name
                    }}</span></label
                  >
                </div>
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Step 1-->
              <div class="current" data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :rules="rules"
                    :model="formData"
                    ref="formRef_1"
                    @submit.prevent="handleStep_1"
                  >
                    <div class="row scroll h-450px">
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Appointment Type
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Start Time
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="start_time">
                                <el-time-select
                                  v-model="_start_time"
                                  start="00:00"
                                  step="00:15"
                                  end="23:59"
                                  clearable="false"
                                  placeholder="Select time"
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
                              <label class="required fs-6 fw-bold mb-2">
                                End time
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="end_time">
                                <el-time-select
                                  v-model="_end_time"
                                  start="00:00"
                                  step="00:15"
                                  end="23:59"
                                  disabled
                                  placeholder="Select time"
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
                              <label class="required fs-6 fw-bold mb-2">
                                Appointment Type
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="appointment_type_id">
                                <el-select class="w-100" v-model="_appointment">
                                  <template
                                    v-for="(item, idx) in aptTypeList"
                                    :key="idx"
                                  >
                                    <el-option
                                      :value="item.id"
                                      :label="item.name"
                                    />
                                  </template>
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Specialist
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="specialist_id">
                                <el-select class="w-100" v-model="_specialist">
                                  <template
                                    v-for="(item, index) in ava_specialist"
                                    :key="index"
                                  >
                                    <el-option
                                      :value="item.id"
                                      :label="item.name"
                                    />
                                  </template>
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Clinical Code
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="clinical_code">
                                <el-input
                                  v-model="formData.clinical_code"
                                  disabled
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
                              <label class="fs-6 fw-bold mb-2">
                                MBS Code
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="mbs_code">
                                <el-input
                                  v-model="formData.mbs_code"
                                  disabled
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
                              <label class="fs-6 fw-bold mb-2"> Room </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="room_id">
                                <el-select
                                  class="w-100"
                                  v-model.number="formData.room_id"
                                >
                                  <template
                                    v-for="(room, idx) in rooms"
                                    :key="idx"
                                  >
                                    <el-option
                                      :value="room.id"
                                      :label="room.name"
                                    />
                                  </template>
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Anesthetist
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="anesthetist_id">
                                <el-select
                                  class="w-100"
                                  v-model="formData.anesthetist_id"
                                  disabled
                                >
                                  <el-option
                                    :value="anesthetist.id"
                                    :label="anesthetist.name"
                                  />
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </div>
                      <el-divider />
                      <div class="card-info">
                        <div class="mb-6 d-flex justify-content-between">
                          <span class="fs-3 fw-bold text-muted"
                            >Referral Information</span
                          >
                          <el-checkbox
                            type="checkbox"
                            v-model="formData.no_referral"
                            label="No Referral"
                          />
                        </div>
                        <div class="row">
                          <template v-if="formData.no_referral">
                            <div class="col-sm-6">
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="required fs-6 fw-bold mb-2">
                                  No Referral Reason
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="no_referral_reason">
                                  <el-input
                                    type="text"
                                    v-model="formData.no_referral_reason"
                                    placeholder="Please Enter Reason"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                          </template>
                          <template v-else>
                            <div class="col-sm-6">
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="required fs-6 fw-bold mb-2">
                                  Referring Doctor
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="reffering_doctor">
                                  <el-select
                                    class="w-100"
                                    v-model="formData.reffering_doctor"
                                    placeholder="Select Reffering Doctor"
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
                                <label class="required fs-6 fw-bold mb-2">
                                  Referral Duration
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="referral_duration">
                                  <el-select
                                    class="w-100"
                                    v-model="formData.referral_duration"
                                    placeholder="Enter Referral Duration"
                                  >
                                    <el-option value="0" label="Indefinite" />
                                    <el-option value="3" label="3 Months" />
                                    <el-option value="12" label="12 Months" />
                                  </el-select>
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div class="col-sm-6">
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="required fs-6 fw-bold mb-2">
                                  Referral Date
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="referral_date">
                                  <el-date-picker
                                    class="w-100"
                                    v-model="formData.referral_date"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        @click="handleCancel"
                        data-bs-dismiss="modal"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Cancel
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
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="formData"
                    :rules="rules"
                    ref="formRef_2"
                    @submit.prevent="handleStep_2"
                  >
                    <div class="row scroll h-450px">
                      <div class="col-sm-6">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="required fs-6 fw-bold mb-2">
                            First Name
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="first_name">
                            <el-input
                              type="text"
                              v-model="formData.first_name"
                              placeholder="Enter First Name"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Last Name
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="last_name">
                            <el-input
                              type="text"
                              v-model="formData.last_name"
                              placeholder="Enter Last Name"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Date of Birth
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="date_of_birth">
                            <el-date-picker
                              class="w-100"
                              v-model="formData.date_of_birth"
                              placeholder=""
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
                          <label class="fs-6 fw-bold mb-2"> Email </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="email">
                            <el-input
                              type="text"
                              v-model="formData.email"
                              placeholder="Enter Email"
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
                          <label class="fs-6 fw-bold mb-2"> Address </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="address">
                            <el-input
                              type="text"
                              v-model="formData.address"
                              placeholder="Enter Address"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Contact Number
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="contact_number">
                            <el-input
                              type="text"
                              v-model="formData.contact_number"
                              placeholder="Enter Contact Number"
                            />
                          </el-form-item>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        @click="handleCancel"
                        data-bs-dismiss="modal"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Cancel
                      </button>
                      <div class="d-flex flex-row gap-3">
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
                    :model="formData"
                    :rules="rules"
                    ref="formRef_3"
                    @submit.prevent="handleStep_3"
                  >
                    <div class="row scroll h-450px">
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Billing Details
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Procedure Price
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="procedure_price">
                                <el-input
                                  type="text"
                                  v-model.number="formData.procedure_price"
                                  disabled
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
                              <label class="required fs-6 fw-bold mb-2">
                                Charge Type
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="charge_type">
                                <el-select
                                  class="w-100"
                                  v-model="formData.charge_type"
                                  placeholder="Select Charge Type"
                                >
                                  <el-option
                                    v-for="type in chargeTypes"
                                    :key="type.value"
                                    :value="type.value"
                                    :label="type.label"
                                  />
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Medicare Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="medicare_number">
                                <el-input
                                  type="text"
                                  v-model="formData.medicare_number"
                                  placeholder="Enter Medicare Number"
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
                              <label class="fs-6 fw-bold mb-2">
                                Medicare Reference Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="medicare_reference_number">
                                <el-input
                                  type="text"
                                  v-model="formData.medicare_reference_number"
                                  placeholder=""
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
                              <label class="required fs-6 fw-bold mb-2">
                                Medicare Expiry Date
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="medicare_expiry_date">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.medicare_expiry_date"
                                  format="YYYY-MM"
                                  placeholder="Enter Expiry Date"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type ===
                                'private-health-excess' ||
                              formData.charge_type ===
                                'private-health-excess-0' ||
                              formData.charge_type === 'private-health-pension'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Health Fund
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="health_fund_id">
                                <el-select
                                  class="w-100"
                                  v-model="formData.health_fund_id"
                                >
                                  <template
                                    v-for="(item, idx) in healthFundsList"
                                    :key="idx"
                                  >
                                    <el-option
                                      :value="item.id"
                                      :label="item.code + '-' + item.name"
                                    />
                                  </template>
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type ===
                                'private-health-excess' ||
                              formData.charge_type ===
                                'private-health-excess-0' ||
                              formData.charge_type === 'private-health-pension'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Health Fund Membership Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item
                                prop="health_fund_membership_number"
                              >
                                <el-input
                                  type="text"
                                  v-model="
                                    formData.health_fund_membership_number
                                  "
                                  placeholder="12345678"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type ===
                                'private-health-excess' ||
                              formData.charge_type ===
                                'private-health-excess-0' ||
                              formData.charge_type === 'private-health-pension'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Health Fund Reference Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="health_fund_reference_number">
                                <el-input
                                  type="text"
                                  v-model="
                                    formData.health_fund_reference_number
                                  "
                                  placeholder="00"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type ===
                                'private-health-excess' ||
                              formData.charge_type ===
                                'private-health-excess-0' ||
                              formData.charge_type === 'private-health-pension'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Health Fund Expiry Date
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="health_fund_expiry_date">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.health_fund_expiry_date"
                                  format="YYYY-MM"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type === 'private-health-excess'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Fund Excess
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="fund_excess">
                                <el-input
                                  type="text"
                                  v-model.number="formData.fund_excess"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="formData.charge_type === 'pension-card'"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Pension Card Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="pension_card_number">
                                <el-input
                                  class="w-100"
                                  v-model="formData.pension_card_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="formData.charge_type === 'healthcare-card'"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Healthcare Card Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="healthcare_card_number">
                                <el-input
                                  class="w-100"
                                  v-model="formData.healthcare_card_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              formData.charge_type === 'healthcare-card' ||
                              formData.charge_type === 'pension-card'
                            "
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Expiry Date
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="expiry_date">
                                <el-date-picker
                                  class="w-100"
                                  format="YYYY-MM"
                                  v-model="formData.expiry_date"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="formData.charge_type === 'department-veteran'"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                DVA Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="dva_number">
                                <el-input
                                  class="w-100"
                                  v-model="formData.dva_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="formData.charge_type === 'department-veteran'"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                DVA Expiry Date
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="dva_expiry_date">
                                <el-date-picker
                                  class="w-100"
                                  format="YYYY-MM"
                                  v-model="formData.dva_expiry_date"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="formData.charge_type === 'department-veteran'"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                DVA Type
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="dva_type">
                                <el-select
                                  class="w-100"
                                  v-model="formData.dva_type"
                                >
                                  <el-option value="white" label="White" />
                                  <el-option value="gold" label="Gold" />
                                  <el-option value="orange" label="Orange" />
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
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
                                  v-model="formData.add_other_account_holder"
                                  label="Add other account holder"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        @click="handleCancel"
                        data-bs-dismiss="modal"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Cancel
                      </button>
                      <div class="d-flex flex-row gap-3">
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
                    :model="formData"
                    :rules="rules"
                    ref="formRef_4"
                    @submit.prevent="submit"
                  >
                    <div class="row scroll h-450px">
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Other Information
                        </div>
                        <div class="row">
                          <div v-if="apt_type == 'Procedure'" class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Input-->
                              <el-form-item prop="anesthetic_questions">
                                <el-checkbox
                                  class="w-100"
                                  v-model="formData.anesthetic_questions"
                                  label="Anesthetic Questions"
                                  data-bs-toggle="collapse"
                                  href="#toogle_ane_ques"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            v-if="apt_type == 'Procedure'"
                            class="col-sm-12 collapse"
                            id="toogle_ane_ques"
                          >
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
                          <div v-if="apt_type == 'Procedure'" class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Input-->
                              <el-form-item prop="procedure_questions">
                                <el-checkbox
                                  class="w-100"
                                  v-model="formData.procedure_questions"
                                  label="Procedure Questions"
                                  data-bs-toggle="collapse"
                                  href="#toogle_pro_ques"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            v-if="apt_type == 'Procedure'"
                            class="col-sm-12 collapse"
                            id="toogle_pro_ques"
                          >
                            <template
                              v-for="(item, idx) in proQuestions"
                              :key="idx"
                            >
                              <div class="row mb-2">
                                <div class="col-10">{{ item.question }}</div>
                                <div class="col-2">
                                  <el-switch
                                    v-model="proAnswers[idx]"
                                    :active-value="true"
                                    :inactive-value="false"
                                    @change="handleProQuestions"
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
                          <div class="fv-row">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Appointment Confirm
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="appointment_confirm">
                                <el-select
                                  class="w-100"
                                  v-model="formData.appointment_confirm"
                                  placeholder="Select Appointment Confirm"
                                >
                                  <el-option value="email" label="Email" />
                                  <el-option value="phone" label="Phone" />
                                  <el-option value="person" label="Person" />
                                  <el-option value="other" label="Other" />
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Note
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="note">
                                <el-input
                                  type="textarea"
                                  v-model="formData.note"
                                  placeholder="Enter Note"
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
                              <label class="required fs-6 fw-bold mb-2">
                                Important Details
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="important_details">
                                <el-input
                                  type="textarea"
                                  v-model="formData.important_details"
                                  placeholder=""
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
                              <label class="required fs-6 fw-bold mb-2">
                                Allergies
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="allergies">
                                <el-input
                                  type="textarea"
                                  v-model="formData.allergies"
                                  placeholder="Enter Allergies"
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
                              <label class="required fs-6 fw-bold mb-2">
                                Clinical Alerts
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="clinical_alerts">
                                <el-input
                                  type="textarea"
                                  v-model="formData.clinical_alerts"
                                  placeholder="Enter Clinical Alerts"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-lg btn-light-primary me-3"
                        @click="handleCancel"
                        data-bs-dismiss="modal"
                      >
                        <span class="svg-icon svg-icon-4 me-1">
                          <inline-svg
                            src="media/icons/duotune/arrows/arr063.svg"
                          />
                        </span>
                        Cancel
                      </button>
                      <div class="d-flex flex-row gap-3">
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
                          type="submit"
                          class="btn btn-lg btn-primary align-self-end"
                        >
                          Submit
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
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Actions } from "@/store/enums/StoreEnums";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { hideModal } from "@/core/helpers/dom";
import moment from "moment";
import chargeTypes from "@/core/data/charge-types";

export default defineComponent({
  name: "create-app-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const loading = ref(false);
    const formData = ref({
      reference_number: 22100349,
      clinic_name: "",
      clinic_id: "",
      date: new Date(),
      arrival_time: "",
      time_slot: ["2022-06-20T09:00", "2022-06-20T17:00"],
      appointment_type_id: "",
      clinical_code: "",
      mbs_code: "",
      specialist_id: "",
      room_id: "",
      anesthetist_id: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      title: "",
      email: "",
      address: "",
      contact_number: "",
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
      add_other_account_holder: false,
      procedure_price: "",
      referring_doctor: "",
      referral_duration: "",
      referral_date: "",
      appointment_confirm: "",
      note: "",
      important_details: "",
      allergies: "",
      clinical_alerts: "",
      anesthetic_questions: false,
      anesthetic_answers: [],
      procedure_questions: false,
      procedure_answers: [],
      no_referral: false,
      no_referral_reason: "",
    });

    const rules = ref({
      clinic_id: [
        {
          required: true,
          message: "Clinic Name cannot be blank.",
          trigger: "change",
        },
      ],
      arrival_time: [
        {
          required: true,
          message: "Arrival time cannot be blank.",
          trigger: "change",
        },
      ],
      appointment_type_id: [
        {
          required: true,
          message: "Appointment Type cannot be blank.",
          trigger: "change",
        },
      ],
      specialist_id: [
        {
          required: true,
          message: "Specialist cannot be blank.",
          trigger: "change",
        },
      ],
      first_name: [
        {
          required: true,
          message: "First name cannot be blank.",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last name cannot be blank.",
          trigger: "change",
        },
      ],
      date_of_birth: [
        {
          required: true,
          message: "Date of birth cannot be blank.",
          trigger: "change",
        },
      ],
      email: [
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
      contact_number: [
        {
          required: true,
          message: "Mobile Number cannot be blank.",
          trigger: "change",
        },
      ],
      charge_type: [
        {
          required: true,
          message: "Charge Type cannot be blank.",
          trigger: "change",
        },
      ],
      procedure_price: [
        {
          type: "number",
          message: "Procedure price must be a number",
        },
      ],
      fund_excess: [
        {
          type: "number",
          message: "Fund excess must be a number",
        },
      ],
      medicare_number: [
        {
          required: true,
          message: "Medicare number cannot be blank.",
          trigger: "change",
        },
      ],
      medicare_reference_number: [
        {
          required: true,
          message: "Medicare Reference Number cannot be blank.",
          trigger: "change",
        },
      ],
      medicare_expiry_date: [
        {
          required: true,
          message: "Medicare expiry date cannot be blank.",
          trigger: "change",
        },
      ],
      appointment_confirm: [
        {
          required: true,
          message: "Appointmentconfirm cannot be blank.",
          trigger: "change",
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

    const ava_specialist = ref([]);
    const apt_type = ref("");

    const aneAnswers = ref([]);
    const proAnswers = ref([]);
    const anesthetist = ref([]);
    const clinic = ref([]);
    const rooms = ref([]);
    const _appointment = ref("");
    const _specialist = ref("");
    const _start_time = ref("");
    const _end_time = ref("");
    const _appointment_name = ref("");
    const _specialist_name = ref("");
    const _appointment_time = ref(30);
    const _arrival_time = ref(30);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypeList);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const organization = computed(() => store.getters.orgList);

    watch(_appointment, () => {
      formData.value.appointment_type_id = _appointment.value;
      const _selected = aptTypeList.value.filter(
        (aptType) => aptType.id === _appointment.value
      )[0];
      _appointment_name.value = _selected.name;
      _appointment_time.value = Number(
        appointment_length[_selected.appointment_time] * appointment_time.value
      );
      _end_time.value = moment(_start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      formData.value.time_slot[1] = _end_time.value;
      _arrival_time.value = Number(_selected.arrival_time);
      formData.value.arrival_time = moment(_start_time.value, "HH:mm")
        .subtract(_arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      formData.value.procedure_price = _selected.procedure_price;
      formData.value.clinical_code = _selected.clinical_code;
      formData.value.mbs_code = _selected.mbs_code;
      apt_type.value = _selected.type;
      if (apt_type.value === "Consultation") {
        formData.value.anesthetic_questions = false;
        formData.value.procedure_questions = false;
      }
    });

    watch(_specialist, () => {
      formData.value.specialist_id = _specialist.value;
      const _selected = ava_specialist.value.filter(
        (item) => item.id === _specialist.value
      )[0];
      _specialist_name.value = _selected.name;
      anesthetist.value = _selected.anesthetist;
      formData.value.anesthetist_id = _selected.anesthetist.id;
    });

    watch(_start_time, () => {
      formData.value.time_slot[0] = _start_time.value;
      formData.value.arrival_time = moment(_start_time.value, "HH:mm")
        .subtract(_arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      _end_time.value = moment(_start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      formData.value.time_slot[1] = _end_time.value;
    });

    const handleAneQuestions = () => {
      let temp = [];
      for (let i in aneAnswers.value) {
        if (aneAnswers.value[i] === true) {
          temp.push(aneQuestions.value[i].id);
        }
      }
      formData.value.anesthetic_answers = temp;
    };

    const handleProQuestions = () => {
      let temp = [];
      for (let i in proAnswers.value) {
        if (proAnswers.value[i] === true) {
          temp.push(proQuestions.value[i].id);
        }
      }
      formData.value.procedure_answers = temp;
    };

    watchEffect(() => {
      if (organization.value.appointment_length)
        appointment_time.value = organization.value.appointment_length;
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      if (bookingData.time_slots) {
        _start_time.value = moment(bookingData.time_slots[0]).format("HH:mm");
        _end_time.value = moment(bookingData.time_slots[1]).format("HH:mm");
      }
      formData.value.date = bookingData.date;
      if (bookingData.selected_specialist) {
        _specialist.value = bookingData.selected_specialist.id;
        if (bookingData.selected_specialist.anesthetist) {
          anesthetist.value = bookingData.selected_specialist.anesthetist;
        }
        if (bookingData.selected_specialist.work_hours.locations) {
          clinic.value = bookingData.selected_specialist.work_hours.locations;
          formData.value.clinic_name =
            bookingData.selected_specialist.work_hours.locations.name;
          formData.value.clinic_id =
            bookingData.selected_specialist.work_hours.locations.id;
          if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.get("clinics/" + clinic.value.id + "/rooms")
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
        }
      }
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(createAptRef.value);

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(Actions.PROCEDURE_QUES.ACTIVE_LIST);
      store.dispatch(Actions.APT.TYPE_LIST);
      store.dispatch(Actions.LIST_ORG);
    });

    const handleStep_1 = () => {
      if (!formRef_1.value) {
        return;
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          // if (_appointment_time.value > 15) {
          // Swal.fire({
          //   text: "Are you sure you want to double book this time slot?",
          //   icon: "info",
          //   showCancelButton: true,
          //   cancelButtonText: "Cancel",
          //   confirmButtonText: "Confirm",
          // }).then((result) => {
          //   if (result.value) {
          //     currentStepIndex.value++;
          //     if (!_stepperObj.value) {
          //       return;
          //     }
          //     _stepperObj.value.goNext();
          //   }
          // });
          // } else {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
          // }
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

    const handleCancel = () => {
      currentStepIndex.value = 0;
      _stepperObj.value.goFirst();
      formRef_1.value.resetFields();
      formRef_2.value.resetFields();
      formRef_3.value.resetFields();
      formRef_4.value.resetFields();
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
            .dispatch(Actions.APT.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.APT.LIST);
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(createAptModalRef.value);
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
              });
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

    return {
      formData,
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
      _appointment,
      _specialist,
      _start_time,
      _end_time,
      _appointment_name,
      _specialist_name,
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
    };
  },
});
</script>
