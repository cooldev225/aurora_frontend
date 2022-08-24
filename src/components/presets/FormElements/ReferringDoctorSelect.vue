<template>
  <el-autocomplete
    class="w-100"
    :fetch-suggestions="searchReferringDoctor"
    placeholder="Please input"
    :trigger-on-focus="true"
    @select="onSelect"
  >
    <template #default="{ item }">
      <div class="name">
        {{ item.title }}
        {{ item.first_name }} {{ item.last_name }}
      </div>
      <div class="address">{{ item.address }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    onSelect: { required: true },
  },
  setup() {
    const store = useStore();
    const referringDoctors = computed(
      () => store.getters.getReferralDoctorList
    );

    let timeout;
    const searchReferringDoctor = (term, cb) => {
      console.log(term);
      const results = term
        ? referringDoctors.value.filter(createFilter(term))
        : referringDoctors.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    };

    const createFilter = (term) => {
      const keyword = term.toString();
      return (referralDoctor) => {
        const full_name =
          referralDoctor.title +
          " " +
          referralDoctor.first_name +
          " " +
          referralDoctor.last_name;
        const full_name_pos = full_name
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        const address_pos = referralDoctor.address
          .toLowerCase()
          .indexOf(keyword.toLowerCase());
        return full_name_pos !== -1 || address_pos !== -1;
      };
    };
    return { searchReferringDoctor };
  },
});
</script>
