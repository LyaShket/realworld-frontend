<template>
  <div class="home-page ng-scope">
    <!-- Splash banner that only shows when not logged in -->
    <div class="banner">
      <div class="container">
        <h1 class="logo-font ng-binding">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <!-- Main view - contains tabs & article list -->
        <div class="col-md-9">
          <!-- Tabs for toggling between feed, article lists -->
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

          <!-- List the current articles -->
          <article-list class="ng-isolate-scope">
            <article-preview class="ng-scope ng-isolate-scope">
              <div class="article-preview">
                <article-meta class="ng-isolate-scope">
                  <div class="article-meta">
                    <a href="#/@ghadagamal">
                      <img
                        src="https://static.productionready.io/images/smiley-cyrus.jpg"
                      />
                    </a>

                    <div class="info">
                      <a class="author ng-binding" href="#/@ghadagamal"
                        >ghadagamal</a
                      >
                      <span class="date ng-binding">July 24, 2021</span>
                    </div>

                    <ng-transclude>
                      <favorite-btn
                        article="$ctrl.article"
                        class="pull-xs-right ng-scope ng-isolate-scope"
                        ><button class="btn btn-sm btn-outline-primary">
                          <i class="ion-heart"></i>
                          <ng-transclude
                            ><span class="ng-binding ng-scope">
                              0
                            </span></ng-transclude
                          >
                        </button>
                      </favorite-btn>
                    </ng-transclude>
                  </div>
                </article-meta>

                <a class="preview-link" href="#/article/1-h70edn">
                  <h1 class="ng-binding">1</h1>
                  <p class="ng-binding">
                    1
                  </p>
                  <span>Read more...</span>
                  <ul class="tag-list">
                    <li
                      class="tag-default tag-pill tag-outline ng-binding ng-scope"
                    >
                      test-automation
                    </li>
                  </ul>
                </a>
              </div>
            </article-preview>

            <div class="article-preview ng-hide">
              Loading articles...
            </div>

            <div class="article-preview ng-hide">
              No articles are here... yet.
            </div>

            <list-pagination class="ng-isolate-scope">
              <nav>
                <ul class="pagination">
                  <li class="page-item ng-scope active">
                    <a class="page-link ng-binding" href="">1</a>
                  </li>
                  <li class="page-item ng-scope">
                    <a class="page-link ng-binding" href="">2</a>
                  </li>
                </ul>
              </nav>
            </list-pagination>
          </article-list>
        </div>

        <!-- Sidebar where popular tags are listed -->
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

        <!-- End the row & container divs -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome"
};
</script>
