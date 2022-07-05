<template>
  <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Container-->
    <div id="kt_content_container">
      <!--begin::Inbox App - Messages -->
      <div class="d-flex flex-column flex-lg-row">
        <!--begin::Sidebar-->
        <div
          class="flex-column flex-lg-row-auto w-100 w-lg-275px mb-10 mb-lg-0"
        >
          <!--begin::Sticky aside-->
          <div
            class="card card-flush mb-0"
            data-kt-sticky="false"
            data-kt-sticky-name="inbox-aside-sticky"
            data-kt-sticky-offset="{default: false, xl: '0px'}"
            data-kt-sticky-width="{lg: '275px'}"
            data-kt-sticky-left="auto"
            data-kt-sticky-top="150px"
            data-kt-sticky-animation="false"
            data-kt-sticky-zindex="95"
          >
            <!--begin::Aside content-->
            <div class="card-body">
              <!--begin::Button-->
              <a href="#" class="btn btn-primary text-uppercase w-100 mb-10">
                New Message
              </a>
              <!--end::Button-->
              <!--begin::Menu-->
              <div
                class="menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary mb-10"
              >
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Inbox-->
                  <span
                    :class="`menu-link ${
                      emailType.data === 'inbox' ? 'active' : ''
                    }`"
                    @click="switchType('inbox')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <inline-svg
                          src="media/icons/duotune/communication/com010.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bolder">Inbox</span>
                    <span class="badge badge-light-success">3</span>
                  </span>
                  <!--end::Inbox-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Marked-->
                  <span
                    :class="`menu-link ${
                      emailType.data === 'marked' ? 'active' : ''
                    }`"
                    @click="switchType('marked')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/abstract/abs024.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <inline-svg
                          src="media/icons/duotune/abstract/abs024.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bolder">Marked</span>
                  </span>
                  <!--end::Marked-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Sent-->
                  <span
                    :class="`menu-link ${
                      emailType.data === 'sent' ? 'active' : ''
                    }`"
                    @click="switchType('sent')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/general/gen016.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <inline-svg
                          src="media/icons/duotune/general/gen016.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bolder">Sent</span>
                  </span>
                  <!--end::Sent-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item">
                  <!--begin::Trash-->
                  <span
                    :class="`menu-link ${
                      emailType.data === 'trash' ? 'active' : ''
                    }`"
                    @click="switchType('trash')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <inline-svg
                          src="media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bolder">Trash</span>
                  </span>
                  <!--end::Trash-->
                </div>
                <!--end::Menu item-->
              </div>
              <!--end::Menu-->
            </div>
            <!--end::Aside content-->
          </div>
          <!--end::Sticky aside-->
        </div>
        <!--end::Sidebar-->
        <!--begin::Content-->
        <div class="flex-lg-row-fluid ms-lg-7 ms-xl-10">
          <!--begin::Card-->
          <div class="card">
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
              <!--begin::Actions-->
              <div class="d-flex flex-wrap gap-1">
                <!--begin::Checkbox-->
                <div
                  class="form-check form-check-sm form-check-custom form-check-solid me-3"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    data-kt-check="true"
                    data-kt-check-target="#kt_inbox_listing .form-check-input"
                    value="1"
                    v-model="checkAll"
                  />
                </div>
                <!--end::Checkbox-->
                <!--begin::Filter-->
                <div>
                  <a
                    href="#"
                    class="btn btn-sm btn-icon btn-clear btn-active-light-primary"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-start"
                  >
                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->
                    <span class="svg-icon svg-icon-2">
                      <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
                    </span>
                    <!--end::Svg Icon-->
                  </a>
                  <!--begin::Menu-->
                  <div
                    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                    data-kt-menu="true"
                  >
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_all"
                        @click="selectByType('all')"
                        >All</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_none"
                        @click="selectByType('none')"
                        >None</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_read"
                        @click="selectByType('read')"
                        >Read</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_unread"
                        @click="selectByType('unread')"
                        >Unread</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_starred"
                        @click="selectByType('marked')"
                        >Starred</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="show_unstarred"
                        @click="selectByType('unmarked')"
                        >Unstarred</a
                      >
                    </div>
                    <!--end::Menu item-->
                  </div>
                  <!--end::Menu-->
                </div>
                <!--end::Filter-->
                <!--begin::Reload-->
                <a
                  href="#"
                  class="btn btn-sm btn-icon btn-clear btn-active-light-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Reload"
                >
                  <!--begin::Svg Icon | path: icons/duotune/arrows/arr029.svg-->
                  <span class="svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/arrows/arr029.svg" />
                  </span>
                  <!--end::Svg Icon-->
                </a>
                <!--end::Reload-->
                <!--begin::Delete-->
                <a
                  href="#"
                  class="btn btn-sm btn-icon btn-light btn-active-light-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                >
                  <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                  <span class="svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/general/gen027.svg" />
                  </span>
                  <!--end::Svg Icon-->
                </a>
                <!--end::Delete-->
                <!--begin::Mark as read-->
                <a
                  href="#"
                  class="btn btn-sm btn-icon btn-light btn-active-light-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Mark as read"
                >
                  <!--begin::Svg Icon | path: icons/duotune/general/gen028.svg-->
                  <span class="svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/general/gen028.svg" />
                  </span>
                  <!--end::Svg Icon-->
                </a>
                <!--end::Mark as read-->
              </div>
              <!--end::Actions-->
              <!--begin::Pagination-->
              <div class="d-flex align-items-center flex-wrap gap-2">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative">
                  <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                  <span class="svg-icon svg-icon-2 position-absolute ms-4">
                    <inline-svg src="media/icons/duotune/general/gen021.svg" />
                  </span>
                  <!--end::Svg Icon-->
                  <input
                    type="text"
                    data-kt-inbox-listing-filter="search"
                    class="form-control form-control-sm form-control-solid mw-100 min-w-150px min-w-md-200px ps-12"
                    placeholder="Search Inbox"
                    v-model="searchText"
                  />
                </div>
                <!--end::Search-->
                <!--begin::Sort-->
                <span>
                  <a
                    href=""
                    class="btn btn-sm btn-icon btn-light btn-active-light-primary"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Sort"
                  >
                    <!--begin::Svg Icon | path: icons/duotune/general/gen059.svg-->
                    <span class="svg-icon svg-icon-2 m-0">
                      <inline-svg
                        src="media/icons/duotune/general/gen059.svg"
                      />
                    </span>
                    <!--end::Svg Icon-->
                  </a>
                  <!--begin::Menu-->
                  <div
                    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                    data-kt-menu="true"
                  >
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="filter_newest"
                        @click="sortByDate(true)"
                        >Newest</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="filter_oldest"
                        @click="sortByDate(false)"
                        >Oldest</a
                      >
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                      <a
                        class="menu-link px-3"
                        data-kt-inbox-listing-filter="filter_unread"
                        @click="sortByUnread()"
                        >Unread</a
                      >
                    </div>
                    <!--end::Menu item-->
                  </div>
                  <!--end::Menu-->
                </span>
                <!--end::Sort-->
              </div>
              <!--end::Pagination-->
            </div>
            <div class="card-body pt-0">
              <Datatable
                :table-header="tableHeader"
                :table-data="tableData"
                :rows-per-page="10"
                :loading="loading"
                :enable-items-per-page-dropdown="true"
                :disable-table-header="true"
              >
                <template v-slot:cell-checkbox="{ row: item }">
                  <!--begin::Checkbox-->
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      :checked="item.checked"
                      @change="selectMessage(item.id)"
                    />
                  </div>
                  <!--end::Checkbox-->
                </template>
                <template v-slot:cell-actions="{ row: item }">
                  <!--begin::Star-->
                  <a
                    href="#"
                    class="btn btn-icon btn-sm btn-active-color-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Star"
                  >
                    <span
                      :class="`svg-icon svg-icon-2 ${
                        item.marked ? 'svg-icon-warning' : ''
                      }`"
                    >
                      <inline-svg
                        src="media/icons/duotune/general/gen029.svg"
                      />
                    </span>
                  </a>
                  <!--end::Star-->
                </template>
                <template v-slot:cell-name="{ row: item }">
                  <a
                    href="../../demo6/dist/apps/inbox/reply.html"
                    class="d-flex align-items-center text-dark"
                  >
                    <div v-if="item.avatar" class="symbol symbol-35px me-3">
                      <span
                        class="symbol-label"
                        :style="`background-image: url(${item.avatar})`"
                      >
                      </span>
                    </div>
                    <!--begin::Avatar-->
                    <div v-else class="symbol symbol-35px me-3">
                      <div class="symbol-label bg-light-danger">
                        <span class="text-danger">U</span>
                      </div>
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Name-->
                    <span :class="`${item.unread ? 'fw-bolder' : 'fw-normal'}`">
                      {{ item.name }}
                    </span>
                    <!--end::Name-->
                  </a>
                </template>
                <template v-slot:cell-message="{ row: item }">
                  <div class="text-dark mb-1">
                    <!--begin::Heading-->
                    <a href="" class="text-dark">
                      <span
                        :class="`${item.unread ? 'fw-bolder' : 'fw-normal'}`"
                      >
                        {{ item.subject }}
                      </span>
                      <span class="fw-normal"> - </span>
                      <span class="fw-normal text-muted">
                        {{ item.message.slice(0, 120 - item.subject.length) }}
                        ...
                      </span>
                    </a>
                    <!--end::Heading-->
                  </div>
                  <!--begin::Badges-->
                  <div
                    v-if="emailType.data === 'marked'"
                    :class="`badge badge-light-${
                      item.type === 'sent'
                        ? 'warning'
                        : item.type === 'trash'
                        ? 'danger'
                        : 'primary'
                    }`"
                  >
                    {{ item.type }}
                  </div>
                  <!--end::Badges-->
                </template>
                <template v-slot:cell-date="{ row: item }">
                  {{ moment.unix(item.date).format("DD/MM/YYYY hh:mm") }}
                </template>
              </Datatable>
            </div>
          </div>
          <!--end::Card-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Inbox App - Messages -->
    </div>
    <!--end::Container-->
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  watchEffect,
  reactive,
} from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import DummyData from "@/store/email/DummyData";
import moment from "moment";

export default defineComponent({
  name: "email-compose",

  components: {
    Datatable,
  },

  setup() {
    const tableHeader = ref([
      {
        name: "Checkbox",
        key: "checkbox",
      },
      {
        name: "Actions",
        key: "actions",
      },
      {
        name: "Name",
        key: "name",
      },
      {
        name: "Message",
        key: "message",
      },
      {
        name: "Date",
        key: "date",
      },
    ]);
    const tableData = ref([]);
    const emailData = ref(DummyData);
    const emailType = reactive({
      data: "inbox",
    });
    const searchText = ref("");
    const checkAll = ref(false);

    // sort data by unread default
    emailData.value = emailData.value.sort((a, b) => {
      return b.unread - a.unread;
    });

    // set check status of all data by false default
    emailData.value.forEach((item) => {
      item.checked = false;
    });

    const switchType = (type) => {
      emailType.data = type;

      if (emailType.data === "marked") {
        emailData.value = DummyData.filter((data) => data.marked);
      } else {
        emailData.value = DummyData.filter(
          (data) => data.type === emailType.data
        );
      }
    };

    const sortByDate = (order) => {
      if (order) {
        emailData.value = emailData.value.sort((a, b) => {
          return b.date - a.date;
        });
      } else {
        emailData.value = emailData.value.sort((a, b) => {
          return a.date - b.date;
        });
      }
    };

    const sortByUnread = () => {
      emailData.value = emailData.value.sort((a, b) => {
        return b.unread - a.unread;
      });
    };

    const selectByType = (type) => {
      emailData.value.forEach((item) => {
        item.checked = false;
      });

      switch (type) {
        case "all":
          emailData.value.forEach((item) => {
            item.checked = true;
          });
          checkAll.value = true;
          break;
        case "none":
          emailData.value.forEach((item) => {
            item.checked = false;
          });
          checkAll.value = false;
          break;
        case "read":
          emailData.value.forEach((item) => {
            if (!item.unread) item.checked = true;
          });
          break;
        case "unread":
          emailData.value.forEach((item) => {
            if (item.unread) item.checked = true;
          });
          break;
        case "marked":
          emailData.value.forEach((item) => {
            if (item.marked) item.checked = true;
          });
          break;
        case "unmarked":
          emailData.value.forEach((item) => {
            if (!item.marked) item.checked = true;
          });
          break;
        default:
          break;
      }
    };

    const selectMessage = (idx) => {
      emailData.value.forEach((item) => {
        if (item.id === idx) {
          item.checked = !item.checked;
          return;
        }
      });
    };

    watch(searchText, () => {
      emailData.value = emailData.value.filter((data) =>
        data.subject.toLowerCase().includes(searchText.value)
      );
    });

    watch(checkAll, () => {
      emailData.value.forEach((item) => {
        item.checked = checkAll.value;
      });
    });

    watchEffect(() => {
      tableData.value = emailData;
    });

    onMounted(() => {
      tableData.value = emailData;
    });

    return {
      moment,
      tableHeader,
      tableData,
      emailType,
      searchText,
      checkAll,
      switchType,
      sortByDate,
      sortByUnread,
      selectByType,
      selectMessage,
    };
  },
});
</script>
