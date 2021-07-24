<template>
  <div class="ng-scope">
    <div class="editor-page ng-scope">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <validate-errors
              v-if="validateErrors"
              :validateErrors="validateErrors"
            />

            <form class="ng-pristine ng-valid" @submit.prevent="submit">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="Article Title"
                    v-model="title"
                    :disabled="isSubmitting"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="What's this article about?"
                    v-model="description"
                    :disabled="isSubmitting"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="body"
                    :disabled="isSubmitting"
                  >
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control ng-pristine ng-untouched ng-valid ng-empty"
                    type="text"
                    placeholder="Enter tags"
                    v-model="tag"
                    :disabled="isSubmitting"
                    @keypress.enter.prevent="addTag"
                  />

                  <div class="tag-list">
                    <span
                      class="tag-default tag-pill ng-binding ng-scope"
                      v-for="tagName in tagList"
                      :key="tagName"
                    >
                      <i
                        class="ion-close-round"
                        @click="removeTag(tagName)"
                      ></i>
                      {{ tagName }}
                    </span>
                  </div>
                </fieldset>

                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                  :disabled="isSubmitting"
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
import ValidateErrors from "../components/ValidateErrors.vue";
import axios from "@/api/axios";

export default {
  name: "AppEditor",
  components: { ValidateErrors },
  data() {
    return {
      body: "",
      description: "",
      tag: "",
      title: "",

      tagList: [],

      isSubmitting: false,
      validateErrors: null
    };
  },
  created() {
    this.$store.dispatch("getCurrentUser").then(() => {
      if (this.currentUser === null) {
        this.$router.push({ name: "home" });
      }
    });
  },
  methods: {
    addTag() {
      if (this.tagList.indexOf(this.tag) === -1) {
        this.tagList.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(tagName) {
      this.tagList = this.tagList.filter(i => i !== tagName);
    },
    submit() {
      this.isSubmitting = true;
      axios
        .post(
          "articles",
          {
            body: this.body,
            description: this.description,
            tagList: this.tagList,
            title: this.title
          },
          {
            headers: {
              authorization: "Token " + this.$store.state.authToken
            }
          }
        )
        .then(response => {
          this.$router.push({
            name: "article",
            params: { slug: response.data.article.slug }
          });
        })
        .catch(error => {
          this.validateErrors = error.response.data.errors;
          this.isSubmitting = false;
        });
    }
  }
};
</script>

<style></style>
