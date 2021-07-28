<template>
  <div class="profile-page ng-scope" v-if="!isProfileLoading">
    <!-- User's basic info & action buttons -->
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="profile.image" />
            <h4 class="ng-binding">{{ profile.username }}</h4>
            <p class="ng-binding">{{ profile.bio }}</p>

            <router-link
              class="btn btn-sm btn-outline-secondary action-btn ng-hide"
              :to="{ name: 'settings' }"
              v-if="username === currentUser.username"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
            <!-- Unfollow & Follow buttons -->
            <template v-else>
              <!-- Unfollow button -->
              <button
                v-if="profile.following"
                class="btn btn-sm action-btn ng-binding btn-secondary"
                @click="unfollow"
                :disabled="isFollowSubmitting"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Unfollow {{ username }}
              </button>
              <!-- Follow button -->
              <button
                v-else
                class="btn btn-sm action-btn ng-binding btn-outline-secondary"
                @click="follow"
                :disabled="isFollowSubmitting"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ username }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Container where User's posts & favs are list w/ toggle tabs -->
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <app-tabs
              :articleListType="articleListType"
              @set-article-list-type="setArticleListType"
            />
          </div>

          <app-article-list
            :articles="articles"
            :pagesCount="pagesCount"
            :currentPageNumber="currentPageNumber"
            @switch-page="switchPage"
          />
        </div>

        <!-- End row & container divs -->
      </div>
    </div>
  </div>
</template>

<script>
import AppArticleList from "@/components/Home/ArticleList";
import AppTabs from "@/components/User/Tabs";
import axios from "@/api/axios";
import { ARTICLE_LIST_TYPES } from "@/constants";

export default {
  name: "AppUser",
  components: { AppArticleList, AppTabs },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    username() {
      return this.$route.params.username;
    },
    offset() {
      return this.limit * (this.currentPageNumber - 1);
    },
    pagesCount() {
      let pagesCountFloat = this.articlesCount / this.limit;
      let parsedPagesCountFloat = Number.parseFloat(pagesCountFloat);

      let pagesCount = Number.parseInt(parsedPagesCountFloat.toFixed(0));
      if (pagesCountFloat > pagesCount) {
        pagesCount += 1;
      }
      if (pagesCount > 50) {
        pagesCount = 50;
      }

      return pagesCount;
    }
  },
  data() {
    return {
      limit: 5,
      articleListType: ARTICLE_LIST_TYPES.MY_ARTICLES,
      articles: null,

      articlesCount: 0,
      currentPageNumber: 1,

      profile: {},
      isProfileLoading: true,

      isFollowSubmitting: false
    };
  },
  created() {
    this.getArticles();
    this.getUser();
  },
  methods: {
    setArticleListType(type) {
      this.articleListType = type;
    },
    getArticles() {
      let requestParams = {};
      if (this.$store.state.authToken !== "") {
        requestParams = {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        };
      }
      let link = `articles?author=${this.username}&limit=${this.limit}&offset=${this.offset}`;
      if (this.articleListType === ARTICLE_LIST_TYPES.FAVORITED_ARTICLES) {
        link = `articles?favorited=${this.username}&limit=${this.limit}&offset=${this.offset}`;
      }
      axios.get(link, requestParams).then(response => {
        const articles = response.data.articles;
        articles.map(article => (article.isWaitingToggle = false));
        this.articles = articles;
        this.articlesCount = response.data.articlesCount;
      });
    },
    getUser() {
      axios
        .get(`profiles/${this.username}`, {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        })
        .then(response => {
          this.profile = response.data.profile;
          this.isProfileLoading = false;
        });
    },
    switchPage(pageNumber) {
      this.currentPageNumber = pageNumber;
    },
    follow() {
      this.isFollowSubmitting = true;
      axios
        .post(
          `profiles/${this.username}/follow`,
          {},
          {
            headers: {
              authorization: "Token " + this.$store.state.authToken
            }
          }
        )
        .then(response => {
          this.profile = response.data.profile;
          this.isFollowSubmitting = false;
        })
        .catch(() => {
          this.isFollowSubmitting = false;
        });
    },
    unfollow() {
      this.isFollowSubmitting = true;
      axios
        .delete(`profiles/${this.username}/follow`, {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        })
        .then(response => {
          this.profile = response.data.profile;
          this.isFollowSubmitting = false;
        })
        .catch(() => {
          this.isFollowSubmitting = false;
        });
    }
  },
  watch: {
    articleListType() {
      this.articles = null;
      this.getArticles();
    },
    currentPageNumber() {
      this.articles = null;
      this.getArticles();
    },
    username() {
      this.articles = null;
      this.getArticles();
      this.getUser();
    }
  }
};
</script>
