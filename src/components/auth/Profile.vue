<template>
  <!--begin::Navbar-->
  <div class="card pb-9">
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
              <el-form-item label="Photo">
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
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <label class="text-muted fs-6 fw-bold mb-2 d-block"
                >First Name</label
              >
              <el-form-item prop="first_name">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.first_name"
                  placeholder="First Name"
                />
              </el-form-item>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <label class="text-muted fs-6 fw-bold mb-2 d-block"
                >Last Name</label
              >
              <el-form-item prop="last_name">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.last_name"
                  placeholder="Last Name"
                />
              </el-form-item>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <label class="text-muted fs-6 fw-bold mb-2 d-block">Email</label>
              <el-form-item prop="email">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.email"
                  placeholder="Email"
                />
              </el-form-item>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <label class="text-muted fs-6 fw-bold mb-2 d-block">Mobile</label>
              <el-form-item prop="mobile_number">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.mobile_number"
                  placeholder="Mobile Number"
                />
              </el-form-item>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fv-row mb-7">
              <label class="text-muted fs-6 fw-bold mb-2 d-block"
                >Address</label
              >
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
import {
  defineComponent,
  ref,
  watch,
  watchEffect,
  onMounted,
  computed,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "profile-page-layout",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const formData = ref({
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      address: "",
    });
    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
      mobile_number: [
        {
          required: true,
          message: "Contact Number cannot be blank",
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
      address: [
        {
          required: true,
          message: "Address cannot be blank",
          trigger: "change",
        },
      ],
    });
    const profileData = computed(() => store.getters.getProfileSelected);
    const loading = ref(false);
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const handleAddressChange = (e) => {
      formData.value.address = e.formatted_address;
    };

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("photo", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      console.log(dialogImageUrl.value);
      dialogVisible.value = true;
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });
          console.log(formData.value);
          loading.value = true;
          store
            .dispatch(Actions.PROFILE.UPDATE, formData.value)
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
              }).then(() => {
                console.log("Updated");
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

    watchEffect(() => {
      formData.value = profileData.value;
      console.log(formData.value);
    });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Profile", []);
      store.dispatch(Actions.PROFILE.VIEW);
    });

    return {
      formData,
      formRef,
      rules,
      submit,
      upload,
      dialogVisible,
      dialogImageUrl,
      handleAddressChange,
      handleChange,
      handlePreview,
      handleRemove,
    };
  },
});
</script>
