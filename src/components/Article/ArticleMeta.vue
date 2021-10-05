<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'user',
        params: { username: author.username }
      }"
    >
      <img :src="author.image" />
    </router-link>

    <div class="info">
      <router-link
        class="author ng-binding"
        :to="{
          name: 'user',
          params: { username: author.username }
        }"
      >
        {{ author.username }}
      </router-link>
      <span class="date ng-binding">{{ prettifyDate(createdAt) }}</span>
    </div>

    <!-- If current user is the author, show edit/delete buttons -->
    <span v-if="currentUser && currentUser.username === author.username">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{ name: 'editor_slug', params: { slug: slug } }"
      >
        <i class="ion-edit"></i> Edit Article
      </router-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :disabled="isDeleting"
        @click="onDeleteArticle"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <!-- Otherwise, show favorite & follow buttons -->
    <span v-else>
      <!-- Unfollow button -->
      <button
        v-if="author.following"
        class="btn btn-sm action-btn ng-binding btn-secondary"
        @click="onUnfollow"
        :disabled="isFollowSubmitting"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Unfollow {{ author.username }}
      </button>
      <!-- Follow button -->
      <button
        v-else
        class="btn btn-sm action-btn ng-binding btn-outline-secondary"
        @click="onFollow"
        :disabled="isFollowSubmitting"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ author.username }}
      </button>

      <!-- Unfavorite button -->
      <button
        v-if="favorited"
        class="btn btn-sm btn-primary"
        @click="toggleFavorite"
        :disabled="isFavoriteSubmitting"
      >
        <i class="ion-heart"></i>
        <span class="ng-binding ng-scope"> Unfavorite Article </span>
        <span class="counter ng-binding ng-scope">({{ favoritesCount }})</span>
      </button>
      <!-- Favorite button -->
      <button
        v-else
        class="btn btn-sm btn-outline-primary"
        @click="toggleFavorite"
        :disabled="isFavoriteSubmitting"
      >
        <i class="ion-heart"></i>
        <span class="ng-binding ng-scope"> Favorite Article </span>
        <span class="counter ng-binding ng-scope">({{ favoritesCount }})</span>
      </button>
    </span>
  </div>
</template>

<script>
import { deleteArticle, favoriteArticle, unfavoriteArticle } from "@/api/api";
import { prettifyDate } from "@/utils";

export default {
  name: "AppArticleMeta",
  props: {
    author: {
      type: Object,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    favorited: {
      type: Boolean,
      required: false,
      default: false
    },
    favoritesCount: {
      type: Number,
      required: false,
      default: 0
    },
    slug: {
      type: String,
      required: true
    },
    follow: {
      type: Function,
      required: true
    },
    unfollow: {
      type: Function,
      required: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      isDeleting: false,
      isFollowSubmitting: false,
      isFavoriteSubmitting: false
    };
  },
  methods: {
    prettifyDate,
    onDeleteArticle() {
      this.isDeleting = true;
      deleteArticle(this.$route.params.slug)
        .then(() => this.$router.push({ name: "home" }))
        .catch(() => (this.isDeleting = false));
    },
    onFollow() {
      this.isFollowSubmitting = true;
      this.follow(this.author.username)
        .then(() => (this.isFollowSubmitting = false))
        .catch(() => (this.isFollowSubmitting = false));
    },
    onUnfollow() {
      this.isFollowSubmitting = true;
      this.unfollow(this.author.username)
        .then(() => (this.isFollowSubmitting = false))
        .catch(() => (this.isFollowSubmitting = false));
    },
    toggleFavorite() {
      if (this.currentUser === null) {
        this.$router.push({ name: "login" });
        return;
      }
      this.isFavoriteSubmitting = true;
      if (this.favorited) {
        unfavoriteArticle(this.slug)
          .then(article => {
            this.$emit("unfavorite", article.favoritesCount);
            this.isFavoriteSubmitting = false;
          })
          .catch(() => (this.isFavoriteSubmitting = false));
      } else {
        favoriteArticle(this.slug)
          .then(article => {
            this.$emit("favorite", article.favoritesCount);
            this.isFavoriteSubmitting = false;
          })
          .catch(() => (this.isFavoriteSubmitting = false));
      }
    }
  }
};
</script>
