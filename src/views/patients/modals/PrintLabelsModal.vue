<template>
  <ModalWrapper title="Print Label" modalId="print_label" width="227px">
    Print Labels for {{ patient.full_name }}
    <div>
      <label>{{ patient.last_name }}</label>
      <label>{{ "DOB: " + patient.date_of_birth }}</label>
    </div>
    <div>
      <label>{{ patient.first_name }}</label>
      <label>{{ patient.id }}</label>
    </div>
    <div>
      <label>{{ patient.address }}</label>
    </div>
    <div>
      <label>{{
        patient.suburb + ", " + patient.postcode + ", " + patient.birth_state
      }}</label>
    </div>
    <div>
      <label>{{ "Ref Doc: " + referral.doctor_address_book_name }}</label>
    </div>
    <div>
      <label>{{ "M/C #: " }}</label>
    </div>
    <div>
      <label>{{ patient.last_name }}</label>
    </div>
    <div>
      <label>{{
        patient.contact_number +
        ", " +
        patient.int_contact_number +
        ", " +
        patient.kin_phone_number
      }}</label>
    </div>
  </ModalWrapper>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "patient-print-label-modal",
  props: {
    patient: { type: Object, required: true },
    referral: { type: Object, required: true },
  },
  setup(props) {
    console.log(props);
  },
});
</script>
