<template>
  <div class="card-header">
    <div class="d-flex overflow-auto">
      <ul
        class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
      >
        <!--begin::Nav item-->
        <li class="nav-item">
          <router-link
            to="/profile"
            class="nav-link text-active-primary me-6"
            active-class="active"
          >
            Profile
          </router-link>
        </li>
        <!--end::Nav item-->
        <!--begin::Nav item-->
        <li class="nav-item">
          <router-link
            class="nav-link text-active-primary me-6"
            to="/profile/password-change"
            active-class="active"
          >
            Password
          </router-link>
        </li>
        <!--end::Nav item-->
        <!--begin::Nav item-->
        <li class="nav-item">
          <router-link
            class="nav-link text-active-primary me-6"
            to="/profile/signature"
            active-class="active"
          >
            Signature
          </router-link>
        </li>
        <!--end::Nav item-->
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "profile-page-navigation",
  components: {},
});
</script>
