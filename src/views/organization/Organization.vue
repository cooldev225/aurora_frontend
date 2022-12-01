<template>
  <div class="setting-organization-page card w-75 mx-auto">
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <div class="row mt-10 me-5 ms-5">
        <div class="col-sm-12">
          <div class="fv-row mb-7">
            <el-form-item label="Logo">
              <div class="d-flex">
                <img
                  v-if="formData.logo"
                  :src="formData.logo"
                  className="rounded me-2"
                  width="146"
                  height="146"
                  alt="profile photo"
                />

                <el-upload
                  action="#"
                  ref="uploadRef"
                  list-type="picture-card"
                  :limit="1"
                  :on-change="handleUploadChange"
                  :auto-upload="false"
                  accept="image/*"
                >
                  <i class="fa fa-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
          </div>
        </div>
        <InputWrapper
          class="col-sm-4 mb-5"
          required
          label="Organization name"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            type="text"
            placeholder="Organization name"
          />
        </InputWrapper>
        <InputWrapper
          class="col-sm-4 mb-5"
          required
          label="Appointment length"
          prop="appointment_length"
        >
          <el-input
            v-model="formData.appointment_length"
            type="number"
            placeholder="Appointment length"
          />
        </InputWrapper>
        <InputWrapper
          class="col-sm-4 mb-5"
          required
          label="ABN/ACN"
          prop="abn_acn"
        >
          <el-input
            v-model="formData.abn_acn"
            type="text"
            placeholder="Organization ABN/ACN"
          />
        </InputWrapper>
      </div>
      <div class="row me-5 ms-5">
        <InputWrapper
          class="col-sm-4 mb-5"
          required
          label="Start time"
          prop="start_time"
        >
          <el-time-picker
            class="w-100"
            v-model="formData.start_time"
            arrow-control
            format="HH:mm"
            placeholder="Start time"
          />
        </InputWrapper>
        <InputWrapper
          class="col-sm-4 mb-5"
          required
          label="End time"
          prop="end_time"
        >
          <el-time-picker
            class="w-100"
            v-model="formData.end_time"
            arrow-control
            format="HH:mm"
            placeholder="End time"
          />
        </InputWrapper>
      </div>
      <div class="d-flex justify-content-end mb-10 me-10">
        <button
          type="button"
          id="setting_organization_form_cancel"
          class="btn btn-light me-3"
          @click="handleCancelButton"
        >
          Cancel
        </button>
        <!--end::Button-->

        <!--begin::Submit Button-->
        <button class="btn btn-lg btn-primary" type="submit">
          <span class="indicator-label"> Update </span>
        </button>
      </div>
      <!--end::Modal footer-->
    </el-form>
  </div>
</template>
<style lang="scss">
.setting-organization-page {
  .avatar-uploader {
    img.avatar {
      cursor: pointer;
      width: 100%;
      position: relative;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload {
      overflow: hidden;
    }
  }
}
</style>
<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import JwtService from "@/core/services/JwtService";
import { validateAbnAcn } from "@/helpers/helpers";

export default defineComponent({
  name: "organization-settings",
  components: {},
  setup() {
    const formRef = ref(null);
    const store = useStore();
    const loading = ref(false);
    const initialAppointmentLength = ref(null);
    const logoFile = ref(null);
    const formData = ref({
      name: null,
      start_time: null,
      end_time: null,
      appointment_length: null,
      abn_acn: null,
      logo: null,
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Organization Name is required",
          trigger: "change",
        },
      ],
      start_time: [
        {
          required: true,
          message: "Start Time is required",
          trigger: "change",
        },
      ],
      end_time: [
        {
          required: true,
          message: "End Time is required",
          trigger: "change",
        },
      ],
      appointment_length: [
        {
          required: true,
          message: "Appointment Length is required",
          trigger: "change",
        },
      ],
      abn_acn: [
        {
          required: true,
          message: "ABN/ACN cannot be blank.",
          trigger: "change",
        },
        {
          validator: validateAbnAcn,
          trigger: ["blur"],
        },
      ],
    });
    const currentUser = computed(() => store.getters.currentUser);
    const handleCancelButton = () => {
      formData.value = {
        name: null,
        start_time: null,
        end_time: null,
        appointment_length: null,
      };
    };

    const handleUploadChange = (file) => {
      logoFile.value = file.raw;
    };

    const submit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          let submitData = new FormData();
          submitData.append("name", formData.value.name);
          submitData.append(
            "start_time",
            moment(formData.value.start_time).format("HH:mm:ss")
          );
          submitData.append(
            "end_time",
            moment(formData.value.end_time).format("HH:mm:ss")
          );
          submitData.append(
            "appointment_length",
            formData.value.appointment_length
          );
          submitData.append("abn_acn", formData.value.abn_acn);
          if (logoFile.value) submitData.append("logo", logoFile.value);
          var flag =
            initialAppointmentLength.value ===
            formData.value.appointment_length;

          store
            .dispatch(Actions.ORG_ADMIN.ORGANIZATION.SETTINGS.UPDATE, {
              submitData: submitData,
            })
            .then(() => {
              loading.value = false;
              Swal.fire({
                // text: "Successfully Updated organization",
                html: flag
                  ? "Successfully Updated organization"
                  : 'Successfully Updated organization <br/><br/><i class="bi bi-info-circle-fill text-warning fs-3"></i><span class="text-warning mx-2">Important Note: Changing the Appointment Length will not change existing appointments.</span>',
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
              store.dispatch(Actions.VERIFY_AUTH, {
                api_token: JwtService.getToken(),
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        }
      });
    };
    watch(currentUser, () => {
      if (currentUser.value) {
        formData.value.name = currentUser.value.organization.name;
        formData.value.abn_acn = currentUser.value.organization.abn_acn;
        formData.value.appointment_length =
          currentUser.value.organization.appointment_length;
        formData.value.start_time = new Date(
          moment().format("YYYY-MM-DD") +
            " " +
            currentUser.value.organization.start_time
        );
        formData.value.end_time = new Date(
          moment().format("YYYY-MM-DD") +
            " " +
            currentUser.value.organization.end_time
        );
        initialAppointmentLength.value =
          currentUser.value.organization.appointment_length;
      }
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Organization Settings", ["Settings"]);
    });

    return {
      formData,
      handleCancelButton,
      rules,
      submit,
      formRef,
      loading,
      initialAppointmentLength,
      handleUploadChange,
    };
  },
});
</script>
