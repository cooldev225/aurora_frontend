<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="patient_view_appointments_current">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Create Report</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->
    <!--begin::Card body-->
    <div class="card-body">
      <el-form>
        <div class="report-template-wrapper">
          <!--begin::Input group-->
          <div class="fv-row col-12 mb-5">
            <h2
              style="
                font-weight: 600;
                color: #373fa2;
                font-size: 25px;
                margin-bottom: 4px;
              "
            >
              {{ templateData.title }}
            </h2>
            <p>
              DATE:
              {{
                moment(templateData.created_at).format("YYYY-MM-DD").toString()
              }}
            </p>
          </div>
          <!--end::Input group-->

          <div
            v-show="templateData.sections.length > 0"
            v-for="section in templateData.sections"
            :key="section.id"
          >
            <h5>{{ section.title }}</h5>
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
                />
              </div>
            </div>
            <el-form-item>
              <el-input
                class="col-9"
                type="textarea"
                rows="3"
                placeholder="Write Free Text Default"
                v-model="section.free_text_default"
              />
            </el-form-item>
          </div>
        </div>
        <div class="d-flex ms-auto justify-content-end w-25">
          <button type="submit" class="btn btn-primary w-25">Create</button>
          <button type="reset" class="btn btn-light-primary w-25 ms-2">
            Cancel
          </button>
        </div>
      </el-form>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import moment from "moment";

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
      moment,
    };
  },
});
</script>
