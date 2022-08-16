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
                  <el-option value="Consultation" label="Consultation" />
                  <el-option value="Procedure" label="Procedure" />
                </el-select>
              </InputWrapper>
            </div>

            <div class="col-sm-12 mb-5">
              <InputWrapper label="Appointment Color Preview" prop="type">
                <span :style="{ 'background-color': formData.color }"
                  >John Smith</span
                >
              </InputWrapper>

              <ColorPicker
                :prop="color"
                :color="formData.color"
                @color-change="changeColor"
                default-format="hex"
                alpha-channel="hide"
              />
            </div>

            <!--Input: Invoice By -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Invoice By"
              prop="invoice_by"
            >
              <el-select v-model="formData.invoice_by" class="w-100">
                <el-option value="Clinic" label="Clinic" />
                <el-option value="Specialist" label="Specialist" />
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
                <el-option value="single" label="Single" />
                <el-option value="double" label="Double" />
                <el-option value="triple" label="Triple" />
              </el-select>
            </InputWrapper>

            <!--Input: Payment Tier 1 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 1 (Self-insured) $"
              prop="payment_tier_1"
            >
              <el-input v-model="formData.payment_tier_1" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 2 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 2 (Private health insurance with excess)"
              prop="payment_tier_2"
            >
              <el-input v-model="formData.payment_tier_2" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 3 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 3 (Private health insurance with $0 excess)"
              prop="payment_tier_3"
            >
              <el-input v-model="formData.payment_tier_3" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 4 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 4 (Private Health Insurance + Pension/Healthcare
                Card)"
              prop="payment_tier_4"
            >
              <el-input v-model="formData.payment_tier_4" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 5 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 5 (Pension Card)"
              prop="payment_tier_5"
            >
              <el-input v-model="formData.payment_tier_5" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 6 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 6 (Healthcare Card)"
              prop="payment_tier_6"
            >
              <el-input v-model="formData.payment_tier_6" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 7 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 7 (Department of Veteran Affairs)"
              prop="payment_tier_7"
            >
              <el-input v-model="formData.payment_tier_7" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 8 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 8 (Department of Veteran Affairs)"
              prop="payment_tier_8"
            >
              <el-input v-model="formData.payment_tier_8" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 9 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 8 (Work Cover)"
              prop="payment_tier_9"
            >
              <el-input v-model="formData.payment_tier_9" type="number" />
            </InputWrapper>

            <!--Input: Payment Tier 10 -->
            <InputWrapper
              class="col-sm-6 mb-5"
              label="Payment Tier 10 (AMA)"
              prop="payment_tier_10"
            >
              <el-input v-model="formData.payment_tier_10" type="number" />
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
import { Actions } from "@/store/enums/StoreEnums";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";
import { ColorPicker } from "vue-accessible-color-picker";

export default defineComponent({
  name: "edit-apt-type",
  components: {
    InputWrapper,
    ColorPicker,
  },
  methods: {
    changeColor(color) {
      this.formData.color = color.cssColor;
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef = ref(null);
    const createAptTypeModalRef = ref(null);
    const aptTypes = computed(() => store.getters.getAptTypesList);
    const loading = ref(false);

    const formInfo = reactive({
      title: "Create Appointment Type",
      submitAction: Actions.APT.TYPES.CREATE,
      submitButtonName: "CREATE",
      submittedText: "New Appointment Type Created",
    });

    const formData = ref({
      name: "",
      type: "Consultation",
      anesthetist_required: 0,
      color: "#eeeeee",
      mbs_code: 0,
      clinical_code: 0,
      invoice_by: "Clinic",
      arrival_time: 0,
      appointment_time: "single",
      payment_tier_1: 0,
      payment_tier_2: 0,
      payment_tier_3: 0,
      payment_tier_4: 0,
      payment_tier_5: 0,
      payment_tier_6: 0,
      payment_tier_7: 0,
      payment_tier_8: 0,
      payment_tier_9: 0,
      payment_tier_10: 0,
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
          formInfo.submitAction = Actions.APT.TYPES.UPDATE;
          formInfo.submitButtonName = "UPDATE";
          formInfo.submittedText = "Appointment Type Updated";
        }
      });

      setCurrentPageBreadcrumbs(formInfo.title, ["Settings"]);
    });

    onMounted(() => {
      store.dispatch(Actions.APT.TYPES.LIST);
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
              store.dispatch(Actions.APT.TYPES.LIST);
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
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
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
      submit,
    };
  },
});
</script>