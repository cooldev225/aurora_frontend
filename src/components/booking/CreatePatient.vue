<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="modal_create_patient"
    ref="createPatientModalRef"
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
          <h2>Create Patient</h2>
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
            id="modal_create_patient_stepper"
            ref="createPatientRef"
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
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Procedure/Consultation</h3>

                    <div class="stepper-desc">Setup Procedure/Consultation</div>
                  </div>
                  <!--end::Label-->
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
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Personal Info</h3>

                    <div class="stepper-desc">Setup Personal Details</div>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 3-->
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
                    <span class="stepper-number">5</span>
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
                              <el-form-item prop="service_number">
                                <el-input
                                  type="text"
                                  v-model="formData.service_number"
                                  readonly
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
                                Clinic Name
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="clinic_name">
                                <el-input
                                  type="text"
                                  v-model="formData.clinic_name"
                                  readonly
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
                              <label class="fs-6 fw-bold mb-2"> Date </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="date">
                                <el-date-picker
                                  class="w-100"
                                  v-model="formData.date"
                                  readonly
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
                              <label class="fs-6 fw-bold mb-2">
                                Arrival Time
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="arrival_time">
                                <el-time-picker
                                  class="w-100"
                                  v-model="formData.arrival_time"
                                  placeholder=""
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
                                  readonly
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
                                  <el-option
                                    value="indefinite"
                                    label="Indefinite"
                                  />
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
                          <el-form-item prop="procedure">
                            <el-select
                              class="w-100"
                              v-model="formData.procedure"
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
                            Specialist
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="specialist">
                            <el-select
                              class="w-100"
                              v-model="formData.specialists"
                              placeholder=""
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
                              readonly
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
                          <label class="fs-6 fw-bold mb-2"> MBS Code </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="mbs_code">
                            <el-input
                              v-model="formData.mbs_code"
                              readonly
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
                          <label class="fs-6 fw-bold mb-2"> Room </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="room">
                            <el-select
                              class="w-100"
                              v-model="formData.room"
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
                          <label class="fs-6 fw-bold mb-2">
                            Anaesthetist
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="anaesthetist">
                            <el-select
                              class="w-100"
                              v-model="formData.anaesthetist"
                              placeholder=""
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

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="formData"
                    ref="formRef_3"
                    @submit.prevent="handleStep_3"
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
                          <el-form-item prop="birth_date">
                            <el-date-picker
                              class="w-100"
                              v-model="formData.birth_date"
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
                              <el-option key="male" label="Male" />
                              <el-option key="female" label="Female" />
                              <el-option key="other" label="Other" />
                              <el-option
                                key="not_stated"
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
              <!--end::Step 3-->

              <!--begin::Step 4 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="formData"
                    ref="formRef_4"
                    @submit.prevent="handleStep_4"
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
                              <el-form-item prop="health_fund">
                                <el-select
                                  class="w-100"
                                  v-model="formData.health_fund"
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
                              <el-form-item prop="health_fund_mem_number">
                                <el-input
                                  type="text"
                                  v-model="formData.health_fund_mem_number"
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
                              <el-form-item prop="health_fund_ref_number">
                                <el-input
                                  type="text"
                                  v-model="formData.health_fund_ref_number"
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
                              <el-form-item prop="procedure">
                                <el-select
                                  class="w-100"
                                  v-model="formData.procedure"
                                  readonly
                                  placeholder="Select Procedure"
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
              <!--end::Step 4-->

              <!--begin::Step 4 -->
              <div data-kt-stepper-element="content">
                <div class="w-100">
                  <el-form
                    class="w-100"
                    :model="formData"
                    ref="formRef_5"
                    @submit.prevent="submit"
                  >
                    <div class="row scroll h-450px">
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Other Information
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Input-->
                              <el-form-item prop="anesthetis_questions">
                                <el-checkbox
                                  class="w-100"
                                  v-model="formData.anesthetis_questions"
                                  label="Anaesthetis Questions"
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
                                    @change="handleQuestions"
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
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Input-->
                              <el-form-item prop="procedure_questions">
                                <el-checkbox
                                  class="w-100"
                                  v-model="formData.procedure_questions"
                                  label="Procedure Questions"
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
                      <el-divider />
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Appointment History
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Cancelled Appointments
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="cancelled_appointments">
                                <el-input
                                  type="text"
                                  v-model="formData.cancelled_appointments"
                                  placeholder="0"
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
                                Missed Appointments
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="missed_appointments">
                                <el-input
                                  type="text"
                                  v-model="formData.missed_appintments"
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
                                Future Appointments
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="future_appointments">
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
                                Past Appointments
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="past_appintments">
                                <el-input
                                  type="text"
                                  v-model="formData.past_appointments"
                                  placeholder=""
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
                          Recall Information
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <!--begin::Input group-->
                            <div class="fv-row mb-7">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold mb-2">
                                Recall
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="recall">
                                <el-input
                                  type="text"
                                  v-model="formData.recall"
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
                                Recall Send
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="recall_send">
                                <el-select
                                  class="w-100"
                                  v-model="formData.recall_send"
                                  placeholder=""
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

