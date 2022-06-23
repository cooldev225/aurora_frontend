<template>
  <!--begin::Stepper-->
  <div
    class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
    id="kt_create_account_stepper"
    ref="verticalWizardRef"
  >
    <!--begin::Aside-->
    <div
      class="d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9"
    >
      <!--begin::Wrapper-->
      <div class="px-6 px-lg-10 px-xxl-15 py-20">
        <!--begin::Nav-->
        <div class="stepper-nav">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">1</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Account Details</h3>

              <div class="stepper-desc fw-bold">Setup Your Account Details</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2 -->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">2</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Address Details</h3>
              <div class="stepper-desc fw-bold">Setup Address Details</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 2 -->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">3</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Business Hours</h3>
              <div class="stepper-desc fw-bold">Setup Business Hours</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 3-->
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

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
            class="w-100 w-xl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_1"
            @submit.prevent="handleStep_1"
          >
            <div class="row">
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">First Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="first_name">
                    <el-input
                      v-model="formData.first_name"
                      type="text"
                      placeholder="First Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Last Name</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="last_name">
                    <el-input
                      v-model="formData.last_name"
                      type="text"
                      placeholder="Last Name"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Username</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="username">
                    <el-input
                      v-model="formData.username"
                      type="text"
                      placeholder="Username"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">Email</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      type="text"
                      placeholder="Email"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <div class="col-md-6">
                <!--begin::Input group-->
                <div class="fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"
                    >Mobile Number</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="mobile_number">
                    <el-input
                      v-model="formData.mobile_number"
                      type="text"
                      placeholder="Mobile Number"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
            </div>
            <div class="text-end">
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 1-->

      <!--begin::Step 2-->
      <div data-kt-stepper-element="content">
        <div class="w-100">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Setup Address Details
            </h2>
          </div>
          <el-form
            class="py-20 w-100 w-xl-800px px-9"
            id="kt_create_account_form"
            :rules="rules"
            :model="formData"
            ref="formRef_2"
            @submit.prevent="handleStep_2"
          >
            <div class="row">
              <!-- TODO -->
            </div>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="previousStep"
              >
                <span class="svg-icon svg-icon-4 me-1">
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="submit"
                class="btn btn-lg btn-primary align-self-end"
              >
                Continue
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
      <!--end::Step 2-->

      <!--begin::Step 2-->
      <div data-kt-stepper-element="content">
        <div class="w-100 py-20 px-9">
          <div class="pb-10 pb-lg-15">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
              Business Hours
            </h2>
          </div>
          <el-form
            class="w-100 w-xl-800px"
            :rules="rules"
            :model="formData"
            ref="formRef_3"
          >
            <div class="row">
              <div class="row">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  Select Employee Type
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="employee_type">
                  <el-select
                    class="w-100"
                    v-model="formData.employee_type"
                    filterable
                  >
                    <el-option value="part-time" label="Part-Time" />
                    <el-option value="full-time" label="Part-Time" />
                    <el-option value="casual" label="Casual" />
                    <el-option value="contractor" label="Contractor" />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="card">
                <div class="card-header">
                  <span>Monday</span>
                </div>
                <div class="card-body"></div>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="previousStep"
              >
                <span class="svg-icon svg-icon-4 me-1">
                  <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
              <button
                type="button"
                class="btn btn-lg btn-primary me-3"
                data-kt-stepper-action="submit"
                @click="submit()"
              >
                <span class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
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
import { defineComponent, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import { StepperComponent } from "@/assets/ts/components";
import { useForm } from "vee-validate";

export default defineComponent({
  name: "kt-vertical-wizard",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef_1 = ref<null | HTMLFormElement>(null);
    const formRef_2 = ref<null | HTMLFormElement>(null);
    const formRef_3 = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      username: "",
      email: "",
      mobile_number: "",
      first_name: "",
      last_name: "",
      access: "",
      role: "",
      employee_type: "",
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
      access: [
        {
          required: true,
          message: "Email cannot be blank.",
          trigger: "change",
        },
      ],
    });
    const _stepperObj = ref<StepperComponent | null>(null);
    const verticalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );

      setCurrentPageBreadcrumbs("Create Employee", ["Employee"]);
    });

    const { handleSubmit } = useForm({});

    const handleStep_1 = () => {
      if (!formRef_1.value) {
        return;
      }

      formRef_1.value.validate((valid) => {
        if (valid) {
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
        }
      });
    };

    const handleStep_2 = () => {
      if (!formRef_2.value) {
        return;
      }

      currentStepIndex.value++;
      if (!_stepperObj.value) {
        return;
      }
      _stepperObj.value.goNext();
    };

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const submit = () => {
      if (!formRef_3.value) {
        return;
      }

      formRef_3.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          store
            .dispatch(Actions.EMPLOYEE.CREATE, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.EMPLOYEE.CREATE);
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
      rules,
      submit,
      formRef_1,
      formRef_2,
      formRef_3,
      loading,
      handleSubmit,
      previousStep,
      handleStep_1,
      handleStep_2,
      verticalWizardRef,
      currentStepIndex,
    };
  },
});
</script>
