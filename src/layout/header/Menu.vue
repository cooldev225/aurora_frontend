<template>
  <!--begin::Menu wrapper-->
  <div
    class="header-menu align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
    data-kt-swapper="true"
    data-kt-swapper-mode="prepend"
    data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_menu_nav'}"
  >
    <!--begin::Menu-->
    <div
      class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
      id="#kt_header_menu"
      data-kt-menu="true"
    >
      <template v-for="(item, i) in MainMenuConfig" :key="i">
        <template v-if="!item.pages">
          <div v-if="item.heading" class="menu-item me-lg-1">
            <router-link
              class="menu-link"
              :to="item.route"
              active-class="active"
            >
              <span class="menu-title">{{ translate(item.heading) }}</span>
            </router-link>
          </div>
        </template>
        <template v-if="item.pages">
          <div
            v-if="item.heading"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-start"
            class="menu-item menu-lg-down-accordion me-lg-1"
          >
            <span
              class="menu-link py-3"
              :class="{ active: hasActiveChildren(item.route) }"
            >
              <span class="menu-title">{{ translate(item.heading) }}</span>
              <span class="menu-arrow d-lg-none"></span>
            </span>
            <div
              class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px"
            >
              <template v-for="(menuItem, j) in item.pages" :key="j">
                <div v-if="menuItem.heading" class="menu-item">
                  <router-link
                    class="menu-link"
                    active-class="active"
                    :to="menuItem.route"
                  >
                    <span class="menu-icon">
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/layouts/lay009.svg"
                        />
                      </span>
                    </span>
                    <span class="menu-title">{{
                      translate(menuItem.heading)
                    }}</span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
      <!--end::Menu-->
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore, mapState } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n/index";
import MenuConfig from "@/core/config/MainMenuConfig";
import { headerMenuIcons } from "@/core/helpers/config";
import { version } from "@/core/helpers/documentation";

export default defineComponent({
  name: "KTMenu",
  components: {},

  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const store = useStore();
    // const MainMenuConfig = ref(MenuConfig["organizationManager"]);
    const MainMenuConfig = ref();

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    onMounted(() => {
      MainMenuConfig.value = MenuConfig[store.getters.userRole];
    });

    watchEffect(() => {
      MainMenuConfig.value = MenuConfig[store.getters.userRole];
    });

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      translate,
      version,
    };
  },
});
</script>
