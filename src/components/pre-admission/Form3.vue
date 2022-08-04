<template>
  <div class="card w-100 h-100">
    <div class="card-header border-0 p-5">
      <div
        class="m-auto border border-success border-3 d-flex align-items-center justify-content-center w-250px h-250px"
      >
        <img
          :src="orgData.organization_logo"
          alt="organization logo"
          class="w-100 h-100"
        />
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
import { defineComponent, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "pre-admission-form3",

  components: {},

  setup() {
    const router = useRouter();
    const store = useStore();
    const orgData = computed(() => store.getters.getAptPreAdmissionOrg);
    const apt_id = ref("");

    onMounted(() => {
      apt_id.value = router.currentRoute.value.params.id.toString();
      store.dispatch(Actions.APT.PRE_ADMISSION.ORG, apt_id.value);
    });

    return {
      orgData,
    };
  },
});
</script>
