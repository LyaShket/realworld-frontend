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
              <router-link
                class="nav-link"
                :to="{ name: 'editor' }"
                active-class="active"
              >
                <i class="ion-compose"></i>&nbsp;New Article
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'settings' }"
                active-class="active"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link ng-binding"
                :to="{
                  name: 'user',
                  params: { username: currentUser.username }
                }"
                active-class="active"
              >
                <img class="user-pic" :src="currentUser.image" />
                {{ currentUser.username }}
              </router-link>
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
