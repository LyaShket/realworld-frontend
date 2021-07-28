<template>
  <div class="ng-isolate-scope">
    <template v-if="articles && articles.length > 0">
      <div
        class="article-preview"
        v-for="article in articles"
        :key="article.slug"
      >
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
            @click="toggleFavorite(article)"
            :disabled="article.isWaitingToggle"
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
    <div class="article-preview" v-else-if="!articles">
      Loading articles...
    </div>
    <div class="article-preview" v-else>
      No articles are here... yet.
    </div>

    <nav class="ng-isolate-scope" v-if="articles">
      <ul class="pagination">
        <li
          class="page-item ng-scope"
          v-for="pageNumber in pagesCountList"
          :key="pageNumber"
          :class="{ active: currentPageNumber === pageNumber }"
        >
          <a
            class="page-link ng-binding"
            href=""
            @click.prevent="switchPage(pageNumber)"
          >
            {{ pageNumber }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { favoriteArticle, unfavoriteArticle } from "@/api/api";

export default {
  name: "AppArticleList",
  props: {
    articles: {
      // Array || null
      required: true
    },
    pagesCount: {
      type: Number,
      required: false,
      default: 0
    },
    currentPageNumber: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    pagesCountList() {
      let list = [];
      for (let i = 1; i <= this.pagesCount; i++) {
        list.push(i);
      }
      return list;
    }
  },
  methods: {
    toggleFavorite(toggleArticle) {
      toggleArticle.isWaitingToggle = true;
      let promise;
      if (toggleArticle.favorited) {
        promise = unfavoriteArticle(toggleArticle.slug);
      } else {
        promise = favoriteArticle(toggleArticle.slug);
      }
      promise.then(resArticle => {
        this.articles.map(article => {
          if (article === toggleArticle) {
            article.favorited = true;
            article.favoritesCount = resArticle.favoritesCount;
            article.isWaitingToggle = false;
          }
        });
      });
    },
    switchPage(pageNumber) {
      this.$emit("switch-page", pageNumber);
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

<style></style>
