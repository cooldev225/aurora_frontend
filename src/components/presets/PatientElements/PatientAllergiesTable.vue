<template>
  <CardSection class="col-md-6 col-sm-12" heading="Allergies">
    <template #header-actions>
      <IconButton label="Create New" @click="handleAddAllergy" />
    </template>

    <template #default>
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :key="tableKey"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-name="{ row: item }">
          {{ item.name }}
        </template>

        <template v-slot:cell-severity="{ row: item }">
          {{ item.severity }}
        </template>

        <template v-slot:cell-symptoms="{ row: item }">
          {{ item.symptoms }}
        </template>

        <template v-slot:cell-actions="{ row: item }">
          <div class="d-flex flex-column">
            <button
              class="btn btn-bg-light btn-active-color-primary btn-sm mt-2"
              :disabled="loading != null"
              @click="handleUpdateAllergy(item)"
            >
              Update Details
            </button>

            <button
              class="btn btn-bg-danger btn-sm mt-2"
              :disabled="loading != null"
              @click="handleDeleteAllergy(item)"
            >
              Delete Source
            </button>
          </div>
        </template>
      </Datatable>

      <AddClaimSourceModal
        :patient="selectedPatient"
        v-on:closeModal="closeAddClaimSourceModal"
        v-on:updateDetails="updatePatientDetails"
      />

      <UpdateClaimSourceModal
        :patient="selectedPatient"
        :claimSource="updatingSource"
        v-on:closeModal="closeUpdateClaimSourceModal"
        v-on:updateDetails="updatePatientDetails"
      />
    </template>

    <!-- <table class="table">
      <tr class="fw-bold">
        <th>Name</th>
        <th>Severity</th>
        <th>Symptoms</th>
        <th></th>
      </tr>
      <template v-for="allergy in patient.allergies" :key="allergy.id">
        <PatientAllergiesRow :allergy="allergy" />
      </template>
    </table> -->
  </CardSection>
</template>
<script lang="ts">
// import PatientAllergiesRow from "./PatientAllergiesRow.vue";
// export default {
//   props: {
//     patient: { required: true, type: Object },
//   },
//   components: { PatientAllergiesRow },
//   setup() {
//     const handleAddAllergy = () => {
//       alert("");
//     };
//     return {
//       handleAddAllergy,
//     };
//   },
// };
import { defineComponent, ref, watchEffect, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import AddClaimSourceModal from "@/views/patients/modals/AddClaimSourceModal.vue";
import UpdateClaimSourceModal from "@/views/patients/modals/UpdateClaimSourceModal.vue";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import { Modal } from "bootstrap";
import PatientBillingTypes from "@/core/data/patient-billing-types";
import { isMedicareValidationEnabled } from "@/core/data/billing";

export default defineComponent({
  name: "patient-allergies-table",
  props: {
    patient: { required: true, type: Object },
  },
  components: {
    AddClaimSourceModal,
    UpdateClaimSourceModal,
    IconButton,
    Datatable,
  },
  data: function () {
    return {
      colString: "col-12 col-sm-6 ",
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const selectedPatient = computed(() => store.getters.selectedPatient);
    const minorId = computed(() => store.getters.latestMinorId);
    const enableMedicareValidation = computed(() =>
      isMedicareValidationEnabled()
    );
    const loading = ref(null);
    const tableHeader = ref([
      {
        name: "Name",
        key: "name",
        sortable: true,
      },
      {
        name: "Severity",
        key: "severity",
        sortable: false,
      },
      {
        name: "Symptoms",
        key: "symptoms",
        sortable: false,
      },
      {
        name: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);
    const tableData = ref([]);
    const tableKey = ref(0);
    const updateDetails = ref({});
    const updatingSource = ref(null);
    const addClaimSourceModal = ref(null);
    const updateClaimSourceModal = ref(null);

    const renderTable = () => tableKey.value++;

    const handleAddAllergy = () => {
      if (!addClaimSourceModal.value) {
        addClaimSourceModal.value = new Modal(
          document.getElementById("modal_add_claim_source")
        );
      }

      addClaimSourceModal.value.show();
    };

    const handleUpdateAllergy = (source) => {
      updatingSource.value = source;

      if (!updateClaimSourceModal.value) {
        updateClaimSourceModal.value = new Modal(
          document.getElementById("modal_update_claim_source")
        );
      }

      updateClaimSourceModal.value.show();
    };

    const handleDeleteAllergy = (item) => {
      Swal.fire({
        text: `Are you sure you want to delete this ${item.name}?`,
        icon: "question",
        buttonsStyling: false,
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAllergy(item);
        }
      });
    };

    const deleteAllergy = (item) => {
      // store.dispatch(PatientActions.CLAIM_SOURCE.DELETE, item);
    };

    const updatePatientDetails = (details) => {
      const previousData = {
        patient_id: selectedPatient.value.id,
        first_name: selectedPatient.value.first_name,
        last_name: selectedPatient.value.last_name,
      };

      const updateData = {
        id: selectedPatient.value.id,
        first_name: selectedPatient.value.first_name,
        last_name: selectedPatient.value.last_name,
        date_of_birth: selectedPatient.value.date_of_birth,
      };

      for (const detailName in details) {
        updateData[detailName] = details[detailName];
      }

      store
        .dispatch(PatientActions.UPDATE, updateData)
        .then(() => {
          store.dispatch(PatientActions.LIST);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        })
        .finally(() => {
          loading.value = null;
        });

      store
        .dispatch(PatientActions.ALSO_KNOWN_AS.CREATE, previousData)
        .then(() => {
          store.dispatch(PatientActions.LIST);
        })
        .catch(({ response }) => {
          console.log(response.data.error);
        })
        .finally(() => {
          loading.value = null;
        });
    };

    const closeAddClaimSourceModal = () => {
      renderTable();
      addClaimSourceModal.value.hide();
    };

    const closeUpdateClaimSourceModal = () => {
      renderTable();
      updateClaimSourceModal.value.hide();
    };

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.VIEW, id);
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);

      const updateModal = document.getElementById("modal_update_claim_source");
      updateModal.addEventListener("hidden.bs.modal", function () {
        updatingSource.value = null;
        renderTable();
      });
    });

    watchEffect(() => {
      tableData.value = selectedPatient.value?.billings ?? [];
      renderTable();
    });

    return {
      healthFundsList,
      selectedPatient,
      loading,
      tableHeader,
      tableData,
      tableKey,
      PatientBillingTypes,
      moment,
      revalidateSource,
      handleDeleteAllergy,
      handleCheckConcession,
      updateDetails,
      handleAddAllergy,
      updatingSource,
      handleUpdateAllergy,
      closeAddClaimSourceModal,
      closeUpdateClaimSourceModal,
      updatePatientDetails,
      enableMedicareValidation,
    };
  },
});
</script>
