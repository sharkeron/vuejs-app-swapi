<template>
  <div class="toolbar">
    <template v-if="this.$store.state.userAuthorize === true">
      <div class="buttons">
        <router-link to="/categories" tag="button">
          Categories
        </router-link>

        <router-link to="/profile" tag="button">
          Profile
        </router-link>

        <button class="last" @click.prevent="logoutUser">
          Logout
        </button>

      </div>
      <!-- /.buttons -->
    </template>

    <template v-else>
      <div class="buttons">
        <router-link to="/authorization/sign-in" tag="button">
          Sign In
        </router-link>

        <router-link to="/authorization/sign-up" tag="button">
          Sign Up
        </router-link>
      </div>
      <!-- /.buttons -->
    </template>
  </div>
  <!-- /.toolbar -->
</template>

<script>
export default {
  name: 'toolbar',
  methods: {
    logoutUser() {
      this.$store.dispatch('SIGN_OUT');
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
  @import "Toolbar";
</style>
