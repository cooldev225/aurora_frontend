<template>
  <span class="h-30px border-gray-200 border-start mx-2"></span>
  <IconTooltip v-if="aptTypeList" icon="gear">
    <div class="d-flex flex-column">
      <span
        v-for="item in aptTypeList"
        :value="item.id"
        :label="item.name"
        :key="item.id"
        class="badge mt-1"
        :style="{ 'background-color': item.color }"
        >{{ item.name }}</span
      >
    </div>
  </IconTooltip>
  <span class="h-30px border-gray-200 border-start mx-2"></span>
  <IconTooltip :xOffset="-30" icon="plus">
    <div><i :class="'fa fa-plus text-primary'"></i> Consultations Only</div>
    <div><i :class="'fa fa-plus text-danger'"></i> Procedures Only</div>
    <div><i :class="'fa fa-plus text-success'"></i> No Restrictions</div>
  </IconTooltip>

  <span class="h-30px border-gray-200 border-start mx-2"></span>
</template>
<script lang="ts">
import { computed } from "vue";
import store from "@/store";
import IconTooltip from "@/components/presets/GeneralElements/IconTooltip.vue";
export default {
  components: {
    IconTooltip,
  },
  props: {
    appointment: { required: true, type: Object },
  },
  setup() {
    const aptTypeList = computed(() => store.getters.getAptTypesList);

    return {
      aptTypeList,
    };
  },
};
</script>
