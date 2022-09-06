<template>
  <ModalWrapper
    title="Select Report Template"
    modalId="report"
    modalRef="reportModal"
  >
    <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
      <InputWrapper label="Report Template">
        <el-select
          class="w-100"
          v-model="reportTemplate"
          placeholder="Select Report Template"
        >
          <el-option
            v-for="(option, idx) in reportTemplatesData"
            :key="option.id"
            :value="idx"
            :label="option.title"
          />
        </el-select>
      </InputWrapper>

      <button
        :data-kt-indicator="loading ? 'on' : null"
        class="btn btn-lg btn-primary m-6"
        type="submit"
      >
        <span v-if="!loading" class="indicator-label"> Select </span>
        <span v-if="loading" class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>
    </el-form>
  </ModalWrapper>
</template>

<script>
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Mutations } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "report-modal",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const list = computed(() => store.getters.getReportTemplateList);
    const loading = ref(false);
    const reportTemplate = ref();
    const reportTemplatesData = ref([]);
    const reportModal = ref(null);

    watchEffect(() => {
      reportTemplatesData.value = list.value;
    });

    const submit = () => {
      store.commit(
        Mutations.SET_REPORT_TEMPLATES.SELECT,
        reportTemplatesData.value[reportTemplate.value]
      );

      hideModal(reportModal.value);
      router.push({ name: "patients-report" });
    };

    return {
      loading,
      reportModal,
      reportTemplate,
      reportTemplatesData,
      submit,
    };
  },
});
</script>
