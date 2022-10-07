<template>
  <section>
    <template v-for="(bulletin, index) in bulletins" :key="index">
      <CardSection>
        <label class="fs-6 fw-bold mb-2 px-6" style="color: grey">
          {{ bulletin.title }}
        </label>
      </CardSection>
    </template>
  </section>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { HRMActions, HRMMutations } from "@/store/enums/StoreHRMEnums";
import { useStore } from "vuex";

export default defineComponent({
  name: "bulletin-board",
  setup() {
    const store = useStore();
    const loading = ref(true);
    const tableData = ref([]);
    const bulletins = computed(() => store.getters.bulletinList);

    onMounted(() => {
      loading.value = true;
      setCurrentPageBreadcrumbs("HRM", ["Bulletin Board"]);
      store.dispatch(HRMActions.BULLETIN.LIST).then(() => {
        loading.value = false;
      });
    });

    return {
      bulletins,
      tableData,
      loading,
    };
  },
});
</script>
