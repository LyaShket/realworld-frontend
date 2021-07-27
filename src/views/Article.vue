<template>
  <div class="article-page ng-scope" v-if="!isLoading">
    <!-- Banner for article title, action buttons -->
    <div class="banner">
      <div class="container">
        <h1 class="ng-binding">
          {{ title }}
        </h1>

        <app-article-meta
          :author="author"
          :createdAt="createdAt"
          :favorited="favorited"
          :favoritesCount="favoritesCount"
        />
      </div>
    </div>

    <!-- Main view. Contains article html and comments -->
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <p>
            {{ body }}
          </p>

          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline ng-binding ng-scope"
              v-for="tagName in tagList"
              :key="tagName"
            >
              {{ tagName }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <app-article-meta
          :author="author"
          :createdAt="createdAt"
          :favorited="favorited"
          :favoritesCount="favoritesCount"
        />
      </div>

      <!-- Comments section -->
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div v-if="currentUser">
            <app-validate-errors />
            <form class="card comment-form ng-valid ng-dirty ng-submitted">
              <div class="card-block">
                <textarea
                  class="form-control ng-valid ng-dirty ng-touched ng-empty"
                  placeholder="Write a comment..."
                  rows="3"
                >
                </textarea>
              </div>
              <div class="card-footer">
                <img
                  class="comment-author-img"
                  src="https://yt4.ggpht.com/Q1dFlZx-ZAABgKgh3MiMmMbJITNZhVvPPaPQF4R1hfw2FIB70r3qxb4g2TbVRnraIopXoK7i=s32-c-k-c0x00ffffff-no-rj"
                />
                <button class="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link> or
            <router-link :to="{ name: 'register' }">sign up</router-link> to add
            comments on this article.
          </p>

          <div class="card">
            <div class="card-block">
              <p class="card-text ng-binding" ng-bind="::$ctrl.data.body">
                TEXT OF COMMENT
              </p>
            </div>
            <div class="card-footer">
              <a class="comment-author" href="#/@scammed">
                <img
                  class="comment-author-img"
                  src="https://yt4.ggpht.com/Q1dFlZx-ZAABgKgh3MiMmMbJITNZhVvPPaPQF4R1hfw2FIB70r3qxb4g2TbVRnraIopXoK7i=s32-c-k-c0x00ffffff-no-rj"
                />
              </a>
              &nbsp;
              <a
                class="comment-author ng-binding"
                ui-sref="app.profile.main({ username: $ctrl.data.author.username })"
                ng-bind="::$ctrl.data.author.username"
                href="#/@scammed"
                >scammed</a
              >
              <span
                class="date-posted ng-binding"
                ng-bind="::$ctrl.data.createdAt | date: 'longDate' "
                >July 27, 2021</span
              >
              <span class="mod-options">
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- End main view -->
    </div>
  </div>
</template>

<script>
import AppArticleMeta from "@/components/Article/ArticleMeta";
import AppValidateErrors from "@/components/ValidateErrors";
import axios from "@/api/axios";

export default {
  name: "AppArticle",
  components: { AppArticleMeta, AppValidateErrors },
  data() {
    return {
      isLoading: true,

      author: {},
      body: "",
      createdAt: null,
      description: "",
      favorited: false,
      favoritesCount: 0,
      tagList: [],
      title: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    let requestParams = {};
    if (this.$store.state.authToken !== "") {
      requestParams = {
        headers: {
          authorization: "Token " + this.$store.state.authToken
        }
      };
    }
    axios
      .get(`articles/${this.$route.params.slug}`, requestParams)
      .then(response => {
        this.author = response.data.article.author;
        this.body = response.data.article.body;
        this.createdAt = response.data.article.createdAt;
        this.description = response.data.article.description;
        this.favorited = response.data.article.favorited;
        this.favoritesCount = response.data.article.favoritesCount;
        this.tagList = response.data.article.tagList;
        this.title = response.data.article.title;

        this.isLoading = false;
      });
  }
};
</script>
