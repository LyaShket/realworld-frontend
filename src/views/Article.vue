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
          :slug="slug"
          @favorite="favorite"
          @unfavorite="unfavorite"
          @follow="follow"
          @unfollow="unfollow"
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
          :slug="slug"
          @favorite="favorite"
          @unfavorite="unfavorite"
          @follow="follow"
          @unfollow="unfollow"
        />
      </div>

      <!-- Comments section -->
      <div class="row" v-if="!isCommentsLoading">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div v-if="currentUser">
            <app-validate-errors
              v-if="validateErrors"
              :validateErrors="validateErrors"
            />
            <form
              class="card comment-form ng-valid ng-dirty ng-submitted"
              @submit.prevent="postComment"
            >
              <div class="card-block">
                <textarea
                  class="form-control ng-valid ng-dirty ng-touched ng-empty"
                  placeholder="Write a comment..."
                  rows="3"
                  v-model="commentText"
                >
                </textarea>
              </div>
              <div class="card-footer">
                <img class="comment-author-img" :src="currentUser.image" />
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

          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text ng-binding" ng-bind="::$ctrl.data.body">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a class="comment-author" href="#/@scammed">
                <img class="comment-author-img" :src="comment.author.image" />
              </a>
              &nbsp;
              <a class="comment-author ng-binding" href="#/@scammed">{{
                comment.author.username
              }}</a>
              <span class="date-posted ng-binding">{{
                comment.createdAt
              }}</span>
              <span class="mod-options">
                <i
                  class="ion-trash-a"
                  @click="deleteComment(comment.id)"
                  v-if="
                    currentUser &&
                      comment.author.username === currentUser.username
                  "
                ></i>
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
      title: "",
      slug: "",

      commentText: "",
      comments: [],
      isCommentsLoading: true,

      validateErrors: null
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
        this.slug = response.data.article.slug;

        this.isLoading = false;
      })
      .catch(() => {
        this.$router.push({ name: "home" });
      });
    axios
      .get(
        `articles/${this.$route.params.slug}/comments`,
        {},
        {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        }
      )
      .then(response => {
        this.comments = response.data.comments;
        this.isCommentsLoading = false;
      });
  },
  methods: {
    favorite(favoritesCount) {
      this.favorited = true;
      this.favoritesCount = favoritesCount;
    },
    unfavorite(favoritesCount) {
      this.favorited = false;
      this.favoritesCount = favoritesCount;
    },
    follow() {
      this.author.following = true;
    },
    unfollow() {
      this.author.following = false;
    },
    postComment() {
      this.validateErrors = null;
      axios
        .post(
          `articles/${this.slug}/comments`,
          { comment: { body: this.commentText } },
          {
            headers: {
              authorization: "Token " + this.$store.state.authToken
            }
          }
        )
        .then(response => {
          this.comments.unshift(response.data.comment);
          this.commentText = "";
        })
        .catch(error => {
          this.validateErrors = error.response.data.errors;
        });
    },
    deleteComment(id) {
      axios
        .delete(`articles/${this.slug}/comments/${id}`, {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        })
        .then(() => {
          this.comments = this.comments.filter(comment => comment.id !== id);
        });
    }
  }
};
</script>
