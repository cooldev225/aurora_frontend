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
              class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
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
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

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
                          Appointment Information
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Service Reference Number
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="reference_number">
                                <el-input
                                  type="text"
                                  v-model="formData.reference_number"
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
                                Clinic Name
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="clinic_id">
                                <el-select
                                  class="w-100"
                                  v-model="formData.clinic_id"
                                  disabled
                                >
                                  <el-option
                                    :value="clinic.id"
                                    :label="clinic.name"
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
                              <label class="fs-6 fw-bold mb-2"> Date </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="date">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.date"
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
                                Arrival Time
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="arrival_time">
                                <el-time-picker
                                  class="w-100"
                                  v-model="formData.arrival_time"
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                          <div class="fv-row">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2"> Time </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="time_slot">
                                <el-time-picker
                                  class="w-100"
                                  v-model="formData.time_slot"
                                  format="HH:mm"
                                  disabled-seconds
                                  disabled
                                  is-range
                                />
                              </el-form-item>
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </div>
                      <el-divider />
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Referral Information
                        </div>
                        <div class="row">
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
                        </div>
                      </div>
                      <el-divider />
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
                                Procedure / Consultation
                              </label>
                              <!--end::Label-->
                              <!--begin::Input-->
                              <el-form-item prop="appointment_type_id">
                                <el-select
                                  class="w-100"
                                  v-model="formData.appointment_type_id"
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
                                Specialist
                              </label>
                              <!--end::Label-->
                              <!--begin::Input-->
                              <el-form-item prop="specialist_id">
                                <el-select
                                  class="w-100"
                                  v-model="formData.specialist_id"
                                >
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
                                  v-model="formData.room_id"
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
                    :model="formData"
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
                          <label class="required fs-6 fw-bold mb-2">
                            Title
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="title">
                            <el-select
                              class="w-100"
                              v-model="formData.title"
                              placeholder="Select Title"
                            >
                              <el-option key="mr" label="Mr" />
                              <el-option key="mrs" label="Mrs" />
                              <el-option key="ms" label="Ms" />
                              <el-option key="master" label="Master" />
                              <el-option key="miss" label="Miss" />
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
                          <label class="required fs-6 fw-bold mb-2">
                            Gender
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="gender">
                            <el-select
                              class="w-100"
                              v-model="formData.gender"
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
                            Street
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="street">
                            <el-input
                              type="text"
                              v-model="formData.street"
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
                              v-model="formData.suburb"
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
                              v-model="formData.postcode"
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
                              v-model="formData.state"
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
                              v-model="formData.country"
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
                              v-model="formData.home_number"
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
                              v-model="formData.work_number"
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
                              v-model="formData.mobile_number"
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
                    :model="formData"
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
                                  v-model="formData.charge_type"
                                  placeholder="Select Charge Type"
                                >
                                  <el-option
                                    value="self-insured"
                                    label="Self-insured"
                                  />
                                  <el-option
                                    value="private-health-excess"
                                    label="Private Health Insurance with excess"
                                  />
                                  <el-option
                                    value="private-health-excess-0"
                                    label="Private Health Insureance with $0 excess"
                                  />
                                  <el-option
                                    value="private-health-pension"
                                    label="Private Health Insreance + Pension/Healthcare Card"
                                  />
                                  <el-option
                                    value="pension-card"
                                    label="Pension Card"
                                  />
                                  <el-option
                                    value="healthcare-card"
                                    label="Healthcare Card"
                                  />
                                  <el-option
                                    value="department-veteran"
                                    label="Department of Veteran Affair s"
                                  />
                                  <el-option
                                    value="work-cover"
                                    label="Work Cover"
                                  />
                                  <el-option
                                    value="transport-accident"
                                    label="Transport Accident Commision"
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
                              <el-form-item prop="medicare_ref_number">
                                <el-input
                                  type="text"
                                  v-model="formData.medicare_ref_number"
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
                              <el-form-item prop="medicare_expiry">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.medicare_expiry"
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
                              <el-form-item prop="health_fund_expiry">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.health_fund_expiry"
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
                                  v-model="formData.fund_excess"
                                  placeholder="00"
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
                              <el-form-item prop="dva_expiry">
                                <el-date-picker
                                  class="w-100"
                                  format="YYYY-MM"
                                  v-model="formData.dva_expiry"
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
                                  v-model="formData.account_holder_type"
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
                                  v-model="formData.account_holder"
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
                                  v-model="formData.appointment_type_id"
                                  disabled
                                  placeholder="Select Appointment Type"
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
                                  v-model="formData.procedure_price"
                                  :formatter="
                                    (value) =>
                                      `$ ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                      )
                                  "
                                  :parser="
                                    (value) => value.replace(/\$\s?|(,*)/g, '')
                                  "
                                  placeholder="0"
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
                    :model="formData"
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
} from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { hideModal } from "@/core/helpers/dom";

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
    const formData = ref({
      reference_number: 22100349,
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
      medicare_ref_number: "",
      medicare_expiry: "",
      health_fund_id: "",
      health_fund_membership_number: "",
      health_fund_reference_number: "",
      health_fund_expiry: "",
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
    });

    const rules = ref({
      clinic_id: [
        {
          required: true,
          message: "Clinic Name cannot be blank.",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email cannot be blank",
          trigger: "change",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
      phone_number: [
        {
          required: true,
          message: "Phone Number cannot be blank.",
          trigger: "change",
        },
      ],
      hospital_provider_number: [
        {
          required: true,
          message: "Provider Number cannot be blank",
          trigger: "change",
        },
        {
          min: 8,
          message: "Provider Number must be at least 8 characters",
          trigger: "blur",
        },
      ],
      VAED_number: [
        {
          required: true,
          message: "VAED Number cannot be blank",
          trigger: "change",
        },
      ],
      address: [
        {
          required: true,
          message: "Address cannot be blank",
          trigger: "change",
        },
      ],
      street: [
        {
          required: true,
          message: "Street cannot be blank",
          trigger: "change",
        },
      ],
      state: [
        {
          required: true,
          message: "State cannot be blank",
          trigger: "change",
        },
      ],
      city: [
        {
          required: true,
          message: "City cannot be blank",
          trigger: "change",
        },
      ],
      country: [
        {
          required: true,
          message: "Country cannot be blank",
          trigger: "change",
        },
      ],
      postcode: [
        {
          required: true,
          message: "Postcode cannot be blank",
          trigger: "change",
        },
      ],
      timezone: [
        {
          required: true,
          message: "Postcode cannot be blank",
          trigger: "change",
        },
      ],
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

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypeList);

    watch(formData.value.specialist_id, () => {
      const selectedSpecialist = formData.value.specialist_id;
      anesthetist.value = ava_specialist.value.filter((specialist) => {
        if (selectedSpecialist == specialist.id) return true;
      })[0];
      formData.value.anesthetist_id = anesthetist.value.id;
      console.log(formData);
    });

    const handleAneQuestions = () => {
      // formData.value.aneQuestions = aneAnswers.value;
      let temp = [];
      for (let i in aneAnswers.value) {
        if (aneAnswers.value[i] === true) {
          temp.push(aneQuestions.value[i].id);
        }
      }
      formData.value.anesthetic_answers = temp;
    };

    const handleProQuestions = () => {
      // formData.value.proQuestions = proAnswers.value;
      let temp = [];
      for (let i in proAnswers.value) {
        if (proAnswers.value[i] === true) {
          temp.push(proQuestions.value[i].id);
        }
      }
      formData.value.procedure_answers = temp;
    };

    watchEffect(() => {
      const aptData = store.getters.getAptSelected;
      console.log(aptData);
      formData.value = aptData;
      if (aptData.arrival_time)
        formData.value.arrival_time = aptData.date + "T" + aptData.arrival_time;
      if (aptData.start_time)
        formData.value.time_slot = [
          aptData.date + "T" + aptData.start_time,
          aptData.date + "T" + aptData.end_time,
        ];
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      if (bookingData.selected_specialist) {
        formData.value.specialist_id = bookingData.selected_specialist.id;
        if (bookingData.selected_specialist.anesthetist) {
          anesthetist.value = bookingData.selected_specialist.anesthetist;
          formData.value.anesthetist_id = anesthetist.value.id;
        }
        if (bookingData.selected_specialist.work_hours.locations) {
          clinic.value = bookingData.selected_specialist.work_hours.locations;
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
      const apt_type_id = formData.value.appointment_type_id;
      const aptSelected = aptTypeList.value.filter((aptType) => {
        if (aptType.id == apt_type_id) return true;
      })[0];
      if (aptSelected) {
        formData.value.clinical_code = aptSelected.clinical_code;
        formData.value.mbs_code = aptSelected.mbs_code;
        apt_type.value = aptSelected.type;
        if (apt_type.value === "Consultation") {
          formData.value.anesthetic_questions = false;
          formData.value.procedure_questions = false;
        }
      }
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(editAptRef.value);

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(Actions.PROCEDURE_QUES.ACTIVE_LIST);
      store.dispatch(Actions.APT.TYPE_LIST);
      setCurrentPageBreadcrumbs("Edit Appointment", ["Bookings"]);
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
            .dispatch(Actions.APT.UPDATE, formData.value)
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
