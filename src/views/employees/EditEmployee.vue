<template>
  <!--begin::Stepper-->
  <div class="mx-auto w-100">
    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <div class="w-100 py-20 px-9">
        <HeadingText text="Employee Details" />
        <el-form class="w-100" :rules="rules" :model="formData" ref="formRef">
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
              :v-mask="'0#-####-####'"
              prop="mobile_number"
              @input="acceptNumber"
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
            <InputWrapper class="col-4" label="Type" prop="type">
              <el-select class="w-100" v-model="formData.type" filterable>
                <el-option
                  v-for="item in employeeTypes"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                />
              </el-select>
            </InputWrapper>
            <InputWrapper class="col-4" label="Role" prop="role">
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
                <InputWrapper class="col-3" label="Day">
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
                <InputWrapper class="col-3" label="Location">
                  <el-select
                    class="w-100"
                    type="text"
                    v-model="hour_schedule.clinic_id"
                  >
                    <el-option
                      v-for="clinic in clinicsList"
                      :value="clinic.id"
                      :label="clinic.name"
                      :key="clinic.id"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper class="col-3" label="Time Slot">
                  <div class="d-flex">
                    <el-time-select
                      class="w-50 pe-2"
                      placeholder="Start time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                      v-model="hour_schedule.start_time"
                    />
                    <el-time-select
                      class="w-50 ps-2"
                      placeholder="End time"
                      start="07:00"
                      step="00:15"
                      end="18:30"
                      format="HH:mm"
                      v-model="hour_schedule.end_time"
                    />
                  </div>
                </InputWrapper>
                <InputWrapper class="col-3" label="Anesthetist">
                  <el-select
                    class="w-100"
                    v-model="hour_schedule.anesthetist_id"
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
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "create-employee",
  components: { InputWrapper },
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

    const empty_schedual = {
      id: null,
      week_day: null,
      clinic_id: null,
      start_time: null,
      end_time: null,
      anesthetist_id: null,
    };

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
      hrm_user_base_schedules: [empty_schedual],
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
    };

    const rules = ref(commonRoles);

    const acceptNumber = () => {
      //0#-####-####
      var v = formData.value.mobile_number;
      var x = v.replace(/\D/g, "").match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
      if (x != undefined && x?.length > 3)
        v = !x[2] ? x[1] : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
      formData.value.mobile_number = v;
    };

    const addSchedualHandle = () => {
      formData.value.hrm_user_base_schedules.push(empty_schedual);
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
      console.log(["employeeList=", employeeList.value]);
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
          if (employee.hrm_user_base_schedules.length) {
            formData.value.hrm_user_base_schedules =
              employee.hrm_user_base_schedules;
          }
        }
      }
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
              schedule.start_time ||
              schedule.end_time == null ||
              schedule.anesthetist_id == null
          );
          if (null_schedules.length) {
            valid = false;
            ElMessage.error("Please fill employee hours fields!");
            return false;
          }
          loading.value = true;

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
      employeeRoles,
      weekdays,
      anesthetistList,
      acceptNumber,
      addSchedualHandle,
      deleteSchedualHandle,
    };
  },
});
</script>
