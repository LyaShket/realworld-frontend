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
          @click.prevent="setTag(tag)"
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
export default {
  name: "AppPopularTags",
  props: {
    tags: {
      // Array or null
      required: true
    }
  },
  methods: {
    setTag(tag) {
      this.$emit("set-tag", tag);
    }
  }
};
</script>

<style></style>
