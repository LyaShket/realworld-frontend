<template>
  <div class="article-page ng-scope">
    <!-- Banner for article title, action buttons -->
    <div class="banner">
      <div class="container">
        <h1 class="ng-binding">
          TITLE OF ARTICLE
        </h1>

        <app-article-meta />
      </div>
    </div>

    <!-- Main view. Contains article html and comments -->
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <p>
            TEXT OF ARTICLE
          </p>

          <ul class="tag-list">
            <li class="tag-default tag-pill tag-outline ng-binding ng-scope">
              TAG IS HERE
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <app-article-meta />
      </div>

      <!-- Comments section -->
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div show-authed="true" style="display: inherit;">
            <app-validate-errors />
            <form class="card comment-form ng-valid ng-dirty ng-submitted">
              <div class="card-block">
                <textarea
                  class="form-control ng-valid ng-dirty ng-touched ng-empty"
                  placeholder="Write a comment..."
                  rows="3"
                >
                </textarea>
              </div>
              <div class="card-footer">
                <img
                  class="comment-author-img"
                  src="https://yt4.ggpht.com/Q1dFlZx-ZAABgKgh3MiMmMbJITNZhVvPPaPQF4R1hfw2FIB70r3qxb4g2TbVRnraIopXoK7i=s32-c-k-c0x00ffffff-no-rj"
                />
                <button class="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          </div>

          IF USER IS NOT AUTHORIZED
          <p>
            <a href="#/login">Sign in</a> or <a href="#/register">sign up</a> to
            add comments on this article.
          </p>

          <div class="card">
            <div class="card-block">
              <p class="card-text ng-binding" ng-bind="::$ctrl.data.body">
                TEXT OF COMMENT
              </p>
            </div>
            <div class="card-footer">
              <a class="comment-author" href="#/@scammed">
                <img
                  class="comment-author-img"
                  src="https://yt4.ggpht.com/Q1dFlZx-ZAABgKgh3MiMmMbJITNZhVvPPaPQF4R1hfw2FIB70r3qxb4g2TbVRnraIopXoK7i=s32-c-k-c0x00ffffff-no-rj"
                />
              </a>
              &nbsp;
              <a
                class="comment-author ng-binding"
                ui-sref="app.profile.main({ username: $ctrl.data.author.username })"
                ng-bind="::$ctrl.data.author.username"
                href="#/@scammed"
                >scammed</a
              >
              <span
                class="date-posted ng-binding"
                ng-bind="::$ctrl.data.createdAt | date: 'longDate' "
                >July 27, 2021</span
              >
              <span class="mod-options">
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- End main view -->
    </div>
  </div>
</template>

<script>
import AppArticleMeta from "@/components/Article/ArticleMeta";
import AppValidateErrors from "@/components/ValidateErrors";

export default {
  name: "AppArticle",
  components: { AppArticleMeta, AppValidateErrors }
};
</script>
