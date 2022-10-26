<template>
  <div class="card mb-2">
    <div class="card-body text-warning d-flex flex-row align-items-center">
      WARNING: You don't have a signature set. Any correspondence sent will not
      have a signature attached
      <router-link
        class="nav-link text-active-primary me-6"
        to="/profile/signature"
        active-class="active"
      >
        <el-button class="mx-2" link type="" size="small"
          >Click here to set</el-button
        >
      </router-link>
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
