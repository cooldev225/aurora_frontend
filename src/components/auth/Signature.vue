<!-- eslint-disable prettier/prettier -->
<template>
  <!--begin::Navbar-->
  <div class="card pb-9 signature-page">
    <div class="card-header">
      <!--begin::Navs-->
      <div class="d-flex overflow-auto">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Profile
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/profile/password-change"
              active-class="active"
            >
              Password
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/profile/signature"
              active-class="active"
            >
              Signature
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="row">
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <el-form-item>
                <VueSignaturePad
                  width="500px"
                  height="500px"
                  ref="signaturePad"
                  class="border border-primary border-1"
                  :options="{ onBegin }"
                />
              </el-form-item>
            </div>
          </div>
          <div class="col-sm-6">
            <InputWrapper
              required
              class="full"
              label="Signature Upload"
              prop="signature"
            >
              <el-upload
                action="#"
                ref="signatureRef"
                class="signature-uploader"
                list-type="picture-card"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="
                  (uploadFile) => {
                    handleSignatureUploadSuccess(uploadFile);
                  }
                "
              >
                <img
                  v-if="formData.signature"
                  :src="formData.signature"
                  class="signature"
                />
                <i
                  v-if="!formData.signature"
                  class="el-icon avatar-uploader-icon"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                    ></path>
                  </svg>
                </i>
              </el-upload>
            </InputWrapper>
          </div>
        </div>
        <div class="d-flex ms-auto justify-content-end w-25">
          <button type="submit" class="btn btn-primary w-25">Save</button>
          <button
            type="button"
            @click="clearSignature"
            class="btn btn-light-primary w-25 ms-2"
          >
            Cancel
          </button>
        </div>
      </el-form>
      <!--end::Details-->
    </div>
  </div>
  <!--end::Navbar-->
</template>
<style lang="scss">
.signature-page {
  .signature-uploader {
    img.signature {
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
import { defineComponent, ref, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "user-signature",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const isUpload = ref(false);
    const signaturePad = ref(null);
    const formData = ref({
      signature: null,
      signature_file: null,
    });
    const loading = ref(false);

    const getSignatureData = () => {
      return signaturePad.value.saveSignature();
    };

    const clearSignature = () => {
      signaturePad.value.clearSignature();
    };

    const onBegin = () => {
      formData.value.signature = null;
      formData.value.signature_file = null;
      isUpload.value = false;
    };

    const handleSignatureUploadSuccess = async (uploadFile) => {
      formData.value.signature = URL.createObjectURL(uploadFile.raw);
      formData.value.signature_file = await convertBlobToBase64(uploadFile.raw);
      isUpload.value = true;
      clearSignature();
    };

    const blobToBase64 = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const convertBlobToBase64 = async (blob) => {
      // blob data
      return await blobToBase64(blob);
    };

    const submit = () => {
      var signature = null;
      if (isUpload.value === true) {
        signature = formData.value.signature_file;
      } else {
        const { isEmpty, data } = getSignatureData();
        signature = !isEmpty ? data : null;
      }

      if (signature) {
        loading.value = true;
        store
          .dispatch(Actions.PROFILE.UPDATE_SIGNATURE, {
            signature: signature,
          })
          .then(() => {
            loading.value = false;
            store.dispatch(Actions.PROFILE.VIEW);
            Swal.fire({
              text: "Successfully Updated!",
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
      }
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Password", ["Profile"]);
    });

    return {
      formData,
      formRef,
      signaturePad,
      getSignatureData,
      submit,
      clearSignature,
      handleSignatureUploadSuccess,
      onBegin,
      isUpload,
    };
  },
});
</script>
