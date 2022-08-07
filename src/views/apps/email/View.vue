<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <h3 class="text-capitalize">{{ formData.subject }}</h3>
    <div class="w-100" v-for="item in sentRepliedMails" :key="item.id">
      <h4>{{ item.name }}</h4>
      <section v-html="item.body"></section>
    </div>
    <div v-if="!formData.isShow" class="d-flex flex-row mb-15">
      <button class="btn btn-light me-3" @click="handleReply(true)">
        <span>Reply</span>
      </button>
    </div>
    <template v-if="formData.isShow">
      <el-form-item prop="body">
        <ckeditor :editor="ClassicEditor" v-model="formData.body" />
      </el-form-item>

      <el-form-item label="Attachment">
        <el-upload
          action="#"
          ref="upload"
          class="mr-20"
          multiple
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :limit="100"
          :auto-upload="false"
        >
          <el-button type="primary" class="btn btn-primary"
            >Choose Files</el-button
          >
        </el-upload>
      </el-form-item>

      <div class="d-flex flex-row-reverse">
        <button class="btn btn-light me-3" @click="handleReply(false)">
          <span>Cancel</span>
        </button>

        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-light me-3"
          @click="handleSave()"
        >
          <span>Save</span>
        </button>

        <button
          :data-kt-indicator="loading ? 'on' : null"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          <span v-if="!loading" class="indicator-label">
            Send
            <span class="svg-icon svg-icon-3 ms-2 me-0">
              <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
            </span>
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
    </template>
  </el-form>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter, useRoute } from "vue-router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "view-edit",
  components: {
    ckeditor: CKEditor.component,
  },
  setup() {
    const rules = ref({
      body: [
        {
          required: true,
          message: "Please write text",
          trigger: "change",
        },
      ],
    });

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formRef = ref(null);
    const loading = ref(false);
    const formData = ref({
      to_user_ids: [],
      subject: "",
      body: "",
      isShow: false,
    });
    const Data = new FormData();
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const sendableUsers = computed(() => store.getters.getUserList);
    const repliedMails = computed(() => store.getters.getRepliedMails);
    const sentRepliedMails = ref([]);

    const handleReply = (isShow) => {
      formData.value.isShow = isShow;
    };

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("attachment[" + file.raw.uid + "]", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      Data.delete("attachment[" + file.raw.uid + "]");
      uploadDisabled.value = fileList.length - 1;
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };

    const usernameFromIds = (item) => {
      let id = item.from_user_id;
      let usernameList = "";

      sendableUsers.value.forEach((item) => {
        if (id == item.id) {
          usernameList = item.username;
        }
      });

      return usernameList;
    };

    watchEffect(() => {
      if (repliedMails.value.length > 0) {
        repliedMails.value.forEach((item) => {
          item.toUserIds = JSON.parse(item.to_user_ids);
        });

        formData.value = Object.assign({}, repliedMails.value[0]);
        formData.value.to_user_ids = [formData.value.from_user_id];
        delete formData.value.attachment;

        if (repliedMails.value[0].status == "draft") {
          formData.value.isShow = true;
          formData.value.body = "";
        }

        sentRepliedMails.value = [];

        repliedMails.value.forEach((item) => {
          if (item.status != "draft") {
            sentRepliedMails.value.unshift(item);
          }
        });

        repliedMails.value.forEach((item) => {
          item.name = usernameFromIds(item);
        });
      }
    });

    onMounted(() => {
      setCurrentPageBreadcrumbs("View", ["Mail"]);

      const id = route.params.id;

      store.dispatch(Actions.USER_LIST).then(() => {
        loading.value = false;
      });

      store.dispatch(Actions.MAILS.VIEW, id);
    });

    const handleSave = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });

          loading.value = true;

          let actionName = Actions.MAILS.UPDATE_DRAFT;

          if (formData.value.id == undefined) {
            actionName = Actions.MAILS.COMPOSE;
          }

          store
            .dispatch(actionName, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.MAILS.LIST, "all");
              router.push({ name: "mailbox-list" });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        }
      });
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          Object.keys(formData.value).forEach((key) => {
            Data.append(key, formData.value[key]);
          });

          loading.value = true;

          let actionName = Actions.MAILS.SEND_DRAFT;

          if (formData.value.id == undefined) {
            actionName = Actions.MAILS.SEND;
          }

          store
            .dispatch(actionName, Data)
            .then(() => {
              Swal.fire({
                text: "Reply Mail Sent Successfully!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                store.dispatch(Actions.MAILS.LIST, "all");
                router.push({ name: "mailbox-list" });
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    return {
      rules,
      upload,
      handleChange,
      handleRemove,
      handlePreview,
      handleSave,
      handleReply,
      dialogVisible,
      dialogImageUrl,
      sendableUsers,
      sentRepliedMails,
      formData,
      submit,
      ClassicEditor,
      formRef,
    };
  },
});
</script>
