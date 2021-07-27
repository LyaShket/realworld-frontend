<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{
            active: articleListType === $options.ARTICLE_LIST_TYPES.YOUR_FEED
          }"
          @click="setArticleListType($options.ARTICLE_LIST_TYPES.YOUR_FEED)"
          :disabled="articleListType === $options.ARTICLE_LIST_TYPES.YOUR_FEED"
        >
          Your Feed
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{
            active: articleListType === $options.ARTICLE_LIST_TYPES.GLOBAL_FEED
          }"
          @click="setArticleListType($options.ARTICLE_LIST_TYPES.GLOBAL_FEED)"
          :disabled="
            articleListType === $options.ARTICLE_LIST_TYPES.GLOBAL_FEED
          "
        >
          Global Feed
        </button>
      </li>
      <li
        class="nav-item"
        v-if="articleListType === $options.ARTICLE_LIST_TYPES.TAG"
      >
        <button
          class="nav-link"
          :class="{
            active: articleListType === $options.ARTICLE_LIST_TYPES.TAG
          }"
          @click="setArticleListType($options.ARTICLE_LIST_TYPES.TAG)"
          :disabled="articleListType === $options.ARTICLE_LIST_TYPES.TAG"
        >
          <i class="ion-pound"></i> {{ tag }}
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
    },
    tag: {
      // String or null
      required: false,
      default: null
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

<style></style>
