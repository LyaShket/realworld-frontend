<template>
  <div class="ng-isolate-scope">
    <div class="article-preview">
      <div class="article-meta">
        <a href="#/@ghadagamal">
          <img
            src="https://static.productionready.io/images/smiley-cyrus.jpg"
          />
        </a>

        <div class="info">
          <a class="author ng-binding" href="#/@ghadagamal">ghadagamal</a>
          <span class="date ng-binding">July 24, 2021</span>
        </div>

        <button
          class="pull-xs-right ng-scope ng-isolate-scope btn btn-sm btn-outline-primary"
        >
          <i class="ion-heart"></i>
          <span class="ng-binding ng-scope">
            0
          </span>
        </button>
      </div>

      <a class="preview-link" href="#/article/1-h70edn">
        <h1 class="ng-binding">1</h1>
        <p class="ng-binding">
          1
        </p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline ng-binding ng-scope">
            test-automation
          </li>
        </ul>
      </a>
    </div>

    <div class="article-preview">
      Loading articles...
    </div>

    <div class="article-preview">
      No articles are here... yet.
    </div>

    <nav class="ng-isolate-scope">
      <ul class="pagination">
        <li class="page-item ng-scope active">
          <a class="page-link ng-binding" href="">1</a>
        </li>
        <li class="page-item ng-scope">
          <a class="page-link ng-binding" href="">2</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppArticleList"
};
</script>

<style></style>
