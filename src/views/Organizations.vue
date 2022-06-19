<template>
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        svg-icon="media/icons/duotune/graphs/gra005.svg"
        color="success"
        icon-color="white"
        :title="'Total : ' + list.length + ' Members'"
        description="Total Organization"
      />
    </div>

    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        svg-icon="media/icons/duotune/ecommerce/ecm002.svg"
        color="danger"
        icon-color="white"
        title="Shopping Cart"
        description="Lands, Houses, Ranchos, Farms"
      />
    </div>

    <div class="col-xl-4">
      <StatsisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        svg-icon="media/icons/duotune/ecommerce/ecm008.svg"
        color="primary"
        icon-color="white"
        title="Appartments"
        description="Flats, Shared Rooms, Duplex"
      />
    </div>
  </div>
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Organizations</span>
        <span class="text-muted mt-1 fw-bold fs-7"
          >{{ list.length }} Members</span
        >
      </h3>
      <div class="card-toolbar">
        <router-link to="/organizations/create" class="btn btn-light-primary">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          Add
        </router-link>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-3">
      <div class="tab-content">
        <!--begin::Tap pane-->
        <div class="tab-pane fade active show" id="kt_table_widget_5_tab_1">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/svg/brand-logos/plurk.svg"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >Brad Simmons</a
                    >
                    <span class="text-muted fw-bold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-bold">React, HTML</td>
                  <td class="text-end">
                    <span class="badge badge-light-success">Approved</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: -->
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/svg/brand-logos/telegram.svg"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >Popular Authors</a
                    >
                    <span class="text-muted fw-bold d-block"
                      >Most Successful</span
                    >
                  </td>
                  <td class="text-end text-muted fw-bold">Python, MySQL</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: -->
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/svg/brand-logos/vimeo.svg"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >New Users</a
                    >
                    <span class="text-muted fw-bold d-block"
                      >Awesome Users</span
                    >
                  </td>
                  <td class="text-end text-muted fw-bold">Laravel,Metronic</td>
                  <td class="text-end">
                    <span class="badge badge-light-primary">Success</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/svg/brand-logos/bebo.svg"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >Active Customers</a
                    >
                    <span class="text-muted fw-bold d-block"
                      >Movie Creator</span
                    >
                  </td>
                  <td class="text-end text-muted fw-bold">AngularJS, C#</td>
                  <td class="text-end">
                    <span class="badge badge-light-danger">Rejected</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                      <span class="svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                      <!--end::Svg Icon-->
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="symbol symbol-45px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/svg/brand-logos/kickstarter.svg"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >Bestseller Theme</a
                    >
                    <span class="text-muted fw-bold d-block"
                      >Best Customers</span
                    >
                  </td>
                  <td class="text-end text-muted fw-bold">ReactJS, Ruby</td>
                  <td class="text-end">
                    <span class="badge badge-light-warning">In Progress</span>
                  </td>
                  <td class="text-end">
                    <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <span class="svg-icon svg-icon-2">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                        <inline-svg
                          src="media/icons/duotune/arrows/arr064.svg"
                        />
                        <!--end::Svg Icon-->
                      </span>
                    </a>
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <!--end::Table-->
        </div>
        <!--end::Tap pane-->
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import StatsisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export default defineComponent({
  name: "organization-main",

  components: {
    StatsisticsWidget5,
  },

  setup() {
    const list = [
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
      {
        organizations: "PAUL",
        username: "test-paul",
        email: "paul@email.com",
        status: {
          label: "Enabled",
          state: "success",
        },
      },
      {
        organizations: "KEVIN",
        username: "test-kevin",
        email: "kevin@email.com",
        status: {
          label: "Disabled",
          state: "danger",
        },
      },
    ];

    onMounted(() => {
      setCurrentPageTitle("Organizations");
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("organizations")
          .then(({ data }) => {
            console.log(data);
          })
          .catch(({ response }) => {
            console.log(response.data.error);
          });
      } else {
        // this.context.commit(Mutations.PURGE_AUTH);
      }
    });
    return { list };
  },
});
</script>
