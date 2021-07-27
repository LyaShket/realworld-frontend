<template>
  <div class="article-meta">
    <a href="#/@cy454370015">
      <img src="https://static.productionready.io/images/smiley-cyrus.jpg" />
    </a>

    <div class="info">
      <a class="author ng-binding" href="#/@cy454370015">cy454370015</a>
      <span class="date ng-binding">July 27, 2021</span>
    </div>

    <!-- If current user is the author, show edit/delete buttons -->
    <span ng-show="$ctrl.canModify" class="ng-scope ng-hide">
      <a
        class="btn btn-outline-secondary btn-sm"
        href="#/editor/article-created-by-cypress-test-kn4ycy"
      >
        <i class="ion-edit"></i> Edit Article
      </a>

      <button
        class="btn btn-outline-danger btn-sm"
        ng-class="{disabled: $ctrl.isDeleting}"
        ng-click="$ctrl.deleteArticle()"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>

    <!-- Otherwise, show favorite & follow buttons -->
    <span ng-hide="$ctrl.canModify" class="ng-scope">
      <follow-btn user="$ctrl.article.author" class="ng-isolate-scope"
        ><button
          class="btn btn-sm action-btn ng-binding btn-outline-secondary"
          ng-class="{ 'disabled': $ctrl.isSubmitting,
              'btn-outline-secondary': !$ctrl.user.following,
              'btn-secondary': $ctrl.user.following }"
          ng-click="$ctrl.submit()"
        >
          <i class="ion-plus-round"></i>
          &nbsp; Follow cy454370015
        </button>
      </follow-btn>
      <favorite-btn article="$ctrl.article" class="ng-isolate-scope"
        ><button
          class="btn btn-sm btn-outline-primary"
          ng-class="{ 'disabled': $ctrl.isSubmitting,
              'btn-outline-primary': !$ctrl.article.favorited,
              'btn-primary': $ctrl.article.favorited }"
          ng-click="$ctrl.submit()"
        >
          <i class="ion-heart"></i>
          <ng-transclude
            ><span class="ng-binding ng-scope"> Favorite Article </span
            ><span class="counter ng-binding ng-scope">(0)</span>
          </ng-transclude>
        </button>
      </favorite-btn>
    </span>
  </div>
</template>

<script>
export default {
  name: "AppArticleMeta"
};
</script>
