<template>
  <div>hello</div>
</template>

<style lang="scss">
.report-template-wrapper {
  .fill-out {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
  .title-input-wrapper {
    input {
      height: 50px;
      font-weight: bold;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  watchEffect,
  ref,
  onMounted,
  computed,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { StoreReportActions } from "@/store/enums/StoreReportEnums";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import { DocumentMutations } from "@/store/enums/StoreDocumentEnums";
import InfoSection from "@/components/presets/GeneralElements/InfoSection.vue";
import InputWrapper from "../../components/presets/FormElements/InputWrapper.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { IScheduleItem } from "@/store/modules/ScheduleItemModule";
import { Modal } from "bootstrap";
import ReportPreviewModal from "@/views/patients/modals/ReportPreviewModal.vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
