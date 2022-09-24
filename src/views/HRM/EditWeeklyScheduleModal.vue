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
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
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
                <InputWrapper class="col-12" label="Role" prop="role" required>
                  <el-select v-model="formData.role_id" class="w-100">
                    <el-option
                      v-for="item in employeeRoles"
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
              <el-divider v-if="schedule._action == 'add_schedule'" />
              <div v-for="(day, index) in formData.timeslots" :key="index">
                <div
                  class="border border-dashed border-primary pt-3 m-3"
                  v-if="
                    schedule._action == 'edit_weekly_time' &&
                    schedule._day == day.value
                  "
                >
                  <div class="card d-flex flex-row">
                    <InputWrapper
                      class="col-3"
                      :label="day.label"
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
                    <InputWrapper
                      class="col-6"
                      label="Time Slot"
                      :prop="'timeslot-' + index"
                    >
                      <div class="d-flex">
                        <el-time-select
                          class="w-50 pe-2"
                          placeholder="Start time"
                          start="07:00"
                          step="00:15"
                          end="18:30"
                          format="HH:mm"
                          v-model="day.start_time"
                          :prop="'starttime-' + index"
                        />
                        <el-time-select
                          class="w-50 ps-2"
                          placeholder="End time"
                          start="07:00"
                          step="00:15"
                          end="18:30"
                          format="HH:mm"
                          v-model="day.end_time"
                          :prop="'endtime-' + index"
                        />
                      </div>
                    </InputWrapper>
                  </div>
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

<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Actions } from "@/store/enums/StoreEnums";
import employeeTypes from "@/core/data/employee-types";
import employeeRoles from "@/core/data/employee-roles";
import { HRMActions } from "@/store/enums/StoreHRMEnums";
import weekdays from "@/core/data/weekdays";
import restrictionsTypes from "@/core/data/apt-restriction";
import schCategories from "@/core/data/schedule-category";

export default defineComponent({
  name: "edit-admin-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const editScheduleModalRef = ref(null);
    const employeeList = computed(() => store.getters.employeeList);
    const schedule = computed(() => store.getters.hrmScheduleSelected);
    const loading = ref(false);
    const formData = ref({
      clinic_id: -1,
      role_id: -1,
      user_id: null,
      timeslots: weekdays,
    });

    watch(schedule, () => {
      formData.value.id = schedule.value.id;
      formData.value.clinic_id = schedule.value.clinic_id;
      formData.value.role_id = schedule.value.role_id;
      formData.value.user_id = schedule.value.user_id;
      formData.value.timeslots = weekdays;
      formData.value.timeslots.map((d, i) => {
        let f = schedule.value.timeslots.filter((t) => t.week_day == d.value);
        if (f.length) {
          f[0].value = formData.value.timeslots[i].value;
          f[0].label = formData.value.timeslots[i].label;
          formData.value.timeslots[i] = f[0];
        }
      });
      console.log(["formData.value after watch=", formData.value]);
    });

    const rules = ref({
      first_name: [
        {
          required: true,
          message: "First Name cannot be blank",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          let timeslots = [];
          for (var i = 0; i < formData.value.timeslots.length; i++) {
            if (
              formData.value.timeslots[i].category == null ||
              formData.value.timeslots[i].restriction == null ||
              formData.value.timeslots[i].start_time == null ||
              formData.value.timeslots[i].end_time == null
            ) {
              if (
                schedule.value._action == "edit_weekly_time" &&
                formData.value.timeslots[i].value == schedule.value._day
              ) {
                //message alert
                loading.value = false;
                return;
              }
            } else {
              let timeslot = {
                week_day: formData.value.timeslots[i].value,
                category: formData.value.timeslots[i].category,
                restriction: formData.value.timeslots[i].restriction,
                start_time: formData.value.timeslots[i].start_time,
                end_time: formData.value.timeslots[i].end_time,
              };
              if (formData.value.timeslots[i].id) {
                timeslot.id = formData.value.timeslots[i].id;
                timeslot.hrm_weekly_schedule_template_id =
                  formData.value.timeslots[i].hrm_weekly_schedule_template_id;
              }
              timeslots.push(timeslot);
            }
          }
          formData.value.timeslots = timeslots;
          console.log(["formData.value before submit=", formData.value]);
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
                hideModal(editScheduleModalRef.value);
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
    };
  },
});
</script>
