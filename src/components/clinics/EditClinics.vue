<template>
  <!--begin::Stepper-->
  <div
    class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
    id="create_clinic_stepper"
    ref="createClinicsRef"
  >
    <!--begin::Aside-->
    <div
      class="d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px me-9"
    >
      <!--begin::Wrapper-->
      <div class="px-6 px-lg-10 py-20">
        <!--begin::Nav-->
        <div class="stepper-nav">
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
              <h3 class="stepper-title">Clinic Details</h3>

              <div class="stepper-desc fw-bold">Setup Clinic Details</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2 -->
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
              <h3 class="stepper-title">Address Details</h3>
              <div class="stepper-desc fw-bold">Setup Address Details</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 2 -->

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
              <h3 class="stepper-title">Time</h3>
              <div class="stepper-desc fw-bold">Setup Time Details</div>
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
              <h3 class="stepper-title">Prova Device</h3>
              <div class="stepper-desc fw-bold">Setup Prova Device</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 4-->

          <!--begin::Step 5 -->
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
              <h3 class="stepper-title">Other Details</h3>
              <div class="stepper-desc fw-bold">Setup Other Details</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 5 -->
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <!--begin::Form-->
      <!--begin::Step 1-->
      <div class="current" data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Clinic Details
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_1"
            @submit.prevent="handleStep_1"
          >
            <div class="row">
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Clinic Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.name"
                      type="text"
                      placeholder="Clinic Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Email</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      type="text"
                      placeholder="Email"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">Phone Number</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="phone_number">
                    <el-input
                      v-model="formData.phone_number"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">Fax Number</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="fax_number">
                    <el-input
                      v-model="formData.fax_number"
                      type="text"
                      placeholder="Fax Number"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">VAED number</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="VAED_number">
                    <el-input
                      v-model="formData.VAED_number"
                      maxlength="3  "
                      type="text"
                      placeholder="VAED Number"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Provider Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="hospital_provider_number">
                    <el-input
                      v-model="formData.hospital_provider_number"
                      type="text"
                      placeholder="Provider Number"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
            </div>
            <div class="text-end">
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 1 -->

      <!--begin::Step 2 -->
      <div data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Address Details
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_2"
            @submit.prevent="handleStep_2"
          >
            <div class="row">
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Address</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="address">
                    <el-input
                      v-model="formData.address"
                      type="text"
                      placeholder="Address"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Street</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="street">
                    <el-input
                      v-model="formData.street"
                      type="text"
                      placeholder="Street"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">State</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="state">
                    <el-input
                      v-model="formData.state"
                      type="text"
                      placeholder="State"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Country</label>
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
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">City</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="city">
                    <el-input
                      v-model="formData.city"
                      type="text"
                      placeholder="city"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Postcode</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="postcode">
                    <el-input
                      v-model="formData.postcode"
                      type="text"
                      placeholder="Postcode"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">Latitude</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="latitude">
                    <el-input
                      v-model="formData.latitude"
                      type="text"
                      placeholder="Latitude"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">Longitude</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="longitude">
                    <el-input
                      v-model="formData.longitude"
                      type="text"
                      placeholder="Longitude"
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
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 2-->

      <!--begin::Step 3 -->
      <div data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Time Details
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_3"
            @submit.prevent="handleStep_3"
          >
            <div class="row">
              <div class="row">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Time Zone</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="timezone">
                    <el-select
                      class="w-100"
                      v-model="formData.timezone"
                      filterable
                    >
                      <el-option
                        v-for="item in timeZoneList"
                        :value="item.value"
                        :label="item.label"
                        :key="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>

              <div class="row mb-7">
                <div class="col-md-6">
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-2">Default Start Time</label>
                    <!--end::Label-->

                    <el-time-select
                      v-model="formData.default_start_time"
                      :max-time="formData.default_end_time"
                      class="w-50 ps-2"
                      placeholder="Default Start time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="fs-6 fw-bold mb-2">Default End Time</label>
                    <!--end::Label-->

                    <el-time-select
                      v-model="formData.default_end_time"
                      :min-time="formData.default_start_time"
                      class="w-50 ps-2"
                      placeholder="Default End time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2"> Default Meal Time </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="default_meal_time">
                    <el-select
                      class="w-100"
                      v-model="formData.default_meal_time"
                      filterable
                    >
                      <el-option
                        v-for="i in 12"
                        :value="i * 5"
                        :label="i * 5 + ' Minutes'"
                        :key="i"
                      />
                    </el-select>
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
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 3 -->

      <!--begin::Step 4 -->
      <div data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Prova Device
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_4"
            @submit.prevent="handleStep_4"
          >
            <div class="row">
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Device Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="device_name">
                    <el-input
                      v-model="formData.device_name"
                      type="text"
                      placeholder="Device Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">OTAC</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="otac">
                    <el-input
                      v-model="formData.otac"
                      type="text"
                      placeholder="OTAC"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Expire day of key</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="key_expiry">
                    <el-date-picker
                      v-model="formData.key_expiry"
                      class="w-100"
                      placeholder="Expire day of key"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Expire day of device</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="device_expiry">
                    <el-date-picker
                      v-model="formData.device_expiry"
                      class="w-100"
                      placeholder="Expire day of device"
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
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 4 -->

      <!--begin::Step 5 -->
      <div data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Other Details
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_5"
          >
            <div class="row">
              <div class="row">
                <!--begin::Label-->
                <el-form-item label="Footnote Signature">
                  <el-upload
                    action="#"
                    ref="upload"
                    list-type="picture-card"
                    :class="{ disabled: uploadDisabled }"
                    :limit="1"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :on-preview="handlePreview"
                    :auto-upload="false"
                    accept="image/*"
                  >
                    <i class="fa fa-plus"></i>
                  </el-upload>

                  <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2"> LSPN ID </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="lspn_id">
                  <el-input type="text" v-model="formData.lspn_id" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  Specimen Collection Point Number
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="specimen_collection_point_number">
                  <el-input
                    type="text"
                    v-model="formData.specimen_collection_point_number"
                  >
                  </el-input>
                </el-form-item>
                <!--end::Input-->
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
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="button"
                class="btn btn-lg btn-primary me-3"
                data-kt-stepper-action="submit"
                @click="submit()"
              >
                <span class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 5-->
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>
<script>
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter, useRoute } from "vue-router";
import { StepperComponent } from "@/assets/ts/components";
import { countryList, timeZoneList } from "@/core/data/country";

