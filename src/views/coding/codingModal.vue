<template>
  <div
    class="modal fade"
    id="modal_coding"
    tabindex="-1"
    aria-hidden="true"
    ref="codingModalRef"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-850px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_coding_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Coding Update</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_coding_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <InlineSVG icon="cross" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_coding_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_coding_header"
              data-kt-scroll-wrappers="#kt_modal_coding_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row appointment-data-view">
                <div class="col-4">
                  <p>Patient Name: {{ formData.patient_name.full }}</p>
                  <p>
                    Patient Date of Birth:
                    {{ formData.patient_details.date_of_birth }}
                  </p>
                  <p>Patient gender: {{ formData.patient.gender }}</p>
                </div>
                <div class="col-6">
                  <p>
                    Appointment date and time: {{ formData.date }}
                    {{ formData.formatted_appointment_time }}
                  </p>
                  <p>Specialsit name: {{ formData.specialist_name }}</p>
                  <p>Appointment type: {{ formData.appointment_type_name }}</p>
                  <p>clinic: {{ formData.clinic_details.name }}</p>
                </div>
              </div>
              <div class="row mt-10">
                <div class="col-6">
                  <label class="required fs-6 fw-bold mb-2"
                    >Procedures Undertaken</label
                  >
                  <el-form-item prop="undertaken">
                    <el-select
                      class="w-100"
                      multiple
                      filterable
                      v-model="formData.undertaken"
                    >
                      <el-option
                        v-for="item in undertaken"
                        :value="item"
                        :label="item"
                        :key="item"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="col-6">
                  <label class="required fs-6 fw-bold mb-2"
                    >Extra Items Used</label
                  >
                  <el-form-item prop="extraitems">
                    <el-select
                      class="w-100"
                      multiple
                      filterable
                      v-model="formData.extraitems"
                    >
                      <el-option
                        v-for="item in extraitems"
                        :value="item"
                        :label="item"
                        :key="item"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="required fs-6 fw-bold mb-2">Indications</label>
                  <el-form-item prop="indications">
                    <el-select
                      class="w-100"
                      filterable
                      multiple
                      v-model="formData.indications"
                    >
                      <el-option
                        v-for="item in indications"
                        :value="item"
                        :label="item"
                        :key="item"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="col-6">
                  <label class="required fs-6 fw-bold mb-2">Diagnosis</label>
                  <el-form-item prop="diagnosis">
                    <el-select
                      class="w-100"
                      filterable
                      multiple
                      v-model="formData.diagnosis"
                    >
                      <el-option
                        v-for="item in diagnosis"
                        :value="item"
                        :label="item"
                        :key="item"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="row mt-10 button-group">
                <div class="col-6">
                  <button
                    class="btn btn-lg btn-primary"
                    type="button"
                    @click="submit(0)"
                  >
                    <span class="indicator-label">MARK COMPLETE AND CLOSE</span>
                  </button>
                </div>
                <div
                  class="col-6"
                  v-if="formData?.id != aptList[aptList.length - 1]?.id"
                >
                  <button
                    class="btn btn-lg btn-primary"
                    type="button"
                    @click="submit(1)"
                  >
                    <span class="indicator-label">MARK COMPLETE AND NEXT</span>
                  </button>
                </div>
              </div>
              <div
                class="row mt-10 document-viewer"
                id="documents_viewer"
              ></div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.appointment-data-view {
  font-size: 12px;
  p {
    margin-bottom: 0.5rem;
  }
}
.button-group {
  button {
    width: 100%;
  }
}
</style>
<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CodingActions, CodingMutations } from "@/store/enums/StoreCodingEnums";
import pdf from "pdfobject";

export default defineComponent({
  name: "coding-modal",
  components: {},
  setup() {
    const store = useStore();
    const formRef = ref(null);
    const codingModalRef = ref(null);
    const loading = ref(false);
    const apt = computed(() => store.getters.getCodingAptSelect);
    const aptList = computed(() => store.getters.getCodingAptList);
    const undertaken = ref(["UA", "UB", "UC", "UD", "UE"]);
    const extraitems = ref(["EA", "EB", "EC", "ED", "EE"]);
    const indications = ref(["IA", "IB", "IC", "ID", "IE"]);
    const diagnosis = ref(["DA", "DB", "DC", "DD", "DE"]);

    const formData = ref({
      id: null,
      patient_name: {
        full: null,
      },
      patient_details: {
        date_of_birth: null,
      },
      patient: {
        gender: null,
      },
      date: null,
      formatted_appointment_time: null,
      specialist_name: null,
      appointment_type_name: null,
      clinic_details: {
        name: null,
      },
      undertaken,
      extraitems,
      indications,
      diagnosis,
    });

    const rules = ref({
      undertaken: [
        {
          required: true,
          message: "Procedures cannot be blank",
          trigger: "change",
        },
      ],
      extraitems: [
        {
          required: true,
          message: "Extra Items cannot be blank",
          trigger: "change",
        },
      ],
      indications: [
        {
          required: true,
          message: "Indications cannot be blank",
          trigger: "change",
        },
      ],
      diagnosis: [
        {
          required: true,
          message: "Diagnosis cannot be blank",
          trigger: "change",
        },
      ],
    });

    watch(apt, () => {
      formData.value = apt.value;
      if (apt.value && apt.value.documents?.length) {
        const doc = formData.value.documents[0];
        document.getElementById("documents_viewer").innerHTML = "";
        store
          .dispatch(CodingActions.DOCUMENT_VIEW, {
            path: doc.file_path,
          })
          .then((data) => {
            if (doc.file_type === "PDF") {
              let blob = new Blob([data], { type: "application/pdf" });
              let objectUrl = URL.createObjectURL(blob);
              pdf.embed(objectUrl + "#toolbar=0", "#documents_viewer");
            } else if (doc.file_type === "PNG") {
              document.getElementById("documents_viewer").innerHTML =
                "<img src='" + data + "' />";
            }
          })
          .catch(() => {
            console.log("Document Load Error");
          });
      }
    });

    const submit = (f) => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid) => {
        if (valid) {
          const Data = {
            id: formData.value.id,
            patient_id: formData.value.patient_id,
            clinic_id: formData.value.clinic_id,
            appointment_type_id: formData.value.appointment_type_id,
            appointment_id: formData.value.appointment_id,
            undertaken: formData.value.undertaken,
            extraitems: formData.value.extraitems,
            indications: formData.value.indications,
            diagnosis: formData.value.diagnosis,
          };
          loading.value = true;
          store
            .dispatch(CodingActions.COMPLETE, Data)
            .then(() => {
              loading.value = false;
              store.dispatch(CodingActions.LIST);
              Swal.fire({
                text: "Successfully Created!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                if (!f) hideModal(codingModalRef.value);
                else {
                  aptList.value.map((a, i) => {
                    if (formData.value.id == a.id) {
                      store.commit(
                        CodingMutations.SET_SELECT,
                        aptList.value[i + 1]
                      );
                      return;
                    }
                  });
                }
              });
            })
            .catch(({ response }) => {
              loading.value = false;
              console.log(response.data.error);
            });
          formRef.value.resetFields();
        } else {
          // this.context.commit(Mutations.PURGE_AUTH);
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      codingModalRef,
      undertaken,
      extraitems,
      indications,
      diagnosis,
      aptList,
    };
  },
});
</script>
