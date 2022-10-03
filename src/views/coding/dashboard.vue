<template>
  <div class="card w-75 mx-auto">
    <h1 class="m-auto p-6">CODING</h1>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import { useStore } from "vuex";
export default defineComponent({
  name: "coding-dashboard",
  setup() {
    const store = useStore();
    onMounted(() => {
      setCurrentPageBreadcrumbs("Coding");
      store
        .dispatch(CodingActions.SEARCH_DIAGNOSES, "cov")
        .then((response) => {
          console.log(response.data[3]);
        })
        .catch((response) => {
          console.log(response);
        });
    });
  },
});
</script>
