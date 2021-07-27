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
            @set-article-list-type="setArticleListType"
          />
          <app-article-list :articles="articles" />
        </div>
        <app-popular-tags />
      </div>
    </div>
  </div>
</template>

<script>
import AppTabs from "@/components/Home/Tabs";
import AppArticleList from "@/components/Home/ArticleList";
import AppPopularTags from "@/components/Home/PopularTags";
import axios from "@/api/axios";
import { ARTICLE_LIST_TYPES } from "@/constants";

export default {
  name: "AppHome",
  components: { AppTabs, AppArticleList, AppPopularTags },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      tag: null,
      limit: 10,
      offset: 0,
      articleListType: ARTICLE_LIST_TYPES.GLOBAL_FEED,

      articles: null
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    setArticleListType(type) {
      this.articleListType = type;
      this.articles = null;
      this.getArticles();
    },
    getArticles() {
      let requestParams = {};
      if (this.$store.state.authToken !== "") {
        requestParams = {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        };
      }
      let link = `articles?limit=${this.limit}&offset=${this.offset}`;
      switch (this.articleListType) {
        case ARTICLE_LIST_TYPES.YOUR_FEED:
          link = `articles/feed?limit=${this.limit}&offset=${this.offset}`;
          break;
        case ARTICLE_LIST_TYPES.TAG:
          link = `articles?limit=${this.limit}&offset=${this.offset}&tag=${this.tag}`;
          break;
      }
      axios.get(link, requestParams).then(response => {
        const articles = response.data.articles;
        articles.map(article => (article.isWaitingToggle = false));
        this.articles = articles;
      });
    }
  }
};
</script>
