<template>
  <ModalWrapper
    :title="modalTitle"
    modalId="payment_item"
    modalRef="paymentItemModalRef"
    :static="true"
  >
    <el-form
      @submit.prevent
      :model="formData"
      :rules="rules"
      ref="paymentItemModalFormRef"
    >
      <div class="row justify-content-md-center">
        <InputWrapper label="Item" prop="schedule_item_id">
          <el-select
            class="w-100"
            v-model="formData.schedule_item_id"
            placeholder="Select Item"
            :disabled="mode === 'edit'"
          >
            <el-option
              v-for="(item, index) in availableItems"
              :key="`item-modal-select-option-${index}`"
              :value="item.id"
              :label="item.name ?? item.description"
            />
          </el-select>
        </InputWrapper>

        <InputWrapper label="Price" prop="price">
          <!-- <el-input
            type="text"
            v-model="formData.price"
            placeholder="Enter price"
          /> -->
          <CurrencyInput v-model="formData.price" placeholder="Enter price" />
        </InputWrapper>
      </div>
    </el-form>

    <div class="d-flex justify-content-end">
      <button
        v-if="mode === 'edit'"
        class="btn btn-lg btn-danger me-2"
        @click="handleDelete"
      >
        Delete
      </button>

      <button
        class="btn btn-lg btn-primary me-2"
        :disabled="!formData.schedule_item_id || !formData.price"
        @click="submitItem"
      >
        {{ mode === "add" ? "Add Item" : "Update" }}
      </button>

      <button
        class="btn btn-lg btn-secondary"
        data-bs-dismiss="modal"
        type="submit"
      >
        Cancel
      </button>
    </div>
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
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import { Modal } from "bootstrap";

export default defineComponent({
  name: "payment-item-modal",
  props: {
    item: { type: Object },
  },
  emits: ["submitItem", "closeModal", "deleteItem"],
  setup(props, { emit }) {
    const store = useStore();
    const item = computed(() => props.item);
    const paymentItemModalRef = ref(null);
    const paymentItemModalFormRef = ref(null);
    const formData = ref({
      schedule_item_id: null,
      price: null,
    });
    const loading = ref(false);
    const mode = ref("add");
    const category = ref("");
    const scheduleItems = computed(() => store.getters.scheduleItemList);

    const rules = ref({
      billing_type: [
        {
          required: true,
          message: "Must select claim source type",
          trigger: "change",
        },
      ],
      member_number: [
        {
          required: true,
          message: "Member number cannot be blank",
          trigger: "change",
        },
      ],
      member_reference_number: [
        {
          required: false,
          message: "Member reference number cannot be blank",
          trigger: "change",
        },
      ],
    });

    const closeModal = () => {
      emit("closeModal");
    };

    const resetForm = () => {
      paymentItemModalFormRef.value.resetFields();
    };

    const handleDelete = () => {
      Swal.fire({
        text: `Are you sure you want to delete this item?`,
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
          emit("deleteItem");
          closeModal();
        }
      });
    };

    const submitItem = () => {
      const selectedItem = scheduleItems.value.find(
        (item) => item.id === formData.value.schedule_item_id
      );
      const data = {
        ...selectedItem,
        price: formData.value.price,
      };

      emit("submitItem", data);
    };

    const modalTitle = computed(() => {
      let title = mode.value === "add" ? "Add " : "Edit ";

      switch (category.value) {
        case "procedures":
          title += "MBS Procedure";
          break;
        case "extra_items":
          title += "Extra MBS Item";
          break;
        case "admin_items":
          title += "Non-MBS Item";
          break;
      }

      return title;
    });

    const availableItems = computed(() => {
      const isMbs = category.value !== "admin_items";

      return scheduleItems.value.filter((item) => {
        if (isMbs) {
          return item.mbs_code !== null;
        }

        return item.mbs_code === null;
      });
    });

    watch(
      () => item,
      () => {
        resetForm();

        formData.value.schedule_item_id = item.value.item?.id;
        formData.value.price = item.value.item?.price;
        mode.value = item.value.mode;
        category.value = item.value.category;
      },
      { deep: true }
    );

    watch(
      () => formData.value.schedule_item_id,
      (value) => {
        if (value) {
          const selectedItem = scheduleItems.value.find(
            (item) => item.id === value
          );

          // amounts are stored in cents, but we want the value
          // in the textbox to be dollars
          formData.value.price = selectedItem?.amount / 100;
        }
      }
    );

    onMounted(() => {
      store.dispatch(Actions.SCHEDULE_ITEM.LIST);
    });

    return {
      store,
      paymentItemModalRef,
      paymentItemModalFormRef,
      formData,
      loading,
      rules,
      closeModal,
      modalTitle,
      mode,
      availableItems,
      handleDelete,
      submitItem,
    };
  },
});
</script>
