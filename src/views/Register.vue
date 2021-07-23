<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">
            Sign up
          </h1>
          <p class="text-xs-center">
            <a href="#/login">
              Have an account?
            </a>
          </p>

          <list-errors class="ng-isolate-scope">
            <ul class="error-messages ng-hide"></ul>
          </list-errors>

          <form class="ng-pristine ng-valid ng-valid-email">
            <fieldset ng-disabled="$ctrl.isSubmitting">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched"
                  type="text"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right ng-binding"
                type="submit"
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
