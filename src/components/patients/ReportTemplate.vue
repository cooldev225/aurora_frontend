<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Report Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body">
      <div class="report-template-wrapper">
        <el-form>
          <!--begin::Input group-->
          <div class="fv-row col-12 mb-5">
            <!--begin::Input-->
            <el-form-item prop="title">
              <el-input
                class="w-100"
                type="text"
                placeholder="Report Template Title"
                v-model="templateData.title"
                disabled
              />
            </el-form-item>
            <!--end::Input-->
          </div>
          <!--end::Input group-->

          <div
            v-for="section in templateData.sections"
            :key="section.id"
            class="border border-5 border-muted mb-10 p-10"
          >
            <el-form-item :prop="'section' + section.id">
              <el-input
                class="w-100"
                type="text"
                placeholder="Section Title"
                v-model="section.title"
                disabled
              />
            </el-form-item>

            <el-divider />

            <el-form-item>
              <el-input
                type="textarea"
                placeholder="Write Free Text Default"
                v-model="section.free_text_default"
                disabled
              />
            </el-form-item>

            <h3 class="mb-4" style="font-size: 1.5rem">Auto Texts</h3>

            <div
              class="report-template-auto-text-wrapper text-nowrap mb-5"
              v-for="autoText in section.auto_texts"
              :key="autoText.id"
            >
              <div class="d-flex flex-row col-9">
                <el-input
                  v-model="autoText.text"
                  class="flex-grow-1"
                  type="text"
                  placeholder="Enter Auto Text"
                  disabled
                />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";

export default defineComponent({
  name: "patient-report",
  components: {},
  setup() {
    const store = useStore();
    const list = computed(() => store.getters.getReportTemplateSelected);
    const templateData = ref();

    watchEffect(() => {
      templateData.value = list.value;
      console.log(templateData.value);
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("Report", ["Patients"]);
    });

    return {
      templateData,
    };
  },
});
</script>
