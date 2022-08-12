<template>
  <!--begin::Stepper-->
  <div class="mx-auto w-100 w-lg-75" ref="createEmployeeRef">
    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <!--begin::Form-->
      <!--begin::Step 1-->
      <div class="current" data-kt-stepper-element="content">
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
            ref="formRef_3"
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

              <InputWrapper class="col-6" label="Username" prop="username">
                <el-input
                  v-model="formData.username"
                  type="text"
                  placeholder="Username"
                />
              </InputWrapper>

              <InputWrapper class="col-6" label="Password" prop="password">
                <el-input
                  v-model="formData.password"
                  type="text"
                  placeholder="Password"
                />
              </InputWrapper>

              <InputWrapper class="col-6" label="Email" prop="email">
                <el-input
                  v-model="formData.email"
                  type="text"
                  placeholder="Email"
                />
              </InputWrapper>
              <InputWrapper
                class="col-6"
                label="Contact Number"
                prop="mobile_number"
              >
                <el-input
                  v-model="formData.mobile_number"
                  type="text"
                  placeholder="Contact Number"
                />
              </InputWrapper>

              <InputWrapper class="col-12" label="Address" prop="address">
                <el-input
                  v-model="formData.mobile_number"
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
                  <el-select v-model="formData.role" class="w-100">
                    <el-option
                      v-for="item in employeeRoles"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                </InputWrapper>

                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.monday.available"
                          label="Monday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="monday_time">
                        <el-time-picker
                          v-model="formData.work_hours.monday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="monday_locations">
                        <el-select
                          v-model="formData.work_hours.monday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.tuesday.available"
                          label="Tuesday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="tuesday_time">
                        <el-time-picker
                          v-model="formData.work_hours.tuesday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="tuesday_locations">
                        <el-select
                          v-model="formData.work_hours.tuesday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.wednesday.available"
                          label="Wednesday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="wednesday_time">
                        <el-time-picker
                          v-model="formData.work_hours.wednesday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="wednesday_locations">
                        <el-select
                          v-model="formData.work_hours.wednesday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.thursday.available"
                          label="Thursday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="thursday_time">
                        <el-time-picker
                          v-model="formData.work_hours.thursday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="thursday_locations">
                        <el-select
                          v-model="formData.work_hours.thursday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.friday.available"
                          label="Friday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="friday_time">
                        <el-time-picker
                          v-model="formData.work_hours.friday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="friday_locations">
                        <el-select
                          v-model="formData.work_hours.friday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div
                      class="card-header border-bottom-dashed border-primary"
                    >
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.saturday.available"
                          label="Saturday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="saturday_time">
                        <el-time-picker
                          v-model="formData.work_hours.saturday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="saturday_locations">
                        <el-select
                          v-model="formData.work_hours.saturday.locations"
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
                <div class="col-md-4 mb-3">
                  <div class="card border border-primary border-dashed">
                    <div class="card-header border-bottom-dashed border-primay">
                      <div class="card-title">
                        <el-checkbox
                          v-model="formData.work_hours.sunday.available"
                          label="Sunday"
                          size="large"
                        />
                      </div>
                    </div>
                    <div class="p-3">
                      <InputWrapper label="Time Slot" prop="sunday_time">
                        <el-time-picker
                          v-model="formData.work_hours.sunday.time_slot"
                          class="w-100"
                          is-range
                          range-separator="-"
                          start-placeholder="From"
                          end-placeholder="To"
                        />
                      </InputWrapper>

                      <InputWrapper label="Location" prop="sunday_locations">
                        <el-select
                          v-model="formData.work_hours.sunday.locations"
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
import { StepperComponent } from "@/assets/ts/components";
import employeeTypes from "@/core/data/employee-types";
import employeeRoles from "@/core/data/employee-roles";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "create-employee",
  components: { InputWrapper },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef_1 = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const employeeList = computed(() => store.getters.employeeList);
    const formInfo = reactive({
      title: "Create Employee",
      submitAction: Actions.EMPLOYEE.CREATE,
      submitButtonName: "Create",
      submittedText: "New Employee Created",
    });
    const formData = ref({
      username: "",
      email: "",
      mobile_number: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "specialist",
      type: "full-time",
      work_hours: {
        monday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        tuesday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        wednesday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        thursday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        friday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        saturday: {
          available: false,
          time_slot: "",
          locations: "",
        },
        sunday: {
          available: false,
          time_slot: "",
          locations: "",
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
      ],
      mobile_number: [
        {
          required: true,
          message: "Mobile Number cannot be blank.",
          trigger: "change",
        },
      ],
    });
    const _stepperObj = ref<StepperComponent | null>(null);
    const createEmployeeRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const clinicsList = computed(() => store.getters.clinicsList);

    watch(employeeList, () => {
      const id = route.params.id;

      employeeList.value.forEach((item) => {
        if (item.id == id) {
          formData.value = item;

          formData.value.work_hours = JSON.parse(item.work_hours);

          formInfo.title = "Edit Employee";
          formInfo.submitAction = Actions.EMPLOYEE.UPDATE;
          formInfo.submitButtonName = "Update";
          formInfo.submittedText = "Employee Updated";
        }
      });

      setCurrentPageBreadcrumbs(formInfo.title, ["Employee"]);
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createEmployeeRef.value as HTMLElement
      );

      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.EMPLOYEE.LIST);
    });

    const submit = () => {
      if (!formRef_1.value) {
        return;
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          store
            .dispatch(formInfo.submitAction, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.EMPLOYEE.LIST);
              Swal.fire({
                text: "Successfully Created!",
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
      formRef_1,
      loading,
      createEmployeeRef,
      currentStepIndex,
      clinicsList,
      employeeTypes,
      employeeRoles,
    };
  },
});
</script>
