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
            <InputWrapper class="col-12 col-md-6" label="Email" prop="email">
              <el-input
                v-model="formData.email"
                type="email"
                placeholder="Email"
              />
            </InputWrapper>
            <InputWrapper
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
              class="col-12 col-md-6"
              label="Address"
              prop="address"
            >
              <el-input
                v-model="formData.address"
                type="address"
                placeholder="Address"
              />
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
          <HeadingText text="Employee Hours" />
          <div
            v-for="(
              hour_schedule, hourIndex
            ) in formData.hrm_user_base_schedules"
            :key="hourIndex"
          >
            <div class="border border-dashed border-primary pt-3 m-3">
              <div class="card d-flex flex-row">
                <InputWrapper
                  :class="formData.role_id === 5 ? 'col-2' : 'col-3'"
                  label="Day"
                  :prop="'weekday-' + hourIndex"
                >
                  <el-select
                    class="w-100"
                    type="text"
                    v-model="hour_schedule.week_day"
                  >
                    <el-option
                      v-for="weekday in weekdays"
                      :value="weekday.value"
                      :label="weekday.label"
                      :key="weekday.value"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper
                  :class="formData.role_id === 5 ? 'col-3' : 'col-6'"
                  label="Location"
                  :prop="'location-' + hourIndex"
                >
                  <el-select
                    class="w-100"
                    type="text"
                    v-model="hour_schedule.clinic_id"
                    :prop="'location-select-' + hourIndex"
                  >
                    <el-option
                      v-for="clinic in clinicsList"
                      :value="clinic.id"
                      :label="clinic.name"
                      :key="clinic.id"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper
                  class="col-3"
                  label="Time Slot"
                  :prop="'timeslot-' + hourIndex"
                >
                  <div class="d-flex">
                    <el-time-select
                      class="w-50 pe-2"
                      placeholder="Start time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                      v-model="hour_schedule.start_time"
                      :prop="'starttime-' + hourIndex"
                    />
                    <el-time-select
                      class="w-50 ps-2"
                      placeholder="End time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                      v-model="hour_schedule.end_time"
                      :prop="'endtime-' + hourIndex"
                    />
                  </div>
                </InputWrapper>
                <InputWrapper
                  v-if="formData.role_id === 5"
                  class="col-2"
                  label="Restriction"
                  :prop="'restriction-' + hourIndex"
                >
                  <el-select
                    class="w-100"
                    v-model="hour_schedule.appointment_type_restriction"
                    :prop="'restriction-select-' + hourIndex"
                  >
                    <el-option
                      v-for="item in restrictionsTypes"
                      :value="item"
                      :label="item"
                      :key="item"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper
                  v-if="formData.role_id === 5"
                  class="col-2"
                  label="Anesthetist"
                  :prop="'anesthetist-' + hourIndex"
                >
                  <el-select
                    class="w-100"
                    v-model="hour_schedule.anesthetist_id"
                    :prop="'anesthetist-select-' + hourIndex"
                  >
                    <el-option
                      v-for="item in anesthetistList"
                      :value="item.id"
                      :label="item.first_name + ' ' + item.last_name"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
              </div>
              <div class="d-flex flex-row-reverse">
                <span
                  class="cursor-pointer text-nowrap text-danger text-right delete-schedual"
                  @click="deleteSchedualHandle(hourIndex)"
                  >- Delete Schedual</span
                >
              </div>
            </div>
          </div>
          <div
            class="card d-flex flex-row border border-dashed border-primary cursor-pointer pt-3 m-3 add-schedual"
            @click="addSchedualHandle()"
          >
            <span><span>+</span> Add Schedual</span>
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
            <RouterLink type="reset" to="/employees" class="btn btn-light me-3">
              Cancel
            </RouterLink>
          </div>
        </el-form>
      </div>
    </div>
  </div>
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
import { ElMessage } from "element-plus";
import { mask } from "vue-the-mask";

export default defineComponent({
  name: "create-employee",
  components: { InputWrapper },
  directives: {
    mask,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loading = ref<boolean>(false);

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
      password: "",
      first_name: "",
      last_name: "",
      address: "",
      role_id: 4,
      type: "full-time",
      hrm_user_base_schedules: [
        {
          id: null,
          week_day: null,
          clinic_id: null,
          start_time: null,
          end_time: null,
          anesthetist_id: null,
          appointment_type_restriction: null,
        },
      ],
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

    const addSchedualHandle = () => {
      formData.value.hrm_user_base_schedules.push({
        id: null,
        week_day: null,
        clinic_id: null,
        start_time: null,
        end_time: null,
        anesthetist_id: null,
        appointment_type_restriction: null,
      });
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };

    const deleteSchedualHandle = (hourIndex) => {
      formData.value.hrm_user_base_schedules.splice(hourIndex, 1);
    };

    const currentStepIndex = ref(0);

    watch(employeeList, () => {
      const id = route.params.id;
      if (id != undefined) {
        let employees = employeeList.value.filter((e) => e.id == id);
        if (employees && employees.length) {
          let employee = employees[0];
          formData.value.id = employee.id;
          formData.value.username = employee.username;
          formData.value.email = employee.email;
          formData.value.mobile_number = employee.mobile_number;
          formData.value.first_name = employee.first_name;
          formData.value.last_name = employee.last_name;
          formData.value.address = employee.address;
          formData.value.role_id = employee.role_id;
          formData.value.type = employee.type;
          if (employee.hrm_user_base_schedules?.length) {
            formData.value.hrm_user_base_schedules =
              employee.hrm_user_base_schedules;
          }
          if (employee.specialist_clinic_relations?.length) {
            formData.value.specialist_clinic_relations =
              employee.specialist_clinic_relations;
          }
        }
      }
    });

    watch(formData.value, () => {
      console.log([
        "hrm_user_base_schedules",
        formData.value.hrm_user_base_schedules,
      ]);
    });

    onMounted(() => {
      let id = route.params.id;
      if (id != undefined) {
        formInfo.title = "Edit";
        formInfo.isCreate = false;
        formInfo.submitAction = Actions.EMPLOYEE.UPDATE;
        formInfo.submitButtonName = "Update";
        formInfo.submittedText = "Employee Updated";

        store.dispatch(Actions.EMPLOYEE.LIST);
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
          let null_schedules = formData.value.hrm_user_base_schedules.filter(
            (schedule) =>
              schedule.week_day == null ||
              schedule.clinic_id == null ||
              schedule.start_time == null ||
              schedule.end_time == null ||
              schedule.anesthetist_id == null
          );
          if (null_schedules.length) {
            valid = false;
            ElMessage.error("Please fill employee hours fields!");
            return false;
          }
          loading.value = true;

          let provideres = formData.value.specialist_clinic_relations.filter(
            (f) => f.clinic_id != null && f.provider_number != null
          );
          formData.value.specialist_clinic_relations = provideres
            ? provideres
            : [];

          store
            .dispatch(formInfo.submitAction, formData.value)
            .then((res) => {
              console.log(["save response", res]);
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
      formRef,
      loading,
      currentStepIndex,
      clinicsList,
      employeeTypes,
      restrictionsTypes,
      employeeRoles,
      weekdays,
      anesthetistList,
      addSchedualHandle,
      deleteSchedualHandle,
      handleAddOtherNumber,
    };
  },
});
</script>
