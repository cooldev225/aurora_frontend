<template>
  <div class="card w-100 h-100">
    <div class="card-header border-0 p-5">
      <div
        class="m-auto border border-success border-3 d-flex align-items-center justify-content-center w-250px h-250px"
      >
        <img
          v-if="orgLogo"
          :src="{ orgLogo }"
          alt="organization logo"
          class="w-100 h-100"
        />
        <h1 v-else>Organization</h1>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="w-50 m-auto text-center">
        Thank you for providing you details. <br />
        If you have any further questions please contact [CLINIC NAME] on
        [CLINIC NUMBER] on email us at [CLINIC EMAIL]
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// import { useRouter } from "vue-router";

export default defineComponent({
  name: "pre-admission-form3",

  components: {},

  setup() {
    // const router = useRouter();
    const loading = ref(true);

    onMounted(() => {
      loading.value = true;
    });

    return {};
  },
});
</script>
