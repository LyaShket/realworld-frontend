<template>
  <div class="home-page ng-scope">
    <div class="banner" v-if="!currentUser">
      <div class="container">
        <h1 class="logo-font ng-binding">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-tabs
            :articleListType="articleListType"
            :tag="tag"
            :isLoadingArticles="isLoadingArticles"
            @set-article-list-type="setArticleListType"
          />
          <app-article-list
            :articles="articles"
            :pagesCount="pagesCount"
            :currentPageNumber="currentPageNumber"
            @switch-page="switchPage"
            :toggleFavorite="toggleFavorite"
          />
        </div>
        <app-popular-tags :tags="tags" @set-tag="setTag" />
      </div>
    </div>
  </div>
</template>

<script>
import AppTabs from "@/components/Home/Tabs";
import AppArticleList from "@/components/Home/ArticleList";
import AppPopularTags from "@/components/Home/PopularTags";
import {
  getArticlesGlobalFeed,
  getArticlesYourFeed,
  getArticlesTag,
  getTags,
  favoriteArticle,
  unfavoriteArticle
} from "@/api/api";
import { ARTICLE_LIST_TYPES } from "@/constants";

export default {
  name: "AppHome",
  components: { AppTabs, AppArticleList, AppPopularTags },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    offset() {
      return this.limit * (this.currentPageNumber - 1);
    },
    pagesCount() {
      let pagesCountFloat = this.articlesCount / this.limit;
      let parsedPagesCountFloat = Number.parseFloat(pagesCountFloat);

      let pagesCount = Number.parseInt(parsedPagesCountFloat.toFixed(0));
      if (pagesCountFloat > pagesCount) {
        pagesCount += 1;
      }
      if (pagesCount > 50) {
        pagesCount = 50;
      }

      return pagesCount;
    }
  },
  data() {
    return {
      tag: null,
      limit: 10,
      articleListType: ARTICLE_LIST_TYPES.GLOBAL_FEED,
      articles: null,

      articlesCount: 0,
      currentPageNumber: 1,

      tags: [],

      isLoadingArticles: false
    };
  },
  created() {
    this.getArticles();
    getTags()
      .then(tags => (this.tags = tags))
      .catch(() => (this.tags = null));
  },
  methods: {
    setArticleListType(type) {
      this.articleListType = type;
    },
    setTag(tag) {
      this.articleListType = ARTICLE_LIST_TYPES.TAG;
      this.tag = tag;
    },
    getArticles() {
      this.isLoadingArticles = true;
      let promise;
      switch (this.articleListType) {
        case ARTICLE_LIST_TYPES.GLOBAL_FEED:
          promise = getArticlesGlobalFeed(this.limit, this.offset);
          break;
        case ARTICLE_LIST_TYPES.YOUR_FEED:
          promise = getArticlesYourFeed(this.limit, this.offset);
          break;
        case ARTICLE_LIST_TYPES.TAG:
          promise = getArticlesTag(this.limit, this.offset, this.tag);
          break;
      }
      promise
        .then(data => {
          this.articles = data.articles;
          this.articlesCount = data.articlesCount;
          this.isLoadingArticles = false;
        })
        .catch(() => (this.isLoadingArticles = false));
    },
    switchPage(pageNumber) {
      this.currentPageNumber = pageNumber;
    },
    toggleFavorite(toggleArticle) {
      return new Promise((resolve, reject) => {
        let promise;
        if (toggleArticle.favorited) {
          promise = unfavoriteArticle(toggleArticle.slug);
        } else {
          promise = favoriteArticle(toggleArticle.slug);
        }
        promise
          .then(article => {
            this.articles.map(a => {
              if (a.slug === article.slug) {
                a.favorited = article.favorited;
                a.favoritesCount = article.favoritesCount;
              }
            });
            resolve();
          })
          .catch(reject);
      });
    }
  },
  watch: {
    articleListType(newValue) {
      this.currentPageNumber = 1;
      if (newValue !== ARTICLE_LIST_TYPES.TAG) {
        this.tag = null;
      }
      this.articles = null;
      this.getArticles();
    },
    tag() {
      this.currentPageNumber = 1;
      this.articles = null;
      this.getArticles();
    },
    currentPageNumber() {
      this.articles = null;
      this.getArticles();
    }
  }
};
</script>
