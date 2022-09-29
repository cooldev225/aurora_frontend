<template>
  <!--begin::Navbar-->
  <div class="card pb-9">
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
          <div class="col-sm-12">
            <div class="fv-row mb-7">
              <el-form-item>
                <VueSignaturePad
                  width="500px"
                  height="500px"
                  ref="signaturePad"
                  class="border border-primary border-1"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="d-flex ms-auto justify-content-end w-25">
          <button type="submit" class="btn btn-primary w-25">Save</button>
          <button type="reset" class="btn btn-light-primary w-25 ms-2">
            Cancel
          </button>
        </div>
      </el-form>
      <!--end::Details-->
    </div>
  </div>
  <!--end::Navbar-->
</template>

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
    const signaturePad = ref(null);
    const formData = ref({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    const loading = ref(false);

    const getSignatureData = () => {
      return signaturePad.value.saveSignature();
    };

    const submit = () => {
      const { isEmpty, data } = getSignatureData();

      if (!isEmpty) {
        loading.value = true;
        store
          .dispatch(Actions.PROFILE.UPDATE_SIGNATURE, data)
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
    };
  },
});
</script>
