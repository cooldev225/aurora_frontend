<template>
  <ModalWrapper title="Search Patients" modalId="assign_patient">
    <el-form class="w-100" ref="formRef">
      <!--begin::Row-->
      <div class="row g-8">
        <!--begin::Col-->
        <div class="col-lg-4">
          <label class="fs-6 form-label fw-bolder text-dark">First Name</label>
          <el-form-item prop="first_name">
            <el-input
              type="text"
              v-model="filter.first_name"
              placeholder="First Name"
            />
          </el-form-item>
        </div>
        <!--end::Col-->
        <!--begin::Col-->
        <div class="col-lg-4">
          <label class="fs-6 form-label fw-bolder text-dark">Last Name</label>
          <el-form-item prop="last_name">
            <el-input
              type="text"
              v-model="filter.last_name"
              placeholder="Last Name"
            />
          </el-form-item>
        </div>
        <!--begin::Col-->
        <div class="col-lg-4">
          <label class="fs-6 form-label fw-bolder text-dark"
            >Date of Birth</label
          >
          <el-form-item prop="date">
            <el-date-picker
              class="w-100"
              v-model="filter.date_of_birth"
              format="DD/MM/YYYY"
              placeholder="01/01/1990"
            />
          </el-form-item>

          <div class="d-flex align-items-center justify-content-end mt-5">
            <button
              type="submit"
              class="btn btn-primary me-5 w-50"
              :disabled="
                filter.first_name.length < 2 &&
                filter.last_name.length < 2 &&
                filter.date_of_birth.length < 2
              "
              @click.prevent="searchPatient"
            >
              SEARCH
            </button>
            <button
              type="submit"
              class="btn btn-light-primary w-50"
              :disabled="
                filter.first_name.length === 0 &&
                filter.last_name.length === 0 &&
                filter.date_of_birth.length === 0
              "
              @click="clearFilters"
            >
              CLEAR
            </button>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </el-form>
  </ModalWrapper>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  watch,
  reactive,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import patientDocumentTypes from "@/core/data/patient-document-types";
import moment from "moment";

export default defineComponent({
  name: "assign-patient-modal",
  props: {},
  setup(props) {
    const store = useStore();
    const formRef = ref(null);

    const formData = ref({});

    const filter = reactive({
      first_name: "",
      last_name: "",
      date_of_birth: "",
    });

    const rules = ref({
      // document_name: [
      //   {
      //     required: true,
      //     message: "Document name cannot be blank",
      //     trigger: "change",
      //   },
      // ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }
    };

    return {
      filter,
    };
  },
});
</script>
