<template>
  <!--begin::Stepper-->
  <div class="card card-edit-ref-doctor">
    <div class="card-body">
      <!--begin::Form-->
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <!--begin::Modal body-->
        <div class="py-10 px-lg-17">
          <!--begin::Scroll-->
          <div class="row">
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Provider No" prop="providerno">
                <el-input
                  v-model="formData.provider_no"
                  type="text"
                  placeholder="Enter the Provider No"
                  v-mask="'#######A'"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Title" prop="title">
                <el-input
                  v-model="formData.title"
                  type="text"
                  placeholder="Enter the Title"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="First Name" prop="firstname">
                <el-input
                  v-model="formData.first_name"
                  type="text"
                  placeholder="Enter the first name"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Last Name" prop="lastname">
                <el-input
                  v-model="formData.last_name"
                  type="text"
                  placeholder="Enter the last name"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Address" prop="address">
                <el-input
                  v-model="formData.address"
                  type="text"
                  placeholder="Enter the address"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Street" prop="street">
                <el-input
                  v-model="formData.street"
                  type="text"
                  placeholder="Enter the street"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="City" prop="city">
                <el-input
                  v-model="formData.city"
                  type="text"
                  placeholder="Enter the city"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="State" prop="state">
                <el-input
                  v-model="formData.state"
                  type="text"
                  placeholder="Enter the state"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Country" prop="country">
                <el-input
                  v-model="formData.country"
                  type="text"
                  placeholder="Enter the country"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Postcode" prop="postcode">
                <el-input
                  v-model="formData.postcode"
                  type="text"
                  placeholder="Enter the postcode"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Phone" prop="phone">
                <el-input
                  v-model="formData.phone"
                  type="text"
                  v-mask="'0#-####-####'"
                  placeholder="Enter phone number"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Fax" prop="fax">
                <el-input
                  v-model="formData.fax"
                  type="text"
                  placeholder="Enter the fax"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Mobile" prop="mobile">
                <el-input
                  v-model="formData.mobile"
                  type="text"
                  v-mask="'0#-####-####'"
                  placeholder="Enter the mobile"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Email" prop="email">
                <el-input
                  v-model="formData.email"
                  type="text"
                  placeholder="Enter email address"
                />
              </InputWrapper>
            </div>

            <div class="col-sm-6 mb-5">
              <InputWrapper required label="Practice Name" prop="practicename">
                <el-input
                  v-model="formData.practice_name"
                  type="text"
                  placeholder="Enter practice name"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <InputWrapper label="Health Link" prop="healthlink_edi">
                <el-input
                  v-model="formData.healthlink_edi"
                  type="text"
                  placeholder="Enter health link"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5 upload-file">
              <InputWrapper label="Upload File" prop="uploadfile">
                <el-upload
                  action="#"
                  ref="upload"
                  :limit="2"
                  :file-list="formData.upload_file"
                  :on-change="handleChange"
                  :auto-upload="false"
                  accept="*/*"
                >
                  <i class="fa fa-plus"></i> </el-upload
              ></InputWrapper>
            </div>
          </div>
        </div>
        <!--end::Scroll-->

        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <router-link
            type="reset"
            to="/settings/doctor-address-books"
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
              {{ formInfo.submitButtonName }}
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
      <!--end::Form-->
    </div>
  </div>
</template>
<style lang="scss">
.card-edit-ref-doctor {
  .upload-file {
    .el-form-item__content {
      & > div {
        display: flex;
        gap: 10px;
        & > ul {
          margin-top: -3px;
        }
      }
    }
  }
}
</style>
<script>
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  watch,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { mask } from "vue-the-mask";
import { validatePhone } from "@/helpers/helpers.js";

export default defineComponent({
  name: "edit-doctor-address-books",
  directives: {
    mask,
  },
  components: {
    InputWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef = ref(null);
    const doctorAddressBooks = computed(
      () => store.getters.getDoctorAddressBookList
    );
    const loading = ref(false);

    const formInfo = reactive({
      title: "Create Doctor Address Book",
      submitAction: Actions.DOCTOR_ADDRESS_BOOK.CREATE,
      submitButtonName: "CREATE",
      submittedText: "New Doctor Address Book Created",
    });

    const formData = ref({
      provider_no: "",
      title: "",
      first_name: "",
      last_name: "",
      address: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
      phone: "",
      fax: "",
      mobile: "",
      email: "",
      practice_name: "",
      healthlink_edi: "",
      upload_file_name: "",
      upload_file: [],
    });

    const rules = ref({
      provider_no: [
        {
          required: true,
          message: "Provider No cannot be blank",
          trigger: "change",
        },
      ],
      title: [
        {
          required: true,
          message: "Title cannot be blank",
          trigger: "change",
        },
      ],
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
          message: "Last Name cannot be blank",
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
      city: [
        {
          required: true,
          message: "City cannot be blank",
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
      phone: [
        {
          required: true,
          message: "Phone Number cannot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
      ],
      fax: [
        {
          required: true,
          message: "Fax cannot be blank",
          trigger: "change",
        },
      ],
      mobile: [
        {
          required: true,
          message: "Mobile Number cannot be blank",
          trigger: "change",
        },
        { validator: validatePhone, trigger: "blur" },
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
      practice_name: [
        {
          required: true,
          message: "Practice Name cannot be blank",
          trigger: "change",
        },
      ],
    });

    watch(doctorAddressBooks, () => {
      const id = route.params.id;

      doctorAddressBooks.value.forEach((item) => {
        if (item.id == id) {
          formData.value = item;

          formInfo.title = "Edit Doctor Address Book";
          formInfo.submitAction = Actions.DOCTOR_ADDRESS_BOOK.UPDATE;
          formInfo.submitButtonName = "UPDATE";
          formInfo.submittedText = "Doctor Address Book Updated";
        }
      });

      setCurrentPageBreadcrumbs(formInfo.title, ["Settings"]);
    });

    const handleChange = (file) => {
      formData.value.upload_file = [];
      formData.value.upload_file.push(file);
      formData.value.upload_file_name = file.name;
    };

    onMounted(() => {
      store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          let Data = {};
          Object.keys(formData.value).forEach((key) => {
            if (key == "upload_file") {
              if (formData.value[key].length) {
                Data.file = formData.value[key][0].raw;
              }
            } else {
              Data[key] = formData.value[key];
            }
          });
          store
            .dispatch(formInfo.submitAction, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.DOCTOR_ADDRESS_BOOK.LIST);
              Swal.fire({
                text: formInfo.submittedText,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "refDoctors" });
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

    return {
      formData,
      formInfo,
      rules,
      formRef,
      loading,
      submit,
      handleChange,
    };
  },
});
</script>
