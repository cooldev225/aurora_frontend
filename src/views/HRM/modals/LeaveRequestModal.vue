<template>
  <div
    class="modal fade"
    id="leave-request-modal"
    tabindex="-1"
    aria-hidden="true"
    ref="leaveRequestModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_edit_schedule_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder" v-if="formData.id">Edit Leave Request</h2>
          <h2 class="fw-bolder" v-else>New Leave Request</h2>
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
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="160px"
          class="leave-form"
          status-icon
        >
          <el-form-item
            label="Type of Request"
            prop="leaveType"
            class="span-leave-type"
          >
            <el-select
              v-model="formData.leaveType"
              placeholder="Pick a leave type"
            >
              <el-option
                v-for="type in leaveTypes"
                :key="type.id"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input v-model="formData.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Pick a date form" prop="date">
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              :disabled-date="disabledDate"
            />
          </el-form-item>
          <el-form-item label="Full Day" required>
            <el-switch
              v-model="formData.isFullDay"
              :disabled="!showTimePicker"
            />
          </el-form-item>
          <div class="time-range">
            <el-form-item
              label="time"
              required
              v-if="showTimePicker && !formData.isFullDay"
            >
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <el-time-select
                    v-model="formData.startTime"
                    :max-time="formData.endTime"
                    class="mr-4"
                    placeholder="Start time"
                    start="08:30"
                    step="00:15"
                    end="18:30"
                    :editable="false"
                  />
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="2">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-time-select
                    v-model="formData.endTime"
                    :min-time="formData.startTime"
                    placeholder="End time"
                    start="08:30"
                    step="00:15"
                    end="18:30"
                    prop="endTime"
                    :editable="false"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{
              formData.id ? "Update" : "Request"
            }}</el-button>
            <el-button data-bs-dismiss="modal" @click="resetForm"
              >Cancel</el-button
            >
            <el-button type="danger" @click="deleteRequest" v-if="formData.id"
              >delete</el-button
            >
          </el-form-item>
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
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import employeeTypes from "@/core/data/employee-schedule-types";
import employeeRoles from "@/core/data/employee-roles";
import restrictionsTypes from "@/core/data/apt-restriction";
import schCategories from "@/core/data/schedule-category";
import { ElMessage } from "element-plus";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";

export default defineComponent({
  name: "leave-request-modal",
  emits: ["sendRequest"],
  props: [],
  setup(props, { emit }) {
    const store = useStore();
    const formData = computed(() => store.getters.hrmDataSelected);
    const formRef = ref(null);
    const loading = ref(false);
    const leaveRequestModalRef = ref(null);
    const leaveTypes = ref([
      {
        value: "Annual Leave",
        label: "Annual Leave",
        id: 0,
      },
      {
        value: "Sick Leave",
        label: "Sick Leave",
        id: 1,
      },
      {
        value: "Parental Leave",
        label: "Parental Leave",
        id: 2,
      },
      {
        value: "Personal Leave",
        label: "Personal Leave",
        id: 3,
      },
    ]);
    const rules = ref({
      leaveType: [
        {
          required: true,
          message: "Please select leave type",
          trigger: "change",
        },
      ],
      date: [
        {
          type: "array",
          required: true,
          message: "Please pick a date",
          trigger: "change",
        },
      ],
      startTime: [
        {
          type: "string",
          required: true,
          message: "Please pick a time",
          trigger: "change",
        },
      ],
      endTime: [
        {
          type: "string",
          required: true,
          message: "Please pick a time",
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Please input a description",
          trigger: "blur",
        },
      ],
    });

    const submitForm = async () => {
      if (!formRef.value) return;
      await formRef.value.validate((valid, fields) => {
        if (valid) {
          emit("sendRequest", formData.value);
          hideModal(leaveRequestModalRef.value);
        } else {
          ElMessage({
            message: "Check required fields! ",
            grouping: true,
            type: "error",
          });
        }
      });
    };

    const resetForm = () => {
      hideModal(leaveRequestModalRef.value);
      if (!formRef.value) return;
      formRef.value.resetFields();
    };

    const showTimePicker = computed(() => {
      if (
        formData.value.date &&
        formData.value.date[0] &&
        formData.value.date[1]
      ) {
        if (
          formData.value.date[0].toString() ===
          formData.value.date[1].toString()
        ) {
          return true;
        }
      }
      return false;
    });

    const deleteRequest = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          emit("deleteRequest", formData.value.id);
          hideModal(leaveRequestModalRef.value);
        }
      });
    };

    const disabledDate = (date) => {
      return date < new Date();
    };

    return {
      rules,
      submitForm,
      formRef,
      loading,
      employeeTypes,
      employeeRoles,
      restrictionsTypes,
      schCategories,
      leaveTypes,
      resetForm,
      formData,
      showTimePicker,
      deleteRequest,
      leaveRequestModalRef,
      disabledDate,
    };
  },
});
</script>
<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.leave-form {
  padding: 10px;

  label {
    width: 160px !important;
  }
}
</style>
