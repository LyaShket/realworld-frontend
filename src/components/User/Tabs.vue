<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{
            active: articleListType === $options.ARTICLE_LIST_TYPES.MY_ARTICLES
          }"
          @click="setArticleListType($options.ARTICLE_LIST_TYPES.MY_ARTICLES)"
          :disabled="
            articleListType === $options.ARTICLE_LIST_TYPES.MY_ARTICLES
          "
        >
          My Articles
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{
            active:
              articleListType === $options.ARTICLE_LIST_TYPES.FAVORITED_ARTICLES
          }"
          @click="
            setArticleListType($options.ARTICLE_LIST_TYPES.FAVORITED_ARTICLES)
          "
          :disabled="
            articleListType === $options.ARTICLE_LIST_TYPES.FAVORITED_ARTICLES
          "
        >
          Favorited Articles
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ARTICLE_LIST_TYPES } from "@/constants";

export default {
  name: "AppTabs",
  props: {
    articleListType: {
      type: String,
      required: true
    }
  },
  ARTICLE_LIST_TYPES,
  methods: {
    setArticleListType(type) {
      this.$emit("set-article-list-type", type);
    }
  }
};
</script>
