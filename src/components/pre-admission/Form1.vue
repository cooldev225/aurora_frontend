<template>
  <div class="card w-100 h-100 p-10">
    <div class="card-header border-0 p-5">
      <div
        class="m-auto border border-success border-3 d-flex align-items-center justify-content-center w-250px h-250px"
        style="border-radius: 50%"
      >
        <img
          :src="orgData.organization_logo"
          alt="Organization logo"
          class="w-100 h-100"
        />
        <!-- <h1 v-else>Organization</h1> -->
      </div>
    </div>
    <div class="card-body pt-0">
      <el-form
        class="w-50 m-auto"
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="date_of_birth">
          <label>Date of Birth</label>
          <el-date-picker
            class="w-100"
            v-model="formData.date_of_birth"
            format="YYYY-MM-DD"
            placeholder="1990-01-01"
          />
        </el-form-item>
        <el-form-item prop="last_name">
          <label>Last Name</label>
          <el-input
            type="text"
            v-model="formData.last_name"
            placeholder="Last Name"
          />
        </el-form-item>
        <div class="d-flex justify-content-end gap-3">
          <button type="submit" class="btn btn-primary w-min-250px">
            Confirm
          </button>
          <button type="reset" class="btn btn-light-primary w-min-250px ms-2">
            Cancel
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "pre-admission-form1",

  components: {},

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
          message: "Last Name cannnot be blank",
          trigger: "change",
        },
      ],
    });
    const orgLogo = ref("");
    const apt_id = ref("");

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          store
            .dispatch(Actions.APT.PRE_ADMISSION.VALIDATE, {
              apt_id: apt_id.value,
              ...formData.value,
            })
            .then(() => {
              if (validateMsg.value === "Appointment Pre Admission")
                router.push({
                  path:
                    "/appointment_pre_admissions/show/" +
                    apt_id.value +
                    "/form_2",
                  query: {
                    last_name: formData.value.last_name,
                    date_of_birth: moment(formData.value.date_of_birth)
                      .format("YYYY-MM-DD")
                      .toString(),
                  },
                });
              else {
                Swal.fire({
                  text: validateMsg.value,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
              }
            });
        } else {
          console.log("validation failed");
        }
      });
    };

    onMounted(() => {
      loading.value = true;
      apt_id.value = router.currentRoute.value.params.id.toString();
      store.dispatch(Actions.APT.PRE_ADMISSION.ORG, apt_id.value);
    });

    return {
      orgLogo,
      orgData,
      formRef,
      formData,
      rules,
      submit,
    };
  },
});
</script>
