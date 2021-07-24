<template>
  <div class="col-md-3">
    <div class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list" v-if="tags && tags.length > 0">
        <a
          href=""
          class="tag-default tag-pill ng-binding ng-scope"
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </a>
      </div>
      <div class="ng-hide" v-else-if="!tags">
        Loading tags...
      </div>
      <div class="post-preview ng-hide" v-else>
        No tags are here... yet.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "AppPopularTags",
  data() {
    return {
      tags: null
    };
  },
  created() {
    axios.get("tags").then(response => {
      this.isLoading = true;
      this.tags = response.data.tags;
    });
  }
};
</script>

<style></style>
