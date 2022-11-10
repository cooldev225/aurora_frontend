<template>
  <!--begin::Stepper-->
  <div class="mx-auto w-100">
    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <div class="w-100 py-20 px-9">
        <HeadingText text="Employee Details" />
        <el-form
          class="w-100"
          :rules="rules"
          :prop="formData"
          :model="formData"
          ref="formRef"
        >
          <div class="row">
            <InputWrapper
              required
              class="col-12 col-md-6"
              label="First Name"
              prop="first_name"
            >
              <el-input
                v-model="formData.first_name"
                type="text"
                placeholder="First Name"
              />
            </InputWrapper>
            <InputWrapper
              required
              class="col-12 col-md-6"
              label="Last Name"
              prop="last_name"
            >
              <el-input
                v-model="formData.last_name"
                type="text"
                placeholder="Last Name"
              />
            </InputWrapper>
            <InputWrapper
              required
              class="col-12 col-md-6"
              label="Email"
              prop="email"
            >
              <el-input
                v-model="formData.email"
                type="email"
                placeholder="Email"
              />
            </InputWrapper>
            <InputWrapper
              required
              class="col-12 col-md-6"
              label="Contact Number"
              v-mask="'0#-####-####'"
              prop="mobile_number"
            >
              <el-input
                v-model="formData.mobile_number"
                type="text"
                placeholder="Contact Number"
              />
            </InputWrapper>
            <InputWrapper
              required
              class="col-12 col-md-6"
              label="Address"
              prop="address"
            >
              <div class="el-input">
                <GMapAutocomplete
                  :value="formData.address"
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
              </div>
            </InputWrapper>
          </div>
          <el-divider />
          <HeadingText text="Employee Type" />
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
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                />
              </el-select>
            </InputWrapper>
          </div>
          <div v-if="formData.role_id == 5">
            <el-divider />
            <HeadingText text="Provider Number" />
            <div
              class="row"
              v-for="(provider, index) in formData.specialist_clinic_relations"
              :key="index"
            >
              <InputWrapper class="col-6" label="Clinic" prop="clinic_id">
                <el-select
                  class="w-100"
                  type="text"
                  v-model="provider.clinic_id"
                  :prop="'location-select'"
                >
                  <el-option
                    v-for="clinic in clinicsList"
                    :disabled="
                      formData.specialist_clinic_relations.filter(
                        (f) => f.clinic_id == clinic.id
                      )?.length
                    "
                    :value="clinic.id"
                    :label="clinic.name"
                    :key="clinic.id"
                  />
                </el-select>
              </InputWrapper>

              <InputWrapper
                class="col-6"
                label="Provider Number"
                prop="provider_number"
              >
                <el-input
                  v-model="provider.provider_number"
                  type="text"
                  v-mask="'#######A'"
                  placeholder="Enter Provider Number"
                />
              </InputWrapper>
            </div>
            <div
              v-if="
                formData.specialist_clinic_relations.length < clinicsList.length
              "
              class="m-3 cursor-pointer text-center text-nowrap border border-gray-300 h-40px d-flex flex-center"
              style="font-size: 1.2rem; line-height: 40px; color: #bd5"
              @click="handleAddOtherNumber()"
            >
              <span><span>+</span> Add Other Number</span>
            </div>
          </div>
          <el-divider />
          <div class="d-flex justify-content-end">
            <button
              :disabled="loading"
              type="button"
              class="btn btn-lg btn-primary me-3"
              @click="submit()"
            >
              <span v-if="!loading" class="indicator-label">
                {{ formInfo.submitButtonName }}
              </span>
              <span v-if="loading">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <RouterLink type="reset" to="/employees" class="btn btn-light me-3">
              Cancel
            </RouterLink>
          </div>
        </el-form>
      </div>
    </div>
  </div>
  <HRMTimeScheduleTable
    :selectedFilters="selectedFilters"
    :employeeList="filteredEmployee"
    clinicFilter="1"
  />
