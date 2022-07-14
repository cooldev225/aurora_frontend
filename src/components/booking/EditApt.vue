<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_edit_apt"
    ref="editAptModalRef"
    tabindex="-1"
    aria-hidden="true"
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
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
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
            id="modal_edit_apt_stepper"
            ref="editAptRef"
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
                      _formData.reference_number
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Clinic Name:
                    <span class="text-black fs-5">{{
                      _formData.clinic_name
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Time:
                    <span class="text-black fs-5"
                      >{{ _start_time }} - {{ _end_time }}</span
                    >
                    <span v-if="_formData.arrival_time" class="text-black fs-5"
                      >(Arrival: {{ _formData.arrival_time }})</span
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
                    :model="_formData"
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
                                <el-time-picker
                                  class="w-100"
                                  format="HH:mm"
                                  v-model="_formData.start_time"
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
                                <el-time-picker
                                  class="w-100"
                                  v-model="_formData.end_time"
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
                                  v-model="_formData.clinical_code"
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
                                  v-model="_formData.mbs_code"
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
                                  v-model="_formData.room_id"
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
                                  v-model="_formData.anesthetist_id"
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
                            v-model="_formData.no_referral"
                            label="No Referral"
                          />
                        </div>
                        <div class="row">
                          <template v-if="_formData.no_referral">
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
                                    v-model="_formData.no_referral_reason"
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
                                    v-model="_formData.reffering_doctor"
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
                                    v-model="_formData.referral_duration"
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
                                    v-model="_formData.referral_date"
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
                    <div class="text-end">
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
                    :model="_formData"
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
                              v-model="_formData.first_name"
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
                              v-model="_formData.last_name"
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
                              v-model="_formData.date_of_birth"
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
                            Title
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="title">
                            <el-select
                              class="w-100"
                              v-model="_formData.title"
                              placeholder="Select Title"
                            >
                              <el-option value="mr" label="Mr" />
                              <el-option value="mrs" label="Mrs" />
                              <el-option value="ms" label="Ms" />
                              <el-option value="master" label="Master" />
                              <el-option value="miss" label="Miss" />
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
                            Email
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="email">
                            <el-input
                              type="text"
                              v-model="_formData.email"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Gender
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="gender">
                            <el-select
                              class="w-100"
                              v-model="_formData.gender"
                              placeholder="Select Gender"
                            >
                              <el-option value="male" label="Male" />
                              <el-option value="female" label="Female" />
                              <el-option value="other" label="Other" />
                              <el-option
                                value="undisclosed"
                                label="Not Stated / Inadequately Desribed"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Address
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="address">
                            <el-input
                              type="text"
                              v-model="_formData.address"
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
                            Street
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="street">
                            <el-input
                              type="text"
                              v-model="_formData.street"
                              placeholder="Enter Street"
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
                            Suburb
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="suburb">
                            <el-input
                              type="text"
                              v-model="_formData.suburb"
                              placeholder="Enter Suburb"
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
                            Postcode
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="postcode">
                            <el-input
                              type="text"
                              v-model="_formData.postcode"
                              placeholder="Enter Postcode"
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
                            State
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="state">
                            <el-input
                              type="text"
                              v-model="_formData.state"
                              placeholder="Enter State"
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
                            Country
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="country">
                            <el-select
                              class="w-100"
                              v-model="_formData.country"
                              filterable
                            >
                              <template
                                v-for="(country, index) in countryList"
                                :key="index"
                              >
                                <el-option :value="country" :label="country" />
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
                            Home Number
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="home_number">
                            <el-input
                              type="text"
                              v-model="_formData.home_number"
                              placeholder="Enter Home Number"
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
                            Work Number
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="work_number">
                            <el-input
                              type="text"
                              v-model="_formData.work_number"
                              placeholder="Enter Work Number"
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
                            Mobile Number
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="mobile_number">
                            <el-input
                              type="text"
                              v-model="_formData.mobile_number"
                              placeholder="Enter Mobile Number"
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
                  </el-form>
                </div>
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="_formData"
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
                                Charge Type
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="charge_type">
                                <el-select
                                  class="w-100"
                                  v-model="_formData.charge_type"
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
                                  v-model="_formData.medicare_number"
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
                                  v-model="_formData.medicare_reference_number"
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
                                  v-model="_formData.medicare_expiry_date"
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
                              _formData.charge_type ===
                                'private-health-excess' ||
                              _formData.charge_type ===
                                'private-health-excess-0' ||
                              _formData.charge_type === 'private-health-pension'
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
                                  v-model="_formData.health_fund_id"
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
                              _formData.charge_type ===
                                'private-health-excess' ||
                              _formData.charge_type ===
                                'private-health-excess-0' ||
                              _formData.charge_type === 'private-health-pension'
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
                                    _formData.health_fund_membership_number
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
                              _formData.charge_type ===
                                'private-health-excess' ||
                              _formData.charge_type ===
                                'private-health-excess-0' ||
                              _formData.charge_type === 'private-health-pension'
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
                                    _formData.health_fund_reference_number
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
                              _formData.charge_type ===
                                'private-health-excess' ||
                              _formData.charge_type ===
                                'private-health-excess-0' ||
                              _formData.charge_type === 'private-health-pension'
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
                                  v-model="_formData.health_fund_expiry_date"
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
                              _formData.charge_type === 'private-health-excess'
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
                                  v-model.number="_formData.fund_excess"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="_formData.charge_type === 'pension-card'"
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
                                  v-model="_formData.pension_card_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="_formData.charge_type === 'healthcare-card'"
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
                                  v-model="_formData.healthcare_card_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              _formData.charge_type === 'healthcare-card' ||
                              _formData.charge_type === 'pension-card'
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
                                  v-model="_formData.expiry_date"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              _formData.charge_type === 'department-veteran'
                            "
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
                                  v-model="_formData.dva_number"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              _formData.charge_type === 'department-veteran'
                            "
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
                                  v-model="_formData.dva_expiry_date"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div
                            class="col-sm-6"
                            v-if="
                              _formData.charge_type === 'department-veteran'
                            "
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
                                  v-model="_formData.dva_type"
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
                        </div>
                      </div>
                      <div class="separator separator-dashed mb-8 mt-2"></div>
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Account Holder Details
                        </div>
                        <div class="row">
                          <div class="col-sm-4">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Account Holder Type
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="account_holder_type">
                                <el-radio-group
                                  v-model="_formData.account_holder_type"
                                  class="ml-4"
                                >
                                  <el-radio label="1" size="large"
                                    >Self</el-radio
                                  >
                                  <el-radio label="2" size="large"
                                    >Other</el-radio
                                  >
                                </el-radio-group>
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="col-sm-8">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Account Holder
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="account_holder">
                                <el-input
                                  type="text"
                                  v-model="_formData.account_holder"
                                  placeholder="Select Account Holder"
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
                                Procedure
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="appointment_type_id">
                                <el-select
                                  class="w-100"
                                  v-model="_formData._appointment"
                                  disabled
                                >
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
                                Procedure Price
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="procedure_price">
                                <el-input
                                  type="text"
                                  v-model.number="_formData.procedure_price"
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
                  </el-form>
                </div>
              </div>
              <!--end::Step 3-->

              <!--begin::Step 4 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="_formData"
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
                                  v-model="_formData.anesthetic_questions"
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
                                  v-model="_formData.procedure_questions"
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
                                  v-model="_formData.appointment_confirm"
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
                                  v-model="_formData.note"
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
                                  v-model="_formData.important_details"
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
                                  v-model="_formData.allergies"
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
                                  v-model="_formData.clinical_alerts"
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
  name: "edit-apt-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const loading = ref(false);
    const _formData = ref({
      reference_number: 22100349,
      clinic_name: "",
      date: new Date(),
      arrival_time: "",
      start_time: "",
      end_time: "",
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
      gender: "",
      address: "",
      street: "",
      suburb: "",
      postcode: "",
      state: "",
      country: "",
      home_number: "",
      work_number: "",
      mobile_number: "",
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
      account_holder_type: "",
      account_holder: "",
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
      title: [
        {
          required: true,
          message: "Title cannot be blank.",
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
      mobile_number: [
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
      Single: 15,
      Double: 30,
      Triple: 45,
    });

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
    const _appointment = ref("");
    const _specialist = ref("");
    const _start_time = ref("");
    const _end_time = ref("");
    const _appointment_name = ref("");
    const _specialist_name = ref("");
    const _appointment_time = ref(15);
    const _arrival_time = ref(15);

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypeList);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const aptData = computed(() => store.getters.getAptSelected);

    watch(_appointment, () => {
      _formData.value.appointment_type_id = _appointment.value;
      const _selected = aptTypeList.value.filter(
        (aptType) => aptType.id === _appointment.value
      )[0];
      _appointment_name.value = _selected.name;
      // const _temp_time = _formData.value.time_slot[0];
      // _appointment_time.value = Number(
      //   appointment_length[_selected.appointment_time]
      // );
      // _formData.value.time_slot[1] = moment(_temp_time)
      //   .add(_appointment_time.value, "minutes")
      //   .toString();
      // _end_time.value = moment(_formData.value.time_slot[1]).format("HH:mm");
      // _arrival_time.value = Number(_selected.arrival_time);
      // _formData.value.arrival_time = moment(_temp_time)
      //   .subtract(_arrival_time.value, "minutes")
      //   .format("HH:mm")
      //   .toString();
      _formData.value.procedure_price = _selected.procedure_price;
      _formData.value.clinical_code = _selected.clinical_code;
      _formData.value.mbs_code = _selected.mbs_code;
      apt_type.value = _selected.type;
      if (apt_type.value === "Consultation") {
        _formData.value.anesthetic_questions = false;
        _formData.value.procedure_questions = false;
      }
    });

    watch(aptData, () => {
      _formData.value = aptData.value;
      _formData.value.start_time =
        aptData.value.date + "T" + aptData.value.start_time;
      _formData.value.end_time =
        aptData.value.date + "T" + aptData.value.end_time;
      _appointment.value = aptData.value.appointment_type_id;
      // _start_time.value = moment(_formData.value.start_time).format("HH:mm");
      // _end_time.value = moment(_formData.value.end_time).format("HH:mm");
      // if (aptData.value.arrival_time)
      //   _formData.value.arrival_time =
      //     aptData.value.date + "T" + aptData.value.arrival_time;
    });

    const handleAneQuestions = () => {
      let temp = [];
      for (let i in aneAnswers.value) {
        if (aneAnswers.value[i] === true) {
          temp.push(aneQuestions.value[i].id);
        }
      }
      _formData.value.anesthetic_answers = temp;
    };

    const handleProQuestions = () => {
      let temp = [];
      for (let i in proAnswers.value) {
        if (proAnswers.value[i] === true) {
          temp.push(proQuestions.value[i].id);
        }
      }
      _formData.value.procedure_answers = temp;
    };

    watchEffect(() => {
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      if (bookingData.selected_specialist) {
        _specialist.value = bookingData.selected_specialist.id;
        if (bookingData.selected_specialist.anesthetist) {
          anesthetist.value = bookingData.selected_specialist.anesthetist;
          // _formData.value.anesthetist_id = anesthetist.value.id;
        }
        if (bookingData.selected_specialist.work_hours.locations) {
          clinic.value = bookingData.selected_specialist.work_hours.locations;
          _formData.value.clinic_name =
            bookingData.selected_specialist.work_hours.locations.name;
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
      _stepperObj.value = StepperComponent.createInsance(editAptRef.value);

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(Actions.PROCEDURE_QUES.ACTIVE_LIST);
      store.dispatch(Actions.APT.TYPES.LIST);
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
            .dispatch(Actions.APT.UPDATE, _formData.value)
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
      _formData,
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
      editAptRef,
      editAptModalRef,
      currentStepIndex,
      countryList,
      timeZoneList,
      handleAneQuestions,
      handleProQuestions,
    };
  },
});
</script>
