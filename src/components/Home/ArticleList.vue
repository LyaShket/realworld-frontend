<template>
  <div class="ng-isolate-scope">
    <template v-if="articles && articles.length > 0">
      <app-article
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        :toggleFavorite="toggleFavorite"
      />
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
import AppArticle from "@/components/ArticleList/Article";

export default {
  name: "AppArticleList",
  components: { AppArticle },
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
    },
    toggleFavorite: {
      type: Function,
      required: true
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
    switchPage(pageNumber) {
      this.$emit("switch-page", pageNumber);
    }
  }
};
</script>

<style></style>
