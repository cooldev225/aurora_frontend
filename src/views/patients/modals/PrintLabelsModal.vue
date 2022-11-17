<template>
  <ModalWrapper title="Print Label" modalId="print_label" width="227px">
    <div class="print-preview-box mb-4">
      <div class="d-flex justify-content-between fw-bolder">
        <label>{{ patient.last_name }}</label>
      </div>
      <div class="d-flex justify-content-between fw-bold">
        <label>{{ patient.first_name }}</label>
        <label>{{
          "DOB: " +
          moment(patient.date_of_birth).format("DD/MM/YYYY") +
          " " +
          genders.filter((g) => g.value === patient.gender)[0].label.charAt(0)
        }}</label>
      </div>
      <div class="d-flex justify-content-between">
        <label>{{ patient.address }}</label>
        <label class="fw-bold">{{ patient.id }}</label>
      </div>
      <div>
        <label>{{
          patient.suburb + ", " + patient.postcode + ", " + patient.birth_state
        }}</label>
      </div>
      <div>
        <label class="fw-bold">{{
          "Ref Doc: " + referral.doctor_address_book_name
        }}</label>
      </div>
      <div>
        <label class="fw-bold">{{
          referral.doctor_address_book.address
        }}</label>
      </div>
      <div>
        <label>{{
          "M/C #: " +
          patient.medicare_details.medicare_no +
          " - " +
          patient.medicare_details.medicare_reference_no
        }}</label>
      </div>
      <div>
        <label class="fw-bold fit" style="word-spacing: '0.1rem'">{{
          "(H) " +
          patient.contact_number +
          " (M) " +
          patient.int_contact_number +
          " (W) " +
          patient.kin_phone_number
        }}</label>
      </div>
    </div>
    <div class="modal-footer flex-center">
      <button class="btn btn-lg btn-primary" type="button">Print</button>
    </div>
  </ModalWrapper>
</template>
<style lang="scss">
.print-preview-box {
  word-spacing: 0.5rem;
  font-weight: 300 !important;
  font-size: 1.2rem;
  & > .fw-bolder {
    font-size: 1.8rem;
    font-weight: 700 !important;
  }
  & > .fw-bold {
    font-weight: 700 !important;
    word-spacing: 1rem;
  }
  & > .fw-bold.fit {
    word-spacing: 0.1rem;
  }
}
</style>
<script>
import { defineComponent } from "vue";
import genders from "@/core/data/genders";
import moment from "moment";

export default defineComponent({
  name: "patient-print-label-modal",
  props: {
    patient: { type: Object, required: true },
    referral: { type: Object, required: true },
  },
  setup(props) {
    return {
      genders,
      moment,
    };
  },
});
</script>
