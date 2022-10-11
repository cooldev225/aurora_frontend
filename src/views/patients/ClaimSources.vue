<template>
  <CardSection heading="Claim Sources">
    <template #header-actions>
      <IconButton label="Add Claim Source" @click="handleAddClaimSource" />
    </template>

    <template #default>
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :key="tableKey"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-billing_type="{ row: item }">
          {{ getBillingType(item.billing_type) }}

          <template v-if="item.has_medicare_concession">
            <br />
            <span class="badge badge-info opacity-50 mx-2"> CONCESSION </span>
          </template>
        </template>

        <template v-slot:cell-member_number="{ row: item }">
          {{ item.member_number }}
        </template>

        <template v-slot:cell-ref_number="{ row: item }">
          {{ item.member_reference_number ?? "N/A" }}
        </template>

        <template v-slot:cell-validated="{ row: item }">
          <div>
            <span
              v-if="item.verified_at != null"
              class="badge badge-success opacity-50 mx-2"
            >
              {{ moment(item.verified_at).format("DD-MM-YYYY") }}
            </span>

            <span v-else>Never</span>
          </div>

          <button
            class="btn btn-bg-light btn-active-color-primary btn-sm mt-2"
            @click="validateSource(item)"
          >
            Re-validate
          </button>
        </template>

        <template v-slot:cell-actions="{ row: item }">
          <div class="d-flex flex-column">
            <button
              class="btn btn-bg-light btn-active-color-primary btn-sm mt-2"
              @click="handleCollectingPerson(item)"
            >
              Update Details
            </button>

            <button
              class="btn btn-bg-danger btn-active-color-danger btn-sm mt-2"
              @click="handleCollectingPerson(item)"
            >
              Delete Source
            </button>
          </div>
        </template>
      </Datatable>
    </template>
  </CardSection>
</template>

<script>
import {
  defineComponent,
  ref,
  watchEffect,
  onMounted,
  computed,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PatientActions } from "@/store/enums/StorePatientEnums";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import MedicareUpdateDetailsModal from "@/views/patients/modals/MedicareUpdateDetailsModal.vue";
import IconButton from "@/components/presets/GeneralElements/IconButton.vue";
import { Modal } from "bootstrap";
import PatientBillingTypes from "@/core/data/patient-billing-types";

export default defineComponent({
  name: "patient-claim-sources",
  components: {
    // MedicareUpdateDetailsModal,
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
    const loading = ref(false);
    const tableHeader = ref([
      {
        name: "Source Type",
        key: "billing_type",
        sortable: true,
      },
      {
        name: "Member Number",
        key: "member_number",
        sortable: false,
      },
      {
        name: "Reference Number",
        key: "ref_number",
        sortable: false,
      },
      {
        name: "Last Validated",
        key: "validated",
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

    const renderTable = () => tableKey.value++;

    const getBillingType = (type) => {
      const foundType = PatientBillingTypes.find(
        (billing) => billing.value == type
      );

      return foundType?.label ?? null;
    };

    // const validateMedicare = () => {
    //   if (!formRefMedicare.value) {
    //     return;
    //   }

    //   formRefMedicare.value.validate((valid) => {
    //     if (valid) {
    //       const data = formData.value;

    //       loading.value.medicare = true;
    //       store
    //         .dispatch(PatientActions.BILLING.VALIDATE_MEDICARE, {
    //           first_name: selectedPatient.value.first_name,
    //           last_name: selectedPatient.value.last_name,
    //           date_of_birth: selectedPatient.value.date_of_birth,
    //           sex: 9,
    //           medicare_number: data.medicare_number,
    //           medicare_reference_number: data.medicare_reference_number,
    //           minor_id: "AUA00000",
    //         })
    //         .then(() => {
    //           const validation = store.getters.medicareValidationResponse;
    //           if (validation.data.verified) {
    //             validated.value.medicare = true;
    //           }

    //           if (!validation.data.verified) {
    //             validated.value.medicare = false;
    //             validationErrors.value.medicare = validation.data.message;
    //           }

    //           if (
    //             !Object.prototype.hasOwnProperty.call(
    //               validation.data.update_details
    //             )
    //           ) {
    //             for (const detail in validation.data.update_details) {
    //               switch (detail) {
    //                 case "givenName":
    //                   updateDetails.value.medicare.firstName = {
    //                     old: selectedPatient.value.firstName,
    //                     new: validation.data.update_details.givenName,
    //                     name: "First Name",
    //                   };
    //                   break;
    //                 case "familyName":
    //                   updateDetails.value.medicare.lastName = {
    //                     old: selectedPatient.value.lastName,
    //                     new: validation.data.update_details.familyName,
    //                     name: "Last Name",
    //                   };
    //                   break;
    //                 case "memberRefNumber":
    //                   updateDetails.value.medicare.referenceNumber = {
    //                     old: data.medicare_reference_number,
    //                     new: validation.data.update_details.memberRefNumber,
    //                     name: "Medicare Reference Number",
    //                   };
    //                   break;
    //               }
    //             }

    //             const modal = new Modal(
    //               document.getElementById("modal_update_patient_details")
    //             );
    //             modal.show();
    //           }
    //         })
    //         .catch((e) => {
    //           const errors = store.getters.getErrors;
    //           console.log(e);
    //           validated.value.medicare = false;
    //           if (
    //             Object.prototype.hasOwnProperty.call(errors, "errors") &&
    //             errors.errors.length >= 1
    //           ) {
    //             validationErrors.value.medicare = errors.errors[0];
    //           } else {
    //             validationErrors.value.medicare =
    //               "Unknown Error. Please try again.";
    //           }
    //         })
    //         .finally(() => {
    //           loading.value.medicare = false;
    //         });
    //     }
    //   });
    // };

    const validateSource = (item) => {
      let validationData = {};
      let endpoint;

      switch (item.billing_type) {
        case 1:
          // Medicare card
          validationData = {
            first_name: selectedPatient.value.first_name,
            last_name: selectedPatient.value.last_name,
            date_of_birth: selectedPatient.value.date_of_birth,
            sex: 9,
            medicare_number: data.medicare_number,
            medicare_reference_number: data.medicare_reference_number,
            minor_id: "AUA00000",
          };

          endpoint = PatientActions.BILLING.VALIDATE_MEDICARE;

          doValidation(endpoint, validationData);
      }
    };

    onMounted(() => {
      const id = route.params.id;
      store.dispatch(PatientActions.VIEW, id);
      setCurrentPageBreadcrumbs("Billing", ["Patients"]);
      store.dispatch(Actions.HEALTH_FUND.LIST);
    });

    watchEffect(() => {
      tableData.value = selectedPatient.value?.billing ?? [];
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
      getBillingType,
      moment,
    };
  },
});
</script>
