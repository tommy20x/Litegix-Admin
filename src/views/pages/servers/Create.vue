<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Create New Server</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="createServer()"
        :validation-schema="serverDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Name"
                v-model="serverDetails.name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Address</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="address"
                class="form-control form-control-lg form-control-solid"
                placeholder="Address"
                v-model="serverDetails.address"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Web Server</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="webserver"
                class="form-select form-select-solid form-select-lg"
                v-model="serverDetails.webserver"
              >
                <option
                  v-for="(ws, index) in webservers"
                  :key="index"
                  :value="ws.value"
                >
                  {{ ws.text }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="webserver" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Database</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="database"
                class="form-select form-select-solid form-select-lg"
                v-model="serverDetails.database"
              >
                <option
                  v-for="(item, index) in databases"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="database" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >PHP Version</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="phpVersion"
                class="form-select form-select-solid form-select-lg"
                v-model="serverDetails.phpVersion"
              >
                <option
                  v-for="(item, index) in phpVersions"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phpVersion" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <!-- <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            Reset
          </button> -->

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Create</span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </Form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { showErrorMsgbox } from "@/views/msgbox";

interface Server {
  name: string;
  address: string;
  webserver: string;
  database: string;
  phpVersion: string;
}

export default defineComponent({
  name: "server-create",
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const submitButton = ref<HTMLElement | null>(null);

    const serverDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      address: Yup.string().required().label("Address"),
      webserver: Yup.string().label("Web Server"),
      database: Yup.string().required().label("Database"),
      phpVersion: Yup.string().required().label("PHP Version"),
    });

    const serverDetails = ref<Server>({
      name: "",
      address: "",
      webserver: "",
      database: "",
      phpVersion: "",
    });

    const createServer = () => {
      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");

        store
          .dispatch(Actions.CREATE_SERVER, serverDetails.value)
          .then((data) => {
            console.log("success", data);

            Swal.fire({
              text: "Server has successfully created",
              icon: "success",
              buttonStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          })
          .catch((data) => {
            console.error("error", data);
            showErrorMsgbox("Server name or address has already been taken!");
          })
          .finally(() => {
            submitButton.value?.removeAttribute("data-kt-indicator");
          });
      }
    };

    const webservers = ref([]);
    const phpVersions = ref([]);
    const databases = ref([]);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Create", ["Servers"]);

      store
        .dispatch(Actions.NEW_SERVER)
        .then((data) => {
          webservers.value = data.webservers;
          phpVersions.value = data.php_versions;
          databases.value = data.databases;
          console.log("data", data);
        })
        .catch((data) => {
          console.error("error", data);
        });
    });

    return {
      submitButton,
      webservers,
      phpVersions,
      databases,
      createServer,
      serverDetails,
      serverDetailsValidator,
    };
  },
});
</script>
