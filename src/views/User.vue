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
              v-if="currentUser && username === currentUser.username"
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
import {
  getArticlesMy,
  getArticlesFavorited,
  getProfile,
  followUser,
  unfollowUser
} from "@/api/api";
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
    this.getProfile();
  },
  methods: {
    setArticleListType(type) {
      this.articleListType = type;
    },
    getArticles() {
      let promise;
      switch (this.articleListType) {
        case ARTICLE_LIST_TYPES.MY_ARTICLES:
          promise = getArticlesMy(this.username, this.limit, this.offset);
          break;
        case ARTICLE_LIST_TYPES.FAVORITED_ARTICLES:
          promise = getArticlesFavorited(
            this.username,
            this.limit,
            this.offset
          );
          break;
      }
      promise.then(data => {
        const articles = data.articles;
        articles.map(article => (article.isWaitingToggle = false));
        this.articles = articles;
        this.articlesCount = data.articlesCount;
      });
    },
    getProfile() {
      getProfile(this.username)
        .then(profile => {
          this.profile = profile;
          this.isProfileLoading = false;
        })
        .catch(() => {
          this.$router.push({ name: "home" });
        });
    },
    switchPage(pageNumber) {
      this.currentPageNumber = pageNumber;
    },
    follow() {
      this.isFollowSubmitting = true;
      followUser(this.username)
        .then(profile => {
          this.profile = profile;
          this.isFollowSubmitting = false;
        })
        .catch(error => {
          this.isFollowSubmitting = false;
          if (error.response.status === 401) {
            this.$router.push({ name: "login" });
          }
        });
    },
    unfollow() {
      this.isFollowSubmitting = true;
      unfollowUser(this.username)
        .then(profile => {
          this.profile = profile;
          this.isFollowSubmitting = false;
        })
        .catch(() => {
          this.isFollowSubmitting = false;
        });
    }
  },
  watch: {
    articleListType() {
      this.currentPageNumber = 1;
    },
    username() {
      this.currentPageNumber = 1;
      this.getProfile();
    },
    currentPageNumber() {
      this.articles = null;
      this.getArticles();
    }
  }
};
</script>
