<template>
  <div class="card w-100 h-100">
    <div class="card-header border-0 p-5">
      <img
        src=""
        alt="organization logo"
        class="m-auto border border-success border-3"
        width="250"
        height="250"
      />
    </div>
    <div class="card-body pt-0">
      <el-form
        class="w-50 m-auto"
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="date_of_birth">
          <label>Date of Birth</label>
          <el-date-picker
            class="w-100"
            v-model="formData.date_of_birth"
            format="YYYY-MM-DD"
            placeholder="1990-01-01"
          />
        </el-form-item>
        <el-form-item prop="last_name">
          <label>Last Name</label>
          <el-input
            type="text"
            v-model="formData.last_name"
            placeholder="Last Name"
          />
        </el-form-item>
        <div class="d-flex ms-auto justify-content-end">
          <button type="submit" class="btn btn-primary w-min-250px">
            Confirm
          </button>
          <button type="reset" class="btn btn-light-primary w-min-250px ms-2">
            Cancel
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "pre-admission-form1",

  components: {},

  setup() {
    // const store = useStore();
    const router = useRouter();
    const loading = ref(true);
    const formRef = ref<null | HTMLFormElement>(null);
    const formData = ref({
      date_of_birth: "",
      last_name: "",
    });
    const rules = ref({
      date_of_birth: [
        {
          required: true,
          message: "Date of Birth cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        console.log("123");
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          router.push({ name: "pre-admission-form2" });
        } else {
          console.log("validation failed");
        }
      });
    };

    onMounted(() => {
      loading.value = true;
    });

    return {
      formRef,
      formData,
      rules,
      submit,
    };
  },
});
</script>
