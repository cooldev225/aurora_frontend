<template>
  <div
    class="modal fade"
    id="modal_move_apt"
    tabindex="-1"
    aria-hidden="true"
    ref="MoveAptModalRef"
  >
    <div
      :class="
        'modal-dialog modal-dialog-centered ' +
        (aptData.step === 0 ? 'mw-500px' : 'mw-650px')
      "
    >
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_move_appointment_header">
          <div class="d-block">
            <h2 class="fw-bolder">Moving Appointment:</h2>
            <div class="mt-1">
              <span class="me-1">{{ aptData?.patient_name?.full }},</span>
              <span class="me-1">{{ aptData?.aus_formatted_date }},</span>
              <span class="me-1">
                {{ aptData?.formatted_appointment_time }}
              </span>
            </div>
          </div>
          <div class="select-new-apt-caption" v-if="aptData.step === 1">
            Select New Appointment Time
          </div>
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
        </div>
        <div class="modal-body py-10 px-lg-8">
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
            <el-form :model="formData" ref="formRef" v-if="aptData.step === 0">
              <div class="appointment-type">
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
                      v-for="item in cliniclist"
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
                      v-for="specialist in allSpecialist"
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
                      :key="index"
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
            <el-form
              :model="formData"
              ref="timeslotsformRef"
              v-if="aptData.step === 1"
            >
              <div>
                <div>
                  <span class="me-1">Clinic:</span>
                  <span class="caption-content me-2">
                    {{
                      cliniclist.filter((c) => c.id === formData.clinic_id)[0]
                        ?.name
                    }}
                  </span>
                  <span class="me-1">Specialist:</span>
                  <span class="caption-content me-2">
                    {{
                      allSpecialist.filter(
                        (c) => c.id === formData.specialist_id
                      )[0].full_name
                    }}
                  </span>
                  <span class="me-1">Time Requirement:</span>
                  <span class="caption-content me-2">
                    {{
                      formData.time_requirement
                        ? aptTimeRequirelist.filter(
                            (c) => c.id === formData.time_requirement
                          )[0].title
                        : "Any"
                    }}
                  </span>
                  <span class="me-1">Time Frame:</span>
                  <span class="caption-content me-2">
                    {{ aptWeeksList[formData.x_weeks] }}
                  </span>
                  <span class="me-1">Appointment Type:</span>
                  <span class="caption-content me-2">
                    {{ aptData.appointment_type_name }}
                  </span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#modal_move_apt {
  .el-divider--horizontal {
    margin: 0px;
  }
  .appointment-type label {
    display: none;
  }
  .select-new-apt-caption {
    color: red;
    text-transform: uppercase;
    font-weight: bold;
  }
  .caption-content {
    color: #3e7ba0;
    font-weight: 700;
  }
}
</style>
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
      time_requirement: 0,
      x_weeks: 0,
    });

    watch(formData.value.x_weeks, () => {
      console.log(formData.value);
    });

    watch(aptData, () => {
      //formData.value.step = 0;
      store.dispatch(AppointmentActions.APPOINTMENT_TYPES.LIST).then(() => {
        formData.value.appointment_type_id = aptData.value.appointment_type?.id;
      });
      store.dispatch(Actions.CLINICS.LIST).then(() => {
        console.log();
        formData.value.clinic_id = aptData.value.clinic_id;
      });
      store.dispatch(Actions.SPECIALIST.LIST).then(() => {
        formData.value.specialist_id = aptData.value.specialist_id;
      });
    });

    onMounted(() => {
      store.dispatch(Actions.APT_TIME_REQUIREMENT.LIST);
    });

    const handleSearch = () => {
      aptData.value.step = 1;
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
