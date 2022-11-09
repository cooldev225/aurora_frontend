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
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";

export default defineComponent({
  name: "organization-settings",
  components: {},
  setup() {
    const formRef = ref(null);
    const store = useStore();
    const loading = ref(false);
    const formData = ref({
      name: null,
      start_time: null,
      end_time: null,
      appointment_length: null,
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
        if (!formData.value.document_letter_header) {
          ElMessage.error("Please upload header file!");
          valid = false;
        }
        if (!formData.value.document_letter_footer) {
          ElMessage.error("Please upload footer file!");
          valid = false;
        }
        if (!formData.value.logo) {
          ElMessage.error("Please upload logo file!");
          valid = false;
        }
        if (valid) {
          loading.value = true;
          let submitData = new FormData();
          submitData.append(
            "header",
            formData.value.document_letter_header_file.raw
          );
          submitData.append(
            "footer",
            formData.value.document_letter_footer_file.raw
          );
          submitData.append("logo", formData.value.logo_file.raw);
          store
            .dispatch(Actions.ORG_ADMIN.ORGANIZATION.SETTINGS.UPDATE, {
              submitData: submitData,
            })
            .then(() => {
              loading.value = false;
              Swal.fire({
                text: "Successfully Updated organization",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
              formRef.value.resetFields();
              // reloadOrgData();
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
    watch(currentUser, () => {
      console.log("currentUser", currentUser);
      if (currentUser.value) {
        formData.value.name = currentUser.value.organization.name;
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
    };
  },
});
</script>
