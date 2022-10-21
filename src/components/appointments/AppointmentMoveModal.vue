<template>
  <div
    class="modal fade"
    id="modal_move_apt"
    tabindex="-1"
    aria-hidden="true"
    ref="MoveAptModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-500px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_move_appointment_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Moving Appointment:</h2>
          <div>
            <span>{{ aptData.patient_name?.full }}</span>
            <span>{{ aptData.formatted_appointment_time }}</span>
          </div>
          <!--end::Modal title-->
          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Modal body-->
        <div class="modal-body py-10 px-lg-8">
          <!--begin::Scroll-->
          <div
            class="scroll-y me-n7 pe-7"
            id="kt_modal_move_appointment_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_move_appointment_header"
            data-kt-scroll-wrappers="#kt_modal_move_appointment_scroll"
            data-kt-scroll-offset="300px"
          >
            <el-form :model="formData" ref="formRef">
              <div class="row">
                <InputWrapper prop="appointment_type_id">
                  <el-select
                    :disabled="props.isDisableAptTypeList"
                    class="w-100"
                    placeholder="Select Appointment Type"
                    v-model="formData.appointment_type_id"
                  >
                    <el-option
                      v-for="item in aptTypelist"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
              </div>
              <el-divider />
              <div class="row">
                <InputWrapper class="col-6">
                  <el-select
                    class="w-100"
                    placeholder="Select Clinic"
                    v-model="formData.clinic_id"
                  >
                    <el-option value="" label="Any Clinic" />
                    <el-option
                      v-for="item in clinic_list"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper class="col-6">
                  <el-select
                    class="w-100"
                    placeholder="Select Specialist"
                    v-model="formData.specialist_id"
                    filterable
                  >
                    <el-option value="" label="Any Specialist" />
                    <el-option
                      v-for="specialist in allSpecialists"
                      :value="specialist.id"
                      :label="specialist.full_name"
                      :key="specialist.id"
                    />
                  </el-select>
                </InputWrapper>
              </div>
              <el-divider />
              <div class="row">
                <InputWrapper class="col-6">
                  <el-select
                    class="w-100"
                    placeholder="Select Appointment Time Requirement"
                    v-model="formData.time_requirement"
                  >
                    <el-option :value="0" label="Any time" :key="0" />
                    <el-option
                      v-for="item in aptTimeRequirelist"
                      :value="item.id"
                      :label="item.title"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper class="col-6">
                  <el-select
                    class="w-100"
                    placeholder="Select Time frame"
                    v-model="formData.x_weeks"
                  >
                    <el-option
                      v-for="(item, index) in aptWeeksList"
                      :value="index"
                      :label="item"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
              </div>
              <button
                class="btn btn-primary mt-3 w-100"
                @click.prevent="handleSearch"
              >
                SEARCH
              </button>
            </el-form>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  watchEffect,
} from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import aptWeeksList from "@/core/data/apt-weeks";

export default defineComponent({
  name: "move-apt-modal",
  components: {},
  props: {
    isDisableAptTypeList: { type: Boolean },
  },
  setup(props) {
    const store = useStore();
    const formRef = ref(null);
    const loading = ref(false);
    const aptData = computed(() => store.getters.getAptSelected);
    const aptTypelist = computed(() => store.getters.getAptTypesList);
    const cliniclist = computed(() => store.getters.clinicsList);
    const allSpecialist = computed(() => store.getters.getSpecialistList);
    const aptTimeRequirelist = computed(
      () => store.getters.getAptTimeRequireList
    );
    const formData = ref({
      appointment_type_id: null,
      clinic_id: null,
      specialist_id: null,
      time_requirement: null,
      x_weeks: null,
    });

    watch(aptData, () => {
      console.log(["aptData", aptData.value]);
    });

    watch(aptData, () => {
      console.log(["cliniclist", cliniclist.value]);
    });

    watchEffect(() => {
      formData.value.appointment_type_id = aptData.value.appointment_type?.id;
      formData.value.clinic_id = aptData.value.clinic_id;
      formData.value.specialist_id = aptData.value.specialist_id;
    });

    onMounted(() => {
      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST);
      store.dispatch(Actions.CLINICS.LIST);
      store.dispatch(Actions.SPECIALIST.LIST);
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
    });

    const handleSearch = () => {
      //
    };

    return {
      props,
      aptData,
      aptTypelist,
      cliniclist,
      allSpecialist,
      aptTimeRequirelist,
      aptWeeksList,
      formData,
      formRef,
      loading,
      handleSearch,
    };
  },
});
</script>
