<template>
  <div class="card pb-9">
    <div class="card-body pt-9 pb-0">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="row">
          <InputWrapper class="col-6" required label="From Date">
            <el-form-item prop="date">
              <el-date-picker
                class="w-100"
                v-model="formData.date"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="From date"
                end-placeholder="To date"
                :shortcuts="shortcuts"
                format="DD/MM/YYYY"
              />
            </el-form-item>
          </InputWrapper>
          <InputWrapper class="col-6" required label="Report Type">
            <el-form-item prop="type">
              <el-select
                class="w-100"
                placeholder="Select Time frame"
                v-model="formData.type"
              >
                <el-option
                  v-for="item in codingReportTypes"
                  :value="item"
                  :label="item"
                  :key="item"
                />
              </el-select>
            </el-form-item>
          </InputWrapper>
        </div>
        <div class="d-flex ms-auto justify-content-end w-50">
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-lg btn-primary"
            type="submit"
          >
            <span v-if="!loading" class="indicator-label">
              Generate Report
            </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              />
            </span>
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import { codingReportTypes } from "@/core/data/coding-report-types";
import moment from "moment";

export default defineComponent({
  name: "coding-reports",
  setup() {
    const store = useStore();
    const loading = ref(false);
    const formRef = ref(null);
    const formData = ref({
      date: [moment().add(-1, "weeks"), moment()],
      type: null,
    });

    const rules = ref({
      date: [
        {
          required: true,
          message: "Date cannot be blank",
          trigger: "change",
        },
      ],
      type: [
        {
          required: true,
          message: "Type cannot be blank",
          trigger: "change",
        },
      ],
    });

    const shortcuts = [
      {
        text: "Last week",
        value: () => {
          const end = moment();
          const start = moment().add(-1, "weeks");
          return [start, end];
        },
      },
      {
        text: "Last month",
        value: () => {
          const end = moment();
          const start = moment().add(-1, "months");
          return [start, end];
        },
      },
      {
        text: "Last 3 months",
        value: () => {
          const end = moment();
          const start = moment().add(-3, "months");
          return [start, end];
        },
      },
    ];

    onMounted(() => {
      setCurrentPageBreadcrumbs("Coding Reports", ["Coding"]);
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          store
            .dispatch(CodingActions.CHECK_APPOINTMENTS_COMPLETE, {
              from_date: formData.value.date[0],
              to_date: formData.value.date[1],
              type: formData.value.type,
            })
            .then((data) => {
              loading.value = false;
              if (data) {
                //
              } else {
                alert("uncompleted");
              }
            });
          formRef.value.resetFields();
        }
      });
    };

    return {
      loading,
      formRef,
      formData,
      rules,
      codingReportTypes,
      submit,
      shortcuts,
    };
  },
});
</script>
