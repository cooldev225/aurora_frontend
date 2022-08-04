<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <h3>Compose New Mail</h3>
    <el-form-item prop="to_user_ids">
      <el-select
        class="mt-10 w-100"
        placeholder="To:"
        v-model="formData.to_user_ids"
        filterable
        multiple
      >
        <el-option
          v-for="item in sendableUsers"
          :value="item.id"
          :label="item.username"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="subject">
      <el-input v-model="formData.subject" type="text" placeholder="Subject" />
    </el-form-item>

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
      <router-link
        type="reset"
        to="/mails"
        id="kt_modal_mail_compose_cancel"
        class="btn btn-light me-3"
      >
        Cancel
      </router-link>

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
  </el-form>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "email-compose",
  components: {
    ckeditor: CKEditor.component,
  },
  setup() {
    const rules = ref({
      to_user_ids: [
        {
          required: true,
          message: "Please select user",
          trigger: "change",
        },
      ],
    });

    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const loading = ref(false);
    const formData = ref({
      to_user_ids: [],
      subject: "",
      body: "",
    });
    const uploadDisabled = ref(false);
    const upload = ref(null);
    const Data = new FormData();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const sendableUsers = computed(() => store.getters.getUserList);

    const handleChange = (file, fileList) => {
      upload.value.clearFiles();
      uploadDisabled.value = false;
      Data.append("attachment", file.raw);
      uploadDisabled.value = fileList.length >= 1;
    };

    const handleRemove = (file, fileList) => {
      uploadDisabled.value = fileList.length - 1;
    };

    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url;
      dialogVisible.value = true;
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Compose", ["Mail"]);

      store.dispatch(Actions.USER_LIST).then(() => {
        loading.value = false;
      });
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
          store
            .dispatch(Actions.MAILS.CREATE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.ORG.LIST);
              Swal.fire({
                text: "Mail Sent Successfully!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "mails" });
              });
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
          store
            .dispatch(Actions.MAILS.SEND, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(Actions.ORG.LIST);
              Swal.fire({
                text: "Mail Sent Successfully!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "mails" });
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
      dialogVisible,
      dialogImageUrl,
      sendableUsers,
      formData,
      submit,
      ClassicEditor,
      formRef,
    };
  },
});
</script>
