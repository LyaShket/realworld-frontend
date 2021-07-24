<template>
  <div class="ng-scope">
    <div class="editor-page ng-scope">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            ERRORS

            <form class="ng-pristine ng-valid" @submit="submit">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="Article Title"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="What's this article about?"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  >
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="Enter tags"
                  />

                  <div class="tag-list">
                    <span
                      ng-repeat="tag in $ctrl.article.tagList"
                      class="tag-default tag-pill ng-binding ng-scope"
                    >
                      <i class="ion-close-round"></i>
                      Example of a tag
                    </span>
                    THERE ARE A LOT OF TAGS (Press enter to add tag)
                  </div>
                </fieldset>

                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppEditor",
  methods: {
    submit() {}
  }
};
</script>

<style></style>
