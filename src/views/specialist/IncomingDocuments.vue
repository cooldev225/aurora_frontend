<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>SPECIALSIT DOCS</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "admin-main",

  components: {},

  setup() {
    const store = useStore();
    const documents = computed(() => store.getters.specialistMessagesList);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Incoming Documents", []);
      store.dispatch(Actions.SPECIALIST_MESSAGES.LIST);
    });
  },
});
</script>