<!-- <style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style> -->

<script>
import { defineComponent, onMounted, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";

export default defineComponent({
  name: "create-app-modal",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const formRef_5 = ref(null);
    const loading = ref(false);
    const formData = ref({
      service_number: 22100349,
      clinic_name: "",
      date: new Date(),
      arrival_time: "",
      time_slot: ["2022-06-20T09:00", "2022-06-20T17:00"],
      procedure: "",
      clinical_code: "",
      mbs_code: "",
      specialists: "",
      room: "",
      anaesthetist: "",
      first_name: "",
      last_name: "",
      birth_date: "",
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
      cancelled_appointments: "",
      missed_appintments: "",
      past_appointments: "",
      recall: "",
      recall_send: "",
      anesthetic_questions: false,
      anesthetic_answers: [],
    });

    const rules = ref({
      clinic_name: [
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
    const createPatientRef = ref(null);
    const currentStepIndex = ref(0);

    const ava_specialist = ref([]);
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);

    const aneAnswers = ref([]);
    const handleQuestions = () => {
      formData.value.aneQuestions = aneAnswers.value;
      let temp = [];
      for (let i in aneAnswers.value) {
        if (aneAnswers.value[i] === true) {
          temp.push(aneQuestions.value[i].id);
        }
      }
      formData.value.anesthetis_answers = temp;
    };

    watchEffect(() => {
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      formData.value.time_slot = bookingData.time_slots;
      if (bookingData.selected_specialist) {
        formData.value.specialists = bookingData.selected_specialist.id;
        if (bookingData.selected_specialist.work_hours.locations)
          formData.value.clinic_name =
            bookingData.selected_specialist.work_hours.locations.name;
      }
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createPatientRef.value
      );

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      setCurrentPageBreadcrumbs("Add Appointment", ["Bookings"]);
    });

    const handleStep_1 = () => {
      if (!formRef_1.value) {
        return;
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          console.log(formData.value);

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

    const handleStep_4 = () => {
      if (!formRef_4.value) {
        return;
      }

      formRef_4.value.validate((valid) => {
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
      if (!formRef_5.value) {
        return;
      }

      formRef_5.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(Actions.CLINICS.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.CLINICS.LIST);
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "employees" });
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
      ava_specialist,
      healthFundsList,
      aneQuestions,
      aneAnswers,
      submit,
      formRef_1,
      formRef_2,
      formRef_3,
      formRef_4,
      formRef_5,
      loading,
      previousStep,
      handleStep_1,
      handleStep_2,
      handleStep_3,
      handleStep_4,
      createPatientRef,
      currentStepIndex,
      countryList,
      timeZoneList,
      handleQuestions,
    };
  },
});
</script>
