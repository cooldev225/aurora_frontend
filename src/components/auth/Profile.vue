<template>
  <!--begin::Navbar-->
  <div class="card h-100">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="first_name">
          <el-input
            type="text"
            class="w-50"
            v-model="formData.first_name"
            placeholder="First Name"
          />
        </el-form-item>
      </el-form>
      <!--end::Details-->
    </div>
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "profile-page-layout",
  components: {},
});
</script>
