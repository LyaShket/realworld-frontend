<template>
  <header class="ng-scope ng-isolate-scope">
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand ng-binding" :to="{ name: 'home' }">
          conduit
        </router-link>

        <template v-if="currentUser">
          <ul class="nav navbar-nav pull-xs-right" style="display: inherit;">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'home' }"
                active-class="active"
                exact
              >
                Home
              </router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#/editor/">
                <i class="ion-compose"></i>&nbsp;New Article
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link ng-binding" href="#/@">
                <img class="user-pic" />
              </a>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="nav navbar-nav pull-xs-right" style="display: inherit;">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'home' }"
                active-class="active"
                exact
              >
                Home
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'login' }"
                active-class="active"
              >
                Sign in
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'register' }"
                active-class="active"
              >
                Sign up
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>

<style></style>
