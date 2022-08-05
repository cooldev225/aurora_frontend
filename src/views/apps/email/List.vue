<template>
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
          @click="handleDelete()"
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
          @click="handleMarkAsRead()"
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
            class="btn btn-sm btn-icon btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Sort"
          >
            <!--begin::Svg Icon | path: icons/duotune/general/gen059.svg-->
            <span class="svg-icon svg-icon-2 m-0">
              <inline-svg src="media/icons/duotune/general/gen059.svg" />
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
            @click="handleToggleStar(item)"
            class="btn btn-icon btn-sm btn-active-color-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Star"
          >
            <span
              :class="`svg-icon svg-icon-2 ${
                item.is_starred ? 'svg-icon-warning' : ''
              }`"
            >
              <inline-svg src="media/icons/duotune/general/gen029.svg" />
            </span>
          </a>
          <!--end::Star-->
        </template>
        <template v-slot:cell-name="{ row: item }">
          <router-link
            to="/mailbox/list"
            class="d-flex align-items-center text-dark"
          >
            <div v-if="item.photo" class="symbol symbol-35px me-3">
              <span
                class="symbol-label"
                :style="`background-image: url(${item.photo})`"
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
            <span :class="`${!item.is_read ? 'fw-bolder' : 'fw-normal'}`">
              {{ usernameFromIds(item) }}
            </span>
            <!--end::Name-->
          </router-link>
        </template>
        <template v-slot:cell-message="{ row: item }">
          <div
            class="min-w-300px text-dark mb-1 mh-80px"
            style="overflow: hidden"
          >
            <!--begin::Heading-->
            <router-link to="/mailbox/list" class="text-dark">
              <span :class="`${!item.is_read ? 'fw-bolder' : 'fw-normal'}`">
                {{ item.subject }}
              </span>
              <span class="fw-normal text-muted" v-html="item.body"> </span>
            </router-link>
            <!--end::Heading-->
          </div>
          <!--begin::Badges-->
          <div
            v-if="emailType.data === 'marked'"
            :class="`badge badge-light-${
              item.status == 'sent'
                ? 'warning'
                : item.type == 'deleted'
                ? 'danger'
                : 'primary'
            }`"
          >
            {{ item.type }}
          </div>
          <!--end::Badges-->
        </template>
        <template v-slot:cell-date="{ row: item }">
          {{
            item.sent_at == undefined
              ? ""
              : moment(item.sent_at).format("DD/MM/YYYY hh:mm:ss")
          }}
        </template>
      </Datatable>
    </div>
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
  computed,
} from "vue";
import { useStore } from "vuex";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";

export default defineComponent({
  name: "email-list",

  components: {
    Datatable,
  },

  props: {
    mailType: String,
  },

  setup(props) {
    const store = useStore();

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
    const emailType = reactive({
      data: "inbox",
    });
    const searchText = ref("");
    const checkAll = ref(false);
    const emailInfo = computed(() => store.getters.getMailInfo);
    const emailData = ref([]);
    const sendableUsers = computed(() => store.getters.getUserList);

    // sort data by unread default
    emailData.value = emailData.value.sort((a, b) => {
      return b.sent_at - a.sent_at;
    });

    // set check status of all data by false default
    emailData.value.forEach((item) => {
      item.checked = false;
    });

    const sortByDate = (order) => {
      if (order) {
        emailData.value = emailData.value.sort((a, b) => {
          return b.sent_at - a.sent_at;
        });
      } else {
        emailData.value = emailData.value.sort((a, b) => {
          return a.sent_at - b.sent_at;
        });
      }
    };

    const sortByUnread = () => {
      emailData.value = emailData.value.sort((a, b) => {
        return b.sent_at - a.sent_at;
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
            if (item.is_read) item.checked = true;
          });
          break;
        case "unread":
          emailData.value.forEach((item) => {
            if (!item.is_read) item.checked = true;
          });
          break;
        case "marked":
          emailData.value.forEach((item) => {
            if (item.is_starred) item.checked = true;
          });
          break;
        case "unmarked":
          emailData.value.forEach((item) => {
            if (!item.is_starred) item.checked = true;
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

    const handleDelete = () => {
      emailData.value.forEach((item) => {
        if (item.checked) {
          if (emailType.data == "draft") {
            store.dispatch(Actions.MAILS.DELETE_DRAFT, item.id);
          } else {
            store.dispatch(Actions.MAILS.DELETE, item);
          }
        }
      });

      store.dispatch(Actions.MAILS.LIST);
    };

    const handleRestore = () => {
      emailData.value.forEach((item) => {
        if (item.checked) {
          store.dispatch(Actions.MAILS.RESTORE, item);
        }
      });

      store.dispatch(Actions.MAILS.LIST);
    };

    const handleToggleStar = (item) => {
      if (item.is_starred) {
        store.dispatch(Actions.MAILS.UN_STAR, item.id);
      } else {
        store.dispatch(Actions.MAILS.STAR, item.id);
      }

      store.dispatch(Actions.MAILS.LIST);
    };

    const handleUnStar = (item) => {
      store.dispatch(Actions.MAILS.UN_STAR, item.id);

      store.dispatch(Actions.MAILS.LIST);
    };

    const handleMarkAsRead = () => {
      emailData.value.forEach((item) => {
        if (item.checked) {
          store.dispatch(Actions.MAILS.VIEW, item.id);
        }
      });

      store.dispatch(Actions.MAILS.LIST);
    };

    const usernameFromIds = (item) => {
      let ids = [item.from_user_id];

      if (["sent", "draft"].includes(emailType.data)) {
        ids = JSON.parse(item.to_user_ids);
      }

      let usernameList = "";

      sendableUsers.value.forEach((item) => {
        if (ids.includes(item.id)) {
          if (usernameList != "") {
            usernameList += ", ";
          }

          usernameList += item.username;
        }
      });

      return usernameList;
    };

    watch(checkAll, () => {
      emailData.value.forEach((item) => {
        item.checked = checkAll.value;
      });
    });

    watch(props.mailType, () => {
      emailType.data = props.mailType.data;

      emailData.value = emailInfo.value[emailType.data];
    });

    watch(checkAll, () => {
      emailData.value.forEach((item) => {
        item.checked = checkAll.value;
      });
    });

    watchEffect(() => {
      emailData.value = emailInfo.value[emailType.data];
      tableData.value = emailData;
    });

    onMounted(() => {
      store.dispatch(Actions.MAILS.LIST);
      store.dispatch(Actions.USER_LIST);

      tableData.value = emailData;
    });

    return {
      moment,
      tableHeader,
      tableData,
      emailType,
      searchText,
      checkAll,
      sortByDate,
      sortByUnread,
      selectByType,
      selectMessage,
      usernameFromIds,
      handleDelete,
      handleRestore,
      handleToggleStar,
      handleUnStar,
      handleMarkAsRead,
    };
  },
});
</script>
