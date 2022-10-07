<template>
  <ModalWrapper
    title="Assign Appointments"
    modalId="assign_appointment"
    :updateRef="updateRef"
  >
    <div class="row g-8">
      <Datatable
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="5"
        :key="tableKey"
        :loading="loading"
        :enable-items-per-page-dropdown="true"
      >
        <template v-slot:cell-full_name="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            <button
              @click="handleAssign(item)"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <span class="svg-icon svg-icon-3">
                <i class="bi bi-check-circle"></i>
              </span>
            </button>
            {{ item.first_name }} {{ item.last_name }}
          </span>
        </template>
        <template v-slot:cell-dob="{ row: item }">
          <span class="text-dark fw-bolder text-hover-primary mb-1 fs-6">
            {{ new Date(item.date_of_birth).toLocaleDateString("en-AU") }}
          </span>
        </template>
        <template v-slot:cell-contact_number="{ row: item }">
          {{ item.mobile_number }}
        </template>
      </Datatable>
    </div>
  </ModalWrapper>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { DocumentActions } from "@/store/enums/StoreDocumentEnums";
import { hideModal } from "@/core/helpers/dom";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { AppointmentActions } from "@/store/enums/StoreAppointmentEnums";

export default defineComponent({
  components: {
    Datatable,
  },
  name: "assign-specialist-modal",
  props: {
    document: { type: Object, required: true },
    handleSetSelectedDocument: { type: Function, required: true },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const list = computed(() => store.getters.getAptList);
    const selectedDocument = computed(() => props.document);
    const documentId = computed(() => props.document.id);
    const documentType = computed(() => props.document.document_type);
    const documentName = computed(() => props.document.document_name);
    const loading = ref(false);
    const assignAppointmentModalRef = ref(null);

    const filter = reactive({
      first_name: "",
      last_name: "",
      date_of_birth: "",
    });

    const tableHeader = ref([
      {
        name: "Full Name",
        key: "full_name",
        sortable: true,
        searchable: true,
      },
      {
        name: "Date of Birth",
        key: "dob",
        sortable: true,
        searchable: true,
      },
      {
        name: "Contact Number",
        key: "contact_number",
        sortable: true,
        searchable: true,
      },
    ]);

    const tableData = ref([]);
    const tableKey = ref(0);
    const renderTable = () => tableKey.value++;
    const clearFilters = () => {
      filter.first_name = "";
      filter.last_name = "";
      filter.date_of_birth = "";
      renderTable();
    };

    const searchAppointments = (params) => {
      loading.value = true;
      store.dispatch(AppointmentActions.LIST, params).then(() => {
        loading.value = false;
      });
    };

    const updateRef = (_ref) => {
      assignAppointmentModalRef.value = _ref;
    };

    const handleAssign = (specialist_id) => {
      store
        .dispatch(DocumentActions.UPDATE, {
          specialist_id: specialist_id.id,
          document_id: documentId.value,
          document_type: documentType.value,
          document_name: documentName.value,
        })
        .then(() => {
          clearFilters();
          tableData.value = [];
          renderTable();
          store
            .dispatch(DocumentActions.LIST, {
              is_missing_information: 1,
              origin: "RECEIVED",
            })
            .then(() => {
              setTimeout(() => {
                props.handleSetSelectedDocument();
                hideModal(assignAppointmentModalRef.value);
              }, 200);
            });
        });
    };

    watch(list, () => {
      tableData.value = list.value;
      renderTable();
    });

    watch(selectedDocument, () => {
      selectedDocument.value &&
        selectedDocument.value.patient &&
        searchAppointments({
          patient_id: selectedDocument.value.patient.id,
        });
    });

    return {
      filter,
      searchAppointments,
      clearFilters,
      assignAppointmentModalRef,
      updateRef,
      tableKey,
      tableHeader,
      tableData,
      loading,
      handleAssign,
      selectedDocument,
    };
  },
});
</script>
