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
          required
          class="col-4"
          label="Document Header Letter"
          prop="document_letter_header"
        >
          <!-- <el-input
            type="textarea"
            v-model="formData.document_letter_header"
            placeholder="Header Letter"
          /> -->
          <el-upload
            action="#"
            ref="headerRef"
            class="avatar-uploader"
            list-type="picture-card"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="
              (uploadFile) => {
                handleAvatarSuccess(uploadFile, 'document_letter_header');
              }
            "
          >
            <img
              v-if="formData.document_letter_header"
              :src="formData.document_letter_header"
              class="avatar"
            />
            <i
              v-if="!formData.document_letter_header"
              class="el-icon avatar-uploader-icon"
            >
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                ></path>
              </svg>
            </i>
          </el-upload>
        </InputWrapper>
        <InputWrapper
          required
          class="col-4"
          label="Document Footer Letter"
          prop="document_letter_footer"
        >
          <!-- <el-input
            type="textarea"
            v-model="formData.document_letter_footer"
            placeholder="Footer Letter"
          /> -->
          <el-upload
            action="#"
            ref="footerRef"
            class="avatar-uploader"
            list-type="picture-card"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="
              (uploadFile) => {
                handleAvatarSuccess(uploadFile, 'document_letter_footer');
              }
            "
          >
            <img
              v-if="formData.document_letter_footer"
              :src="formData.document_letter_footer"
              class="avatar"
            />
            <i
              v-if="!formData.document_letter_footer"
              class="el-icon avatar-uploader-icon"
            >
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                ></path>
              </svg>
            </i>
          </el-upload>
        </InputWrapper>
        <InputWrapper required class="col-4" label="Logo" prop="logo">
          <el-upload
            action="#"
            ref="logoRef"
            class="avatar-uploader"
            list-type="picture-card"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="
              (uploadFile) => {
                handleAvatarSuccess(uploadFile, 'logo');
              }
            "
          >
            <img v-if="formData.logo" :src="formData.logo" class="avatar" />
            <i v-if="!formData.logo" class="el-icon avatar-uploader-icon">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                ></path>
              </svg>
            </i>
          </el-upload>
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
export default defineComponent({
  name: "organization-settings",
  components: {},
  setup() {
    const formRef = ref(null);
    const store = useStore();
    const loading = ref(false);
    const formData = ref({
      document_letter_header: null,
      document_letter_header_file: null,
      document_letter_footer: null,
      document_letter_footer_file: null,
      logo: null,
      logo_file: null,
    });
    const rules = ref({});
    const currentUser = computed(() => store.getters.currentUser);

    const handleAvatarSuccess = (uploadFile, flag) => {
      formData.value[flag] = URL.createObjectURL(uploadFile.raw);
      formData.value[flag + "_file"] = uploadFile;
    };
    const handleCancelButton = () => {
      formData.value = {
        document_letter_header: null,
        document_letter_footer: null,
        logo: null,
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
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };
    const loadOrganizationData = (id) => {
      // setTimeout(() => {
      //   console.log("----------------", currentUser);
      // }, 200);
      store
        .dispatch(Actions.ORG.SELECT, id)
        .then((data) => {
          console.log("--------------", data);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        });
    };
    watch(currentUser, () => {
      const orgId = currentUser.value.profile.organization_id.toString();
      console.log("-------333---------", orgId);
      currentUser.value.profile.organization_id && loadOrganizationData(orgId);
    });
    onMounted(() => {
      setCurrentPageBreadcrumbs("Organization Settings", ["Settings"]);
    });
    return {
      formData,
      handleAvatarSuccess,
      handleCancelButton,
      rules,
      submit,
      formRef,
      loading,
    };
  },
});
</script>
