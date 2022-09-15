<template>
  <!--begin::Stepper-->
  <div class="mx-auto w-100">
    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <div class="w-100 py-20 px-9">
        <HeadingText text="Employee Details" />
        <el-form
          class="w-100"
          :rules="
            formData.role_id === formInfo.specialist_role_id.toString()
              ? specialistRules
              : rules
          "
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
            class="card d-flex flex-row border border-dashed border-primary pt-3 m-3"
          >
            <InputWrapper class="col-3" label="Day">
              <el-select class="w-100" type="text">
                <el-option
                  v-for="weekday in weekdays"
                  :value="weekday.value"
                  :label="weekday.label"
                  :key="weekday.value"
                />
              </el-select>
            </InputWrapper>
            <InputWrapper class="col-3" label="Location">
              <el-select class="w-100" type="text">
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
                />
                <el-time-select
                  class="w-50 ps-2"
                  placeholder="End time"
                  start="07:00"
                  step="00:15"
                  end="18:30"
                  format="HH:mm"
                />
              </div>
            </InputWrapper>
            <InputWrapper
              :v-show="
                formData.role_id === formInfo.specialist_role_id.toString()
              "
              class="col-3"
              label="Anaesthetist"
              prop="specialist.anesthetist_id"
            >
              <el-select
                v-model="formData.specialist.anesthetist_id"
                class="w-100"
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
            <router-link
              type="reset"
              to="/employees"
              class="btn btn-light me-3"
            >
              Cancel
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
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
import employeeRoles from "@/core/data/employee-roles";
import weekdays from "@/core/data/weekdays";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

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

    const formData = ref({
      username: "",
      email: "",
      mobile_number: "0",
      password: "",
      first_name: "",
      last_name: "",
      address: "",
      role_id: "4",
      type: "full-time",
      specialist: {
        anesthetist_id: "",
      },
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

    const specialistRules = ref({
      ...commonRoles,
      specialist: {
        anesthetist_id: [
          {
            required: true,
            message: "Anaesthetist cannot be blank.",
            trigger: "change",
          },
        ],
      },
    });

    const acceptNumber = () => {
      //0#-####-####
      var v = formData.value.mobile_number;
      var x = v.replace(/\D/g, "").match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
      if (x != undefined && x?.length > 3)
        v = !x[2] ? x[1] : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
      formData.value.mobile_number = v;
    };

    const currentStepIndex = ref(0);

    watch(employeeList, () => {
      setCurrentPageBreadcrumbs(formInfo.title, ["Employee"]);
    });

    onMounted(() => {
      const id = route.params.id;
      if (id != undefined) {
        formInfo.title = "Edit";
        formInfo.isCreate = false;
        formInfo.submitAction = Actions.EMPLOYEE.UPDATE;
        formInfo.submitButtonName = "Update";
        formInfo.submittedText = "Employee Updated";
      }

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
      specialistRules,
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
    };
  },
});
</script>
