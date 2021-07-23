<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">
            Sign up
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Need an account?
            </router-link>
          </p>

          <app-validate-errors
            v-if="validateErrors"
            :validateErrors="validateErrors"
          />

          <form
            class="ng-pristine ng-valid ng-valid-email"
            @submit.prevent="submit"
          >
            <fieldset ng-disabled="$ctrl.isSubmitting">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :disabled="isSubmitting"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :disabled="isSubmitting"
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
                :disabled="isSubmitting"
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import AppValidateErrors from "@/components/ValidateErrors";

export default {
  name: "AppLogin",
  components: {
    AppValidateErrors
  },
  data() {
    return {
      email: "",
      password: "",
      validateErrors: null,
      isSubmitting: false
    };
  },
  methods: {
    submit() {
      this.isSubmitting = true;
      axios
        .post("users/login", {
          user: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$store.commit("setCurrenUser", response.data.user);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          this.validateErrors = error.response.data.errors;
          this.isSubmitting = false;
        });
    }
  }
};
</script>