export default defineComponent({
  name: "edit-clinic",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef_1 = ref(null);
    const formRef_2 = ref(null);
    const formRef_3 = ref(null);
    const formRef_4 = ref(null);
    const formRef_5 = ref(null);
    const loading = ref(false);
    const formData = ref({
      name: "",
      email: "",
      phone_number: "",
      fax_number: "",
      VAED_number: "",
      hospital_provider_number: "",
      address: "",
      city: "",
      street: "",
      state: "",
      postcode: "",
      country: "",
      longitude: "",
      latitude: "",
      timezone: "",
      default_meal_time: "",
      default_start_time: "",
      default_end_time: "",
      device_expiry: "",
      device_name: "",
      key_expiry: "",
      otac: "",
      lspn_id: "",
      specimen_collection_point_number: "",
    });
    const rules = ref({
      name: [
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
          min: 6,
          message: "Provider Number must be at least 6 characters",
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
    const createClinicsRef = ref(null);
    const currentStepIndex = ref(0);
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const clinicsList = computed(() => store.getters.clinicsList);

    watch(clinicsList, () => {
      const id = route.params.id;

      clinicsList.value.forEach((item) => {
        if (item.id == id) {
          Object.assign(formData.value, item);
        }
      });
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInstance(
        createClinicsRef.value
      );

      setCurrentPageBreadcrumbs("Edit Clinics", ["Clinics"]);

      store.dispatch(Actions.CLINICS.LIST);
    });

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("footnote_signature", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };

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
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          store
            .dispatch(Actions.CLINICS.CREATE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.CLINICS.LIST);
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "clinics" });
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
      createClinicsRef,
      currentStepIndex,
      countryList,
      timeZoneList,
      upload,
      handleChange,
      handleRemove,
      handlePreview,
      dialogVisible,
      dialogImageUrl,
      uploadDisabled,
    };
  },
});
</script>
