<template>
  <div class="container">
    <app-menu/>
    <page v-if="this.$route.fullPath !== '/categories'"/>
  </div>
  <!-- /.container -->
</template>

<script>
import AppMenu from '../AppMenu/AppMenu';
import Page from '../Page/Page';

export default {
  name: 'choose-categories',
  components: {
    'app-menu': AppMenu,
    page: Page,
  },
  mounted() {
    // this.$store.dispatch('LOAD_FROM_SERVER');
  },
};
</script>
