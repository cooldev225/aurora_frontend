<template>
  <!--begin::Stepper-->
  <div class="mx-auto w-100 w-lg-75">
    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <!--begin::Form-->
      <!--begin::Step 1-->
      <div class="current">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Account Details
            </h2>
          </div>

          <el-form
            class="w-100 w-xl-700px w-xxl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef"
          >
            <div class="row">
              <InputWrapper class="col-6" label="First Name" prop="first_name">
                <el-input
                  v-model="formData.first_name"
                  type="text"
                  placeholder="First Name"
                />
              </InputWrapper>
              <InputWrapper class="col-6" label="Last Name" prop="last_name">
                <el-input
                  v-model="formData.last_name"
                  type="text"
                  placeholder="Last Name"
                />
              </InputWrapper>

              <InputWrapper class="col-4" label="Username" prop="username">
                <el-input
                  v-model="formData.username"
                  type="text"
                  placeholder="Username"
                />
              </InputWrapper>

              <InputWrapper class="col-4" label="Email" prop="email">
                <el-input
                  v-model="formData.email"
                  type="email"
                  placeholder="Email"
                />
              </InputWrapper>
              <InputWrapper
                class="col-4"
                label="Contact Number"
                prop="mobile_number"
              >
                <el-input
                  v-model="formData.mobile_number"
                  type="text"
                  placeholder="Contact Number"
                />
              </InputWrapper>
              <InputWrapper
                v-if="formInfo.isCreate"
                class="col-6"
                label="Password"
                prop="password"
              >
                <el-input
                  v-model="formData.password"
                  type="password"
                  placeholder="Password"
                />
              </InputWrapper>

              <InputWrapper class="col-12" label="Address" prop="address">
                <el-input
                  v-model="formData.address"
                  type="address"
                  placeholder="Address"
                />
              </InputWrapper>
            </div>

            <div class="w-100 py-20 px-9">
              <div class="pb-10">
                <h2 class="fw-bolder d-flex align-items-center text-dark">
                  Business Hours
                </h2>
              </div>

              <div class="row">
                <InputWrapper class="col-6" label="Type" prop="type">
                  <el-select class="w-100" v-model="formData.type" filterable>
                    <el-option
                      v-for="item in employeeTypes"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper class="col-6" label="Role" prop="role">
                  <el-select v-model="formData.role_id" class="w-100">
                    <el-option
                      v-for="item in employeeRoles"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>

                <div class="col-md-4 mb-3" v-for="week in weekList" :key="week">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          class="text-capitalize"
                          v-model="formData.work_hours[week].available"
                          :label="week"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" :prop="week + '-time'">
                        <div class="demo-time-range">
                          <el-time-select
                            v-model="formData.work_hours[week].time_slot[0]"
                            :max-time="formData.work_hours[week].time_slot[1]"
                            class="mr-4"
                            placeholder="Start time"
                            start="07:00"
                            step="00:15"
                            end="18:30"
                          />
                          <el-time-select
                            v-model="formData.work_hours[week].time_slot[1]"
                            :min-time="formData.work_hours[week].time_slot[0]"
                            placeholder="End time"
                            start="07:00"
                            step="00:15"
                            end="18:30"
                          />
                        </div>
                      </InputWrapper>

                      <InputWrapper label="Location" :prop="week + '-location'">
                        <el-select
                          v-model="formData.work_hours[week].locations.id"
                          type="text"
                        >
                          <el-option
                            v-for="item in clinicsList"
                            :value="item.id"
                            :label="item.name"
                            :key="item.id"
                          />
                        </el-select>
                      </InputWrapper>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-lg btn-primary me-3"
                    @click="submit()"
                  >
                    <span class="indicator-label">
                      {{ formInfo.submitButtonName }}
                    </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
                  <!--begin::Button-->
                  <router-link
                    type="reset"
                    to="/employees"
                    class="btn btn-light me-3"
                  >
                    Cancel
                  </router-link>
                  <!--end::Button-->
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 2-->
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import employeeTypes from "@/core/data/employee-types";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "create-employee",
  components: { InputWrapper },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loading = ref<boolean>(false);
    const employeeList = computed(() => store.getters.employeeList);
    const formRef = ref<null | HTMLFormElement>(null);
    const formInfo = reactive({
      isCreate: true,
      title: "Create Employee",
      submitAction: Actions.EMPLOYEE.CREATE,
      submitButtonName: "Create",
      submittedText: "New Employee Created",
    });
    const employeeRoles = ref([]);

    const weekList = ref([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]);

    const formData = ref({
      username: "",
      email: "",
      mobile_number: "",
      password: "",
      first_name: "",
      last_name: "",
      address: "",
      role_id: "",
      type: "full-time",
      work_hours: {
        monday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        tuesday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        wednesday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        thursday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        friday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        saturday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
        sunday: {
          available: false,
          time_slot: ["09:00:00", "17:00:00"],
          locations: {
            id: "",
            name: "",
          },
        },
      },
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
        {
          type: "email",
          message: "Please input Valid email address",
          trigger: ["blur", "change"],
        },
      ],
      mobile_number: [
        {
          required: true,
          message: "Mobile Number cannot be blank.",
          trigger: "change",
        },
      ],
    });

    const currentStepIndex = ref(0);
    const clinicsList = computed(() => store.getters.clinicsList);

    const initEmployeeRoles = () => {
      ApiService.get("employee-roles")
        .then(({ data }) => {
          employeeRoles.value = data.data;

          if (formData.value.role_id == "") {
            employeeRoles.value.forEach((item) => {
              if (item["slug"] == "specialist") {
                formData.value.role_id = item["id"];
              }
            });
          }

          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    };

    watch(employeeList, () => {
      const id = route.params.id;

      employeeList.value.forEach((item) => {
        if (item.id == id) {
          formData.value = item;

          formData.value.work_hours = JSON.parse(item.work_hours);
        }
      });

      setCurrentPageBreadcrumbs(formInfo.title, ["Employee"]);
    });

    onMounted(() => {
      const id = route.params.id;

      if (id != undefined) {
        formInfo.title = "Edit Employee";
        formInfo.isCreate = false;
        formInfo.submitAction = Actions.EMPLOYEE.UPDATE;
        formInfo.submitButtonName = "Update";
        formInfo.submittedText = "Employee Updated";
      }

      initEmployeeRoles();
      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.EMPLOYEE.LIST);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          store
            .dispatch(formInfo.submitAction, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.EMPLOYEE.LIST);
              Swal.fire({
                text: formInfo.submittedText,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "employees" });
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
      formInfo,
      rules,
      submit,
      weekList,
      formRef,
      loading,
      currentStepIndex,
      clinicsList,
      employeeTypes,
      employeeRoles,
    };
  },
});
</script>
