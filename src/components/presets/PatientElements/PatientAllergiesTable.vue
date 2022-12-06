<template>
  <CardSection class="col-md-6 col-sm-12" heading="Allergies">
    <template #header-actions>
      <IconButton label="Create New" @click.prevent="showAddAllergyModal" />
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
          <div class="d-flex">
            <button
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              @click.prevent="showUpdateAllergyModal(item)"
            >
              <span class="svg-icon svg-icon-3">
                <InlineSVG icon="pencil" />
              </span>
            </button>

            <button
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
              @click="handleDeleteAllergy(item)"
            >
              <span class="svg-icon svg-icon-3">
                <InlineSVG icon="bin" />
              </span>
            </button>
          </div>
        </template>
      </Datatable>

      <AddPatientAllergyModal
        :patient="selectedPatient"
        v-on:closeModal="closeAddPatientAllergyModal"
      />

      <UpdatePatientAllergyModal
        :patient="selectedPatient"
        :allergy="updatingAllergy"
        v-on:closeModal="closeUpdatePatientAllergyModal"
      />
    </template>
  </CardSection>
</template>
<script>
import { defineComponent, ref, watchEffect, onMounted, computed } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import AddPatientAllergyModal from "@/views/patients/modals/AddPatientAllergyModal.vue";
import UpdatePatientAllergyModal from "@/views/patients/modals/UpdatePatientAllergyModal.vue";
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
    AddPatientAllergyModal,
    UpdatePatientAllergyModal,
    IconButton,
    Datatable,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const healthFundsList = computed(() => store.getters.healthFundsList);
    const selectedPatient = computed(() => store.getters.selectedPatient);
    // const minorId = computed(() => store.getters.latestMinorId);
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
        sortable: true,
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
    const updatingAllergy = ref(null);
    const addPatientAllergyModal = ref(null);
    const updatePatientAllergyModal = ref(null);

    const renderTable = () => tableKey.value++;

    const showAddAllergyModal = () => {
      if (!addPatientAllergyModal.value) {
        addPatientAllergyModal.value = new Modal(
          document.getElementById("modal_add_patient_allergy")
        );
      }
      addPatientAllergyModal.value.show();
    };

    const showUpdateAllergyModal = (source) => {
      updatingAllergy.value = source;

      if (!updatePatientAllergyModal.value) {
        updatePatientAllergyModal.value = new Modal(
          document.getElementById("modal_update_patient_allergy")
        );
      }
      updatePatientAllergyModal.value.show();
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
      store.dispatch(PatientActions.ALLERGY.DELETE, item);
    };

    const closeAddPatientAllergyModal = () => {
      renderTable();
      // addPatientAllergyModal.value.hide();
    };

    const closeUpdatePatientAllergyModal = () => {
      renderTable();
      // updatePatientAllergyModal.value.hide();
    };

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.VIEW, id);
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);

      const updateModal = document.getElementById(
        "modal_update_patient_allergy"
      );
      updateModal?.addEventListener("hidden.bs.modal", function () {
        updatingAllergy.value = null;
        renderTable();
      });
    });

    watchEffect(() => {
      console.log(props.patient.allergies);
      tableData.value = props.patient.allergies ?? [];
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
      handleDeleteAllergy,
      updateDetails,
      showAddAllergyModal,
      updatingAllergy,
      showUpdateAllergyModal,
      closeAddPatientAllergyModal,
      closeUpdatePatientAllergyModal,
    };
  },
});
</script>
