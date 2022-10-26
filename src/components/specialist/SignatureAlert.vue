<template>
  <div class="card mb-2">
    <div class="card-body text-warning">
      WARNING: You don't have a signature set. Any correspondence sent will not
      have a signature attached
      <el-button text type="">Click here to set</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect } from "vue";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "signature-alert",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const userData = computed(() => store.getters.currentUser);

    return {
      userData,
    };
  },
});
</script>
