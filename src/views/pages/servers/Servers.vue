<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-12">
      <div class="card card-xxl-stretch mb-5 mb-xl-8">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Servers</span>

            <span class="text-muted mt-1 fw-bold fs-7"
              >Total {{ totalCount }} servers</span
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
              to="/servers/create"
              class="btn btn-sm btn-light-primary"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              New User
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
                  <th class="min-w-140px">Address</th>
                  <th class="min-w-120px">Web Server</th>
                  <th class="min-w-120px">Database</th>
                  <th class="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="(server, index) in serverList" :key="index">
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
                        <!-- <div class="symbol symbol-45px me-5">
                          <img :src="item.image" alt="" />
                        </div> -->
                        <div class="d-flex justify-content-start flex-column">
                          <a
                            class="text-dark fw-bolder text-hover-primary fs-6"
                            >{{ server.name }}</a
                          >

                          <span
                            class="text-muted fw-bold text-muted d-block fs-7"
                            >{{ server.skills }}</span
                          >
                        </div>
                      </div>
                    </td>

                    <td class="text-end">
                      <div class="d-flex flex-column w-100 me-2">
                        <div class="d-flex flex-stack mb-2">
                          <span class="text-muted me-2 fs-7 fw-bold">
                            {{ server.address }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <a
                        href="#"
                        class="
                          text-dark
                          fw-bolder
                          text-hover-primary
                          d-block
                          fs-6
                        "
                        >{{ server.webserver }}</a
                      >
                    </td>

                    <td>
                      <a
                        href="#"
                        class="
                          text-dark
                          fw-bolder
                          text-hover-primary
                          d-block
                          fs-6
                        "
                        >{{ server.database }}</a
                      >
                    </td>

                    <td class="text-end">
                      <a
                        href="#"
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
                            src="media/icons/duotune/general/gen019.svg"
                          />
                        </span>
                      </a>

                      <router-link :to="getEditUrl(server)" :class="iconClass">
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
                        v-on:click="deleteServer($event, server)"
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

          <Pagination
            :page="pageNumber"
            :size="pageSize"
            :total="totalCount"
            @update="updatePage"
          />
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
import Pagination from "@/components/Pagination.vue";
import { showConfirmMsgbox, showSuccessMsgbox } from "@/views/msgbox";

export default defineComponent({
  name: "servers",
  components: {
    Pagination,
  },

  setup() {
    const store = useStore();

    const serverList = ref([]);
    const pageNumber = ref(1);
    const pageSize = ref(5);
    const totalCount = ref(0);
    const iconClass = ref(
      "btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
    );

    const updatePage = (page: number) => {
      console.log("updatePage", page);

      store
        .dispatch(Actions.SERVER_LIST, {
          page: page,
          size: 5,
        })
        .then((data) => {
          serverList.value = data.data.servers;
          totalCount.value = data.data.total;
          pageNumber.value = data.data.page;
        })
        .catch((data) => {
          console.error("error", data.data);
        });
    };

    const deleteServer = (e: Event, server) => {
      e.preventDefault();

      showConfirmMsgbox("Do you want to suspend selected server?").then(
        (res) => {
          if (res.isConfirmed) {
            store
              .dispatch(Actions.DELETE_SERVER, server.id)
              .then((data) => {
                console.log("delete", data);
                showSuccessMsgbox("Server has been successfully deleted!");
              })
              .catch((data) => {
                console.error("error", data);
              });
          }
        }
      );
    };

    const getEditUrl = (server) => {
      return `/servers/edit/${server.id}`;
    };

    onMounted(() => {
      setCurrentPageTitle("Servers");
      updatePage(1);
    });

    return {
      serverList,
      totalCount,
      pageNumber,
      pageSize,
      iconClass,
      updatePage,
      deleteServer,
      getEditUrl,
    };
  },
});
</script>