</template>
<style lang="scss">
.add-schedual {
  font-size: 1.8rem;
  color: #ff9527;
  justify-content: center;
  padding: 10px;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

.delete-schedual {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
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
import employeeRoles from "@/core/data/employee-roles";
import weekdays from "@/core/data/weekdays";
import restrictionsTypes from "@/core/data/apt-restriction";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { mask } from "vue-the-mask";
import HRMTimeScheduleTable from "@/components/HRM/HRMTimeScheduleTable.vue";

export default defineComponent({
  name: "create-employee",
  components: { InputWrapper, HRMTimeScheduleTable },
  directives: {
    mask,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const selectedFilters = ref(["time", "clinic"]);
    const loading = ref<boolean>(false);
    const filteredEmployee = ref([]);

    const employeeList = computed(() => store.getters.employeeList);
    const clinicsList = computed(() => store.getters.clinicsList);
    const anesthetistList = computed(() => store.getters.anesthetistList);

    const formRef = ref<null | HTMLFormElement>(null);
    const formInfo = reactive({
      isCreate: true,
      title: "Create Employee",
      submitAction: Actions.EMPLOYEE.CREATE,
      submitButtonName: "Create",
      submittedText: "New Employee Created",
      specialist_role_id: 0,
    });

    const formData = ref({
      id: -1,
      username: "",
      email: "",
      mobile_number: "0",
      first_name: "",
      last_name: "",
      address: "",
      role_id: 4,
      type: "full-time",
      schedule_timeslots: [],
      specialist_clinic_relations: [
        {
          clinic_id: null,
          specilasit_id: "-1",
          provider_number: null,
        },
      ],
    });

    const commonRoles = {
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
      mobile_number: [
        {
          required: true,
          message: "Contact number cannot be blank.",
          trigger: "change",
        },
      ],
      address: [
        {
          required: true,
          message: "Address cannot be blank.",
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
      specialist_clinic_relations: {
        clinic_id: [
          {
            required: true,
            message: "This field cannot be blank",
            trigger: ["blur", "change"],
          },
        ],
        provider_number: [
          {
            required: true,
            message: "This field cannot be blank",
            trigger: "blur",
          },
        ],
      },
    };

    const rules = ref(commonRoles);

    const currentStepIndex = ref(0);

    watch(employeeList, () => {
      const id = route.params.id;
      if (id != undefined) {
        let employees = employeeList.value.filter((e) => e.id == id);
        if (employees && employees.length) {
          filteredEmployee.value = [];
          let employee = employees[0];
          filteredEmployee.value = employees;
          formData.value.id = employee.id;
          formData.value.username = employee.username;
          formData.value.email = employee.email;
          formData.value.mobile_number = employee.mobile_number;
          formData.value.first_name = employee.first_name;
          formData.value.last_name = employee.last_name;
          formData.value.address = employee.address;
          formData.value.role_id = employee.role_id;
          formData.value.type = employee.type;
          if (employee.schedule_timeslots?.length) {
            // formData.value.schedule_timeslots = employee.schedule_timeslots;
          }
          if (employee.specialist_clinic_relations?.length) {
            formData.value.specialist_clinic_relations =
              employee.specialist_clinic_relations;
          }
        }
      }
    });

    watch(formData.value, () => {
      // console.log(["schedule_timeslots", formData.value.sedule_timeslots]);
    });

    onMounted(() => {
      let id = route.params.id;
      if (id != undefined) {
        setForUpdateEmployee();
      }
      setCurrentPageBreadcrumbs(formInfo.title, ["Employee"]);
      store.dispatch(Actions.CLINICS.LIST);
    });

    const handleAddOtherNumber = () => {
      let id = route.params.id;
      let provider = {
        clinic_id: null,
        specilasit_id: id.toString(),
        provider_number: null,
      };
      formData.value.specialist_clinic_relations.push(provider);
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          let provideres = formData.value.specialist_clinic_relations.filter(
            (f) => f.clinic_id != null && f.provider_number != null
          );
          formData.value.specialist_clinic_relations = provideres
            ? provideres
            : [];

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

    const setForUpdateEmployee = () => {
      store.dispatch(Actions.USER_LIST);
      formInfo.title = "Edit";
      formInfo.isCreate = false;
      formInfo.submitAction = Actions.EMPLOYEE.UPDATE;
      formInfo.submitButtonName = "Update";
      formInfo.submittedText = "Employee Updated";
      store.dispatch(Actions.EMPLOYEE.LIST);
    };
    const handleAddressChange = (e) => {
      formData.value.address = e.formatted_address;
    };
    return {
      formData,
      formInfo,
      rules,
      submit,
      formRef,
      loading,
      currentStepIndex,
      clinicsList,
      employeeTypes,
      restrictionsTypes,
      employeeRoles,
      weekdays,
      anesthetistList,
      handleAddOtherNumber,
      filteredEmployee,
      selectedFilters,
      handleAddressChange,
    };
  },
});
</script>
