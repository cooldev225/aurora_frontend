<template>
  <div class="setting-organization-page card w-75 mx-auto">
    <el-form
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <div class="row mt-10 me-5 ms-5">
        <InputWrapper
          class="col-sm-3 mb-5"
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
          class="col-sm-3 mb-5"
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
        <InputWrapper class="col-sm-3 mb-5" required label="ABN" prop="abn">
          <el-input
            v-model="formData.abn"
            type="text"
            placeholder="Organization ABN"
          />
        </InputWrapper>
      </div>
      <div class="row me-5 ms-5">
        <InputWrapper
          class="col-sm-3 mb-5"
          required
          label="Start time"
          prop="start_time"
        >
          <el-time-picker
            v-model="formData.start_time"
            arrow-control
            format="HH:mm"
            placeholder="Start time"
          />
        </InputWrapper>
        <InputWrapper
          class="col-sm-3 mb-5"
          required
          label="End time"
          prop="end_time"
        >
          <el-time-picker
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

export default defineComponent({
  name: "organization-settings",
  components: {},
  setup() {
    const formRef = ref(null);
    const store = useStore();
    const loading = ref(false);
    const initialAppointmentLength = ref(null);
    const formData = ref({
      name: null,
      start_time: null,
      end_time: null,
      appointment_length: null,
      abn: null,
    });
    const confirmABN = (rule, value, callback) => {
      var ABN_regex = /^([0-9]{11})$/;
      if (value === "") {
        callback(new Error("ABN cannot be blank."));
      } else if (value.match(ABN_regex) === null) {
        callback(new Error("ABN should be always 11 digits long."));
      } else {
        callback();
      }
    };
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
      abn: [
        {
          required: true,
          message: "ABN cannot be blank.",
          trigger: "change",
        },
        {
          validator: confirmABN,
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
          submitData.append("abn", formData.value.abn);
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
        formData.value.abn = currentUser.value.organization.abn;
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
    };
  },
});
</script>
