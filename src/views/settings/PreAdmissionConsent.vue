<template>
  <el-form
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <h3 class="mb-15">Pre Admission Consent</h3>

    <el-form-item prop="body">
      <ckeditor :editor="ClassicEditor" v-model="formData.text" />
    </el-form-item>

    <div class="d-flex flex-row-reverse">
      <router-link
        type="reset"
        to="/settings"
        id="kt_modal_mail_compose_cancel"
        class="btn btn-light me-3"
      >
        Cancel
      </router-link>

      <button class="btn btn-lg btn-primary me-3" type="submit">
        <span class="indicator-label"> Save </span>
      </button>
    </div>
  </el-form>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "pre-admission-consent",

  components: {
    ckeditor: CKEditor.component,
  },

  setup() {
    const rules = ref({
      text: [
        {
          required: true,
          message: "Please Type Text",
          trigger: "change",
        },
      ],
    });

    const router = useRouter();
    const formRef = ref(null);
    const formData = ref({
      text: "",
    });

    const initFormData = () => {
      ApiService.get("get-pre-admission-consent")
        .then(({ data }) => {
          formData.value = data.data;

          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Consent", ["Settings"]);

      initFormData();
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          ApiService.post("update-pre-admission-consent", formData.value)
            .then(() => {
              Swal.fire({
                text: " Pre Admission Consent Updated!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                router.push({ name: "org-admin-settings" });
              });
            })
            .catch(({ response }) => {
              console.log(response.data.error);
            });
        }
      });
    };

    return {
      rules,
      formData,
      submit,
      ClassicEditor,
      formRef,
    };
  },
});
</script>
