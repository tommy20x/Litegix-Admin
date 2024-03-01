<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-12">
      <div class="card card-xxl-stretch mb-5 mb-xl-8">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1"
              >Subscription Plans</span
            >
          </h3>

          <div
            class="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <router-link
              to="/plans/create"
              class="btn btn-sm btn-light-primary"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              New Subscription
            </router-link>
          </div>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body py-3">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="
                table table-row-dashed table-row-gray-300
                align-middle
                gs-0
                gy-4
              "
            >
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bolder text-muted">
                  <th class="w-25px">
                    <div
                      class="
                        form-check
                        form-check-sm
                        form-check-custom
                        form-check-solid
                      "
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="1"
                      />
                    </div>
                  </th>
                  <th class="min-w-150px">Name</th>
                  <th class="min-w-150px">Price</th>
                  <th class="min-w-150px">Last Date</th>
                  <th class="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="(item, index) in plans" :key="index">
                  <tr>
                    <td>
                      <div
                        class="
                          form-check
                          form-check-sm
                          form-check-custom
                          form-check-solid
                        "
                      >
                        <input
                          class="form-check-input widget-9-check"
                          type="checkbox"
                          :value="index"
                        />
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-start flex-column">
                          <span
                            class="text-dark fw-bolder text-hover-primary fs-6"
                          >
                            {{ item.name }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td class="text-end">
                      <div class="d-flex flex-column w-100 me-2">
                        <div class="d-flex flex-stack mb-2">
                          <span
                            class="text-dark fw-bolder text-hover-primary fs-6"
                          >
                            {{ item.price }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        class="text-dark fw-bolder text-hover-primary fs-6"
                        >{{ item.updatedAt }}</span
                      >
                    </td>

                    <td class="text-end">
                      <router-link
                        to="/plans/edit"
                        class="
                          btn
                          btn-icon
                          btn-bg-light
                          btn-active-color-primary
                          btn-sm
                          me-1
                        "
                      >
                        <span class="svg-icon svg-icon-3">
                          <inline-svg
                            src="media/icons/duotune/art/art005.svg"
                          />
                        </span>
                      </router-link>

                      <a
                        href="#"
                        class="
                          btn
                          btn-icon
                          btn-bg-light
                          btn-active-color-primary
                          btn-sm
                        "
                        v-on:click="deletePlan($event, item)"
                      >
                        <span class="svg-icon svg-icon-3">
                          <inline-svg
                            src="media/icons/duotune/general/gen027.svg"
                          />
                        </span>
                      </a>
                    </td>
                  </tr>
                </template>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--begin::Body-->
      </div>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { showConfirmMsgbox, showSuccessMsgbox } from "@/views/msgbox.js";

interface Plan {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "plans",
  components: {},
  setup() {
    const store = useStore();

    const plans = ref<Plan[]>([]);

    const deletePlan = (e: Event, plan) => {
      e.preventDefault();

      showConfirmMsgbox("Do you want to delete the plan?").then((res) => {
        if (res.isConfirmed) {
          store
            .dispatch(Actions.DELETE_PLAN, plan.id)
            .then((data) => {
              console.log("delete", data);
              showSuccessMsgbox("Plan has been successfully deleted!").then(
                () => {
                  const index = plans.value.findIndex((x) => x.id === plan.id);
                  if (index >= 0) {
                    plans.value.splice(index, 1);
                  }
                }
              );
            })
            .catch((data) => {
              console.error("error", data);
            });
        }
      });
    };

    const getPlans = () => {
      store
        .dispatch(Actions.PLAN_LIST)
        .then((data) => {
          plans.value = data.plans;
          console.log("plans", data.plans);
        })
        .catch((data) => {
          console.error("error", data);
        });
    };

    onMounted(() => {
      setCurrentPageTitle("Plans");
      getPlans();
    });

    return {
      plans,
      deletePlan,
    };
  },
});
</script>
