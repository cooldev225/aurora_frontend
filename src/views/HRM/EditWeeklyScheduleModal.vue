<template>
  <div
    class="modal fade"
    id="modal_edit_schedule"
    tabindex="-1"
    aria-hidden="true"
    ref="editScheduleModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_schedule_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">{{ schedule._title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_edit_schedule_close"
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
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_edit_schedule_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_schedule_header"
              data-kt-scroll-wrappers="#kt_modal_edit_schedule_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row" v-if="schedule._action == 'edit_employee_type'">
                <InputWrapper class="col-12" label="Type" prop="type">
                  <el-select class="w-100" v-model="formData.type" filterable>
                    <el-option
                      v-for="item in employeeTypes"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper class="col-12" label="Role" prop="role" required>
                  <el-select v-model="formData.role_id" class="w-100">
                    <el-option
                      v-for="item in employeeRoles.filter((e) => e.value > 2)"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                </InputWrapper>
                <InputWrapper
                  class="col-12"
                  label="Employee"
                  prop="user"
                  filterable
                >
                  <el-select
                    class="w-100"
                    v-model="formData.user_id"
                    filterable
                  >
                    <el-option
                      v-for="item in employeeList"
                      :value="item.id"
                      :label="item.full_name"
                      :key="item.id"
                    />
                  </el-select>
                </InputWrapper>
              </div>

              <div v-if="schedule._action == 'edit_weekly_time'">
                <div v-for="(day, index) in formData.timeslots" :key="index">
                  <div
                    class="m-3 time-slots-box d-flex flex-row time-slots-wrapper"
                  >
                    <div class="card d-flex flex-row time-slots-view">
                      <InputWrapper
                        class="col-3 px-1"
                        label="Start Time"
                        :prop="'timeslot-' + index"
                      >
                        <el-time-select
                          placeholder="Start time"
                          :max-time="day?.end_time"
                          class="w-100"
                          start="07:00"
                          step="00:15"
                          end="18:30"
                          format="HH:mm"
                          v-model="day.start_time"
                          :prop="'starttime-' + index"
                        />
                      </InputWrapper>
                      <div class="gap">:</div>
                      <InputWrapper
                        class="px-1 col-3"
                        label="End Time"
                        :prop="'timeslot-' + index"
                      >
                        <el-time-select
                          class="w-100"
                          placeholder="End time"
                          :min-time="day?.start_time"
                          start="07:00"
                          step="00:15"
                          end="18:30"
                          format="HH:mm"
                          v-model="day.end_time"
                          :prop="'endtime-' + index"
                        />
                      </InputWrapper>
                      <InputWrapper
                        class="col-3"
                        label="Type"
                        :prop="'category-' + index"
                      >
                        <el-select
                          class="w-100"
                          type="text"
                          v-model="day.category"
                          :prop="'category-select-' + index"
                        >
                          <el-option
                            v-for="item in schCategories"
                            :value="item"
                            :label="item"
                            :key="item"
                          />
                        </el-select>
                      </InputWrapper>
                      <InputWrapper
                        class="col-3"
                        label="Restriction"
                        :prop="'restriction-' + index"
                      >
                        <el-select
                          class="w-100"
                          type="text"
                          v-model="day.restriction"
                          :prop="'restriction-select-' + index"
                        >
                          <el-option
                            v-for="item in restrictionsTypes"
                            :value="item"
                            :label="item"
                            :key="item"
                          />
                        </el-select>
                      </InputWrapper>
                    </div>
                    <div class="time-slots-delete">
                      <a
                        @click="handleDeleteTimeslot(index)"
                        class="btn btn-sm btn-icon btn-light"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                        <span class="svg-icon svg-icon-2">
                          <inline-svg
                            src="media/icons/duotune/general/gen034.svg"
                          />
                        </span>
                        <!--end::Svg Icon-->
                      </a>
                    </div>
                  </div>
                  <el-divider class="time-slots-divider" />
                </div>
                <div
                  class="border border-dashed border-primary m-3 time-slots-add-box d-flex flex-row"
                  @click="handleAddTimeslot()"
                >
                  ADD TIMESLOT
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="button"
              data-bs-dismiss="modal"
              id="kt_modal_edit_schedule_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Update
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
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
  </div>
</template>
<style lang="scss">
.time-slots-divider {
  margin-top: 0px !important;
}
.time-slots-box {
  margin-left: 0px !important;
  margin-right: 0px !important;
  .time-slots-view {
    & > div {
      padding-right: 0.5rem !important;
      padding-left: 0.5rem !important;
    }
    & > div.gap {
      align-items: center;
      display: flex;
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
  }
  .time-slots-delete {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
}
.time-slots-add-box {
  justify-content: center;
  cursor: pointer;
  padding: 1.5rem;
}
</style>
<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import employeeTypes from "@/core/data/employee-schedule-types";
import employeeRoles from "@/core/data/employee-roles";
import { HRMActions } from "@/store/enums/StoreHRMEnums";
import weekdays from "@/core/data/weekdays";
import restrictionsTypes from "@/core/data/apt-restriction";
import schCategories from "@/core/data/schedule-category";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "edit-admin-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const editScheduleModalRef = ref(null);
    const loading = ref(false);
    const deleteTimeslots = ref([]);
    const formData = ref({
      id: -1,
      clinic_id: -1,
      role_id: null,
      type: "PERMANENT",
      user_id: null,
      timeslots: [],
      deleteTimeslots: [],
      organization_id: null,
      is_template: 1,
    });
    const rules = ref({
      role_id: [
        {
          required: true,
          message: "Role cannot be blank",
          trigger: "change",
        },
      ],
    });

    const employeeList = computed(() => store.getters.employeeList);
    const schedule = computed(() => store.getters.hrmScheduleSelected);
    const timeslots = computed(() => store.getters.hrmTimeslotSelected);

    watch([schedule, timeslots], () => {
      formData.value.id = schedule.value.id;
      formData.value.clinic_id = schedule.value.clinic_id;
      formData.value.role_id = schedule.value.role_id;
      formData.value.user_id = schedule.value.id;
      formData.value.organization_id = schedule.value.organization_id;
      formData.value.timeslots = timeslots.value;
    });

    const handleAddTimeslot = () => {
      formData.value.timeslots.push({
        start_time: null,
        end_time: null,
        category: null,
        restriction: null,
        hrm_weekly_schedule_template_id: schedule.value.id,
        week_day: schedule.value._day,
      });
    };

    const handleDeleteTimeslot = (index) => {
      deleteTimeslots.value.push(formData.value.timeslots[index].id);
      formData.value.timeslots = formData.value.timeslots.filter(
        (t, i) => i != index
      );
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      //validate overlap time range
      let overlap = formData.value.timeslots.filter((t, i) => {
        let res = formData.value.timeslots.filter((tt, ii) => {
          t.start_time += t.start_time.split(":").length < 3 ? ":00" : "";
          t.end_time += t.end_time.split(":").length < 3 ? ":00" : "";
          tt.start_time += tt.start_time.split(":").length < 3 ? ":00" : "";
          tt.end_time += tt.end_time.split(":").length < 3 ? ":00" : "";
          return (
            i != ii &&
            ((tt.start_time > t.start_time && tt.start_time < t.end_time) ||
              (t.start_time > tt.start_time && t.start_time < tt.end_time) ||
              (tt.end_time > t.start_time && tt.end_time < t.end_time) ||
              (t.end_time > tt.start_time && t.end_time < tt.end_time))
          );
        });
        if (res?.length) return true;
        return false;
      });
      if (overlap?.length) {
        ElMessage.error("There is the over lap slots!");
        return;
      }
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          let _timeslots = [];
          formData.value.timeslots.map((t) => {
            if (
              t.category != null &&
              t.restriction != null &&
              t.start_time != null &&
              t.end_time != null
            ) {
              if (t.user_id == null) {
                t.organization_id = formData.value.organization_id;
                t.clinic_id = formData.value.clinic_id;
                t.user_id = formData.value.user_id;
                t.is_template = 1;
              }
              _timeslots.push(t);
            }
          });
          schedule.value.schedule_timeslots.map((t) => {
            if (t.week_day != schedule.value._day) {
              _timeslots.push(t);
            }
          });

          // Add deleted timeslots to payload
          if (deleteTimeslots.value.length > 0) {
            formData.value.deleteTimeslots = [];
            deleteTimeslots.value.map((slotId) => {
              formData.value.deleteTimeslots.push(slotId);
            });
          }
          hideModal(editScheduleModalRef.value);
          formData.value.timeslots = _timeslots;
          store
            .dispatch(schedule.value._submit, formData.value)
            .then(() => {
              loading.value = false;
              store.dispatch(HRMActions.SCHEDULE_TEMPLATE.LIST, {
                clinic_id: formData.value.clinic_id,
              });
              Swal.fire({
                text: "Successfully Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                //
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

    onMounted(() => {
      store.dispatch(Actions.EMPLOYEE.LIST);
    });

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      editScheduleModalRef,
      employeeList,
      employeeTypes,
      employeeRoles,
      schedule,
      restrictionsTypes,
      schCategories,
      handleAddTimeslot,
      handleDeleteTimeslot,
    };
  },
});
</script>
