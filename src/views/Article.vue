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
          :follow="follow"
          :unfollow="unfollow"
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
          :follow="follow"
          :unfollow="unfollow"
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
              <router-link
                class="comment-author"
                :to="{
                  name: 'user',
                  params: { username: comment.author.username }
                }"
              >
                <img class="comment-author-img" :src="comment.author.image" />
              </router-link>
              &nbsp;
              <router-link
                class="comment-author"
                :to="{
                  name: 'user',
                  params: { username: comment.author.username }
                }"
              >
                {{ comment.author.username }}
              </router-link>
              <span class="date-posted ng-binding">{{
                prettiefyDate(comment.createdAt)
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
import {
  getArticle,
  getComments,
  postComment,
  deleteComment,
  followUser,
  unfollowUser
} from "@/api/api";

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
    getArticle(this.$route.params.slug)
      .then(article => {
        this.author = article.author;
        this.body = article.body;
        this.createdAt = article.createdAt;
        this.description = article.description;
        this.favorited = article.favorited;
        this.favoritesCount = article.favoritesCount;
        this.tagList = article.tagList;
        this.title = article.title;
        this.slug = article.slug;

        this.isLoading = false;
      })
      .catch(() => {
        this.$router.push({ name: "home" });
      });
    getComments(this.$route.params.slug).then(comments => {
      this.comments = comments;
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
      return new Promise((resolve, reject) => {
        followUser(this.author.username)
          .then(profile => {
            this.author = profile;
            resolve();
          })
          .catch(reject);
      });
    },
    unfollow() {
      return new Promise((resolve, reject) => {
        unfollowUser(this.author.username)
          .then(profile => {
            this.author = profile;
            resolve();
          })
          .catch(reject);
      });
    },
    postComment() {
      this.validateErrors = null;
      postComment(this.slug, this.commentText)
        .then(comment => {
          this.comments.unshift(comment);
          this.commentText = "";
        })
        .catch(errors => {
          this.validateErrors = errors;
        });
    },
    deleteComment(id) {
      deleteComment(this.slug, id).then(() => {
        this.comments = this.comments.filter(comment => comment.id !== id);
      });
    },
    prettiefyDate(isoDateString) {
      const date = new Date(Date.parse(isoDateString));

      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
      );
      const day = date.getDay();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    }
  }
};
</script>
