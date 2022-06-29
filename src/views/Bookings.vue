<template>
  <div class="row">
    <div class="card card-flush">
      <div class="card-header">
        <div class="card-title">
          <span>SEARCH NEXT AVAILABLE APPOINTMENT</span>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-2">
          <el-select
            class="col-4"
            v-model="procedure"
            placeholder="Select Procedure Type/Consultation"
          ></el-select>
        </div>
        <div class="row">
          <div class="col-md-4">
            <VueCtkDateTimePicker
              :format="format"
              v-model="filterData.date"
              inline="false"
              noKeyboard
              onlyDate
            />
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>AVAILABLE SPECAILIST</span>
                </div>
              </div>
              <div class="card-body card-scroll h-300px">
                <div class="d-flex flex-column">
                  <el-checkbox-group
                    v-model="filterData.specialists"
                    class="d-flex flex-column"
                  >
                    <template
                      v-for="(item, index) in specialist_ava"
                      :key="index"
                    >
                      <el-checkbox
                        size="large"
                        :value="item.id"
                        :label="item.name + item.first_name"
                      />
                    </template>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <button class="btn btn-primary w-100 mt-2">SEARCH</button>
          </div>
          <div class="col-md-4">
            <div class="card border border-dashed border-primary">
              <div class="card-header">
                <div class="card-title">
                  <span>SPECAILIST REQUIREMENTS</span>
                </div>
              </div>
              <div class="card-body card-scroll h-300px">
                <div class="d-flex flex-column">
                  <el-checkbox size="large" label="DR AARON THORNTON" />
                  <el-checkbox size="large" label="DR ANTONY JACOB" />
                </div>
              </div>
            </div>
            <button class="btn btn-light-primary w-100 mt-2">
              CLEAR FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-5">
    <div class="card-body">
      <div style="overflow-x: scroll">
        <table class="table align-middle gs-0 gy-4 my-0 booking-table-header">
          <thead>
            <tr
              class="fw-bolder center-row text-white"
              style="background: #1e90ff"
            >
              <th
                class="cell-120px border-0"
                style="position: relative; left: 0px"
              ></th>
              <th class="cell-35px border-0"></th>
              <th colspan="7" class="text-xxl-center text-xl-left border-0">
                Casey Day Procedure & Specialist Centre (Mon, Jun 27)
              </th>
            </tr>
            <tr class="bg-light-warning doctor-row text-center text-primary">
              <th class="cell-120px" style="position: relative; left: 0px"></th>
              <th class="cell-35px"></th>
              <th colspan="1" class="fw-bolder" style="min-width: 441px">
                DR ELHAM AMINI
              </th>
              <th colspan="2" class="fw-bolder" style="min-width: 476px">
                DR ELHAM AMINI
              </th>
              <th colspan="2" class="fw-bolder" style="min-width: 476px">
                DR ELHAM AMINI
              </th>
              <th colspan="2" class="fw-bolder" style="min-width: 476px">
                DR ELHAM AMINI
              </th>
            </tr>
          </thead>
        </table>
        <div
          style="
            max-height: 300px;
            overflow: scroll visible;
            width: max-content;
            min-width: 100%;
          "
        >
          <table
            class="booking-table-body table align-middle gs-0 gy-4 my-0 bg-light"
          >
            <tbody>
              <template v-for="index in 10" :key="index">
                <tr class="text-center">
                  <td
                    class="cell-120px bg-white"
                    style="position: relative; left: 0px"
                  >
                    07:00 AM
                  </td>
                  <td class="cell-35px bg-white">
                    <a
                      class="cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_create_patient"
                    >
                      <i class="fa fa-plus text-primary"></i>
                    </a>
                  </td>
                  <td style="min-width: 441px"></td>
                  <td class="cell-35px bg-white"></td>
                  <td
                    style="min-width: 441px"
                    :class="index % 3 === 0 ? 'bg-primary' : ''"
                  >
                    <span class="text-white" v-if="index % 3 === 0"
                      >MONICA BADOV +61 423 012 796</span
                    >
                  </td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                  <td class="cell-35px bg-white"></td>
                  <td style="min-width: 441px"></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    class="d-flex justify-content-xxl-evenly justify-content-xl-between mt-5"
  >
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen056.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> BOOK </span>
          <span class="text-gray-400 fw-bold fs-6">ANAESTHETIST</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-success border border-success shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen055.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> EDIT </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
    <a>
      <label
        class="btn btn-light-danger border border-danger shadow p-8 d-flex align-items-center mb-10"
        for="kt_create_account_form_account_type_personal"
      >
        <span class="svg-icon svg-icon-3x me-5">
          <inline-svg src="media/icons/duotune/general/gen027.svg" />
        </span>

        <!--begin::Info-->
        <span class="d-block fw-bold text-start">
          <span class="text-dark fw-bolder d-block fs-4 mb-2"> CANCEL </span>
          <span class="text-gray-400 fw-bold fs-6">APPOINTMENT</span>
        </span>
        <!--end::Info-->
      </label>
    </a>
  </div>
  <CreateModal></CreateModal>
</template>
<script>
import { defineComponent, ref, watch, reactive } from "vue";
import CreateModal from "@/components/booking/CreatePatient.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import moment from "moment";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "bookings-dashboard",
  components: {
    VueCtkDateTimePicker,
    CreateModal,
  },
  setup() {
    const format = ref("YYYY-MM-DD");
    const filterData = reactive({
      date: new Date(),
      specialists: [],
    });

    const _Specialist = ref([
      "DR DAVID BADOV",
      "DR CHAMARA BASNAYAKE",
      "DR STUART ROBERTS",
    ]);

    const specialist_ava = ref([]);

    const handleSearch = () => {
      console.log("search");
    };

    watch(_Specialist, () => {
      console.log(_Specialist.value);
    });

    watch(filterData, () => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.query("work-hours", { params: filterData })
          .then(({ data }) => {
            specialist_ava.value = data.data;
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            // this.context.commit(Mutations.PURGE_AUTH);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    });

    return {
      format,
      filterData,
      _Specialist,
      specialist_ava,
      handleSearch,
    };
  },
});
</script>

<style>
.cell-35px {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
}

.cell-120px {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
}

.booking-table-body td,
.booking-table-body th {
  border: 1px dashed gray;
}

.booking-table-header tr:first-child th:first-child {
  border-radius: 50px 0 0 0;
}

.booking-table-header tr:first-child th:last-child {
  border-radius: 0 50px 0 0;
}
</style>
