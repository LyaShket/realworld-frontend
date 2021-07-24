<template>
  <div class="col-md-3">
    <div class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list" ng-show="$ctrl.tags">
        <a href="" class="tag-default tag-pill ng-binding ng-scope">
          dragons
        </a>
        <a href="" class="tag-default tag-pill ng-binding ng-scope">
          butt
        </a>
      </div>

      <div class="ng-hide">
        Loading tags...
      </div>

      <div class="post-preview ng-hide">
        No tags are here... yet.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopularTags"
};
</script>

<style></style>
