<template>
  <!--begin::Stepper-->
  <div class="card">
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
              <!--Input: Appointment Type Name-->
              <InputWrapper required label="Appointment Type Name" prop="name">
                <el-input
                  v-model="formData.name"
                  type="text"
                  placeholder="e.g. Long Consultation"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-6 mb-5">
              <!--Input: Appointment Type -->
              <InputWrapper label="Type" prop="type">
                <el-select v-model="formData.type" class="w-100">
                  <el-option value="CONSULTATION" label="Consultation" />
                  <el-option value="PROCEDURE" label="Procedure" />
                </el-select>
              </InputWrapper>
            </div>

            <div class="col-sm-3 mb-5">
              <InputWrapper label="Appointment Color" prop="type">
                <el-color-picker
                  v-model="formData.color"
                  class="py-1"
                  size="large"
                  :predefine="predefineColors"
                />
              </InputWrapper>
            </div>
            <div class="col-sm-9 mb-5 py-5">
              <InputWrapper class="mt-2" prop="type">
                <span
                  class="text-white p-5"
                  :style="{ 'background-color': formData.color }"
                >
                  Appointment Color Preview
                </span>
              </InputWrapper>
            </div>

            <!--Input: Invoice By -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Invoice By"
              prop="invoice_by"
            >
              <el-select v-model="formData.invoice_by" class="w-100">
                <el-option value="CLINIC" label="Clinic" />
                <el-option value="SPECIALIST" label="Specialist" />
              </el-select>
            </InputWrapper>

            <!--Input: Anesthetist Required-->
            <InputWrapper class="col-sm-6 mb-5" prop="anesthetist_required">
              <el-checkbox
                type="checkbox"
                v-model="formData.anesthetist_required"
                label="Anesthetist Required"
              />
            </InputWrapper>

            <!--Input: Arrival Time-->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Arrival extra time"
              prop="arrival_time"
            >
              <el-input
                v-model="formData.arrival_time"
                type="number"
                placeholder="Arrival time"
              />
            </InputWrapper>

            <!--Input: Appointment Length -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Appointment length"
              prop="appointment_time"
            >
              <el-select v-model="formData.appointment_time" class="w-100">
                <el-option value="SINGLE" label="Single" />
                <el-option value="DOUBLE" label="Double" />
                <el-option value="TRIPLE" label="Triple" />
              </el-select>
            </InputWrapper>
          </div>

          <div class="row">
            <div class="col-sm-12 px-0">
              <InputWrapper
                label="Select default billings items"
                prop="default_items"
              >
                <el-select
                  class="w-100"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  v-model="formData.default_items"
                >
                  <el-option
                    v-for="item in scheduleItems"
                    :value="item.id"
                    :label="item.label_name"
                    :key="item.id"
                  />
                </el-select>
              </InputWrapper>
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
            to="/settings/apt-types"
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
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { Actions } from "@/store/enums/StoreEnums";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "edit-apt-type",
  components: {
    InputWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef = ref(null);
    const createAptTypeModalRef = ref(null);
    const aptTypes = computed(() => store.getters.getAptTypesList);
    const reportTemplates = computed(() => store.getters.getReportTemplateList);
    const scheduleItems = computed(() => store.getters.scheduleItemList);
    const loading = ref(false);
    const predefineColors = ref([
      "#ff4500",
      "#ff8c00",
      "#ffd700",
      "#90ee90",
      "#00ced1",
      "#1e90ff",
      "#c71585",
      "rgba(255, 69, 0, 0.68)",
      "rgb(255, 120, 0)",
      "hsv(51, 100, 98)",
      "hsva(120, 40, 94, 0.5)",
      "hsl(181, 100%, 37%)",
      "hsla(209, 100%, 56%, 0.73)",
      "#c7158577",
    ]);

    const formInfo = reactive({
      title: "Create Appointment Type",
      submitAction: AppointmentActions.APPOINTMENT_TYPES.CREATE,
      submitButtonName: "CREATE",
      submittedText: "New Appointment Type Created",
    });

    const formData = ref({
      name: "",
      type: "CONSULTATION",
      anesthetist_required: 0,
      color: "#eeeeee",
      mbs_code: 0,
      clinical_code: 0,
      invoice_by: "CLINIC",
      arrival_time: 0,
      appointment_time: "SINGLE",
      report_template: null,
      default_items: [],
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Name cannot be blank",
          trigger: "change",
        },
      ],
    });

    watch(aptTypes, () => {
      const id = route.params.id;

      aptTypes.value.forEach((item) => {
        if (item.id == id) {
          formData.value = item;

          formInfo.title = "Edit Appointment Type";
          formInfo.submitAction = AppointmentActions.APPOINTMENT_TYPES.UPDATE;
          formInfo.submitButtonName = "UPDATE";
          formInfo.submittedText = "Appointment Type Updated";
        }
      });

      setCurrentPageBreadcrumbs(formInfo.title, ["Settings"]);
    });

    onMounted(() => {
      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
      store.dispatch(Actions.REPORT_TEMPLATES.LIST);
      store.dispatch(Actions.SCHEDULE_ITEM.LIST);
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
              store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
              Swal.fire({
                text: formInfo.submittedText,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "aptTypes" });
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        }
      });
    };

    return {
      formData,
      formInfo,
      rules,
      formRef,
      loading,
      createAptTypeModalRef,
      reportTemplates,
      submit,
      scheduleItems,
      predefineColors,
    };
  },
});
</script>
