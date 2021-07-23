<template>
  <ul class="error-messages">
    <li
      class="ng-binding ng-scope"
      v-for="(error, index) in prettiedErrors"
      :key="index"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppValidateErrors",
  props: {
    validateErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    prettiedErrors() {
      return Object.keys(this.validateErrors).map(key => {
        return key + " " + this.validateErrors[key].join(", ");
      });
    }
  }
};
</script>
