<template>
  <CardSection>
    <el-form
      v-if="formData"
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <!--begin::Modal body-->
      <div class="py-10 px-lg-17">
        <!--begin::Scroll-->
        <div class="row">
          <InputWrapper
            class="col-sm-6"
            required
            label="Appointment Type Name"
            prop="name"
          >
            <el-input
              v-model="formData.name"
              type="text"
              placeholder="e.g. Long Consultation"
            />
          </InputWrapper>

          <InputWrapper class="col-sm-6" label="Type" prop="type">
            <el-select v-model="formData.type" class="w-100">
              <el-option value="CONSULTATION" label="Consultation" />
              <el-option value="PROCEDURE" label="Procedure" />
            </el-select>
          </InputWrapper>

          <InputWrapper class="col-sm-4" label="Appointment Color" prop="type">
            <div class="d-flex flex-row my-auto gap-2">
              <el-color-picker
                v-model="formData.color"
                class="py-1"
                size="large"
                :predefine="predefineColors"
              />
              <span
                class="text-white px-2"
                :style="{ 'background-color': formData.color }"
              >
                Appointment Color Preview
              </span>
            </div>
          </InputWrapper>

          <!--Input: Invoice By -->
          <InputWrapper class="col-sm-4" label="Invoice By" prop="invoice_by">
            <el-select v-model="formData.invoice_by" class="w-100">
              <el-option value="CLINIC" label="Clinic" />
              <el-option value="SPECIALIST" label="Specialist" />
            </el-select>
          </InputWrapper>

          <!--Input: Anesthetist Required-->
          <InputWrapper class="col-sm-4 mb-5" prop="anesthetist_required">
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
              placeholder="Arrival Time"
            />
          </InputWrapper>

          <!--Input: Appointment Length -->
          <InputWrapper
            class="col-sm-6 mb-5"
            label="Appointment Length"
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
          <div class="col-sm-12 px-0 mb-5">
            <InputWrapper
              label="Select Default Billing Items"
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

        <div class="row">
          <!-- Input: Pre Procedure Instructions -->
          <InputWrapper
            v-if="formData.type == 'PROCEDURE'"
            label="Pre Procedure Instructions"
            prop="pre_procedure_instructions"
            class="col-sm-6"
          >
            <el-form-item prop="body">
              <ckeditor
                :editor="ClassicEditor"
                v-model="formData.pre_procedure_instructions"
              />
            </el-form-item>
          </InputWrapper>

          <!-- Input: Consent -->
          <InputWrapper
            label="Consent"
            prop="consent"
            :class="[formData.type == 'PROCEDURE' ? 'col-sm-6' : '']"
          >
            <el-form-item prop="body">
              <ckeditor :editor="ClassicEditor" v-model="formData.consent" />
            </el-form-item>
          </InputWrapper>
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
  </CardSection>
</template>

<script lang="ts">
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import IAppointmentType from "@/store/interfaces/IAppointmentType";
import CardSection from "@/components/presets/GeneralElements/CardSection.vue";

export default defineComponent({
  name: "edit-apt-type",
  components: {
    InputWrapper,
    ckeditor: CKEditor.component,
    CardSection,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef = ref<HTMLFormElement>();
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
    ]);

    const formInfo = reactive({
      title: "Create Appointment Type",
      submitAction: AppointmentActions.APPOINTMENT_TYPES.CREATE,
      submitButtonName: "CREATE",
      submittedText: "New Appointment Type Created",
    });

    const formData = ref<IAppointmentType>();

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
          if (formRef.value != undefined) {
            formRef.value.resetFields();
          }
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
      ClassicEditor,
    };
  },
});
</script>
