<template>
  <SignatureAlert v-if="isNoSignature"></SignatureAlert>
  <CardSection>
    <DocumentList />
  </CardSection>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { DocumentActions } from "@/store/enums/StoreDocumentEnums";
import DocumentList from "@/views/specialist/DocumentList.vue";
import SignatureAlert from "@/components/specialist/SignatureAlert.vue";

export default defineComponent({
  name: "specialist-incoming-documents",
  components: { DocumentList, SignatureAlert },

  setup() {
    const store = useStore();
    const userProfile = computed(() => store.getters.userProfile);
    const currentUser = computed(() => store.getters.currentUser);
    const isNoSignature = ref(false);
    // Set the document list to those of the currently logged in specialist
    watch(userProfile, () => {
      setCurrentPageBreadcrumbs("Incoming Documents", []);
      store.dispatch(DocumentActions.LIST, {
        specialist_id: userProfile.value.id,
      });
    });

    watch(currentUser, () => {
      if (currentUser.value) {
        const role_id = currentUser.value.profile.role_id;
        const signature = currentUser.value.profile.signature;
        if (role_id === 5 && !signature) isNoSignature.value = true;
        else isNoSignature.value = false;
      }
    });

    return {
      isNoSignature,
    };
  },
});
</script>
