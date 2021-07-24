<template>
  <div class="ng-scope" v-if="!isLoading">
    <div class="settings-page ng-scope">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <validate-errors
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
                    class="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                    type="text"
                    placeholder="URL of profile picture"
                    v-model="image"
                    :disabled="isSubmitting"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg ng-pristine ng-valid ng-not-empty ng-touched"
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    :disabled="isSubmitting"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="bio"
                    :disabled="isSubmitting"
                  >
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-email"
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
                    placeholder="New Password"
                    v-model="password"
                    :disabled="isSubmitting"
                  />
                </fieldset>

                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  :disabled="isSubmitting"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>

            <!-- Line break for logout button -->
            <hr />

            <button class="btn btn-outline-danger" @click="logout">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import ValidateErrors from "@/components/ValidateErrors.vue";

export default {
  name: "AppSettings",
  components: { ValidateErrors },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      bio: "",
      email: "",
      image: "",
      password: "",
      username: "",

      isSubmitting: false,
      validateErrors: null,

      isLoading: true
    };
  },
  created() {
    this.$store.dispatch("getCurrentUser").then(() => {
      if (this.currentUser === null) {
        this.$router.push({ name: "home" });
      } else {
        this.bio = this.currentUser.bio;
        this.email = this.currentUser.email;
        this.image = this.currentUser.image;
        this.username = this.currentUser.username;
        this.isLoading = false;
      }
    });
  },
  methods: {
    submit() {
      const userData = {
        bio: this.bio,
        email: this.email,
        image: this.image,
        username: this.username
      };
      if (this.password !== "") {
        userData.password = this.password;
      }

      this.isSubmitting = true;
      axios
        .put("user", userData, {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        })
        .then(() => {
          this.$store.dispatch("getCurrentUser").then(() => {
            this.$router.push({
              name: "user",
              params: { username: this.currentUser.username }
            });
          });
        })
        .catch(error => {
          this.validateErrors = error.response.data.errors;
          this.isSubmitting = false;
        });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style></style>
