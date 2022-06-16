<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Form-->
      <div
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-start"
        class="menu-item menu-lg-down-accordion me-lg-1"
      >
        <span class="menu-link py-3">
          <span class="menu-title">sss</span>
          <span class="menu-arrow d-lg-none"></span>
        </span>
      </div>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->

  <!--begin::Modals-->
  <NewCardModal></NewCardModal>
  <CreateAccountModal></CreateAccountModal>
  <!--end::Modals-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "add-organizatinos",
  components: {},
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Add Organization", ["Organizations"]);
    });

    return {};
  },
});
</script>
