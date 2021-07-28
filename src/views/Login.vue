<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">
            Sign up
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
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
            <fieldset>
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
import AppValidateErrors from "@/components/ValidateErrors";
import { loginUser } from "@/api/api";

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
      loginUser(this.email, this.password)
        .then(user => {
          this.$store.dispatch("authorize", user);
          this.$router.push({ name: "home" });
        })
        .catch(errors => {
          this.validateErrors = errors;
          this.isSubmitting = false;
        });
    }
  }
};
</script>
