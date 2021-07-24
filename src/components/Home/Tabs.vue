<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" style="display: inherit;">
        <a href="" class="nav-link">
          Your Feed
        </a>
      </li>

      <li class="nav-item">
        <a href="" class="nav-link active">
          Global Feed
        </a>
      </li>

      <li class="nav-item ng-hide">
        <a href="" class="nav-link active ng-binding">
          <i class="ion-pound"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppTabs"
};
</script>

<style></style>
