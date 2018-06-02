<template>
  <div class="container">
    <toolbar/>
    <!--<app-menu/>-->

    <router-view/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar/Toolbar';

export default {
  name: 'App',
  components: {
    Toolbar,
  },
};
</script>

<style>
  * {
    box-sizing : border-box;
  }

  @media screen and (min-width : 992px) {
    html {
      margin-left  : calc(100vw - 100%);
      margin-right : 0;
    }
  }
</style>
