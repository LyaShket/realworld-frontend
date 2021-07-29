<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="{
          name: 'user',
          params: { username: article.author.username }
        }"
      >
        <img :src="article.author.image" />
      </router-link>

      <div class="info">
        <router-link
          class="author ng-binding"
          :to="{
            name: 'user',
            params: { username: article.author.username }
          }"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date ng-binding">{{
          prettiefyDate(article.createdAt)
        }}</span>
      </div>

      <button
        class="pull-xs-right ng-scope ng-isolate-scope btn btn-sm"
        :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
        @click="onToggleFavorite(article)"
        :disabled="isFavoriting"
      >
        <i class="ion-heart"></i>
        <span class="ng-binding ng-scope">
          {{ article.favoritesCount }}
        </span>
      </button>
    </div>

    <router-link
      class="preview-link"
      :to="{
        name: 'article',
        params: { slug: article.slug }
      }"
    >
      <h1 class="ng-binding">{{ article.title }}</h1>
      <p class="ng-binding">
        {{ article.body }}
      </p>
      <span>Read more...</span>
      <ul class="tag-list" v-if="article.tagList.length > 0">
        <li
          class="tag-default tag-pill tag-outline ng-binding ng-scope"
          v-for="tag in article.tagList"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "app-article",
  props: {
    article: {
      type: Object,
      required: true
    },
    toggleFavorite: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isFavoriting: false
    };
  },
  methods: {
    prettiefyDate(isoDateString) {
      const date = new Date(Date.parse(isoDateString));

      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        date
      );
      const day = date.getDay();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    },
    onToggleFavorite(toggleArticle) {
      this.isFavoriting = true;
      this.toggleFavorite(toggleArticle)
        .then(() => (this.isFavoriting = false))
        .catch(() => this.$router.push({ name: "login" }));
    }
  }
};
</script>

<style></style>
