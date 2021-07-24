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
          <app-tabs />
          <app-article-list />
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

export default {
  name: "AppHome",
  components: { AppTabs, AppArticleList, AppPopularTags },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>
