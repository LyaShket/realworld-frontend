<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'user',
        params: { username: author.username }
      }"
    >
      <img :src="author.image" />
    </router-link>

    <div class="info">
      <router-link
        class="author ng-binding"
        :to="{
          name: 'user',
          params: { username: author.username }
        }"
      >
        {{ author.username }}
      </router-link>
      <span class="date ng-binding">{{ createdAt }}</span>
    </div>

    <!-- If current user is the author, show edit/delete buttons -->
    <span v-if="currentUser && currentUser.username === author.username">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{ name: 'editor_slug', params: { slug: slug } }"
      >
        <i class="ion-edit"></i> Edit Article
      </router-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :disabled="isDeleting"
        @click="deleteArticle"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <!-- Otherwise, show favorite & follow buttons -->
    <span v-else>
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
import axios from "@/api/axios";

export default {
  name: "AppArticleMeta",
  props: {
    author: {
      type: Object,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    favorited: {
      type: Boolean,
      required: false,
      default: false
    },
    favoritesCount: {
      type: Number,
      required: false,
      default: 0
    },
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  data() {
    return {
      isDeleting: false
    };
  },
  methods: {
    deleteArticle() {
      this.isDeleting = true;
      axios
        .delete(`articles/${this.$route.params.slug}`, {
          headers: {
            authorization: "Token " + this.$store.state.authToken
          }
        })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.isDeleting = false;
        });
    }
  }
};
</script>
