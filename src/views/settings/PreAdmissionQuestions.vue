<template>
  <!--begin::Form-->
  <el-form
    v-show="isLoaded"
    @submit.prevent="submit()"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <section>
      <!--begin::Input group-->
      <div class="fv-row col-12 mb-5">
        <!--begin::Input-->
        <el-form-item prop="title">
          <el-input
            v-model="formData.title"
            class="w-100"
            type="text"
            placeholder="Pre Admission Section Title"
          />
        </el-form-item>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <div
        class="border border-5 border-muted mb-10 p-10"
        v-for="(preAdmissionQuestion, questionIndex) in formData.questions"
        :key="questionIndex"
      >
        <el-form-item :prop="'question-' + questionIndex">
          <el-input
            v-model="preAdmissionQuestion.text"
            class="w-100"
            type="textarea"
            placeholder="Question Text"
          />
        </el-form-item>

        <el-form-item :prop="'answer-format' + questionIndex">
          <el-select
            v-model="preAdmissionQuestion.answer_format"
            class="w-100"
            placeholder="Select Answer Format"
          >
            <el-option value="TEXT" label="Text" />
            <el-option value="BOOLEAN" label="Boolean" />
          </el-select>
        </el-form-item>

        <div class="d-flex flex-row-reverse">
          <span
            @click="handleDeleteQuestion(questionIndex)"
            class="cursor-pointer text-nowrap text-danger text-right"
            >- Delete Question</span
          >
        </div>
      </div>
      <div
        class="cursor-pointer text-center col-12 border border-5 border-muted"
        style="font-size: 2rem; color: #bd5; line-height: 70px"
        @click="handleAddQuestion()"
      >
        <span><span>+</span> Add Question</span>
      </div>
    </section>

    <!--begin::Modal footer-->
    <footer class="d-flex flex-row-reverse">
      <router-link type="reset" to="/settings" class="btn btn-light me-3">
        Cancel
      </router-link>

      <!--begin::Button-->
      <button class="btn btn-lg btn-primary" type="submit">
        <span class="indicator-label"> Save </span>
      </button>
      <!--end::Button-->
    </footer>
    <!--end::Modal footer-->
  </el-form>
  <!--end::Form-->
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "pre-admission-questions",

  components: {},

  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const isLoaded = ref(false);
    const formData = ref({
      id: 0,
      title: "",
      questions: [],
    });

    const rules = ref({
      title: [
        {
          required: true,
          message: "Title cannot be blank",
          trigger: "change",
        },
      ],
    });

    const handleAddQuestion = () => {
      let new_question = {};

      new_question.text = "";
      new_question.answer_format = "TEXT";

      formData.value.questions.push(new_question);
    };

    const handleDeleteQuestion = (questionIndex) => {
      formData.value.questions.splice(questionIndex, 1);
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          ApiService.post("pre-admission-sections", formData.value)
            .then(() => {
              Swal.fire({
                text: " Pre Admission Section Updated!",
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

    const initFormData = () => {
      ApiService.get("pre-admission-sections")
        .then(({ data }) => {
          formData.value = data.data;
          isLoaded.value = true;

          return data.data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Section", ["Settings"]);

      initFormData();
    });

    return {
      rules,
      formData,
      submit,
      formRef,
      isLoaded,
      handleAddQuestion,
      handleDeleteQuestion,
    };
  },
});
</script>
