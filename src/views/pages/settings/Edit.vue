<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Edit User</h3>
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
        @submit="createUser()"
        :validation-schema="userDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Username</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="username"
                class="form-control form-control-lg form-control-solid"
                placeholder="User name"
                v-model="userDetails.username"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="username" />
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
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="email"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Email"
                v-model="userDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
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
              >Password</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="password"
                name="password"
                class="form-control form-control-lg form-control-solid"
                placeholder="Password"
                v-model="userDetails.password"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Company</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="company"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company name"
                v-model="userDetails.company"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Country</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="country"
                class="form-select form-select-solid form-select-lg fw-bold"
                v-model="userDetails.country"
              >
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="country.v"
                >
                  {{ country.t }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6"
              >Time Zone</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="timezone"
                class="form-select form-select-solid form-select-lg"
                v-model="userDetails.timezone"
              >
                <option
                  v-for="(timezone, index) in timezones"
                  :key="index"
                  :data-bs-offset="timezone.o"
                  :value="timezone.v"
                >
                  {{ timezone.t }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="timezone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Currency</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="currency"
                class="form-select form-select-solid form-select-lg"
                v-model="userDetails.currency"
              >
                <option data-kt-flag="flags/united-states.svg" value="USD">
                  <b>USD</b>&#160;-&#160;USA dollar
                </option>
                <option data-kt-flag="flags/united-kingdom.svg" value="GBP">
                  <b>GBP</b>&#160;-&#160;British pound
                </option>
                <option data-kt-flag="flags/australia.svg" value="AUD">
                  <b>AUD</b>&#160;-&#160;Australian dollar
                </option>
                <option data-kt-flag="flags/japan.svg" value="JPY">
                  <b>JPY</b>&#160;-&#160;Japanese yen
                </option>
                <option data-kt-flag="flags/sweden.svg" value="SEK">
                  <b>SEK</b>&#160;-&#160;Swedish krona
                </option>
                <option data-kt-flag="flags/canada.svg" value="CAD">
                  <b>CAD</b>&#160;-&#160;Canadian dollar
                </option>
                <option data-kt-flag="flags/switzerland.svg" value="CHF">
                  <b>CHF</b>&#160;-&#160;Swiss franc
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="currency" />
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
            <span class="indicator-label"> Save </span>
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
import { useRoute } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

interface User {
  email: string;
  username: string;
  password: string;
  company: string;
  country: string;
  timezone: string;
  currency: string;
}

export default defineComponent({
  name: "user-edit",
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = route.params.userId;

    const submitButton = ref<HTMLElement | null>(null);

    const userDetailsValidator = Yup.object().shape({
      email: Yup.string().required().email().label("Email"),
      username: Yup.string().required().label("Username"),
      company: Yup.string().label("Company"),
      country: Yup.string().required().label("Country"),
      timezone: Yup.string().label("Timezone"),
      currency: Yup.string().required().label("Currency"),
    });

    const userDetails = ref<User>({
      email: "",
      username: "",
      password: "",
      company: "",
      country: "IN",
      timezone: "Kuala Lumpur",
      currency: "USD",
    });

    const createUser = () => {
      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");

        store
          .dispatch(Actions.CREATE_USER, userDetails.value)
          .then((data) => {
            console.log("success", data);

            Swal.fire({
              text: "User has successfuly created",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          })
          .catch((data) => {
            console.error("error", data);
          })
          .finally(() => {
            submitButton.value?.removeAttribute("data-kt-indicator");
          });
      }
    };

    const countries = ref([]);
    const timezones = ref([]);

    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit", ["Users"]);

      store
        .dispatch(Actions.NEW_USER)
        .then((data) => {
          countries.value = data.countries;
          timezones.value = data.timezones;
        })
        .catch((data) => {
          console.error("error", data);
        });

      store
        .dispatch(Actions.GET_USER)
        .then((data) => {
          userDetails.value = data.user;
        })
        .catch((data) => {
          console.error("error", data);
        });
    });

    return {
      submitButton,
      createUser,
      countries,
      timezones,
      userDetails,
      userDetailsValidator,
    };
  },
});
</script>
