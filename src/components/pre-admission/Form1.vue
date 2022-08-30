<template>
  <div class="card justify-content-center h-100">
    <el-form
      class="m-auto col-sx-12 col-md-6 col-xl-4"
      @submit.prevent="submit()"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <img
        :src="orgData.organization_logo"
        alt="Organization Logo"
        class="mb-6 w-100 px-6 text-center"
      />

      <InputWrapper label="Date of Birth" prop="date_of_birth">
        <el-input
          type="date"
          class="w-100"
          v-model="formData.date_of_birth"
          format="DD/MM/YYYY"
          placeholder="01/01/1990"
        />
      </InputWrapper>

      <InputWrapper label="Last Name" prop="last_name">
        <el-input
          type="text"
          v-model="formData.last_name"
          placeholder="Last Name"
        />
      </InputWrapper>

      <div class="d-flex justify-content-end gap-3">
        <button type="submit" class="btn btn-primary w-100 m-6">
          Continue
        </button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import moment from "moment";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import InputWrapper from "@/components/presets/FormElements/InputWrapper.vue";

export default defineComponent({
  name: "pre-admission-form1",
  components: { InputWrapper },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(true);
    const formRef = ref(null);
    const orgData = computed(() => store.getters.getAptPreAdmissionOrg);
    const validateMsg = computed(
      () => store.getters.getAptPreAdmissionValidateMsg
    );
    const formData = ref({
      date_of_birth: "",
      last_name: "",
    });

    const rules = ref({
      date_of_birth: [
        {
          required: true,
          message: "Date of Birth cannot be blank",
          trigger: "change",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Last Name cannot be blank",
          trigger: "change",
        },
      ],
    });
    const apt_id = ref("");

    const submit = async () => {
      if (!formRef.value) {
        return;
      }

      router.push({
        path: "/dashbaord",
      });

      /*
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post(
          "appointments/pre-admissions/validate/" + apt_id.value,
          {
            last_name: formData.value.last_name,
            date_of_birth: moment(formData.value.date_of_birth)
              .format("YYYY-MM-DD")
              .toString(),
          }
        )
          .then(({ data }) => {
            if (data.message === "Appointment Pre Admission") {
              store.commit(
                Mutations.SET_APT.PRE_ADMISSION.VALIDATE.DATA,
                data.data
              );
              router.push({
                path:
                  "/appointment_pre_admissions/show/" +
                  apt_id.value +
                  "/form_2",
              });
            } else {
              console.log(data.message);
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      } else {
        store.commit(Mutations.PURGE_AUTH);
      }*/
    };

    onMounted(() => {
      loading.value = true;
      apt_id.value = router.currentRoute.value.params.id.toString();
      store.dispatch(Actions.APT.PRE_ADMISSION.ORG, apt_id.value);
    });

    return {
      orgData,
      formRef,
      formData,
      rules,
      submit,
    };
  },
});
</script>
