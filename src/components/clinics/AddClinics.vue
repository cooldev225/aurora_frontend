<template>
  <!--begin::Stepper-->
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <!--begin::Search-->
        <span>Create Clinics</span>
        <!--end::Search-->
      </div>
    </div>
    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-17">
          <!--begin::Scroll-->
          <div class="scroll-y me-n7 pe-7 row">
            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Clinic Name</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="name">
                <el-input
                  v-model="formData.name"
                  type="text"
                  placeholder="Username"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Email</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="email">
                <el-input
                  type="email"
                  v-model="formData.email"
                  placeholder="admin@gmail.com"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="mb-7 col-sm-4">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Contact Number</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="phone">
                <el-input v-model="formData.phone" type="text" placeholder="" />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="mb-7 col-sm-4">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Fax Number</label>
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

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Provider Number</label>
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

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">VAED Number</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="mobile_number">
                <el-input
                  type="text"
                  v-model="formData.VAED_number"
                  placeholder="VAED Number"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Address</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="address">
                <el-input
                  type="text"
                  v-model="formData.address"
                  placeholder="Address"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Street</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="street">
                <el-input
                  type="text"
                  v-model="formData.street"
                  placeholder="Street"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">City</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="max_employees">
                <el-input
                  type="text"
                  v-model="formData.city"
                  placeholder="City"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">State</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="state">
                <el-input
                  type="text"
                  v-model="formData.state"
                  placeholder="State"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Postcode</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="postcode">
                <el-input
                  type="text"
                  v-model="formData.postcode"
                  placeholder="Postcode"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Country</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="country">
                <el-select class="w-100" v-model="formData.country" filterable>
                  <template
                    v-for="(country, index) in countryList"
                    :key="index"
                  >
                    <el-option :value="index" :label="country" />
                  </template>
                </el-select>
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Latitude</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="latitude">
                <el-input
                  type="text"
                  v-model="formData.latitude"
                  placeholder="Latitude"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Longitude</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="latitude">
                <el-input
                  type="text"
                  v-model="formData.longitude"
                  placeholder="Longitude"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">Time Zone</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="timezone">
                <el-select class="w-100" v-model="formData.timezone" filterable>
                  <template
                    v-for="(timezone, index) in timeZoneList"
                    :key="index"
                  >
                    <el-option
                      :value="timezone.value"
                      :label="timezone.label"
                    />
                  </template>
                </el-select>
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2"
                >Specimen Collection Point Number</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="specimen_collection_point_number">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.specimen_collection_point_number"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="fs-6 fw-bold mb-2">
                <span class="">Default Start Time</span>
              </label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="default_start_time">
                <el-time-picker
                  type="text"
                  class="w-100"
                  v-model="formData.default_start_time"
                >
                </el-time-picker>
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="fs-6 fw-bold mb-2">
                <span class="">Default End Time</span>
              </label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="default_end_time">
                <el-time-picker
                  type="text"
                  class="w-100"
                  v-model="formData.default_end_time"
                >
                </el-time-picker>
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2"
                >Default Meal Time</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="default_meal_time">
                <el-select
                  class="w-100"
                  v-model="formData.default_meal_time"
                  filterable
                >
                  <el-option value="0" label="0 Minutes" />
                  <el-option value="5" label="5 Minutes" />
                  <el-option value="10" label="10 Minutes" />
                  <el-option value="15" label="15 Minutes" />
                  <el-option value="20" label="20 Minutes" />
                  <el-option value="25" label="25 Minutes" />
                  <el-option value="30" label="30 Minutes" />
                  <el-option value="35" label="35 Minutes" />
                  <el-option value="40" label="40 Minutes" />
                  <el-option value="45" label="45 Minutes" />
                  <el-option value="50" label="50 Minutes" />
                  <el-option value="55" label="55 Minutes" />
                  <el-option value="60" label="60 Minutes" />
                </el-select>
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="col-sm-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">LSPN ID</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="laspn">
                <el-input type="text" class="w-100" v-model="formData.lspn" />
              </el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Input group-->

            <!-- begin::Image -->
            <div class="col-sm-4 row mb-7">
              <!--begin::Label-->
              <label class="col-sm-4 col-form-label fw-bold fs-6"
                >Footnote Signature</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-sm-8">
                <!--begin::Image input-->
                <div
                  class="image-input image-input-outline"
                  data-kt-image-input="true"
                  style="background-image: url(media/avatars/blank.png)"
                >
                  <!--begin::Preview existing avatar-->
                  <div
                    class="image-input-wrapper w-125px h-125px"
                    :style="`background-image: url(${formData.footnote_signature})`"
                  ></div>
                  <!--end::Preview existing avatar-->

                  <!--begin::Label-->
                  <label
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    title="Change Logo"
                  >
                    <i class="bi bi-pencil-fill fs-7"></i>

                    <!--begin::Inputs-->
                    <input
                      type="file"
                      name="logo"
                      accept=".png, .jpg, .jpeg"
                      @change="changeLogo"
                    />
                    <input type="hidden" name="avatar_remove" />
                    <!--end::Inputs-->
                  </label>
                  <!--end::Label-->

                  <!--begin::Remove-->
                  <span
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                    data-kt-image-input-action="remove"
                    data-bs-toggle="tooltip"
                    @click="removeImage()"
                    title="Remove Logo"
                  >
                    <i class="bi bi-x fs-2"></i>
                  </span>
                  <!--end::Remove-->
                </div>
                <!--end::Image input-->
              </div>
              <!--end::Col-->
            </div>
            <!-- end::Image -->
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <router-link
            type="reset"
            to="/clinics"
            id="kt_modal_add_customer_cancel"
            class="btn btn-light me-3"
          >
            Cancel
          </router-link>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label">
              Submit
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
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
      </el-form>
    </div>
  </div>
  <!--end::Stepper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import { countryList, timeZoneList } from "@/core/data/country";

export default defineComponent({
  name: "kt-vertical-wizard",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      name: "",
      email: "",
      phone: "",
      fax_number: "",
      hospital_provider_number: "",
      VAED_number: "",
      address: "",
      street: "",
      city: "media/avatars/300-1.jpg",
      state: "",
      postcode: "",
      country: "",
      latitude: "",
      langitude: "",
      timezone: "",
      specimen_collection_point_number: "",
      footnote_signature: "",
      default_start_time: "",
      default_end_time: "",
      default_meal_time: "",
      latest_invoice_no: "",
      latest_invoice_pathology_no: "",
      centre_serial_no: "",
      centre_last_invoice_serial_no: "",
      lspn_id: "",
    });
    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank.",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannot be blank.",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Username cannot be blank.",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email cannot be blank.",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Password cannot be blank.",
          trigger: "change",
        },
      ],
      password_confirmation: [
        {
          required: true,
          message: "Confirm Password cannot be blank.",
          trigger: "change",
        },
      ],
    });
    const imageData = new FormData();

    const removeImage = () => {
      formData.value.footnote_signature = "media/avatars/blank.png";
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Create Clinics", ["Clinics"]);
    });

    const changeLogo = (e) => {
      formData.value.footnote_signature = e.target.files[0];
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          store
            .dispatch(Actions.CREATE_CLINICS, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.LIST_CLINICS);
              Swal.fire({
                text: "Successfully Created!",
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
      formRef,
      loading,
      removeImage,
      changeLogo,
      countryList,
      timeZoneList,
    };
  },
});
</script>
