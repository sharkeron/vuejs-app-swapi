<template>
  <div class="container">
    <form class="home-form" v-if="this.$route.fullPath === '/authorization/sign-in'">
      <label>
        <input type="email" name="email" placeholder="Email" required v-model="email">
      </label>

      <label>
        <input type="password" name="password" placeholder="Password" required v-model="pass">
      </label>

      <span class="error">
        {{this.$store.state.errorMessage}}
      </span>
      <!-- /.error -->

      <button type="submit"
              @click.prevent="signInUser">
        Sign In
      </button>
    </form>
    <!-- /.home-form -->

    <form class="home-form"
          v-if="this.$route.fullPath === '/authorization/sign-up'">
      <label>
        <input type="email"
               name="email"
               placeholder="Email"
               required
               v-model="email">
      </label>

      <label>
        <input type="password"
               name="password"
               placeholder="Password need more than 6 symbols"
               required
               v-model="pass">
      </label>

      <label>
        <input type="password"
               name="confirm-password"
               placeholder="Confirm password"
               required
               v-model="confirmPass">
      </label>

      <span class="error">
        {{this.$store.state.errorMessage}}
      </span>
      <!-- /.error -->

      <button type="submit"
              :disabled="comparePass"
              @click.prevent="registerNewUser">
        Sign Up
      </button>
    </form>
    <!-- /.home-form -->
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      email: '',
      pass: '',
      confirmPass: '',
      disableSubmit: true,
    };
  },
  computed: {
    comparePass() {
      if(this.confirmPass === this.pass && this.pass.length > 6) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    },
  },
  methods: {
    registerNewUser() {
      this.$store.dispatch('SIGN_UP', {
        userEmail: this.email,
        userPass: this.pass,
      });
    },
    signInUser() {
      this.$store.dispatch('SIGN_IN', {
        userEmail: this.email,
        userPass: this.pass,
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "Authorization";
</style>
