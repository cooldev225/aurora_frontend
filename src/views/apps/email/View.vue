<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <h3 class="fs-2 text-capitalize mb-10">{{ formData.subject }}</h3>
    <div
      class="w-100 mt-10 mb-10"
      v-for="item in sentRepliedMails"
      :key="item.id"
    >
      <div class="d-flex align-items-center text-dark">
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
        <span
          :class="`${!item.is_read ? 'fw-bolder' : 'fw-normal'}`"
          v-html="item.name"
        >
        </span>
      </div>
      <div class="mt-5 ms-15">
        <section v-html="item.body"></section>
        <footer v-if="item.attachment.length > 0">
          <hr />
          <div v-for="attachmentLink in item.attachment" :key="attachmentLink">
            <a class="fs-3" :href="attachmentLink">{{ attachmentLink }}</a>
          </div>
        </footer>
      </div>
    </div>
    <div v-if="!formData.isShow" class="d-flex flex-row mt-10">
      <button class="btn fs-4 text-primary me-3" @click="handleReply(true)">
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

    watchEffect(() => {
      if (repliedMails.value.length > 0) {
        repliedMails.value.forEach((item) => {
          item.toUserIds = JSON.parse(item.to_user_ids);
        });

        formData.value = Object.assign({}, repliedMails.value[0]);
        formData.value.to_user_ids = [formData.value.from_user_id];
        delete formData.value.attachment;

        if (repliedMails.value[0].status != "draft") {
          formData.value.isShow = false;
          formData.value.body = "";
          formData.value.reply_id = formData.value.id;
          delete formData.value.id;
        } else {
          formData.value.isShow = true;
        }

        sentRepliedMails.value = [];

        repliedMails.value.forEach((item) => {
          if (item.status != "draft") {
            sentRepliedMails.value.unshift(item);
          }
        });

        repliedMails.value.forEach((mail) => {
          sendableUsers.value.forEach((user) => {
            if (mail.from_user_id == user.id) {
              mail.name = user.first_name + " " + user.last_name;
              mail.photo = user.photo;
            }
          });
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
