<template>
  <!--begin::Form-->
  <el-form
    v-show="isLoaded"
    @submit.prevent="submit()"
    :model="formData"
    ref="formRef"
  >
    <section>
      <div
        class="border border-5 border-muted mb-20 p-10"
        v-for="(preAdmissionSection, sectionIndex) in formData.sections"
        :key="sectionIndex"
      >
        <div class="fv-row col-12 mb-7">
          <!--begin::Input-->
          <el-form-item
            :prop="'title-' + sectionIndex"
            :rules="[
              {
                required: preAdmissionSection.title === '',
                message: 'Section Title cannot be blank',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input
              v-model="preAdmissionSection.title"
              class="w-100"
              type="text"
              autocomplete="off"
              placeholder="Pre Admission Section Title"
            />
          </el-form-item>
          <!--end::Input-->
        </div>
        <div class="questions-group-box">
          <div
            class="mb-2"
            v-for="(
              preAdmissionQuestion, questionIndex
            ) in preAdmissionSection.questions"
            :key="questionIndex"
          >
            <div class="d-flex">
              <el-form-item
                class="w-100"
                :key="'question-' + questionIndex"
                :prop="'question-' + questionIndex"
                :rules="{
                  required: preAdmissionQuestion.text === '',
                  message: 'Question Text cannot be blank',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="preAdmissionQuestion.text"
                  class="w-100"
                  placeholder="Question Text"
                />
              </el-form-item>

              <el-form-item
                class="mb-2 flex items-center text-sm answer-format"
                :prop="'answer-format-' + questionIndex"
              >
                <el-radio-group
                  v-model="preAdmissionQuestion.answer_format"
                  class="ml-4"
                >
                  <el-radio label="TEXT" size="large">Text</el-radio>
                  <el-radio label="BOOLEAN" size="large">Yes/No</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="d-flex flex-row-reverse">
              <span
                @click="handleDeleteQuestion(sectionIndex, questionIndex)"
                class="cursor-pointer text-nowrap text-danger text-right"
                >- Delete Question</span
              >
            </div>
          </div>
        </div>
        <div
          class="cursor-pointer text-center col-12 mt-10 add-question"
          @click="handleAddQuestion(sectionIndex)"
        >
          <span><span>+</span> Add Question</span>
        </div>
        <div class="d-flex flex-row-reverse mt-5">
          <span
            @click="handleDeleteSection(sectionIndex)"
            class="cursor-pointer text-nowrap text-danger text-right"
            >- Delete Section</span
          >
        </div>
      </div>
      <div
        class="cursor-pointer text-center col-12 mb-10 border border-5 border-muted add-section"
        @click="handleAddSection()"
      >
        <span><span>+</span> Add Section</span>
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
<style lang="scss">
.el-form-item.answer-format {
  width: 240px;
  .el-form-item__content {
    display: flex;
    justify-content: end;
  }
}
.questions-group-box {
  padding: 20px 20px;
  border: #dcdfe6;
  border-style: dashed;
  border-width: 2px;
}
.add-question {
  font-size: 1.8rem;
  color: #bd5;
  line-height: 50px;
  border: #dcdfe6;
  border-style: dashed;
  border-width: 2px;
}
.add-section {
  font-size: 2rem;
  color: #bd5;
  line-height: 70px;
}
</style>
<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useRouter } from "vue-router";
import ApiService from "@/core/services/ApiService";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "pre-admission-questions",

  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const isLoaded = ref(false);
    const formData = ref({
      sections: null,
    });

    const handleAddQuestion = (sectionIndex) => {
      let new_question = {};

      new_question.text = "";
      new_question.answer_format = "TEXT";

      formData.value.sections[sectionIndex].questions.push(new_question);
    };

    const handleDeleteQuestion = (sectionIndex, questionIndex) => {
      formData.value.sections[sectionIndex].questions.splice(questionIndex, 1);
    };

    const handleAddSection = () => {
      let new_section = {
        title: "",
        questions: [
          {
            text: "",
            answer_format: "TEXT",
          },
        ],
      };
      formData.value.sections.push(new_section);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    };

    const handleDeleteSection = (sectionIndex) => {
      formData.value.sections.splice(sectionIndex, 1);
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid) => {
        if (valid) {
          await store
            .dispatch(
              Actions.ORG_ADMIN.ORGANIZATION.PRE_ADMISSION_SECTION.UPDATE,
              formData.value
            )
            .then((data) => {
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
            });
        }
      });
    };

    const initFormData = async () => {
      await store
        .dispatch(Actions.ORG_ADMIN.ORGANIZATION.PRE_ADMISSION_SECTION.LIST)
        .then((data) => {
          console.log(["Actions.PRE_ADMISSION_SECTION", data]);
          formData.value.sections = data;
          isLoaded.value = true;
        });
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Pre-Admission Section", ["Settings"]);
      initFormData();
    });

    return {
      formData,
      submit,
      formRef,
      isLoaded,
      handleAddQuestion,
      handleDeleteQuestion,
      handleAddSection,
      handleDeleteSection,
    };
  },
});
</script>
