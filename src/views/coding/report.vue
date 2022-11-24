<template>
  <div class="card pb-9">
    <ProfileNavigation />
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="row">
          <InputWrapper
            class="col-6"
            required
            prop="from_date"
            label="From Date"
          >
            <el-form-item>
              <el-date-picker
                class="w-100"
                v-model="formData.from_date"
                format="DD/MM/YYYY"
                placeholder="01/01/1990"
              />
            </el-form-item>
          </InputWrapper>
          <InputWrapper class="col-6" required prop="to_date" label="From Date">
            <el-form-item>
              <el-date-picker
                class="w-100"
                v-model="formData.to_date"
                format="DD/MM/YYYY"
                placeholder="01/01/1990"
              />
            </el-form-item>
          </InputWrapper>
          <InputWrapper class="col-6" required prop="type" label="Report Type">
            <el-form-item>
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
          <button type="submit" class="btn btn-primary w-100 w-sm-25">
            Save
          </button>
          <!--begin::Button-->
          <router-link
            type="reset"
            to="/booking/dashboard"
            class="btn btn-light-primary w-100 w-sm-25 ms-2"
          >
            Cancel
          </router-link>
          <!--end::Button-->
        </div>
      </el-form>
      <!--end::Details-->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import { codingReportTypes } from "@/core/data/coding-report-types";

export default defineComponent({
  name: "coding-reports",
  setup() {
    const store = useStore();
    const loading = ref(true);
    const formRef = ref(null);
    const formData = ref({
      from_date: null,
      to_date: null,
      type: null,
    });

    const rules = ref({
      from_date: [
        {
          required: true,
          message: "From date cannot be blank",
          trigger: "change",
        },
      ],
      to_date: [
        {
          required: true,
          message: "To date cannot be blank",
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

    onMounted(() => {
      setCurrentPageBreadcrumbs("Coding Reports");
    });

    return {
      loading,
      formData,
      rules,
      codingReportTypes,
    };
  },
});
</script>
