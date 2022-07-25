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
                    <h3 class="stepper-title">Select Patient</h3>

                    <div class="stepper-desc">Setup Patient</div>
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
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Patient Info</h3>

                    <div class="stepper-desc">Setup Personal Details</div>
                  </div>
                  <!--begin::Label-->
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
                    <h3 class="stepper-title">Patient Billing</h3>

                    <div class="stepper-desc">Select Billing Details</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4 -->

                <!--begin::Step 5 -->
                <div class="stepper-item" data-kt-stepper-element="nav">
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
                <!--end::Step 5-->
                <!--begin::Appointment Overview-->
                <div
                  class="p-4 mb-4 card border border-dashed border-primary d-flex flex-column gap-2"
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
                  <label class="fs-5 text-primary"
                    >Clinic Name:
                    <span class="text-black fs-5">{{
                      aptInfoData.clinic_name
                    }}</span></label
                  >
                  <label class="fs-5 text-primary"
                    >Time:
                    <span class="text-black fs-5"
                      >{{ _start_time }} - {{ aptInfoData.time_slot[1] }}</span
                    >
                    <span
                      v-if="aptInfoData.arrival_time"
                      class="text-black fs-5"
                    >
                      (Arrive: {{ aptInfoData.arrival_time }})</span
                    ></label
                  >
                  <label class="fs-5 text-primary"
                    >Date:
                    <span class="text-black fs-5">{{ aptInfoData.date }}</span>
                  </label>
                  <label class="fs-5 text-primary"
                    >Patient:
                    <span class="text-black fs-5"
                      >{{ patientInfoData.first_name }}
                      {{ patientInfoData.last_name }}</span
                    ></label
                  >
                </div>
                <!--end::Appointment Overview-->
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
                    :model="aptInfoData"
                    ref="formRef_1"
                    @submit.prevent="handleStep_1"
                  >
                    <div class="row scroll h-500px">
                      <div class="card-info">
                        <div class="row">
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
                                <el-option
                                  v-for="item in aptTypeList"
                                  :value="item.id"
                                  :label="item.name"
                                  :key="item.id"
                                />
                              </el-select>
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Input group-->
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

                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2"> Room </label>
                              <!--end::Label-->
                              <!--begin::Input-->
                              <el-form-item prop="room_id">
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
                                  <el-option
                                    v-for="item in ava_specialist"
                                    :value="item.id"
                                    :label="item.name"
                                    :key="item.id"
                                  />
                                </el-select>
                              </el-form-item>
                              <!--end::Input-->

                              <!--begin::Label-->
                              <label class="fs-6 fw-bold mb-2">
                                Anesthetist
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <el-form-item prop="anesthetist_id">
                                <el-select
                                  class="w-100"
                                  v-model="aptInfoData.anesthetist_id"
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
                          <!--begin::Input group-->
                          <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2"> Note </label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="note">
                              <el-input
                                type="textarea"
                                v-model="otherInfoData.note"
                                placeholder="Enter appointment notes"
                              />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Input group-->
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between flex-row-reverse"
                    >
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
                    ref="formRef_2"
                    @submit.prevent="handleStep_2"
                  >
                    <div class="d-flex flex-column py-20 gap-10">
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
                            <span class="text-dark fw-bolder d-block fs-4 mb-2">
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
                            <span class="text-dark fw-bolder d-block fs-4 mb-2"
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
                    v-if="patientStep === 1"
                    class="w-100"
                    :model="filterPatient"
                    @submit.prevent="patientStep_1"
                  >
                    <div class="d-flex flex-column">
                      <div class="row g-8">
                        <div class="col-lg-6">
                          <label class="fs-6 form-label fw-bolder text-dark"
                            >First Name</label
                          >
                          <el-form-item prop="filter_first_name">
                            <el-input
                              type="text"
                              v-model="filterPatient.first_name"
                              placeholder="First Name"
                            />
                          </el-form-item>
                        </div>
                        <div class="col-lg-6">
                          <label class="fs-6 form-label fw-bolder text-dark"
                            >Last Name</label
                          >
                          <el-form-item prop="filter_last_name">
                            <el-input
                              type="text"
                              v-model="filterPatient.last_name"
                              placeholder="Last Name"
                            />
                          </el-form-item>
                        </div>
                        <div class="col-lg-6">
                          <label class="fs-6 form-label fw-bolder text-dark"
                            >Date of Birth</label
                          >
                          <el-form-item prop="filter_date">
                            <el-date-picker
                              class="w-100"
                              v-model="filterPatient.date_of_birth"
                              format="YYYY-MM-DD"
                              placeholder="1990-01-01"
                            />
                          </el-form-item>
                        </div>
                        <div class="col-lg-6">
                          <label class="fs-6 form-label fw-bolder text-dark"
                            >UR Number</label
                          >
                          <el-form-item prop="filter_ur_number">
                            <el-input
                              type="text"
                              v-model="filterPatient.ur_number"
                              placeholder="UR Number"
                            />
                          </el-form-item>
                        </div>
                      </div>

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
                          type="submit"
                          class="btn btn-lg btn-primary align-self-end"
                        >
                          Search
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
                    @submit.prevent="patientStep_2"
                  >
                    <div class="row scroll h-500px">
                      <Datatable
                        :table-header="patientTableHeader"
                        :table-data="patientTableData"
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
                            {{ item.date_of_birth }}
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
                    </div>
                  </el-form>
                  <el-form
                    v-if="patientStep === 3"
                    class="w-100"
                    :model="patientInfoData"
                    :rules="rules"
                    ref="formRef_3"
                    @submit.prevent="handleStep_3"
                  >
                    <div class="row scroll h-500px">
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
                              v-model="patientInfoData.first_name"
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
                              v-model="patientInfoData.last_name"
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
                              v-model="patientInfoData.date_of_birth"
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
                                v-model="patientInfoData.contact_number"
                                placeholder="Enter Contact Number"
                              />
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Input group-->
                        </div>
                        <!--end::Input group-->
                      </div>
                      <div class="fv-row">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="fs-6 fw-bold mb-2"> Address </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="address">
                            <GMapAutocomplete
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
                          </el-form-item>
                          <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                      </div>
                      <div class="col-sm-6">
                        <!--begin::Label-->
                        <label class="fs-6 fw-bold mb-2"> Email </label>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <el-form-item prop="email">
                          <el-input
                            type="text"
                            v-model="patientInfoData.email"
                            placeholder="Enter Email"
                          />
                        </el-form-item>
                        <!--end::Input-->
                      </div>
                      <div class="col-sm-6">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7">
                          <!--begin::Label-->
                          <label class="fs-6 fw-bold mb-2">
                            Appointment Confirm Method
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="appointment_confirm">
                            <el-select
                              class="w-100"
                              v-model="otherInfoData.appointment_confirm"
                              placeholder="Appointment Confirm Method"
                            >
                              <el-option value="phone" label="SMS" />
                              <el-option value="email" label="Email" />
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
                          <label class="fs-6 fw-bold mb-2"> Allergies </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="allergies">
                            <el-input
                              type="textarea"
                              v-model="otherInfoData.allergies"
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
                          <label class="fs-6 fw-bold mb-2">
                            Clinical Alerts
                          </label>
                          <!--end::Label-->

                          <!--begin::Input-->
                          <el-form-item prop="clinical_alerts">
                            <el-input
                              type="textarea"
                              v-model="otherInfoData.clinical_alerts"
                              placeholder="Enter Clinical Alerts"
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
                    :model="billingInfoData"
                    :rules="rules"
                    ref="formRef_4"
                    @submit.prevent="handleStep_4"
                  >
                    <div class="row">
                      <div class="row">
                        <div class="col-sm-6">
                          <!--begin::Input group-->
                          <div class="fv-row mb-7">
                            <!--begin::Label-->
                            <label class="fs-6 fw-bold mb-2">
                              Appointment Price
                            </label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="procedure_price">
                              <el-input
                                type="text"
                                v-model.number="billingInfoData.procedure_price"
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
                            </el-form-item>
                            <!--end::Input-->
                          </div>
                          <!--end::Input group-->
                        </div>
                      </div>
                      <el-divider />
                      <div class="py-0">
                        <!--begin::Header-->
                        <div class="py-5 d-flex flex-stack flex-wrap">
                          <!--begin::Toggle-->
                          <div
                            class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
                            data-bs-toggle="collapse"
                            href="#patient_billing_details"
                            role="button"
                            aria-expanded="false"
                            aria-controls="patient_billing_details"
                          >
                            <!--begin::Summary-->
                            <div class="me-3">
                              <div class="d-flex align-items-center">
                                <div class="text-gray-800 fw-bolder">
                                  Billing Details
                                </div>
                              </div>
                            </div>
                            <!--end::Summary-->
                            <!--begin::Arrow-->
                            <div class="me-3 rotate-90">
                              <span class="svg-icon svg-icon-3">
                                <inline-svg
                                  src="media/icons/duotune/arrows/arr071.svg"
                                />
                              </span>
                            </div>
                            <!--end::Arrow-->
                          </div>

                          <!--end::Toggle-->
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div
                          id="patient_billing_details"
                          class="fs-6 ps-10 collapse hide"
                          data-bs-parent="#patient_billing_details"
                        >
                          <div class="row">
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
                                    v-model="billingInfoData.medicare_number"
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
                                    v-model="
                                      billingInfoData.medicare_reference_number
                                    "
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
                                  Medicare Expiry Date
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="medicare_expiry_date">
                                  <el-date-picker
                                    class="w-100"
                                    v-model="
                                      billingInfoData.medicare_expiry_date
                                    "
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
                                billingInfoData.charge_type ===
                                  'private-health-excess' ||
                                billingInfoData.charge_type ===
                                  'private-health-excess-0' ||
                                billingInfoData.charge_type ===
                                  'private-health-pension'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Health Fund
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="health_fund_id">
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
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                  'private-health-excess' ||
                                billingInfoData.charge_type ===
                                  'private-health-excess-0' ||
                                billingInfoData.charge_type ===
                                  'private-health-pension'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
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
                                      billingInfoData.health_fund_membership_number
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
                                billingInfoData.charge_type ===
                                  'private-health-excess' ||
                                billingInfoData.charge_type ===
                                  'private-health-excess-0' ||
                                billingInfoData.charge_type ===
                                  'private-health-pension'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Health Fund Reference Number
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item
                                  prop="health_fund_reference_number"
                                >
                                  <el-input
                                    type="text"
                                    v-model="
                                      billingInfoData.health_fund_reference_number
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
                                billingInfoData.charge_type ===
                                  'private-health-excess' ||
                                billingInfoData.charge_type ===
                                  'private-health-excess-0' ||
                                billingInfoData.charge_type ===
                                  'private-health-pension'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Health Fund Expiry Date
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="health_fund_expiry_date">
                                  <el-date-picker
                                    class="w-100"
                                    v-model="
                                      billingInfoData.health_fund_expiry_date
                                    "
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
                                billingInfoData.charge_type ===
                                'private-health-excess'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Fund Excess
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="fund_excess">
                                  <el-input
                                    type="text"
                                    v-model.number="billingInfoData.fund_excess"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type === 'pension-card'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Pension Card Number
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="pension_card_number">
                                  <el-input
                                    class="w-100"
                                    v-model="
                                      billingInfoData.pension_card_number
                                    "
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                'healthcare-card'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Healthcare Card Number
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="healthcare_card_number">
                                  <el-input
                                    class="w-100"
                                    v-model="
                                      billingInfoData.healthcare_card_number
                                    "
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                  'healthcare-card' ||
                                billingInfoData.charge_type === 'pension-card'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  Pension Date Expiry Date
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="expiry_date">
                                  <el-date-picker
                                    class="w-100"
                                    format="YYYY-MM"
                                    v-model="billingInfoData.expiry_date"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                'department-veteran'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  DVA Number
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="dva_number">
                                  <el-input
                                    class="w-100"
                                    v-model="billingInfoData.dva_number"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                'department-veteran'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  DVA Expiry Date
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="dva_expiry_date">
                                  <el-date-picker
                                    class="w-100"
                                    format="YYYY-MM"
                                    v-model="billingInfoData.dva_expiry_date"
                                  />
                                </el-form-item>
                                <!--end::Input-->
                              </div>
                              <!--end::Input group-->
                            </div>
                            <div
                              class="col-sm-6"
                              v-if="
                                billingInfoData.charge_type ===
                                'department-veteran'
                              "
                            >
                              <!--begin::Input group-->
                              <div class="fv-row mb-7">
                                <!--begin::Label-->
                                <label class="fs-6 fw-bold mb-2">
                                  DVA Type
                                </label>
                                <!--end::Label-->

                                <!--begin::Input-->
                                <el-form-item prop="dva_type">
                                  <el-select
                                    class="w-100"
                                    v-model="billingInfoData.dva_type"
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
                        </div>
                        <!--end::Body-->
                      </div>
                      <el-divider />
                      <div class="py-0">
                        <!--begin::Header-->
                        <div class="py-5 d-flex flex-stack flex-wrap">
                          <!--begin::Toggle-->
                          <div
                            class="d-flex justify-content-between w-100 align-items-center collapsible rotate"
                            data-bs-toggle="collapse"
                            href="#patient_billing_take_deposit"
                            role="button"
                            aria-expanded="false"
                            aria-controls="patient_billing_take_deposit"
                          >
                            <!--begin::Summary-->
                            <div class="me-3">
                              <div class="d-flex align-items-center">
                                <div class="text-gray-800 fw-bolder">
                                  Take Deposit
                                </div>
                              </div>
                            </div>
                            <!--end::Summary-->
                            <!--begin::Arrow-->
                            <div class="me-3 rotate-90">
                              <span class="svg-icon svg-icon-3">
                                <inline-svg
                                  src="media/icons/duotune/arrows/arr071.svg"
                                />
                              </span>
                            </div>
                            <!--end::Arrow-->
                          </div>
                          <!--end::Toggle-->
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div
                          id="patient_billing_take_deposit"
                          class="fs-6 ps-10 collapse hide"
                          data-bs-parent="#patient_billing_take_deposit"
                        ></div>
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
                    :model="otherInfoData"
                    :rules="rules"
                    ref="formRef_5"
                    @submit.prevent="submit"
                  >
                    <div class="row scroll h-500px">
                      <div class="card-info">
                        <div class="fs-3 fw-bold text-muted mb-6">
                          Extra Information
                        </div>
                        <div class="row">
                          <div v-if="apt_type == 'Procedure'" class="col-sm-6">
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
                                  v-model="otherInfoData.procedure_questions"
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
                          <el-divider />
                          <!--start::Referral Information-->
                          <div class="card-info">
                            <div class="mb-6 d-flex justify-content-between">
                              <span class="fs-3 fw-bold text-muted"
                                >Referral Information</span
                              >
                              <el-checkbox
                                type="checkbox"
                                v-model="aptInfoData.no_referral"
                                label="No Referral"
                              />
                            </div>
                            <div class="row">
                              <template v-if="aptInfoData.no_referral">
                                <div class="col-sm-6">
                                  <!--begin::Input group-->
                                  <div class="fv-row mb-7">
                                    <!--begin::Label-->
                                    <label class="fs-6 fw-bold mb-2">
                                      No Referral Reason
                                    </label>
                                    <!--end::Label-->

                                    <!--begin::Input-->
                                    <el-form-item prop="no_referral_reason">
                                      <el-input
                                        type="text"
                                        v-model="aptInfoData.no_referral_reason"
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
                                    <label class="fs-6 fw-bold mb-2">
                                      Referring Doctor
                                    </label>
                                    <!--end::Label-->

                                    <!--begin::Input-->
                                    <el-form-item prop="referring_doctor">
                                      <el-select
                                        class="w-100"
                                        v-model="aptInfoData.referring_doctor"
                                        placeholder="Select Referring Doctor"
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
                                      Referral Duration
                                    </label>
                                    <!--end::Label-->

                                    <!--begin::Input-->
                                    <el-form-item prop="referral_duration">
                                      <el-select
                                        class="w-100"
                                        v-model="aptInfoData.referral_duration"
                                        placeholder="Enter Referral Duration"
                                      >
                                        <el-option
                                          value="0"
                                          label="Indefinite"
                                        />
                                        <el-option value="3" label="3 Months" />
                                        <el-option
                                          value="12"
                                          label="12 Months"
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
                                      Referral Date
                                    </label>
                                    <!--end::Label-->

                                    <!--begin::Input-->
                                    <el-form-item prop="referral_date">
                                      <el-date-picker
                                        class="w-100"
                                        v-model="aptInfoData.referral_date"
                                      />
                                    </el-form-item>
                                    <!--end::Input-->
                                  </div>
                                  <!--end::Input group-->
                                </div>
                              </template>
                            </div>
                          </div>
                          <!--end::Referral Information-->
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
import chargeTypes, { getProcedurePrice } from "@/core/data/charge-types";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
export default defineComponent({
  name: "create-apt-modal",
  components: {
    Datatable,
  },
  setup() {
    const store = useStore();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const formRef_5 = ref(null);
    const loading = ref(false);

    const aptInfoData = ref({
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
      referring_doctor: "",
      referral_duration: "",
      referral_date: "",
      no_referral: false,
      no_referral_reason: "",
    });

    const patientInfoData = ref({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      address: "",
      contact_number: "",
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
      fund_excess: [
        {
          type: "number",
          message: "Fund excess must be a number",
        },
      ],
      medicare_number: [
        {
          required: false,
          message: "Medicare number cannot be blank.",
          trigger: "blur",
        },
      ],
      medicare_reference_number: [
        {
          required: false,
          message: "Medicare Reference Number cannot be blank.",
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
      appointment_confirm: [
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

    const addressRef = ref(null);

    const patientTableData = ref([]);
    const patientTableHeader = ref([
      {
        name: "UR Number",
        key: "UR_number",
        sortable: true,
        searchable: true,
      },
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

    const healthFundsList = computed(() => store.getters.healthFundsList);
    const aneQuestions = computed(() => store.getters.getAneQuestionActiveList);
    const proQuestions = computed(() => store.getters.getProQuestionActiveList);
    const aptTypeList = computed(() => store.getters.getAptTypesList);
    const searchVal = computed(() => store.getters.getSearchVariable);
    const organisation = computed(() => store.getters.orgList);
    const patientList = computed(() => store.getters.patientsList);

    watch(_appointment, () => {
      debugger;
      aptInfoData.value.appointment_type_id = _appointment.value;
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
      aptInfoData.value.time_slot[1] = _end_time.value;
      _arrival_time.value = Number(_selected.arrival_time);
      aptInfoData.value.arrival_time = moment(_start_time.value, "HH:mm")
        .subtract(_arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      aptInfoData.value.clinical_code = _selected.clinical_code;
      aptInfoData.value.mbs_code = _selected.mbs_code;
      apt_type.value = _selected.type;
      if (apt_type.value === "Consultation") {
        otherInfoData.value.anesthetic_questions = false;
        otherInfoData.value.procedure_questions = false;
      }
    });

    watch(_specialist, () => {
      aptInfoData.value.specialist_id = _specialist.value;
      const _selected = ava_specialist.value.filter(
        (item) => item.id === _specialist.value
      )[0];
      _specialist_name.value = _selected.name;
      anesthetist.value = _selected.anesthetist;
      aptInfoData.value.anesthetist_id = _selected.anesthetist.id;
    });

    watch(_start_time, () => {
      aptInfoData.value.time_slot[0] = _start_time.value;
      aptInfoData.value.arrival_time = moment(_start_time.value, "HH:mm")
        .subtract(_arrival_time.value, "minutes")
        .format("HH:mm")
        .toString();
      _end_time.value = moment(_start_time.value, "HH:mm")
        .add(_appointment_time.value, "minutes")
        .format("HH:mm")
        .toString();
      aptInfoData.value.time_slot[1] = _end_time.value;
    });

    watch(patientStatus, () => {
      if (patientStatus.value === "new") patientStep.value = 3;
      else patientStep.value = 1;
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

    watch(patientList, () => {
      patientTableData.value = patientList;
    });

    watchEffect(() => {
      if (organisation.value.appointment_length)
        appointment_time.value = organisation.value.appointment_length;
      const bookingData = store.getters.bookingDatas;
      ava_specialist.value = bookingData.ava_specialist;
      if (bookingData.time_slots) {
        _start_time.value = moment(bookingData.time_slots[0]).format("HH:mm");
        _end_time.value = moment(bookingData.time_slots[1]).format("HH:mm");
      }
      aptInfoData.value.date = bookingData.date;
      if (bookingData.selected_specialist) {
        _specialist.value = bookingData.selected_specialist.id;
        if (bookingData.selected_specialist.anesthetist) {
          anesthetist.value = bookingData.selected_specialist.anesthetist;
        }
        if (bookingData.selected_specialist.work_hours.locations) {
          clinic.value = bookingData.selected_specialist.work_hours.locations;
          aptInfoData.value.clinic_name =
            bookingData.selected_specialist.work_hours.locations.name;
          aptInfoData.value.clinic_id =
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

      if (_appointment.value && billingInfoData.value.charge_type) {
        debugger;
        const filteredApt = aptTypeList.value.filter(
          (item) => item.id === _appointment.value
        )[0];
        billingInfoData.value.procedure_price = getProcedurePrice(
          filteredApt,
          billingInfoData.value.charge_type
        );
      }
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(createAptRef.value);

      store.dispatch(Actions.HEALTH_FUND.LIST);
      store.dispatch(Actions.ANESTHETIST_QUES.ACTIVE_LIST);
      store.dispatch(Actions.PROCEDURE_QUES.ACTIVE_LIST);
      store.dispatch(Actions.APT.TYPES.LIST);
      store.dispatch(Actions.ORG.LIST);
      store.dispatch(Actions.PATIENTS.LIST);
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
      currentStepIndex.value++;
      if (!_stepperObj.value) {
        return;
      }
      _stepperObj.value.goNext();
      if (formRef_3.value) formRef_3.value.resetFields();
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

    const handleCancel = () => {
      currentStepIndex.value = 0;
      _stepperObj.value.goFirst();
      formRef_1.value.resetFields();
      formRef_2.value.resetFields();
      if (formRef_3.value) formRef_3.value.resetFields();
      formRef_4.value.resetFields();
      formRef_5.value.resetFields();
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
      if (!formRef_5.value) {
        return;
      }
      formRef_5.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(Actions.APT.CREATE, {
              ...aptInfoData.value,
              ...patientInfoData.value,
              ...billingInfoData.value,
              ...otherInfoData.value,
            })
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

    const patientStep_1 = () => {
      patientTableData.value = patientList.value.filter((data) => {
        let result = true;
        if (filterPatient.first_name) {
          result =
            result &&
            data.first_name.toLowerCase() ===
              filterPatient.first_name.toLowerCase();
        }
        if (filterPatient.last_name) {
          result =
            result &&
            data.last_name.toLowerCase() ===
              filterPatient.last_name.toLowerCase();
        }
        if (filterPatient.date_of_birth) {
          let searchDate = moment(filterPatient.date_of_birth)
            .format("YYYY-MM-DD")
            .toString();
          result = result && data.date_of_birth === searchDate;
        }
        if (filterPatient.ur_number) {
          result =
            result &&
            data.ur_number.toLowerCase() ===
              filterPatient.ur_number.toLowerCase();
        }
        return result;
      });
      patientStep.value++;
    };

    const selectPatient = (item) => {
      console.log(item);
      store.dispatch(Actions.PATIENTS.VIEW, item.id);
      patientInfoData.value = item;
      patientStep.value++;
    };

    const patientPrevStep = () => {
      if (patientStatus.value === "new") previousStep();
      else patientStep.value--;
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
      formRef_5,
      loading,
      previousStep,
      handleStep_1,
      handleStep_2,
      handleStep_3,
      handleStep_4,
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
      patientPrevStep,
      aptInfoData,
      patientInfoData,
      billingInfoData,
      otherInfoData,
    };
  },
});
</script>
