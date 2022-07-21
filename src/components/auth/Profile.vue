<template>
  <!--begin::Navbar-->
  <div class="card">
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
              <label class="text-muted fs-6 fw-bold mb-2 d-block"
                >Username</label
              >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.username"
                  placeholder="Username"
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
              <label class="text-muted fs-6 fw-bold mb-2 d-block"
                >Date of Birth</label
              >
              <el-form-item prop="date_of_birth">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="formData.date_of_birth"
                  placeholder="Date of Birth"
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
              <label class="text-muted fs-6 fw-bold mb-2 d-block">Gender</label>
              <el-form-item prop="gender">
                <el-select
                  class="w-100"
                  v-model="formData.gender"
                  placeholder="Select Gender"
                >
                  <el-option value="male" label="Male" />
                  <el-option value="female" label="Female" />
                  <el-option value="other" label="Other" />
                  <el-option
                    value="undisclosed"
                    label="Not Stated / Inadequately Desribed"
                  />
                </el-select>
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
      </el-form>
      <!--end::Details-->
    </div>
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "profile-page-layout",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      contact_number: "",
      gender: "",
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
      contact_number: [
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
    const loading = ref(false);

    const handleAddressChange = (e) => {
      formData.value.address = e.formatted_address;
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(Actions.PATIENTS.UPDATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.PATIENTS.LIST);
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
      formData.value = store.getters.currentUser.profile;
      console.log(formData.value);
    });

    // watch(list, () => {
    //   patientData.value = list.value;
    //   tableData.value = patientData.value;
    //   renderTable();
    // });

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("Profile", []);
    });

    return {
      formData,
      formRef,
      rules,
      submit,
      handleAddressChange,
    };
  },
});
</script>
