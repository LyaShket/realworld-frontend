import axios from "@/api/axios";
import store from "@/store";

function getRequestParams() {
  if (store.state.authToken) {
    return {
      headers: {
        authorization: "Token " + store.state.authToken
      }
    };
  }
  return {};
}

export function getArticle(slug) {
  return new Promise(resolve => {
    axios
      .get(`articles/${slug}`, getRequestParams())
      .then(response => resolve(response.data.article));
  });
}

export function getComments(slug) {
  return new Promise(resolve => {
    axios
      .get(`articles/${slug}/comments`, getRequestParams())
      .then(response => resolve(response.data.comments));
  });
}

export function postComment(slug, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `articles/${slug}/comments`,
        { comment: { body: body } },
        getRequestParams()
      )
      .then(response => resolve(response.data.comment))
      .catch(error => reject(error.response.data.errors));
  });
}

export function deleteComment(slug, id) {
  return new Promise(resolve => {
    axios
      .delete(`articles/${slug}/comments/${id}`, getRequestParams())
      .then(resolve);
  });
}

export function postArticle(body, description, tagList, title) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "articles",
        {
          article: {
            body: body,
            description: description,
            tagList: tagList,
            title: title
          }
        },
        getRequestParams()
      )
      .then(response => resolve(response.data.article))
      .catch(error => reject(error.response.data.errors));
  });
}

export function updateArticle(slug, body, description, tagList, title) {
  return new Promise(resolve => {
    axios
      .put(
        `articles/${slug}`,
        {
          article: {
            body: body,
            description: description,
            tagList: tagList,
            title: title
          }
        },
        getRequestParams()
      )
      .then(response => resolve(response.data.article));
  });
}

export function getArticlesGlobalFeed(limit, offset) {
  return new Promise(resolve => {
    axios
      .get(`articles?limit=${limit}&offset=${offset}`, getRequestParams())
      .then(response => resolve(response.data));
  });
}

export function getArticlesYourFeed(limit, offset) {
  return new Promise(resolve => {
    axios
      .get(`articles/feed?limit=${limit}&offset=${offset}`, getRequestParams())
      .then(response => resolve(response.data));
  });
}

export function getArticlesTag(limit, offset, tag) {
  return new Promise(resolve => {
    axios
      .get(
        `articles?limit=${limit}&offset=${offset}&tag=${tag}`,
        getRequestParams()
      )
      .then(response => resolve(response.data));
  });
}

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("users/login", { user: { email: email, password: password } })
      .then(response => resolve(response.data.user))
      .catch(error => reject(error.response.data.errors));
  });
}

export function registerUser(username, email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("users", {
        user: { username: username, email: email, password: password }
      })
      .then(response => resolve(response.data.user))
      .catch(error => reject(error.response.data.errors));
  });
}

export function updateUserSettings(bio, email, image, username, password) {
  const userData = {
    bio: bio,
    email: email,
    image: image,
    username: username
  };
  if (password !== "") {
    userData.password = password;
  }

  return new Promise((resolve, reject) => {
    axios
      .put("user", userData, getRequestParams())
      .then(resolve)
      .catch(error => reject(error.response.data.errors));
  });
}

export function getArticlesMy(author, limit, offset) {
  return new Promise(resolve => {
    axios
      .get(
        `articles?author=${author}&limit=${limit}&offset=${offset}`,
        getRequestParams()
      )
      .then(response => resolve(response.data));
  });
}

export function getArticlesFavorited(username, limit, offset) {
  return new Promise(resolve => {
    axios
      .get(
        `articles?favorited=${username}&limit=${limit}&offset=${offset}`,
        getRequestParams()
      )
      .then(response => resolve(response.data));
  });
}

export function getProfile(username) {
  return new Promise((resolve, reject) => {
    axios
      .get(`profiles/${username}`, getRequestParams())
      .then(response => resolve(response.data.profile))
      .catch(reject);
  });
}

export function followUser(username) {
  return new Promise((resolve, reject) => {
    axios
      .post(`profiles/${username}/follow`, {}, getRequestParams())
      .then(response => resolve(response.data.profile))
      .catch(reject);
  });
}

export function unfollowUser(username) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`profiles/${username}/follow`, getRequestParams())
      .then(response => resolve(response.data.profile))
      .catch(reject);
  });
}

export function favoriteArticle(slug) {
  return new Promise(resolve => {
    axios
      .post(`articles/${slug}/favorite`, {}, getRequestParams())
      .then(response => resolve(response.data.article));
  });
}

export function unfavoriteArticle(slug) {
  return new Promise(resolve => {
    axios
      .delete(`articles/${slug}/favorite`, {}, getRequestParams())
      .then(response => resolve(response.data.article));
  });
}

export function getTags() {
  return new Promise(resolve => {
    axios.get("tags").then(response => resolve(response.data.tags));
  });
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    axios
      .get("user", getRequestParams())
      .then(response => resolve(response.data.user))
      .catch(reject);
  });
}
